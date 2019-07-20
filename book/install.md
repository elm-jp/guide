<!--
# Install

  * Mac &mdash; [installer][mac]
  * Windows &mdash; [installer][win]
  * Anywhere &mdash; [direct download][gh] or [npm][]

[mac]: https://github.com/elm/compiler/releases/download/0.19.0/installer-for-mac.pkg
[win]: https://github.com/elm/compiler/releases/download/0.19.0/installer-for-windows.exe
[npm]: https://www.npmjs.com/package/elm
[gh]: https://github.com/elm/compiler/releases/tag/0.19.0

After installing through any of those routes, you will have the `elm` binary available in your terminal!
-->

# インストール

  * Mac &mdash; [インストーラー][mac]
  * Windows &mdash; [インストーラー][win]
  * プラットフォームによらない方法 &mdash; [バイナリを直接ダウンロード][gh] または [npm][]

[mac]: https://github.com/elm/compiler/releases/download/0.19.0/installer-for-mac.pkg
[win]: https://github.com/elm/compiler/releases/download/0.19.0/installer-for-windows.exe
[npm]: https://www.npmjs.com/package/elm
[gh]: https://github.com/elm/compiler/releases/tag/0.19.0

上記いずれかの方法でElmをインストールすると、`elm`コマンドがターミナルから利用できるようになります。

