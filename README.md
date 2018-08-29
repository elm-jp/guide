# Japanese translation of guide.elm-lang.org

[Original version](https://github.com/evancz/guide.elm-lang.org/)

guide.elm-lang.org 日本語化プロジェクト

たまに大元のプロジェクトの変更をマージします。

## 進捗

現状は原文が多く残っているため、全ページに `<meta name="robots" content="noindex">` を入れることで、
検索エンジンからコピーコンテンツと見なされるのを防いでいます。

## 翻訳に貢献する

え？ 貢献してくれるんですか？！
It's super helpful!

`./book` 以下のファイルの英語の原文をコメントアウトして、その下に日本語を記入していきます。
[サンプル](https://github.com/elm-jp/guide/pull/1)

せっかく翻訳していただいたのに、実は同時に他の人が同じところを翻訳していて先にPRを出されちゃったらすごくもったいないですよね？
それを防ぐために

```bash
$ git checkout -b ${your_branch_name}
$ git commit --allow-empty -m 'Empty commit'
$ git push origin ${your_branch_name}
```

のように空のコミットでブランチをプッシュして、「[WIP] interop/flags.md」 みたいなタイトルのPRを作っておくと
他の人が「お、これは作業中だな」と気づくのでオススメです！

## ローカル環境で確認する

まず下記のコマンドで依存するプログラムをインストールします。
(`yarn` はもうオワコンやーん)

```bash
$ npm i
$ npm run install
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

masterへのコミット権限がある人がやってください。

```bash
$ git checkout master
$ npm run build
$ git add docs && git commit -m 'Update docs' && git push origin master
```
