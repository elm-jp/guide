# Japanese translation of guide.elm-lang.org

guide.elm-lang.org 日本語化プロジェクト

英語の原文をコメントアウトして、その下に日本語を記入していきます。
http://garbagetown.hatenablog.com/entry/2014/12/04/012645

たまに大元のプロジェクトの変更をマージします。

## 進捗

現状は原文が多く残っているため、全ページに `<meta name="robots" content="noindex">` を入れることで、
検索エンジンからコピーコンテンツと見なされるのを防いでいます。

## ローカル環境で確認する

まず下記のコマンドで依存するプログラムをインストールします。

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
