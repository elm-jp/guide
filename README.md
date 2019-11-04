# Japanese translation of guide.elm-lang.org

[Original version](https://github.com/evancz/guide.elm-lang.org/)

guide.elm-lang.org 日本語化プロジェクト

たまに大元のプロジェクトの変更をマージします。

## 翻訳に貢献する

え？ 貢献してくれるんですか？！
It's super helpful!

### レビュアーとして貢献する

他の方が翻訳した内容をレビューしていただける方も大募集です！
ご都合の良いときにマージ前のプルリクに対して「もしかしたらここはこうしたらもっとわかりやすくなるかも！」みたいなコメントをつけていただくだけです。
翻訳作業もレビュアーとしての参加もとてもとてもありがたいです！

### 翻訳のやり方

`./book` 以下のファイルの英語の原文をコメントアウトして、その下に日本語を記入していきます。
[サンプル](https://github.com/elm-jp/guide/pull/1)

```bash
$ npx pretranslate ./book/your_file_to_translate
```

を実行することで、自動的に対象ファイルをパラグラフごとにコメントアウトし、さらに `./book/about_translation.md` の対訳表にしたがって文中に出てくる用語の標準的な対訳を付記してくれます。

対訳表自体は手動で更新が必要です。重要そうな単語を訳した際に都度対訳表に追加してください。

### 翻訳の方針

翻訳の方針については[翻訳について](https://github.com/elm-jp/guide/blob/master/book/about_translation.md)を事前にご確認ください。

### 翻訳しようと決めたら

せっかく翻訳していただいたのに、実は同時に他の人が同じところを翻訳していて先にPRを出されちゃったらすごくもったいないですよね？
それを防ぐためにまず対応する issue を探して「これを担当します」とコメントするか、権限がある方は自分を assign してください。
他の人が「お、これは作業中だな」と気づくのでオススメです！

また、こちらは任意ですが

```bash
$ git checkout -b ${your_branch_name}
$ git commit --allow-empty -m 'Empty commit'
$ git push origin ${your_branch_name}
```

のように空のコミットでブランチをプッシュして、「[WIP] interop/flags.md」 みたいなタイトルのPRを作っても良いでしょう。

## ローカル環境で確認する

まず下記のコマンドで依存するプログラムをインストールします。
（ついでにページ埋め込み型 repl 用のソースをコンパイルしたりいろいろします）

```bash
$ npm i
```

下記のコマンドで開発サーバーが立ち上がります。

```bash
$ npm start
...
...
Starting server ...
Serving book on http://localhost:4000
```

`http://localhost:4000` にアクセスすることで表示の確認ができます。

## 本番環境へのデプロイ

いまはCIが自動でやっていますが、念のため記載しておきます。

```bash
$ git checkout master
$ npm run build
$ git add docs && git commit -m 'Update docs' && git push origin master
```

## 原文の更新に追従する

原文も更新されているので、ときどき更新に追従しないといけません。

原文に追従する際は、`git` のちからを借りて基本的に以下のフローにそって手作業でがんばります。

1. 事前にEvanの元リポジトリを別の `remote` として登録しておく

```
$ git remote add evan github:evancz/guide.elm-lang.org.git
$ git remote -v
evan	github:evancz/guide.elm-lang.org.git (fetch)
evan	github:evancz/guide.elm-lang.org.git (push)
origin	github:elm-jp/guide.git (fetch)
origin	github:elm-jp/guide.git (push)
```

2. 最新の `evan/origin` をfetchして日本語版のmasterにマージしたブランチを作成する

```
$ git checkout master
$ git pull origin master
$ git fetch evan
$ git checkout -b merge-evan
$ git merge evan/master
```

この段階でめっちゃコンフリクトが起きるので頑張ってうんしょうんしょと解決する。
事前に[どこが変更されているか](https://guide.elm-lang.jp/about_translation.html#%E5%8E%9F%E6%96%87%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3)を確認しておくと、変なマージをしてしまうのを防げます。

typoやちょっとした変更であればこの場で変更を翻訳に反映させてしまいますが、大きな変更の場合は変更部分のみ原文に置き換え、
上部に `<!-- TODO -->` と記載しておきます。
あとで誰かがそこの翻訳をしてくれることでしょう。

例:

```
<!--
This sentence is not modified by this change.
-->

ここの文章は特に変わりなく昔からあるものです。

<!--
This sentence is inserted anew.
-->

<!-- TODO -->
This sentence is inserted anew.

```

マージ後に、`about_translation.md` の「 翻訳がベースとしているバージョンと英語版の最新バージョンとの差分」のところのURLを最新のものに変更してください。
