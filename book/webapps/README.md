<!--
# Web Apps
-->

# Web アプリケーション

<!--
So far we have been creating Elm programs with `Browser.element`, allowing us to take over a single node in a larger application. This is great for _introducing_ Elm at work (as described [here](https://elm-lang.org/blog/how-to-use-elm-at-work)) but what happens after that? How can we use Elm more extensively?
-->

これまでは、大きなアプリケーションのなかのひとつのノードをだけを専有する`Browser.element`を使って Elm プログラムを作ってきました。([こちら](https://elm-lang.org/blog/how-to-use-elm-at-work)で述べたように)これは現在すでに稼働しているサービスに Elm を**導入**するのには最適ですが、このあとはどうなるのでしょうか。より広い範囲で Elm を使うには、どのようにすればよいのでしょうか。

<!--
In this chapter, we will learn how to create a “web app” with a bunch of different pages that all integrate nicely with each other, but we must start by controlling a single page.
-->

この章では、いろいろなページを互いにうまく組み合わせた「Web アプリケーション」をどのように作るのかを学んでいきます。でもまずはひとつのページだけを扱うことから始めるのがいいでしょう。

<!--
## Control the Document
-->

## ドキュメントの操作

<!--
The first step is to switch to starting programs with [`Browser.document`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#document):
-->

最初の一歩は、[`Browser.document`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#document)を使うようにプログラムを変えることです。

```elm
document :
  { init : flags -> ( model, Cmd msg )
  , view : model -> Document msg
  , update : msg -> model -> ( model, Cmd msg )
  , subscriptions : model -> Sub msg
  }
  -> Program flags model msg
```

<!--
The arguments are almost exactly the same as `Browser.element`, except for the `view` function. Rather than returning an `Html` value, you return a [`Document`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#Document) like this:
-->

`view`関数を除けば、引数は`Browser.element`とほとんど同じです。`view`関数は`Html`を返すのではなく、次のような[`Document`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#Document)を返すようになります。

```elm
type alias Document msg =
  { title : String
  , body : List (Html msg)
  }
```

<!--
This gives you control over the `<title>` and the `<body>` of the document. Perhaps your program downloads some data and that helps you determine a more specific title. Now you can just change it in your `view` function!
-->

これでドキュメントの `<title>`と`<body>`について制御できるようになります。何かのデータをダウンロードして、それを元により詳細なタイトルを決定するようなプログラムもあるでしょう。そのようなときは、この`view`関数のなかで`title`を変えるだけでです！

<!--
## Serve the Page
-->

## ページをサーバーから提供する

<!--
The compiler produces HTML by default, so you can compile your code like this:
-->

コンパイラはデフォルトで HTML を出力しますので、次のようにするとコードをコンパイルできます。

```bash
elm make src/Main.elm
```

<!--
The output will be a file named `index.html` that you can serve like any other HTML file. That works fine, but you can get a bit more flexibility by (1) compiling Elm to JavaScript and (2) making your own custom HTML file. To take that path, you compile like this:
-->

`index.html`という名前のファイルが出力されますが、これは他の HTML ファイルと同じようにサーバから送信できます。これでもうまく動きますが、(1) Elm を JavaScript へとコンパイルする、(2) HTML をカスタマイズするなど、もうちょっと柔軟に扱うこともできます。パスを与えて、次のようにコンパイルしてみます。

```bash
elm make src/Main.elm --output=main.js
```

<!--
This will produce `main.js` which you can load from a custom HTML file like this:
-->

こうすると`main.js`が生成され、次のような HTML ファイルから読み込むことができます。

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="UTF-8">
  <title>Main</title>
  <link rel="stylesheet" href="whatever-you-want.css">
  <script src="main.js"></script>
</head>
<body>
  <script>var app = Elm.Main.init();</script>
</body>
</html>
```

<!--
This HTML is pretty simple. You load whatever you need in the `<head>` and you initialize your Elm program in the `<body>`. The Elm program will take it from there and render everything.
-->

この HTML はとてもシンプルですね。`<head>`で必要なものを読み込み、`<body>`で Elm プログラムを初期化しています。Elm プログラムはここから読み込まれ、すべてがレンダリングされます。

<!--
Either way, now you have some HTML that you can send to browsers. You can get that HTML to people with free services like [GitHub Pages](https://pages.github.com/) or [Netlify](https://www.netlify.com/), or maybe you make your own server and run a VPS with a service like [Digital Ocean](https://m.do.co/c/c47faa1916d2). Whatever works for you! You just need a way to get HTML into a browser.
-->

どちらにせよ、ブラウザに送信する HTML を用意することができました。[GitHub Pages](https://pages.github.com/)や[Netlify](https://www.netlify.com/)のようなフリーのサービスを使えばこの HTML を提供することができますし、あるいは自分のサーバを用意して[Digital Ocean](https://m.do.co/c/c47faa1916d2)のようなサービスを使って VPS を実行するのもいいでしょう。どんなやり方でも大丈夫です！HTML をブラウザへと送信できさえすればいいのです。

<!--
>> **Note 1:** Creating custom HTML is helpful if you are doing something custom with CSS. Many people use projects like [`rtfeldman/elm-css`](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/) to handle all of their styles from within Elm, but maybe you are working in a team where there is lots of predefined CSS. Maybe the team is even using one of those CSS preprocessors. That is all fine. Just load the final CSS file in the `<head>` of your HTML file.
>
> **Note 2:** The Digital Ocean link above is a referral link, so if you sign up through that and end up using the service, we get a $25 credit towards our hosting costs for `elm-lang.org` and `package.elm-lang.org`.
-->

> **Note 1:** 　もしあなたが CSS で何らかのカスタマイズをしたいのなら、カスタム HTML を作るといいでしょう。多くのユーザは、[`rtfeldman/elm-css`](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/)のようなプロジェクト使って Elm のなかでスタイルを扱っていますが、あなたはチームを組んで作業しており、事前に書かれたたくさんの CSS があるかもしれません。チームでは何らかの CSS プリプロセッサを使っていることもあるでしょう。その場合もあなたの HTML ファイルの`<head>`で、最終的な CSS ファイルを読み込むだけです。

> **Note 2:** 先述の Digital Ocean へのリンクは紹介料付きのリンクで、もしこちらを通じてサインアップしてサービスを使っていただければ、`elm-lang.org`と`package.elm-lang.org`へ 25 ドルのホスティング料が支払われます。
