<!--
# The Elm Architecture
-->

# The Elm Architecture 

<!--
The Elm Architecture is a simple pattern for architecting webapps. It is great for modularity, code reuse, and testing. Ultimately, it makes it easy to create complex web apps that stay healthy as you refactor and add features.
-->

The Elm Architecture は、ウェブアプリケーションを構築するためのシンプルなパターンです。モジュール性やコードの再利用性、テストのしやすさなどに優れています。つまり、複雑なアプリケーションを作るときでも、安心してリファクタリングしたり機能を追加できるようにしてくれるのです。

<!--
This architecture seems to emerge naturally in Elm. Rather than someone “inventing” it, early Elm programmers kept discovering the same basic patterns in their code. Teams have found this particularly nice for onboarding new developers. Code just turns out well-architected. It is kind of spooky.
-->

このアーキテクチャは、Elmの歴史の中から自然に生まれてきました。誰かがこれを「発明した」というより、コードの中にこの基本的なパターンが常にあることを初期のElmプログラマが発見したということです。チームで開発している人たちも、The Elm Architecture は新人開発者の教育に特に適していると考えています。The Elm Architecture に従えば、それだけでコードはより良く設計されるようになります。このように、気がついたらおばけみたいにすっと現れていたパターンなのです。

<!--
So The Elm Architecture is *easy* in Elm, but it is useful in any front-end project. In fact, projects like Redux have been inspired by The Elm Architecture, so you may have already seen derivatives of this pattern. Point is, even if you ultimately cannot use Elm at work yet, you will get a lot out of using Elm and internalizing this pattern.
-->

そして、The Elm Architecture はElmでは「簡単」ですが、どんなフロントエンドプロジェクトにおいても便利なものです。実のところReduxのようなプロジェクトはThe Elm Architecture に着想を得て作られたものなので、このパターンの派生をすでに見たことがある人もいるかもしれません。もしまだ実際のプロジェクトでElmを使うことができないとしても、Elmを使いこのパターンを修得することで得るものは多いでしょう。

[Elm]: https://elm-lang.org/
[TodoMVC]: https://github.com/evancz/elm-todomvc
[dreamwriter]: https://github.com/rtfeldman/dreamwriter#dreamwriter
[NoRedInk]: https://www.noredink.com/
[CircuitHub]: https://www.circuithub.com/
[Pivotal]: https://www.pivotaltracker.com/blog/Elm-pivotal-tracker/


<!--
## The Basic Pattern
-->

## 基本的なパターン

<!--
The logic of every Elm program will break up into three cleanly separated parts:
-->

どんなElmプログラムも、次の３つの要素に明確に分割することができるでしょう。

<!--
  * **Model** &mdash; the state of your application
  * **Update** &mdash; a way to update your state
  * **View** &mdash; a way to view your state as HTML
-->

  * **Model** &mdash; アプリケーションの状態
  * **Update** &mdash; 状態を更新する方法
  * **View** &mdash; HTMLとして状態を閲覧する方法

<!--
This pattern is so reliable that I always start with the following skeleton and fill in details for my particular case.
-->

このパターンはとても信頼性が高いので、私はいつも次のような骨組みから始めて、プロジェクトごとの振る舞いに応じて詳細を埋めていくようにしています。

```elm
import Html exposing (..)


-- MODEL

type alias Model = { ... }


-- UPDATE

type Msg = Reset | ...

update : Msg -> Model -> Model
update msg model =
  case msg of
    Reset -> ...
    ...


-- VIEW

view : Model -> Html Msg
view model =
  ...
```

<!--
That is really the essence of The Elm Architecture! We will proceed by filling in this skeleton with increasingly interesting logic.
-->

まさしくこれが The Elm Architecture の本質なのです！　ここからは、面白いロジックでこの骨組みをだんだんと埋めていくことで、説明を進めていきましょう。


<!--
# The Elm Architecture + User Input
-->

# The Elm Architecture  + ユーザ入力

<!--
Your web app is going to need to deal with user input. This section will get you familiar with The Elm Architecture in the context of things like:
-->

ウェブアプリケーションではユーザからの入力を扱う必要があるでしょう。この節では、次のような内容について、The Elm Architecture に慣れるようにしていきます。

<!--
  - Buttons
  - Text Fields
  - Check Boxes
  - Radio Buttons
  - etc.
-->

  - ボタン
  - テキストフィールド
  - チェックボックス
  - ラジオボタン
  - そのほか

<!--
We will go through a few examples that build knowledge gradually, so go in order!
-->

幾つかの例を見ながら徐々に知識を深めていきますので、それではこの順番で進めていきましょう！


<!--
## Follow Along
-->

## 本書を読み進めるためにあたって

<!--
In the last section we used `elm repl` to get comfortable with Elm expressions. In this section, we are switching to creating Elm files of our own. You can do that in [the online editor](https://ellie-app.com/new), or if you have Elm [installed](/install.html), you can follow [these simple instructions](https://github.com/evancz/elm-architecture-tutorial#run-the-examples) to get everything working on your computer!
-->

先ほどの節では、Elmの式に慣れるために`elm repl`を使いました。この章からは、自分自身のElmファイルを作るように切り替えていきます。[オンラインエディタ](https://ellie-app.com/new)でも構いませんが、もしElmの[インストールを済ませた](/install.html)なら、[これらの簡単な指示](https://github.com/evancz/elm-architecture-tutorial#run-the-examples)に従うことで、あなたのコンピュータ上ですべての作業をすることもできます！
