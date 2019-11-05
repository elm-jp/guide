<!--
# An Introduction to Elm
-->
# Elm について (はじめに)

<!--
**Elm is a functional language that compiles to JavaScript.** It helps you make websites and web apps. It has a strong emphasis on simplicity and quality tooling.
-->
**Elm は JavaScript にコンパイルできる関数型プログラミング言語です。** ウェブサイトやウェブアプリケーションを作るのに役立ちます。Elm はシンプルであること、簡単に使えること、高品質であることを大切にしています。

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
以下のコードは、数をインクリメント(+1)したりデクリメント(-1)したりする小さなプログラムです。

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
[こちらの](https://elm-lang.org/examples/buttons)オンラインエディターで試してください。

このコードは、はじめはきっと見慣れないものでしょうから、どんなことをしているかをこのあとすぐに説明します！

<!--
## Why a functional *language*?
-->
## なぜ関数型*言語*を採用しているか

<!--
You can get some benefits from programming in a functional *style*, but there are some things you can only get from a functional *language* like Elm:

  - No runtime errors in practice.
  - Friendly error messages.
  - Reliable refactoring.
  - Automatically enforced semantic versioning for all Elm packages.
-->
関数型*スタイル*でプログラミングすることで、いくらかの恩恵を受けられますが、Elmのような関数型*言語*でしか得られないものがあります。

  - 実用上ランタイムエラーがでない
  - とてもわかりやすい親切なエラーメッセージ
  - 信頼性の高いリファクタリング
  - すべてのElmパッケージにおいて、決められたルールに則って自動的にバージョン番号が付与されている

<!--
No combination of JS libraries can give you all of these guarantees. They come from the design of the language itself! And thanks to these guarantees, it is quite common for Elm programmers to say they never felt so **confident** while programming. Confident to add features quickly. Confident to refactor thousands of lines. But without the background anxiety that you missed something important!
-->
JSをそのまま使ったら、どんなライブラリを使って工夫しても、これらすべてを実現できるとは言いがたいでしょう。これらは言語自体の設計によるものです！これらが保証されているおかげで、今までこんなにも**自信**を持ってプログラミングできたことはない、と言うことがElmプログラマーには珍しくありません。自信を持って素早く機能を追加しますし、自信を持って数千行をリファクタリングします。それでも、何か大事なところを見落とす心配はないのです！

<!--
I have put a huge emphasis on making Elm easy to learn and use, so all I ask is that you give Elm a shot and see what you think. I hope you will be pleasantly surprised!
-->
作者のEvanはElmを簡単に学んで使いはじめられるように多大な注力をしているので、Elmを少し試してみてぜひあなたの感想を教えてください。
(訳注: elm-jpでは日本語でElmについてやりとりできるdiscordを用意していますので、ぜひ[招待リンク](https://discordapp.com/invite/4j2MxCg)から参加して感想をお聞かせください)

Elmによって楽しく新鮮な感動を覚えていただけると幸いです。
