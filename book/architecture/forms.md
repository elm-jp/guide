<!--
# Forms
-->

# フォーム

---

<!--
#### [Clone the code](https://github.com/evancz/elm-architecture-tutorial/) or follow along in the [online editor](https://ellie-app.com/37gWB93n8jJa1).
-->

#### [サンプルコード](https://github.com/evancz/elm-architecture-tutorial/)をダウンロードするか[オンラインエディタ](https://ellie-app.com/37gWB93n8jJa1)で試してください。

---

<!--
Here we will make a rudimentary form. It has a field for your name, a field for your password, and a field to verify that password. We will also do some very simple validation (do the two passwords match?) just because it is simple to add.
-->

ここでは基本的なフォームを作成します。名前、パスワード、パスワード(確認用)のフィールドを持ったフォームです。単に追加するのが簡単なので、パスワードとパスワード(確認用)が単純に一致しているかどうかもチェックします。

<!--
The code is a bit longer in this case, but I still think it is valuable to look through it before you get into the description of what is going on.
-->

今回のコードは少し長いですが、各コードがどう動くかの説明の前に、コードに目を通しておくことは価値があることだと思います。


```elm
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)



-- MAIN


main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
  { name : String
  , password : String
  , passwordAgain : String
  }


init : Model
init =
  Model "" "" ""



-- UPDATE


type Msg
  = Name String
  | Password String
  | PasswordAgain String


update : Msg -> Model -> Model
update msg model =
  case msg of
    Name name ->
      { model | name = name }

    Password password ->
      { model | password = password }

    PasswordAgain password ->
      { model | passwordAgain = password }



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ viewInput "text" "Name" model.name Name
    , viewInput "password" "Password" model.password Password
    , viewInput "password" "Re-enter Password" model.passwordAgain PasswordAgain
    , viewValidation model
    ]


viewInput : String -> String -> String -> (String -> msg) -> Html msg
viewInput t p v toMsg =
  input [ type_ t, placeholder p, value v, onInput toMsg ] []


viewValidation : Model -> Html msg
viewValidation model =
  if model.password == model.passwordAgain then
    div [ style "color" "green" ] [ text "OK" ]
  else
    div [ style "color" "red" ] [ text "Passwords do not match!" ]
```
<!--
This is pretty similar to our [text field example](text_fields.md), just with more fields. Let's walk through how it came to be!
-->
フィールドが複数ある点を除けば、[テキストフィールド](text_fields.md)で紹介したコードによく似ています。どこがどうなっているのか、一つずつ見ていきましょう！

<!--
As always, you start out by guessing at the `Model`. We know there are going to be three text fields, so let's just go with that:
-->
いつものように、モデルを考えることからはじめます。3つテキストフィールドがあるので、こんな感じです。

```elm
type alias Model =
  { name : String
  , password : String
  , passwordAgain : String
  }
```
<!--
Great, seems reasonable. We expect that each of these fields can be changed separately, so our messages should account for each of those scenarios.
-->

とってもいいですね。フィールドごとに値を変更できるようにしたいので、それぞれのシナリオをメッセージで説明します。

```elm
type Msg
  = Name String
  | Password String
  | PasswordAgain String
```
<!--
This means our `update` is pretty mechanical. Just update the relevant field:
-->

このコードを見ると `update`の処理がとても機械的なことがわかります。対応するテキストフィールドを更新するだけです。

```elm
update : Msg -> Model -> Model
update msg model =
  case msg of
    Name name ->
      { model | name = name }

    Password password ->
      { model | password = password }

    PasswordAgain password ->
      { model | passwordAgain = password }
```
<!--
We get a little bit fancier than normal in our `view` though.
-->

ですが、 `view` ではすこし気の利いたことをしています。

```elm
view : Model -> Html Msg
view model =
  div []
    [ viewInput "text" "Name" model.name Name
    , viewInput "password" "Password" model.password Password
    , viewInput "password" "Re-enter Password" model.passwordAgain PasswordAgain
    , viewValidation model
    ]
```
<!--
We start by creating a `<div>` with four child nodes. But instead of using functions from `elm/html` directly, we call Elm functions to make our code more concise! We start with three calls to `viewInput`:
-->

まず、4つの子ノードを持つ `<div>`を作ります。 ただし、直接 `elm/html`の関数を使う代わりに、`viewInput`を三回呼び出します。これはコードをより簡潔にするためのElm関数です。

