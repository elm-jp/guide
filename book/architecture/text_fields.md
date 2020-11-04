<!--
# Text Fields
-->

# テキスト入力

<!--
We are about to create a simple app that reverses the contents of a text field.
-->

テキスト入力の内容を逆さまに表示するシンプルなアプリケーションを作りましょう。

<!--
Click the blue button to look at this program in the online editor. Try to check out the hint for the `type` keyword. **Click the blue button now!**
-->
<!-- TODO -->
Click the blue button to look at this program in the online editor. Try to check out the hint for the `type` keyword. **Click the blue button now!**

<div class="edit-link"><a href="https://elm-lang.org/examples/text-fields">Edit</a></div>

```elm
import Browser
import Html exposing (Html, Attribute, div, input, text)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)



-- MAIN


main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
  { content : String
  }


init : Model
init =
  { content = "" }



-- UPDATE


type Msg
  = Change String


update : Msg -> Model -> Model
update msg model =
  case msg of
    Change newContent ->
      { model | content = newContent }



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ input [ placeholder "Text to reverse", value model.content, onInput Change ] []
    , div [] [ text (String.reverse model.content) ]
    ]
```

<!--
This code is a slight variant of the previous example. You set up a model. You define some messages. You say how to `update`. You make your `view`. The difference is just in how we filled this skeleton in. Let's walk through that!
-->
<!-- TODO -->
<!-- 元の文章：
このコードは前の節で説明したカウンターアプリケーションを少しだけ変えたものです。モデルを設定し、幾つかのメッセージを定義し、 `update` のやり方、 `view` の作り方を定義します。前の節との違いはそれらの骨格の中身をどう定義するかということです。具体的に見ていきましょう。
-->
This code is a slight variant of the previous example. You set up a model. You define some messages. You say how to `update`. You make your `view`. The difference is just in how we filled this skeleton in. Let's walk through that!


## Model
<!--
I always start by guessing at what my `Model` should be. We know we have to keep track of whatever the user has typed into the text field. We need that information to know how to render the reversed text. So we go with this:
-->
<!-- TODO -->
<!-- 元の文章：
例によって `Model` がどのようになっているべきか考えましょう。今回の場合、ユーザーがテキスト入力にどのような文字を入力したかを追従する必要があるだろう、ということがわかります。また、その情報があれば逆さまの文字列を表示することができます。
-->
I always start by guessing at what my `Model` should be. We know we have to keep track of whatever the user has typed into the text field. We need that information to know how to render the reversed text. So we go with this:

```elm
type alias Model =
  { content : String
  }
```

<!--
This time I chose to represent the model as a record. The record stores the user input in the `content` field.
-->
<!-- TODO -->
<!-- 元の文章：
今回モデルをレコードとして表現することにしました（[こちら](https://guide.elm-lang.jp/core_language.html#records) や [こちら](https://elm-lang.org/docs/records) でレコードについて詳しく説明しています）。このレコードはユーザーの入力を `content` というフィールドで保持します。
-->
This time I chose to represent the model as a record. The record stores the user input in the `content` field.

<!--
> **Note:** You may be wondering, why bother having a record if it only holds one entry? Couldn't you just use the string directly? Sure! But starting with a record makes it easy to add more fields as our app gets more complicated. When the time comes where we want *two* text inputs, we will have to do much less fiddling around.
-->

> **注意:** 一つのフィールドしか無いのになぜレコードにするのか疑問に思う方もいるかも知れません。文字列をそのまま使ってもよいのでは無いでしょうか。もちろんそれでも構いません。しかし最初からレコードにしておくことでアプリケーションが複雑になってもフィールドを追加するのは簡単になります。 *2つの* テキスト入力をしたくなったとしても、より小さな変更で済むようになります。


## View

<!--
We have our model, so I usually proceed by creating a `view` function:
-->
<!-- TODO -->
We have our model, so I usually proceed by creating a `view` function:

```elm
view : Model -> Html Msg
view model =
  div []
    [ input [ placeholder "Text to reverse", value model.content, onInput Change ] []
    , div [] [ text (String.reverse model.content) ]
    ]
```

<!--
We create a `<div>` with two children. The interesting child is the `<input>` node which has three attributes:
-->
<!-- TODO -->
<!-- 元の文章：
２つの子要素をもつ `<div>` を定義します。
-->
We create a `<div>` with two children. The interesting child is the `<input>` node which has three attributes:

<!--
- `placeholder` is the text that shows when there is no content
- `value` is the current content of this `<input>`
- `onInput` sends messages when the user types in this `<input>` node
-->
<!-- TODO -->
- `placeholder` is the text that shows when there is no content
- `value` is the current content of this `<input>`
- `onInput` sends messages when the user types in this `<input>` node

<!--
Typing in "bard" this would produce four messages:
-->
<!-- TODO -->
Typing in "bard" this would produce four messages:

<!--
1. `Change "b"`
2. `Change "ba"`
3. `Change "bar"`
4. `Change "bard"`
-->
<!-- TODO -->
1. `Change "b"`
2. `Change "ba"`
3. `Change "bar"`
4. `Change "bard"`

<!--
These would be fed into our `update` function.
-->
<!-- TODO -->
These would be fed into our `update` function.


## Update

<!--
There is only one kind of message in this program, so our `update` only has to handle one case:
-->
<!-- TODO -->
There is only one kind of message in this program, so our `update` only has to handle one case:

```elm
type Msg
  = Change String

update : Msg -> Model -> Model
update msg model =
  case msg of
    Change newContent ->
      { model | content = newContent }
```

<!--
When we receive a message that the `<input>` node has changed, we update the `content` of our model. So if you typed in "bard" the resulting messages would produce the following models:
-->
<!-- TODO -->
When we receive a message that the `<input>` node has changed, we update the `content` of our model. So if you typed in "bard" the resulting messages would produce the following models:

<!--
1. `{ content = "b" }`
2. `{ content = "ba" }`
3. `{ content = "bar" }`
4. `{ content = "bard" }`
-->
<!-- TODO -->
1. `{ content = "b" }`
2. `{ content = "ba" }`
3. `{ content = "bar" }`
4. `{ content = "bard" }`

<!--
We need to track this information explicitly in our model, otherwise there is no way to show the reversed text in our `view` function!
-->
<!-- TODO -->
We need to track this information explicitly in our model, otherwise there is no way to show the reversed text in our `view` function!

<!--
> **Exercise:** Go to the example in the online editor [here](https://elm-lang.org/examples/text-fields) and show the length of the `content` in your `view` function. Use the [`String.length`](https://package.elm-lang.org/packages/elm/core/latest/String#length) function!
-->
<!-- TODO -->
> **Exercise:** Go to the example in the online editor [here](https://elm-lang.org/examples/text-fields) and show the length of the `content` in your `view` function. Use the [`String.length`](https://package.elm-lang.org/packages/elm/core/latest/String#length) function!
>
<!--
> **Note:** If you want more info on exactly how the `Change` values are working in this program, jump ahead to the sections on [custom types](/types/custom_types.html) and [pattern matching](/types/pattern_matching.html).
-->
<!-- TODO -->
> **Note:** If you want more info on exactly how the `Change` values are working in this program, jump ahead to the sections on [custom types](/types/custom_types.html) and [pattern matching](/types/pattern_matching.html).

