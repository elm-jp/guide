#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

program
  .version('0.0.1')
  .description('pretranslate given file')
  .arguments('<file>')
  .action(main)
  .parse(process.argv);

/** Main function
 * @param {string} file
 */
function main (file) {
  // work around for jsdoctest
  if (file === 'index.js') return;
  if (file == null) {
    console.error('No file specified');
    return;
  }
  fs.readFile(file, 'utf8', function (err, content) {
    if (err) {
      throw err;
    }
    const pretranslated = group(content).map(modifyParagraph).map((ps) => ps.join('\n')).join('\n\n');
    fs.writeFile(file, pretranslated, 'utf8', function (err) {
      if (err) {
        throw err;
      }
      console.log('%s has been pretranslated', file);
    });
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
  const {curr, acc} = content.split('\n').reduce( ({curr, acc, incode}, str) => {
    if (str.trim().startsWith('```')) {
      if (incode) {
        return {curr : curr.concat(str), acc, incode: !incode};
      }
      return {curr: [str], acc: acc.concat([curr]), incode:!incode};
    }
    if (str.trim() === '' && !incode) {
      return {curr: [], acc: acc.concat([curr]), incode};
    }
    return {curr : curr.concat(str), acc, incode};
  }, {curr: [], acc: [], incode: false});
  return acc.concat([curr]);
}

/** Modify given paragraph
 * @param {Array.<string>} para
 * @returns {Array.<string>}
 * @example
 *  modifyParagraph([])
 *  // => []
 *  modifyParagraph([ "  ```elm", "    foo : Int", "    foo = bar", "    bar = 32", "  ```" ])
 *  // =>           [ "  ```elm", "    foo : Int", "    foo = bar", "    bar = 32", "  ```" ]
 *  modifyParagraph([ "foo", "bar", "baz" ])
 *  // =>   [ "<!--", "foo", "bar", "baz", "-->" ]
 */
function modifyParagraph (para) {
  if (para[0] === void 0) return para;
  if (para[0].trim().startsWith('```')) return para;
  return ["<!--"].concat(para).concat(["-->"]);
}