<!--
> **Troubleshooting:**
>
> 1. If you are having trouble, just skip this for now! You can try out a bunch of sections of this book with the [the online editor](https://elm-lang.org/try), and you can always come back to this later!
> 2. The fastest way to learn *anything* is to talk with other people in the Elm community. We are friendly and happy to help! Try visiting [the Elm Slack](https://elmlang.herokuapp.com/) and asking about your problem. In fact, if you run into something confusing at any point, come ask about it as well!
-->

> **トラブルシューティング**
>
> 1. If you are having trouble, just skip this for now! You can try out a bunch of sections of this book with the [the online editor](https://elm-lang.org/try), and you can always come back to this later!
> 2. The fastest way to learn *anything* is to talk with other people in the Elm community. We are friendly and happy to help! Try visiting [the Elm Slack](https://elmlang.herokuapp.com/) and asking about your problem. In fact, if you run into something confusing at any point, come ask about it as well!
<!-- TODO -->

<!--
## Terminal Tools

So we have this `elm` binary now, but what can it do exactly?
-->

## ターミナル用ツール
`elm`コマンドをインストールしましたが、どんなことができるのでしょうか？

<!--
### `elm repl`

`elm repl` lets us interact with Elm expressions in the terminal.

```elm
$ elm repl
---- Elm 0.19.0 ----------------------------------------------------------------
Read <https://elm-lang.org/0.19.0/repl> to learn more: exit, help, imports, etc.
--------------------------------------------------------------------------------
> 1 / 2
0.5 : Float
> List.length [1,2,3,4]
4 : Int
> String.reverse "stressed"
"desserts" : String
> :exit
$
```

We will be using `elm repl` in the upcoming &ldquo;Core Language&rdquo; section, and you can read more about how it works [here](https://elm-lang.org/0.19.0/repl).

> **Note:** `elm repl` works by compiling code to JavaScript, so make sure you have [Node.js](http://nodejs.org/) installed. We use that to evaluate code.
-->

### `elm repl`
`elm repl` はターミナル上でElmの式を試すために使えます。[^1]

```elm
$ elm repl
---- Elm 0.19.0 ----------------------------------------------------------------
Read <https://elm-lang.org/0.19.0/repl> to learn more: exit, help, imports, etc.
--------------------------------------------------------------------------------
> 1 / 2
0.5 : Float
> List.length [1,2,3,4]
4 : Int
> String.reverse "stressed"
"desserts" : String
> :exit
$
```

`elm repl`は&ldquo;言語の基礎&rdquo;の節で使います。詳しい使い方は[こちら](https://elm-lang.org/0.19.0/repl)をご覧ください。


<!--
### `elm reactor`

`elm reactor` helps you build Elm projects without messing with the terminal too much. You just run it at the root of your project, like this:

```bash
git clone https://github.com/evancz/elm-architecture-tutorial.git
cd elm-architecture-tutorial
elm reactor
```

This starts a server at [`http://localhost:8000`](http://localhost:8000). You can navigate to any Elm file and see what it looks like. Try to check out `examples/01-button.elm`.
-->

### `elm reactor`
`elm reactor`を使うと、ターミナルを頻繁に操作しなくてもElmプロジェクトをビルドできます。例えば次の例のように、プロジェクトのルートディレクトリで以下のコマンドを入力してみてください。

```bash
git clone https://github.com/evancz/elm-architecture-tutorial.git
cd elm-architecture-tutorial
elm reactor
```

サーバーが[`http://localhost:8000`](http://localhost:8000)で起動します。ここでは任意のElmファイルを確認することができます。`examples/01-button.elm`を確認してみてください。

<!--
### `elm make`

`elm make` builds Elm projects. It can compile Elm code to HTML or JavaScript. It is the most general way to compile Elm code, so if your project becomes too advanced for `elm reactor`, you will want to start using `elm make` directly.

Say you want to compile `Main.elm` to an HTML file named `main.html`. You would run this command:

```bash
elm make Main.elm --output=main.html
```
-->

### `elm make`
`elm make`を使ってElmプロジェクトをビルドできます。ElmコードはHTMLやJavaScriptにコンパイルされます。このコマンドは最も一般的なElmコードのビルド方法で、`elm reactor`の恩恵を受けているのなら`elm make`も直接使いたくなるでしょう。

`Main.elm`を`main.html`という名前でコンパイルしたい場合、以下のようにします。

```bash
elm make Main.elm --output=main.html
```

<!--
### `elm install`

Elm packages all live at [`package.elm-lang.org`](https://package.elm-lang.org/).

Say you look around and decide you need [`elm/http`][http] and [`elm/json`][json] to make some HTTP requests. You can get them set up in your project with the following commands:

```bash
elm install elm/http
elm install elm/json
```

This will add the dependencies into your `elm.json` file, described in more detail [here](https://github.com/elm/compiler/blob/master/docs/elm.json/application.md).

[http]: https://package.elm-lang.org/packages/elm/http/latest
[json]: https://package.elm-lang.org/packages/elm/json/latest
-->

### `elm install`

Elmのパッケージは全て[`package.elm-lang.org`](https://package.elm-lang.org/)に置かれています。

例えばHTTPリクエストを組み立てるために[`elm/http`][http]パッケージと[`elm/json`][json]パッケージをプロジェクトに追加したいときは、以下のコマンドでインストールすることができます。

```bash
elm install elm/http
elm install elm/json
```

このコマンドでは`elm.json`に依存関係を追記します。詳細は[こちら](https://github.com/elm/compiler/blob/master/docs/elm.json/application.md)をご覧ください。

[http]: https://package.elm-lang.org/packages/elm/http/latest
[json]: https://package.elm-lang.org/packages/elm/json/latest

<!--
## Summary

The `elm` binary can do a bunch of stuff. Do not worry about remembering it all. You can always just run `elm --help` or `elm repl --help` to get a bunch of information about any of these commands.

Next we are going to learn the basics of Elm!
-->

## まとめ
`elm`コマンドでは様々なことができますが、全てを覚えようとする必要はありません。`elm --help`コマンドや`elm repl --help`コマンドを使うことで、いつでもこの章で紹介したコマンドの詳細情報を確認できます。

次は、Elmの基本について学びましょう！

<!--
> #### Configure Your Editor?
>
> It can be tricky to set up some of these editors, so feel free to skip over this for now! You can go far with just [the online editor](https://elm-lang.org/try).
>
> Here are some of the community maintained plugins for Elm:
>
>  * [Atom](https://atom.io/packages/language-elm)
>  * [Brackets](https://github.com/lepinay/elm-brackets)
>  * [Emacs](https://github.com/jcollard/elm-mode)
>  * [IntelliJ](https://github.com/klazuka/intellij-elm)
>  * [Light Table](https://github.com/rundis/elm-light)
>  * [Sublime Text](https://packagecontrol.io/packages/Elm%20Language%20Support)
>  * [Vim](https://github.com/ElmCast/elm-vim)
>  * [VS Code](https://github.com/sbrink/vscode-elm)
>
> If you do not have an editor at all, [Sublime Text](https://www.sublimetext.com/) is a great one to get started with!
>
> You may also want to try out [`elm-format`][elm-format] which makes your code pretty!

[elm-format]: https://github.com/avh4/elm-format
-->

<!-- TODO -->
> ## エディタを設定したい？
>
> It can be tricky to set up some of these editors, so feel free to skip over this for now! You can go far with just [the online editor](https://elm-lang.org/try).
>
> Here are some of the community maintained plugins for Elm:
>
>  * [Atom](https://atom.io/packages/language-elm)
>  * [Brackets](https://github.com/lepinay/elm-brackets)
>  * [Emacs](https://github.com/jcollard/elm-mode)
>  * [IntelliJ](https://github.com/klazuka/intellij-elm)
>  * [Light Table](https://github.com/rundis/elm-light)
>  * [Sublime Text](https://packagecontrol.io/packages/Elm%20Language%20Support)
>  * [Vim](https://github.com/ElmCast/elm-vim)
>  * [VS Code](https://github.com/sbrink/vscode-elm)
>
> まだどのエディタもインストールしていない場合は、[Sublime Text](https://www.sublimetext.com/)が入門に最適です。
>
> また、コードを整形する [`elm-format`][elm-format] を試してみるのも良いでしょう。

[elm-format]: https://github.com/avh4/elm-format

[^1]: 訳注: `elm repl`を実行するにはnode.jsおよびnpmが必要です。フロントエンド開発ではほぼ必須のツールですので、インストールしていない環境の方は[公式ページ](https://nodejs.org/ja/)からインストールしてください。node.jsをインストールすれば一緒にnpmもインストールされます。
