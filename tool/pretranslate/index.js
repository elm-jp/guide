#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

program
  .version('0.0.1')
  .description('pretranslate given file')
  .arguments('<file>')
  .option('-d, --dictionary [file]', 'Path to markdown file includes dictionary (default: "./book/about_translation.md")')
  .action(main)
  .parse(process.argv);

/** Main function
 * @param {string} file
 */
function main (file, { dictionary }) {
  // work around for jsdoctest
  if (file === 'index.js') return;
  if (file == null) {
    console.error('No file specified');
    return;
  }
  const dictContent = fs.readFileSync(dictionary || './book/about_translation.md', 'utf8');
  const dict = parseDictionary(dictContent);
  const content = fs.readFileSync(file, 'utf8');
  const pretranslated = group(content)
    .map((ps) => {
      if (isDictHeader(ps[0] || "")) return [''].concat(ps).join('\n');
      if ((ps[0] || "").trim().startsWith('```')) return ps.join('\n');
      if ((ps[0] || "").trim().startsWith('<!--')) return ps.join('\n');
      return appendTranslation(dict, modifyParagraph(ps).join('\n')).concat('\n');
    })
    .join('\n');
  fs.writeFile(file, pretranslated, 'utf8', function (err) {
    if (err) {
      throw err;
    }
    console.log('%s has been pretranslated', file);
  });
}

/** Groups given file content
 * @param {string} content
 * @returns {Array.<Array.<string>>}
 * @example
 *  group("foo\nbar\n\nbaz\n```elm\n  a = 34\n\nb = 12\n```")
 *  // => [["foo", "bar"], ["baz"], ["```elm", "  a = 34", "", "b = 12", "```"]]
 */
function group (content) {
  const def = {curr: [], acc: [], incode: false, incomment: false};
  const {curr, acc} = content.split('\n').reduce( ({curr, acc, incode, incomment}, str) => {
    if (isDictHeader(str)) {
      return {...def, curr: [str], acc: acc.concat([curr]), incode, incomment};
    }
    if (!incode && str.trim().startsWith('<!--')) {
      return {...def, curr: [str], acc: acc.concat([curr]), incomment: true};
    }
    if (!incode && str.trim().endsWith('-->')) {
      return {...def, acc: acc.concat([curr.concat(str)])};
    }
    if (!incomment && str.trim().startsWith('```')) {
      if (incode) {
        return {...def, acc: acc.concat([curr.concat(str)])};
      }
      return {...def, curr: [str], acc: acc.concat([curr]), incode: true};
    }
    if (!incode && !incomment && str.trim() === "") {
      return {curr: [], acc: acc.concat([curr]), incode};
    }
    return {...def, curr: curr.concat(str), acc, incode, incomment};
  }, def);
  return acc.concat([curr]).filter((a) => a.length !== 0);
}

/** Modify given paragraph
 * @param {Array.<string>} para
 * @returns {Array.<string>}
 * @example
 *  modifyParagraph([])
 *  // => []
 *  modifyParagraph([ "foo", "bar", "baz" ])
 *  // =>   [ "<!--", "foo", "bar", "baz", "-->" ]
 */
function modifyParagraph (para) {
  return ["<!--"].concat(para).concat(["-->"]);
}

/**
 * @params {Array.<Array<string>>} dict
 * @params {string} para
 * @example
 *  appendTranslation([['日本語', 'Japanese'], ['型の別名', 'type alias']], "Foo bar Type Alias baz")
 *  // => "Foo bar Type Alias baz\ntype alias: 型の別名"
 *  appendTranslation([['日本語', 'Japanese'], ['型の別名', 'type alias']], "Foo bar Type alias baz")
 *  // => "Foo bar Type alias baz\ntype alias: 型の別名"
 *  appendTranslation([['日本語', 'Japanese'], ['型の別名', 'type alias']], "Foo bar Type\n alias baz")
 *  // => "Foo bar Type\n alias baz"
 *  appendTranslation([['日本語', 'Japanese'], ['型の別名', 'type alias']], "Japanese bar Type alias baz")
 *  // => "Japanese bar Type alias baz\nJapanese: 日本語\ntype alias: 型の別名"
 */
function appendTranslation (dict, para) {
  const normalizedPara = para.toLowerCase();
  const extra = dict.reduce((acc, [ja, en]) => {
    if (normalizedPara.indexOf(en.toLowerCase()) === -1) return acc;
    return acc + '\n' + en + ': ' + ja;
  }, '');
  return para + extra;
}

/**
 * @returns {Array.<Array<string>>}
 * @example
 *  parseDictionary("foo\nbar\n<!--|Translated|Original|-->\n|:----|----:|\n| 型の別名| type alias |\n|  カスタム型  | custom types|\nbazbar\nbazbaz")
 *  // => [["型の別名", "type alias"], ["カスタム型", "custom types"]]
 */
function parseDictionary (content) {
  const def = { indict: false, inbody: false, dict: [] };
  const ret = content.split('\n').reduce(({indict, inbody, dict}, r) => {
    const matched = trContents(r);
    if (matched === null) {
      return { ...def, dict };
    }
    if (matched[0] === '<Translated>' && matched[1] === '<Original>') {
      return { ...def, indict: true, dict };
    }
    if (/:*-+:?/.test(matched[0])) {
      return { ...def, indict, inbody: true, dict };
    }
    if (!indict || !inbody) {
      return { ...def, indict, dict };
    }
    return { indict, inbody, dict: dict.concat([matched]) };
  }, def).dict;
  return ret;
}

/**
 * Parse to get contents from table row.
 * @param {string} row
 * @returns {?Array.<string>}
 * @example
 *  trContents('|訳語|原文|')
 *  // => ['訳語', '原文']
 *  trContents('|日本語|Japanese|')
 *  // => ['日本語', 'Japanese']
 *  trContents('  |  訳語   |    原文 |  ')
 *  // => ['訳語', '原文']
 *  trContents('訳語|原文|') === null
 *  // => true
 *  trContents('|訳語|原文') === null
 *  // => true
 *  trContents('<!-- |  訳語   |    原文 |  -->')
 *  // => ['訳語', '原文']
 */
function trContents (row) {
  const matches = /\| *([^|]+) *\| *([^|]+) *\|/.exec(row);
  if (matches === null) return null;
  return [matches[1].trim(), matches[2].trim()];
}

/**
 * Check if the line is header of translation table.
 * @param {string} row
 * @returns {bool}
 * @example
 *  isDictHeader("  <!-- | <Translated>   |<Original>  | -->")
 *  // => true
 */
function isDictHeader (row) {
  return /.*\| *<Translated> *\| *<Original> *\|.*/.test(row);
}