```elm
viewInput : String -> String -> String -> (String -> msg) -> Html msg
viewInput t p v toMsg =
  input [ type_ t, placeholder p, value v, onInput toMsg ] []
```
<!--
So `viewInput "text" "Name" model.name Name` can create a node like `<input type="text" placeholder="Name" value="Bill">`. That node will also send messages like `Name "Billy"` to `update` on user input.
-->
`viewInput "text" "Name" model.name Name`と書くことでノードを作れます。これは、HTMLで `<input type="text" placeholder="Name" value="Bill">` と書くのと同じようなものです。このノードはユーザーの入力時に、 `Name "Billy"` のようなメッセージを `update` に送ります。

<!--
The fourth entry is more interesting. It is a call to `viewValidation`:
-->

4つ目のノードはもっと面白いです。 `viewValidation` の呼び出しです。

```elm
viewValidation : Model -> Html msg
viewValidation model =
  if model.password == model.passwordAgain then
    div [ style "color" "green" ] [ text "OK" ]
  else
    div [ style "color" "red" ] [ text "Passwords do not match!" ]
```
<!--
This function first compares the two passwords. If they match, you get green text and a positive message. If they do not match, you get red text and a helpful message.
-->

この関数はまず、二つのパスワードを比較します。一致すると、緑色の文字でポジティブなメッセージを表示します。一致しない場合は、赤色の文字で有用なメッセージを表示します。

<!--
These helper functions begin to show the benefits of having our HTML library be normal Elm code. We _could_ put all that code into our `view`, but making helper functions is totally normal in Elm, even in view code. Is this getting hard to understand? Maybe I can break out a helper function!
-->

こうした補助関数をみると、HTMLのシンタックスをそのまま用いるのではなく、現状のように通常のElmコードでHTMLを表現できるHTMLライブラリの利点がわかります。すべてのコードをベタ書きでviewに書くことももちろんできますが、Elmにおいて補助関数をつくって部品をくくりだすことはいたって普通のことですので、view関数のコードだろうが補助関数を使えば良いんです。理解するのが難しくなってきた？そしたらこのあたりの説明も、全部ここにベタ書きするんじゃなくて「補助関数」として別の節に分けて書いたほうが良いのかもしれないですね！


<!--
> **Exercises:** One cool thing about breaking `viewValidation` out is that it is pretty easy to augment. If you are messing with the code as you read through this (as you should be!) you should try to:
>
>  - Check that the password is longer than 8 characters.
>  - Make sure the password contains upper case, lower case, and numeric characters.
>  - Add an additional field for `age` and check that it is a number.
>  - Add a `Submit` button. Only show errors *after* it has been pressed.
>
> Be sure to use the helpers in the [`String`](https://package.elm-lang.org/packages/elm/core/latest/String) module if you try any of these! Also, we need to learn more before we start talking to servers, so make sure you read all the way to the HTTP part before trying that. It will be significantly easier with proper guidance!
-->

> **練習問題:** `viewValidation`を分割する利点は、簡単に機能を追加できることです。もし、これを読みながらコードいじっているなら(なるべくそうしましょう！)次の機能を追加してみてください。
>
> - パスワードが8文字より長いか確認する。
> - パスワードが大文字、小文字、数字を含むか確認する。
> - `年齢`のフィールドを追加して、入力値が数字かどうかを確認する。
> - `提出`ボタンを追加する。ボタンが押された *後* 、エラーがあれば表示する。
>
>上記を試す際は、 [`String`](https://package.elm-lang.org/packages/elm/core/latest/String) モジュールを必ず使用しましょう。また、サーバーとの通信を行う前にまだ学ぶことがあります。試すのはHTTPのパートまで読んでからにしましょう。適切なガイダンスのおかげで、かなり簡単なはずです。

<!--
> **Note:** It seems like efforts to make generic validation libraries have not been too successful. I think the problem is that the checks are usually best captured by normal Elm functions. Take some args, give back a `Bool` or `Maybe`. E.g. Why use a library to check if two strings are equal? So as far as we know, the simplest code comes from writing the logic for your particular scenario without any special extras. So definitely give that a shot before deciding you need something more complex!
-->

> **Note:** 包括的なバリデーションライブラリを作成するのはおすすめしません。こうしたチェックは、通常のElm関数によって実現可能なものがほとんどです。いくつかの引数をとって、`Bool` か `Maybe` を返せばいいのです。例えば、二つの文字列が等しいかどうかをチェックするのに、ライブラリを使うのはなぜですか？あなたが実現したいシナリオのロジックを記述する場合、特別な拡張ライブラリを使わないもっと単純な書き方があるはずです。複雑な方法が必要だと判断する前に、それより単純な他の方法が無いか試してみてください！
