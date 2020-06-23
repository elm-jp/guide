<!--
# JavaScript Interop
-->
# JavaScriptとの相互運用

<!--
By now we have seen **The Elm Architecture**, **types**, **commands**, **subscriptions**, and we even have Elm installed locally.
-->
<!-- TODO -->
<!-- 元の文章：
ここまでElmについてのたくさんの事柄を見てきました。**The Elm Architecture**を学び、**型**について学び、**コマンド**と**サブスクリプション**を使って外の世界とやり取りする方法を学びました。いい調子です！
-->
By now we have seen **The Elm Architecture**, **types**, **commands**, **subscriptions**, and we even have Elm installed locally.

<!--
But what happens when you need to integrate with JavaScript? Maybe there is a browser API that does not have an equivalent Elm package yet. Maybe you want to embed a JavaScript widget within your Elm app? Etc. This chapter will outline Elm's three interop mechanisms:
-->
では、JavaScriptと一緒に使いたくなったとしたらどうでしょう？ 使いたいブラウザーAPIがまだElmのパッケージになっていなかったとしたら？ Elmで作ったアプリケーションの中にJavaScriptのウィジェットを組み込みたいとしたら？ この章では、そのためにElmが提供する以下の3つの相互運用の方法を取り上げて、要点を解説します。

<!--
- [Flags](/interop/flags.html)
- [Ports](/interop/ports.html)
- [Custom Elements](/interop/custom_elements.html)
-->

- [フラグ](/interop/flags.html)
- [ポート](/interop/ports.html)
- [カスタムエレメンツ](/interop/custom_elements.html)

<!--
Before we get into the three mechanisms, we need know how to compile Elm programs to JavaScript!
-->

実際にこの3つの方法の中身に入る前に、まずはElmのプログラムをJavaScriptにコンパイルする方法を知る必要があります！

<!--
> **NOTE:** If you are evaluating Elm for use at work, I encourage you to make sure these three mechanisms will be able to cover all of your needs. You can get a quick overview of this chapter by looking at these [examples](https://github.com/elm-community/js-integration-examples/). Please ask [here](https://discourse.elm-lang.org/) if you are not sure about something, and I encourage you to circle back to Elm later if you are not fully confident.
-->

> **NOTE:** If you are evaluating Elm for use at work, I encourage you to make sure these three mechanisms will be able to cover all of your needs. You can get a quick overview of this chapter by looking at these [examples](https://github.com/elm-community/js-integration-examples/). Please ask [here](https://discourse.elm-lang.org/) if you are not sure about something, and I encourage you to circle back to Elm later if you are not fully confident.
<!-- TODO -->


<!--
## Compiling to JavaScript
-->

## JavaScriptにコンパイルする

<!--
Running `elm make` produces HTML files by default. So if you say:
-->
`elm make`コマンドは、デフォルトでHTMLファイルを生成します。つまり、次のようなコマンドを打つと:

```bash
elm make src/Main.elm
```

<!--
It produces an `index.html` file that you can just open and start playing with. If you are getting into JavaScript interop, you want to produce JavaScript files instead:
-->
すぐに開いていろいろと試すことのできる`index.html`ファイルが生成されます。しかしJavaScriptとの相互運用性を試すときには、JavaScriptファイルが欲しいはずです:

```bash
elm make src/Main.elm --output=main.js
```

<!--
This produces a JavaScript file that exposes an `Elm.Main.init()` function. So once you have `main.js` you can write your own HTML file that does whatever you want.
-->
こうすれば、`Elm.Main.init()`関数を公開するJavaScriptファイルが生成されます。`main.js`ファイルが手に入ったので、自分で好きなようにHTMLファイルを書くことができます！


<!--
## Embedding in HTML
-->
## HTMLに埋め込む

<!--
Here is the minimal HTML needed to make your `main.js` appear in a browser:
-->
コンパイルして作成した`main.js`を動かしてブラウザで表示させるために必要な最小限のHTMLが以下のものです。

```html
<html>
<head>
  <meta charset="UTF-8">
  <title>Main</title>
  <script src="main.js"></script>
</head>

<body>
  <div id="myapp"></div>
  <script>
  var app = Elm.Main.init({
    node: document.getElementById('myapp')
  });
  </script>
</body>
</html>
```

<!--
I want to call attention to the important lines here:
-->
特に注意してほしい重要な行がいくつかあります。

<!--
- `<head>` - We have a line to load our compiled `main.js` file. This is required! If you compile an Elm module called `Main`, you will get an `Elm.Main.init()` function available in JavaScript. If you compile an Elm module named `Home`, you will get an `Elm.Home.init()` function in JavaScript. Etc.

- `<body>` - We need to do two things here. First, we create a `<div>` that want our Elm program to take over. Maybe it is within a larger application, surrounded by tons of other stuff? That is fine! Second, we have a `<script>` to initializes our Elm program. Here we call the `Elm.Main.init()` function to start our program, passing in the `node` we want to take over.

Now that we know how to embed Elm programs in an HTML document, it is time to start exploring the three interop options: flags, ports, and custom elements!

> **Note:** This is a normal HTML file, so you can put whatever you want in it! Many people load additional JS and CSS files in the `<head>`. That means it is totally fine to write your CSS by hand or to generate it somehow. Add something like `<link rel="stylesheet" href="whatever-you-want.css">` in your `<head>` and you have access to it. (There are some great options for specifying your CSS all _within_ Elm as well, but that is a whole other topic!)
-->

- `<head>` - We have a line to load our compiled `main.js` file. This is required! If you compile an Elm module called `Main`, you will get an `Elm.Main.init()` function available in JavaScript. If you compile an Elm module named `Home`, you will get an `Elm.Home.init()` function in JavaScript. Etc.

- `<body>` - We need to do two things here. First, we create a `<div>` that want our Elm program to take over. Maybe it is within a larger application, surrounded by tons of other stuff? That is fine! Second, we have a `<script>` to initializes our Elm program. Here we call the `Elm.Main.init()` function to start our program, passing in the `node` we want to take over.

Now that we know how to embed Elm programs in an HTML document, it is time to start exploring the three interop options: flags, ports, and custom elements!

> **Note:** This is a normal HTML file, so you can put whatever you want in it! Many people load additional JS and CSS files in the `<head>`. That means it is totally fine to write your CSS by hand or to generate it somehow. Add something like `<link rel="stylesheet" href="whatever-you-want.css">` in your `<head>` and you have access to it. (There are some great options for specifying your CSS all _within_ Elm as well, but that is a whole other topic!)

<!-- TODO -->
