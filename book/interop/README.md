<!--
# JavaScript Interop
-->
# JavaScriptとの相互運用

<!--
By now we have seen **The Elm Architecture**, **types**, **commands**, **subscriptions**, and we even have Elm installed locally.
-->
ここまでで**The Elm Architecture**、**型**、**コマンド**、**サブスクリプション**について学び、いよいよローカルにElmをインストールしました。

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

> **Note:** Elmを仕事で使うことを検討しているなら、上に示したこの3つの方法が、あなたの要件を満たしているかどうか確かめておくことをおすすめします。この3つの方法について本章で解説している内容は、[こちらの例](https://github.com/elm-community/js-integration-examples/)からざっと概要をつかむことができます。何かわからないことがあったら、[ここ](https://discourse.elm-lang.org/)から質問してみましょう[^1]。それでも自信が持てないときは、時間をおいてみて、あとでもう一度Elmを試してみるのもいいでしょう。


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
-->

- `<head>` ではコンパイルした`main.js`を読み込んでいます。この行は必須です！Elmから`Main`という名前でコンパイルしたモジュールは、JavaScriptから`Elm.Main.init()`という関数として使うことができます。もし、Elmの`Home`というモジュールをコンパイルしたなら、`Elm.Home.init()`関数になる、というぐあいです。
- `<body>` では2つのことを行ないます。最初に、Elmに制御させるための`<div>`を作ります。Elmが操作できるのはこの `<div>` の中に限られていますので、もしこれが他のたくさんの要素に囲まれた大きなアプリケーションの中だったとしても心配は要りません！ 次に、Elmを初期化するための`<script>`タグがあります。ここで`Elm.Main.init()`関数を呼び出し、`node`という引数にElmに制御させたい要素を渡してプログラムを開始します。

さあ、HTMLドキュメントの中にElmプログラムを組み込むやりかたを学んだところで、いよいよJavaScriptとやり取りする3つの方法、フラグ、ポート、カスタムエレメンツについて見ていきましょう！

<!--
> **Note:** This is a normal HTML file, so you can put whatever you want in it! Many people load additional JS and CSS files in the `<head>`. That means it is totally fine to write your CSS by hand or to generate it somehow. Add something like `<link rel="stylesheet" href="whatever-you-want.css">` in your `<head>` and you have access to it. (There are some great options for specifying your CSS all _within_ Elm as well, but that is a whole other topic!)
-->

> **Note:** これはごくふつうのHTMLファイルなので、なんでも好きなものを配置することができます！ `<head>`で追加のJSやCSSを読み込むことはよくあります。つまり、手で書いたり、他の方法で生成したりしたCSSを使うのに、何も問題はありません。`<head>`の中に`<link rel="stylesheet" href="whatever-you-want.css">`というようなタグを追加するだけでよいのです（CSSの記述を _Elmの中だけで_ 完結させる素敵な方法も用意されていますが、それはまた別の話題です）。

[^1]: 訳注: elm-jpでは日本語でElmについてやりとりできるdiscordを用意していますので、ぜひ[招待リンク](https://discordapp.com/invite/4j2MxCg)から参加して感想をお聞かせください