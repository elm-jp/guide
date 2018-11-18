<!--
# JavaScript Interop
-->
# JavaScriptとの相互運用

<!--
We have seen quite a bit of Elm so far! We learned **The Elm Architecture**. We learned about **types**. We learned how to interact with the outside world through **commands** and **subscriptions**. Things are going well!
-->
ここまでElmについてのたくさんの事柄を見てきました。**The Elm Architecture**を学び、**型**について学び、**コマンド**と**サブスクリプション**を使って外の世界とやり取りする方法を学びました。いい調子です！

<!--
But what happens when you need to do something in JavaScript? Maybe there is a JavaScript library you absolutely need? Maybe you want to embed Elm in an existing JavaScript application? Etc. This chapter will outline all the available options: flags, ports, and custom elements.
-->
では、JavaScriptを使って何かしたくなったとしたらどうでしょう？どうしても必要なJavaScriptライブラリがあったとしたら？Elmを既存のJavaScriptアプリケーションに組み込みたいとしたら？この章では、そのためにElmが提供する選択肢を取り上げて、要点を解説します: フラグ、ポート、そしてカスタムエレメンツです。

<!--
Whichever one you use, the first step is to initialize your Elm program.
-->
どれを使うとしても、最初の一歩はElmプログラムを初期化することです。


<!--
## Initializing Elm Programs
-->
## Elmプログラムの初期化

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
This produces a JavaScript file that exposes an `Elm.Main.init` function. So once you have `main.js` you can write your own HTML file that does whatever you want! For example:
-->
こうすれば、`Elm.Main.init`関数を公開するJavaScriptファイルが生成されます。`main.js`ファイルが手に入ったので、自分で好きなようにHTMLファイルを書くことができます！例えばこうです:


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
  <div id="elm"></div>
  <script>
  var app = Elm.Main.init({
    node: document.getElementById('elm')
  });
  </script>
</body>
</html>
```

<!--
I want to call attention to a couple important lines here.
-->
特に注意してほしい重要な行がいくつかあります。

<!--
**First**, in the `<head>` of the document, you can load whatever you want! In our little example we  loaded a CSS file called `whatever-you-want.css`:
-->
**最初に**、ドキュメントの`<head>`の中では、なんでも好きなものを読み込むことができます！この小さな例では`whatever-you-want.css`というCSSファイルを読み込んでいます:

```html
<link rel="stylesheet" href="whatever-you-want.css">
```

<!--
Maybe you write CSS by hand. Maybe you generate it somehow. Whatever the case, you can load it and use it in Elm. (There are some great options for specifying your CSS all _within_ Elm as well, but that is a whole other topic!)
-->
あなたはCSSを手で書くかもしれませんし、他の方法で生成するのかもしれません。何にせよ、CSSを読み込んでElmで使うことができます（_すべての_ CSSをElmで記述する素敵な方法も用意されていますが、それはまた別の話題です）。

<!--
**Second**, we have a line to load our compiled Elm code:
-->
**第二に**、コンパイルしたElmコードを読み込んでいるのは次の行です:

```html
<script src="main.js"></script>
```

<!--
This will make an object called `Elm` available in global scope. So if you compile an Elm module called `Main`, you will have `Elm.Main` in JavaScript. If you compile an Elm module named `Home`, you will have `Elm.Home` in JavaScript. Etc.
-->
こうすることで、グローバルスコープから`Elm`という名前のオブジェクトを利用できるようになります。`Main`というElmモジュールは、コンパイルすると、JavaScriptでは`Elm.Main`になります。Elmモジュールの名前が`Home`なら、JavaScriptからは`Elm.Home`として扱う、といった具合です。

<!--
**Third**, in the `<body>` of the document, we run a little bit of JavaScript code to initialize our Elm program:
-->
**第三に**、ドキュメントの`<body>`の中で、ほんの少しだけJavaScriptコードを走らせて、Elmプログラムを初期化します。

```html
<div id="elm"></div>
<script>
var app = Elm.Main.init({
  node: document.getElementById('elm')
});
</script>
```

<!--
We create an empty `<div>`. We want our Elm program to take over that node entirely. Maybe it is within a larger application, surrounded by tons of other stuff? That is fine!
-->
空の`<div>`要素を作りました。このノードの制御は、Elmプログラムに完全に任せたいところです。これがもっと大きなアプリケーションで、ほかのたくさんの要素に囲まれていたとしても、問題ありません！

<!--
The `<script>` tag then inializes our Elm program. We grab the `node` we want to take over, and give it to `Elm.Main.init` which starts our program.
-->
それから、`<script>`タグでElmプログラムを初期化しています。Elmに任せたいノードを取得し、プログラムを開始する`Elm.Main.init`関数に渡します。

<!--
Now that we can embed Elm programs in an HTML document, it is time to start exploring the three interop options: flags, ports, and web components!
-->
これでHTMLドキュメントの中にElmプログラムを組み込むことができました。いよいよJavaScriptとやり取りする3つの方法、フラグ、ポート、Webコンポーネントについて見ていきましょう！
