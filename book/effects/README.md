<!--
# Commands and Subscriptions
-->
# コマンドとサブスクリプション
<!--
The Elm Architecture is neat, but how do you interact with the world?! I want random numbers! What time is it? How do I send HTTP requests?
-->
Elmアーキテクチャはスッキリとしていますが、どのように外界とのやり取りをするのでしょうか？乱数が欲しい！今は何時？HTTPリクエストを送信するには？
<!--
Things are not exactly like languages like JavaScript, Python, etc. So we need to start with some facts about how Elm actually works.
-->

物事はJavaScriptやPython、その他の言語等と全く同じようには運びません。まずはどのようにElmが実際に動作するのかという仕組みから追って行かなければなりません。

<!--
## `sandbox`
-->
## `sandbox`
<!--
I have not made a big deal about it, but so far all of our programs were created with [`Browser.sandbox`][sandbox]. We gave an initial `Model` and describe how to `update` and `view` it.
-->
今まで多くは触れませんでしたが、これまでのプログラムは全て [`Browser.sandbox`][sandbox] から生成されていました。初期値としての`Model`を与え、どのようにそれを`update`して`view`するのかを説明してきました。
<!--
You can think of `Browser.sandbox` as setting up a system like this:
-->
`Browser.sandbox`の場合、システムを次のように構成すると考えることが出来ます:

![](diagrams/sandbox.svg)

<!--
We get to stay in the world of Elm, writing functions and transforming data. This hooks up to Elm&rsquo;s **runtime system**. The runtime system figures out how to render `Html` efficiently. Did anything change? What is the minimal DOM modification needed? It also figures out when someone clicks a button or types into a text field. It turns that into a `Msg` and feeds it into your Elm code.
-->

Elmの世界に留まるようになると、関数を書いたり、データを変換する事により、Elmの **ランタイムシステム** と繋がります。このランタイムシステムが`Html`をどのように効率的に描画するのかを解決してくれます。なんらかの変化があった際に必要とされる最小限のDOMの変更はなにか？また、誰かがボタンをクリックした時や、テキストフィールドになにかをタイプした際にも、同様に解決し`Msg`に変換した上であなたのElmコードに送り出します。

<!--
By cleanly separating out all the DOM manipulation, it becomes possible to use extremely aggressive optimizations. So Elm&rsquo;s runtime system is a big part of why Elm is [one of the fastest options available][benchmark].
-->
全てのDOM操作を明確に分離することにより、極めて積極的な最適化が実現可能となります。それがElmのランタイムシステムが[利用可能なフレームワークの中で最速の選択肢の一つ][benchmark]となる大きな理由です。

[sandbox]: https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox
[benchmark]: http://elm-lang.org/blog/blazing-fast-html-round-two

<!--
## `element`
-->
## `element`
<!--
In the next few examples, we will instead create programs with [`Browser.element`][element]. This will introduce the ideas of **commands** and **subscriptions** which will allow us to interact more with the outside world.
-->
続くいくつかの例では[`Browser.element`][element]を使ってプログラムを作ります。ここでは **コマンド** と **サブスクリプション** の概念を導入することにより、さらなる外の世界とのやり取りを可能とします。
<!--
You can think of `Browser.element` as setting up a system like this:
-->
`Browser.element`ではシステムを下記のように構成すると考えることが出来ます。

![](diagrams/element.svg)


<!--
Like before, you get to program in the nice Elm world, but these `Cmd` and `Sub` values can tell the runtime system to generate random values, ask about the current time, make HTTP requests, etc.
-->
以前と同じように素晴らしいElmの世界の中でプログラムできますが、これらの`Cmd`と`Sub`の値により、ランタイムシステムに対して乱数を生成したり、現在の時刻を尋ねたり、HTTPリクエストを送信するよう指示することができるようになります。
<!--
I think commands and subscriptions make more sense when you start seeing examples, so let&rsquo;s do that!
-->
いくつかの例を見ていくと、コマンドとサブスクリプションについての理解が深まると思いますので、やってみましょう！

[element]: https://package.elm-lang.org/packages/elm/browser/latest/Browser#element

<!--
> **Note 1:** Some readers may be worrying about asset size. &ldquo;A runtime system? That sounds big!&rdquo; It is not. In fact, [Elm assets are exceptionally small](https://elm-lang.org/blog/small-assets-without-the-headache) when compared to React, Angular, Vue, etc.
-->
> **Note 1:** アセットのサイズについて心配する方がいるかもしれません。&ldquo;ランタイムシステムって大きいもんでしょ！&rdquo; いいえ、そんな事はありません。実際には、ReactやAngularそしてVueなどと比べても、[Elmのアセットは非常に小さいのです](https://elm-lang.org/blog/small-assets-without-the-headache)。
>

<!--
> **Note 2:** We are going to use packages from [`package.elm-lang.org`](https://package.elm-lang.org) in the upcoming examples. We have already been working with a couple:
-->
> **Note 2:** 続く例ではパッケージを[`package.elm-lang.org`](https://package.elm-lang.org)から利用していきます。すでにいくつかの物を利用済みです:
>
> - [`elm/core`](https://package.elm-lang.org/packages/elm/core/latest/)
> - [`elm/html`](https://package.elm-lang.org/packages/elm/html/latest/)
<!--
 But now we will start getting into some fancier ones:
-->
> では、次はもっとおもしろいpackageを使って行きましょう：
>
> - [`elm/random`](https://package.elm-lang.org/packages/elm/random/latest/)
> - [`elm/time`](https://package.elm-lang.org/packages/elm/time/latest/)
> - [`elm/json`](https://package.elm-lang.org/packages/elm/json/latest/)
> - [`elm/http`](https://package.elm-lang.org/packages/elm/http/latest/)
<!--
> There are tons of other packages on `package.elm-lang.org` though! So when you are making your own Elm programs locally, it will probably involve running some commands like this in the terminal:
-->
>
> その他にも非常に沢山のパッケージが`package.elm-lang.org`に存在します。ローカル環境で自分のElmプログラムを作る際には、次のようなコマンドをターミナル上で実行することになるでしょう：
>
>```bash
elm init
elm install elm/random
elm install elm/http
```
<!--
>
> That would set up an `elm.json` file with `elm/random` and `elm/http` as dependencies.
-->
>
> これにより、`elm.json`内に`elm/random`と`elm/http`を依存関係としてセットします。
<!--
> I will be mentioning the packages we are using in the following examples, so I hope this gives some context on what that is all about!
-->
>
> 続く例の中でも使用するパッケージに付いて触れますので、これらがどんな役割を果たすか判明するでしょう！
