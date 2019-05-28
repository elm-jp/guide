<!--
# Text Fields
-->

# テキスト入力

<!--

---
#### [Clone the code](https://github.com/evancz/elm-architecture-tutorial/) or follow along in the [online editor](https://ellie-app.com/37gW7sj9wPVa1).
---

-->

---
#### [サンプルコード](https://github.com/evancz/elm-architecture-tutorial/) をダウンロードするか [オンラインエディタ](https://ellie-app.com/37gW7sj9wPVa1) で試してください。
---

<!--
We are about to create a simple app that reverses the contents of a text field.
-->

テキスト入力の内容を逆さまに表示するシンプルなアプリケーションを作りましょう。

<!--
Again this is a pretty short program, so I have included the whole thing here. Skim through to get an idea of how everything fits together. Right after that we will get into the details!
-->

繰り返しますが、とても短いプログラムなので全てのコードをここに掲載します。まずは全体がどのように構成されているかを理解し、その後に詳細について見ていきましょう。


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
This code is a slight variant of the counter from the previous section. You set up a model. You define some messages. You say how to `update`. You make your `view`. The difference is just in how we filled this skeleton in. Let's walk through that!
-->

このコードは前の節で説明したカウンターアプリケーションを少しだけ変えたものです。モデルを設定し、幾つかのメッセージを定義し、 `update` のやり方、 `view` の作り方を定義します。前の節との違いはそれらの骨格の中身をどう定義するかということです。具体的に見ていきましょう。

<!--
As always, you start by guessing at what your `Model` should be. In our case, we know we are going to have to keep track of whatever the user has typed into the text field. We need that information so we know how to render the reversed text.
-->

例によって `Model` がどのようになっているべきか考えましょう。今回の場合、ユーザーがテキスト入力にどのような文字を入力したかを追従する必要があるだろう、ということがわかります。また、その情報があれば逆さまの文字列を表示することができます。

```elm
type alias Model =
  { content : String
  }
```

<!--
This time I chose to represent the model as a record. (You can read more about records [here](https://guide.elm-lang.org/core_language.html#records) and [here](https://elm-lang.org/docs/records).) For now, the record stores the user input in the `content` field.
-->
今回モデルをレコードとして表現することにしました（[こちら](https://guide.elm-lang.jp/core_language.html#records) や [こちら](https://elm-lang.org/docs/records) でレコードについて詳しく説明しています）。このレコードはユーザーの入力を `content` というフィールドで保持します。

<!--
> **Note:** You may be wondering, why bother having a record if it only holds one entry? Couldn't you just use the string directly? Sure! But starting with a record makes it easy to add more fields as our app gets more complicated. When the time comes where we want *two* text inputs, we will have to do much less fiddling around.
-->

> **注意:** 一つのフィールドしか無いのになぜレコードにするのか疑問に思う方もいるかも知れません。文字列をそのまま使ってもよいのでは無いでしょうか。もちろんそれでも構いません。しかし最初からレコードにしておくことでアプリケーションが複雑になってもフィールドを追加するのは簡単です。 *2つの* テキスト入力をしたくなったとしても、より小さな変更で済むようになります。

<!--
Okay, so we have our model. Now in this app there is only one kind of message really. The user can change the contents of the text field.
-->

オーケー。モデルが出来ました。このアプリケーションではメッセージの種類は一つだけです。ユーザーはテキスト入力の内容を変更することが出来ます。


```elm
type Msg
  = Change String
```

<!--
This means our update function just has to handle this one case:
-->

アップデート関数はこのメッセージだけを取り扱えばよいということになります:


```elm
update : Msg -> Model -> Model
update msg model =
  case msg of
    Change newContent ->
      { model | content = newContent }
```

<!--
When we receive new content, we use the record update syntax to update the contents of `content`.
-->

テキスト入力の内容を受け取ると、レコードを更新する構文によって `content` の内容を更新します。

<!--
Finally we need to say how to view our application:
-->

最後にアプリケーションをどのように表示するか定義します:

```elm
view : Model -> Html Msg
view model =
  div []
    [ input [ placeholder "Text to reverse", value model.content, onInput Change ] []
    , div [] [ text (String.reverse model.content) ]
    ]
```

<!--
We create a `<div>` with two children.
-->
２つの子要素をもつ `<div>` を定義します。

<!--
The interesting child is the `<input>` node. In addition to the `placeholder` and `value` attributes, it uses `onInput` to declare what messages should be sent when the user types into this input.
-->
注目すべきは `<input>` 要素です。 `placeholder` 属性や `value` 属性に加えて、 ユーザーがテキスト入力に文字を入力したときにどのようなメッセージを送信するか定義する `onInput` があります。

<!--
This `onInput` function is kind of interesting. It takes one argument, in this case the `Change` function which was created when we declared the `Msg` type:
-->

この `onInput` 関数は興味深いものです。一つの引数を取るのですが、今回の場合は `Msg` を決めるときに定義した `Change` 関数を引数として受け取ります。

```elm
Change : String -> Msg
```

<!--
This function is used to tag whatever is currently in the text field. So let's say the text field currently holds `glad` and the user types `e`. This triggers an `input` event, so we will get the message `Change "glade"` in our `update` function.
-->
この関数は現在テキスト入力に入力されている文字列を捕捉するために使用されます。例えば、テキスト入力に `glad` が入力されていて、ユーザーが続けて `e` を入力したとします。この時 `input` イベントが発行され、 `update` 関数で `Change "glade"` メッセージを受け取ることになります。

<!--
So now we have a simple text field that can reverse user input. Neat! Now on to putting a bunch of text fields together into a more traditional form.
-->

これでユーザーの入力を逆さまにするシンプルなテキスト入力を作成できました。すっきりしています！次は複数のテキスト入力を持つ伝統的なフォームを作ります。
