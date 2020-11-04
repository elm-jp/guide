<!--
# Forms
-->

# フォーム

<!--
Now we will make a rudimentary form. It has a field for your name, a field for your password, and a field to verify that password. We will also do some very simple validation to check if the passwords match.
-->
<!-- TODO -->
Now we will make a rudimentary form. It has a field for your name, a field for your password, and a field to verify that password. We will also do some very simple validation to check if the passwords match.

<!--
I included the full program below. Click the blue "Edit" button to mess with it in the online editor. Try introducing a typo to see some error messages. Try misspelling a record field like `password` or a function like `placeholder`. **Click the blue button now!**
-->
<!-- TODO -->
I included the full program below. Click the blue "Edit" button to mess with it in the online editor. Try introducing a typo to see some error messages. Try misspelling a record field like `password` or a function like `placeholder`. **Click the blue button now!**

<div class="edit-link"><a href="https://elm-lang.org/examples/forms">Edit</a></div>

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
This is pretty similar to our [text field example](text_fields.md) but with more fields.
-->
<!-- TODO -->
<!-- 元の文章：
フィールドが複数ある点を除けば、[テキストフィールド](text_fields.md)で紹介したコードによく似ています。どこがどうなっているのか、一つずつ見ていきましょう！
-->
This is pretty similar to our [text field example](text_fields.md) but with more fields.

# Model

<!--
I always start out by guessing at the `Model`. We know there are going to be three text fields, so let's just go with that:
-->
<!-- TODO -->
<!-- 元の文章：
いつものように、モデルを考えることからはじめます。 3つのテキストフィールドが作られることが分かっているので、このようにします。
-->
I always start out by guessing at the `Model`. We know there are going to be three text fields, so let's just go with that:

```elm
type alias Model =
  { name : String
  , password : String
  , passwordAgain : String
  }
```

<!--
I usually try to start with a minimal model, maybe with just one field. I then attempt to write the `view` and `update` functions. That often reveals that I need to add more to my `Model`. Building the model gradually like this means I can have a working program through the development process. It may not have all the features yet, but it is getting there!
-->
<!-- TODO -->
I usually try to start with a minimal model, maybe with just one field. I then attempt to write the `view` and `update` functions. That often reveals that I need to add more to my `Model`. Building the model gradually like this means I can have a working program through the development process. It may not have all the features yet, but it is getting there!


## Update

<!--
Sometimes you have a pretty good idea of what the basic update code will look like. We know we need to be able to change our three fields, so we need messages for each case.
-->
<!-- TODO -->
Sometimes you have a pretty good idea of what the basic update code will look like. We know we need to be able to change our three fields, so we need messages for each case.

```elm
type Msg
  = Name String
  | Password String
  | PasswordAgain String
```

<!--
This means our `update` needs a case for all three variations:
-->
<!-- TODO -->
This means our `update` needs a case for all three variations:

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
Each case uses the record update syntax to make sure the appropriate field is transformed. This is similar to the previous example, except with more cases.
-->
<!-- TODO -->
Each case uses the record update syntax to make sure the appropriate field is transformed. This is similar to the previous example, except with more cases.

<!--
We get a little bit fancier than normal in our `view` though.
-->
ですが、 `view` ではすこし気の利いたことをしています。


## View

<!--
This `view` function is using **helper functions** to make things a bit more organized:
-->
<!-- TODO -->
This `view` function is using **helper functions** to make things a bit more organized:

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
In previous examples we were using `input` and `div` directly. Why did we stop?
-->
<!-- TODO -->
In previous examples we were using `input` and `div` directly. Why did we stop?

<!--
The neat thing about HTML in Elm is that `input` and `div` are just normal functions. They take (1) a list of attributes and (2) a list of child nodes. **Since we are using normal Elm functions, we have the full power of Elm to help us build our views!** We can refactor repetitive code out into customized helper functions. That is exactly what we are doing here!
-->
<!-- TODO -->
The neat thing about HTML in Elm is that `input` and `div` are just normal functions. They take (1) a list of attributes and (2) a list of child nodes. **Since we are using normal Elm functions, we have the full power of Elm to help us build our views!** We can refactor repetitive code out into customized helper functions. That is exactly what we are doing here!

<!--
So our `view` function has three calls to `viewInput`:
-->
<!-- TODO -->
So our `view` function has three calls to `viewInput`:

```elm
viewInput : String -> String -> String -> (String -> msg) -> Html msg
viewInput t p v toMsg =
  input [ type_ t, placeholder p, value v, onInput toMsg ] []
```

