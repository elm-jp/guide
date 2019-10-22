<!--
# An Introduction to Elm
-->
# Elm について (はじめに)

<!--
**Elm is a functional language that compiles to JavaScript.** It helps you make websites and web apps. It has a strong emphasis on simplicity and quality tooling.
-->
<!-- TODO -->
<!-- 元の文章：
**Elm は JavaScript にコンパイルできる関数型プログラミング言語です。** ウェブサイトやウェブアプリケーションを作るツールという面では React のようなプロジェクトだと言えます。 Elm はシンプルであること、簡単に使えること、高品質であることを大切にしています。
-->
**Elm is a functional language that compiles to JavaScript.** It helps you make websites and web apps. It has a strong emphasis on simplicity and quality tooling.

<!--
This guide will:

  - Teach you the fundamentals of programming in Elm.
  - Show you how to make interactive apps with **The Elm Architecture**.
  - Emphasize principles and patterns that generalize to programming in any language.
-->
このガイドは以下のことを目指します。

  - Elm によるプログラミングの基礎を身に着けてもらうこと
  - **The Elm Architecture** を使ってインタラクティブなアプリケーションを作る方法をお見せすること
  - あらゆる言語で使える法則やパターンを重視すること

<!--
By the end I hope you will not only be able to create great web apps in Elm, but also understand the core ideas and patterns that make Elm nice to use.
-->
最終的にはあなたには Elm を使って素晴らしいウェブアプリをただ作れるようになるだけでなく、Elm をうまく使えるようになるための核となるアイディアやパターンを理解してもらえればと思います。

<!--
If you are on the fence, I can safely guarantee that if you give Elm a shot and actually make a project in it, you will end up writing better JavaScript code. The ideas transfer pretty easily!
-->
Elm に対して様子見の立場である方も、Elm をちょっと試してみて実際に何かプロジェクトで使ってみると JavaScript のコードがいままでよりもうまく書けるようになっているはずです。 Elm で得られた知見はいろんなところで簡単に役立てることができます。

<!--
## A Quick Sample
-->

## Elm を知るためのサンプルコード

<!--
Here is a little program that lets you increment and decrement a number:
-->
<!-- TODO -->
<!-- 元の文章：
以下のコードは[カウンターのサンプル](https://elm-lang.org/examples/buttons)です。
このコードは、カウンターをインクリメント(+1)したりデクリメント(-1)したりするものです。
-->
Here is a little program that lets you increment and decrement a number:

```elm
import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

main =
  Browser.sandbox { init = 0, update = update, view = view }

type Msg = Increment | Decrement

update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

<!--
Try it out in the online editor [here](https://elm-lang.org/examples/buttons).

The code can definitely look unfamiliar at first, so we will get into how this example works soon!
-->
<!-- TODO -->
Try it out in the online editor [here](https://elm-lang.org/examples/buttons).

The code can definitely look unfamiliar at first, so we will get into how this example works soon!

<!--
## Why a functional *language*?
-->
## なぜ関数型を採用しているか

<!--
You can get some benefits from programming in a functional *style*, but there are some things you can only get from a functional *language* like Elm:

  - No runtime errors in practice.
  - Friendly error messages.
  - Reliable refactoring.
  - Automatically enforced semantic versioning for all Elm packages.
-->
<!-- TODO -->
<!-- 元の文章：
まず「関数型プログラミング」について今までに聞いた話をすべて忘れてください。
なんだかよくわからない用語を使ったり、今まで見たことないような特殊な考え方だったり、実際にアプリケーションを作ろうと思ってもまともなツールがそろってなかったり...
反吐が出ますね。

Elm はもっと実用的な以下のものを実現するために手段として関数型の考え方を使っているだけです。

  - 実用上ランタイムエラーがでないし、`null`もないし、`undefined`が関数だなんて話はありえません
  - とてもわかりやすい親切なエラーメッセージによってより素早くあなたのコードに機能を追加できます
  - コードの規模が大きくなっても全体の設計が壊れることがありません
  - すべてのElmパッケージにおいて、決められたルールに則って自動的にバージョン番号が付与されています
-->
You can get some benefits from programming in a functional *style*, but there are some things you can only get from a functional *language* like Elm:

  - No runtime errors in practice.
  - Friendly error messages.
  - Reliable refactoring.
  - Automatically enforced semantic versioning for all Elm packages.

<!--
No combination of JS libraries can give you all of these guarantees. They come from the design of the language itself! And thanks to these guarantees, it is quite common for Elm programmers to say they never felt so **confident** while programming. Confident to add features quickly. Confident to refactor thousands of lines. But without the background anxiety that you missed something important!
-->
<!-- TODO -->
<!-- 元の文章：
JSをそのまま使ったらどんなライブラリを使って工夫してもこれらを実現することはできませんが、ElmならJSという言語の枠に縛られずに簡単に実現できます。
こんな素晴らしいことが可能になるのは、Elmが「静的型付関数型言語」という40年以上の歴史を持つ研究成果を活用しているからにほかなりません。
そのためElmにとって、関数型というのは目的ではなく手段であり、こういった現実的なメリットを得るという目的のために関数型言語を採用しているに過ぎません。
もちろん関数型言語という少し見慣れないパラダイムを使っているElmを学ぶには時間が少しかかりますが、このガイドを読むのに使うたった数時間の投資に十分見合うだけの価値をもたらしてくれます。
-->
No combination of JS libraries can give you all of these guarantees. They come from the design of the language itself! And thanks to these guarantees, it is quite common for Elm programmers to say they never felt so **confident** while programming. Confident to add features quickly. Confident to refactor thousands of lines. But without the background anxiety that you missed something important!

<!--
I have put a huge emphasis on making Elm easy to learn and use, so all I ask is that you give Elm a shot and see what you think. I hope you will be pleasantly surprised!
-->
作者のEvanはElmを簡単に学んで使いはじめられるように多大な注力をしているので、Elmを少し試してみてぜひあなたの感想を教えてください。
(訳注: elm-jpでは日本語でElmについてやりとりできるdiscordを用意していますので、ぜひ[招待リンク](https://discordapp.com/invite/4j2MxCg)から参加して感想をお聞かせください)

Elmによって楽しく新鮮な感動を覚えていただけると幸いです。
