<!--
# The Elm Architecture
-->

# The Elm Architecture 

<!--
The Elm Architecture is a pattern for architecting interactive programs, like webapps and games.
-->

The Elm Architecture は、ウェブアプリケーションやゲームのような、対話的なプログラムを設計するためのパターンです。

<!--
This architecture seems to emerge naturally in Elm. Rather than someone inventing it, early Elm programmers kept discovering the same basic patterns in their code. It was kind of spooky to see people ending up with well-architected code without planning ahead!
-->

このアーキテクチャは、Elmの歴史の中から自然に生まれてきました。誰かがこれを「発明した」というより、コードの中にこの基本的なパターンが常にあることを初期のElmプログラマが発見したということです。示し合わせたわけでもないのに、誰でもコードをよりよく設計できるパターンが現れてくるなんて、なんだかちょっと不気味ですね！ 

<!--
So The Elm Architecture is easy in Elm, but it is useful in any front-end project. In fact, projects like Redux have been inspired by The Elm Architecture, so you may have already seen derivatives of this pattern. Point is, even if you ultimately cannot use Elm at work yet, you will get a lot out of using Elm and internalizing this pattern.
-->

そして、The Elm Architecture はElmでは簡単ですが、どんなフロントエンドプロジェクトにおいても便利なものです。実のところReduxのようなプロジェクトはThe Elm Architecture に着想を得て作られたものなので、このパターンの派生をすでに見たことがある人もいるかもしれません。もしまだ実際のプロジェクトでElmを使うことができないとしても、Elmを使いこのパターンを修得することで得るものは多いでしょう。


<!--
## The Basic Pattern
-->

## 基本的なパターン

<!--
Elm programs always look something like this:
-->

Elm のプログラムが動く仕組みを図にすると、こんな風になります。

<!--
![Diagram of The Elm Architecture](buttons.svg)
-->

![The Elm Architectureの図](buttons.svg)

<!--
The Elm program produces HTML to show on screen, and then the computer sends back messages of what is going on. "They clicked a button!"
-->

Elm が画面に表示するためのHTMLを出力し、コンピュータは画面の中で起きたこと、例えば「ボタンがクリックされたよ！」というようなメッセージを Elm へ送り返します。

<!--
What happens within the Elm program though? It always breaks into three parts:
-->

さて、Elm プログラムの中では何が起きているのでしょうか？ Elm では、プログラムは必ず3つのパーツに分解できます。

<!--
  * **Model** &mdash; the state of your application
  * **View** &mdash; a way to turn your state into HTML
  * **Update** &mdash; a way to update your state based on messages
-->

  * **Model** &mdash; アプリケーションの状態
  * **View** &mdash; 状態を HTML に変換する方法
  * **Update** &mdash; メッセージを使って状態を更新する方法

<!--
These three concepts are the core of **The Elm Architecture**.
-->

この3つのコンセプトこそ、**The Elm Architecture** の核心なのです。

<!--
The next few examples are going to show how to use this pattern for user input, like buttons and text fields. It will make this much more concrete!
-->

次の節からは、ボタンやテキストフィールドといったユーザー入力を例にして、The Elm Architecture の使い方を見ていきます。これらの例を見れば、The Elm Architecture のコンセプトをしっかりと理解できるはずです！


<!--
## Follow Along
-->

## 本書を読み進めるためにあたって

<!--
The examples are all available in the online editor:

[![online editor](try.png)](https://elm-lang.org/try)

This editor shows hints in the top left corner:
-->

この章に出てくる例は、どれもオンラインエディタで閲覧、編集することができます。

[![オンラインエディタ](try.png)](https://elm-lang.org/try)

エディタの画面では、左上にヒントが表示されています。

<video id="hints-video" width="360" height="180" autoplay loop style="margin: 0.55em 0 1em 2em;" onclick="var v = document.getElementById('hints-video'); v.paused ? (v.play(), v.style.opacity = 1) : (v.pause(), v.style.opacity = 0.5)">
  <source src="hints.mp4" type="video/mp4">
</video>

<!--
Be sure to try out the hints if you run into something confusing!
-->

何かわからなくなってしまったときは、忘れずにヒントを見てみましょう！