<!--
This means that writing `viewInput "text" "Name" "Bill" Name` in Elm would turn into an HTML value like `<input type="text" placeholder="Name" value="Bill">` when shown on screen.
-->
<!-- TODO -->
This means that writing `viewInput "text" "Name" "Bill" Name` in Elm would turn into an HTML value like `<input type="text" placeholder="Name" value="Bill">` when shown on screen.

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
    -- 訳注: "Passwords do not match!" は "パスワードが一致しません!" の意味です。
    div [ style "color" "red" ] [ text "Passwords do not match!" ]
```
<!--
This function first compares the two passwords. If they match, you get green text and a positive message. If they do not match, you get red text and a helpful message.
-->

この関数はまず、二つのパスワードを比較します。一致すると、緑色の文字で入力に問題がないことを示すメッセージを表示します。一方、一致しない場合は赤色の文字でエラーを修正するために役立つメッセージを表示します。

<!--
These helper functions begin to show the benefits of having our HTML library be normal Elm code. We _could_ put all that code into our `view`, but making helper functions is totally normal in Elm, even in view code. "Is this getting hard to understand? Maybe I can break out a helper function!"
-->
<!-- TODO -->
<!-- 元の文章：
こうした補助関数をみると、HTMLのシンタックスをそのまま用いるのではなく、現状のように通常のElmコードでHTMLを表現できるHTMLライブラリの利点がわかります。すべてのコードをベタ書きでviewに書くことももちろんできますが、Elmにおいて補助関数をつくって部品をくくりだすことはいたって普通のことですので、view関数のコードだろうが補助関数を使えば良いんです。理解するのが難しくなってきた？そしたらこのあたりの説明も、全部ここにベタ書きするんじゃなくて「補助関数」として別の節に分けて書いたほうが良いのかもしれないですね！
-->
These helper functions begin to show the benefits of having our HTML library be normal Elm code. We _could_ put all that code into our `view`, but making helper functions is totally normal in Elm, even in view code. "Is this getting hard to understand? Maybe I can break out a helper function!"

<!--
> **Exercises:** Go look at this example in the online editor [here](https://elm-lang.org/examples/forms). Try to add the following features to the `viewValidation` helper function:
-->
<!-- TODO -->
<!-- 元の文章：
> **練習問題:** `viewValidation`を分割する利点は、簡単に機能を追加できることです。もし、これを読みながらコードいじっているなら(なるべくそうしましょう！)次の機能を追加してみてください。
-->
> **Exercises:** Go look at this example in the online editor [here](https://elm-lang.org/examples/forms). Try to add the following features to the `viewValidation` helper function:
>
<!--
>  - Check that the password is longer than 8 characters.
>  - Make sure the password contains upper case, lower case, and numeric characters.
-->
> - パスワードが8文字より長いか確認する。
> - パスワードが大文字、小文字、数字を含むか確認する。
>
<!--
> Use the functions from the [`String`](https://package.elm-lang.org/packages/elm/core/latest/String) module for these exercises!
-->
<!-- TODO -->
<!-- 元の文章：
>上記を試す際は、 [`String`](https://package.elm-lang.org/packages/elm/core/latest/String) モジュールに含まれる補助関数を必ず使用しましょう！ また、サーバーとの通信を行う前にまだ学ぶことがあります。試すのはHTTPのパートまで読んでからにしましょう。適切に順を追って説明していくので、かなり簡単になるはずです。
-->
> Use the functions from the [`String`](https://package.elm-lang.org/packages/elm/core/latest/String) module for these exercises!
>
<!--
> **Warning:** We need to learn a lot more before we start sending HTTP requests. Keep reading all the way to the section on HTTP before trying it yourself. It will be significantly easier with proper guidance!
-->
<!-- TODO -->
> **Warning:** We need to learn a lot more before we start sending HTTP requests. Keep reading all the way to the section on HTTP before trying it yourself. It will be significantly easier with proper guidance!
>
<!--
> **Note:** It seems like efforts to make generic validation libraries have not been too successful. I think the problem is that the checks are usually best captured by normal Elm functions. Take some args, give back a `Bool` or `Maybe`. E.g. Why use a library to check if two strings are equal? So as far as we know, the simplest code comes from writing the logic for your particular scenario without any special extras. So definitely give that a shot before deciding you need something more complex!
-->

> **Note:** 入力の検証を行うための汎用的なライブラリを作っても、苦労の割には大した結果を得られないでしょう。そんなライブラリを作らなくても、こうしたチェックはElmの通常の関数を使うだけで実現できる場合がほとんどだと思います。いくつかの引数をとって、`Bool` か `Maybe` を返せばいいのです。例えば、2つの文字列が等しいかどうかをチェックするのに、あえてライブラリを使う必要なんてあるんでしょうか？ 我々が知る限りでは、特別に何か追加でライブラリを使わなくても、実現したい特定の状況に合わせた具体的なロジックを書くことが最もシンプルなコードにつながります。なので、より複雑な方法が必要だと判断する前に、必ずまずこの最も単純なやり方を試してみてください！
