<!--
# Flags
-->
# フラグ

<!--
Flags are a way to pass values into Elm on initialization.
-->
フラグは初期化と同時にElmになんらかの値を渡す方法です。

<!--
Common uses are passing in API keys, environment variables, and user data. This can be handy if you generate the HTML dynamically. They can also help us load cached information in [this `localStorage` example](https://github.com/elm-community/js-integration-examples/tree/master/localStorage).
-->
よくある使い方は、APIキーや、環境変数、それにユーザーが作ったデータを渡したいときなどでしょう。Elmでコマンドやメッセージを発行しない最初のレンダリング時に、フラグの値に応じて動的にHTMLを生成することができます。また、[この`localStorage`の例](https://github.com/elm-community/js-integration-examples/tree/master/localStorage)のようにウェブブラウザーに保存されたデータを読み取るときにも役立ちます。

<!--
## Flags in HTML
-->
## HTMLでのフラグ

<!--
The HTML is basically the same as before, but with an additional `flags` argument to the `Elm.Main.init()` function
-->
このHTMLは前のページに出てきたものと基本的に同じですが、`Elm.Main.init()`関数に追加の引数`flags`を渡しているところが違います。

```html
<html>
<head>
  <meta charset="UTF-8">
  <title>Main</title>
  <script src="main.js"></script>
</head>

<body>
  <div id="myapp"></div>
  <script>
  var app = Elm.Main.init({
    node: document.getElementById('myapp'),
    flags: Date.now()
  });
  </script>
</body>
</html>
```

<!--
In this example we are passing in the current time in milliseconds, but any JS value that can be JSON decoded can be given as a flag.
-->
この例では現在時刻をミリ秒として渡していますが、JSONとしてデコードできるものであればどんなJavaScriptの値でもフラグに使うことができます。

<!--
> **Note:** This additional data is called “flags” because it is kind of like command line flags. You can call `elm make src/Main.elm`, but you can add some flags like `--optimize` and `--output=main.js` to customize its behavior. Same sort of thing.
-->

> **Note:** この追加のデータが『フラグ』と呼ばれているのは、それがコマンドラインフラグのようなものだからです。`elm make src/Main.elm`を実行するとき、`--optimize`や`--output=main.js`のようなフラグを追加して、その動作をカスタマイズすることができます。フラグもそれと似たようなものです。

<!--
## Flags in Elm
-->
## Elmでのフラグ

<!--
To handle flags on the Elm side, you need to modify your `init` function a bit:
-->
Elmの側でフラグを扱うために、`init`関数に少し手を加える必要があります:

```elm
module Main exposing (..)

import Browser
import Html exposing (Html, text)


-- MAIN

main : Program Int Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- MODEL

type alias Model = { currentTime : Int }

init : Int -> ( Model, Cmd Msg )
init currentTime =
  ( { currentTime = currentTime }
  , Cmd.none
  )


-- UPDATE

type Msg = NoOp

update : Msg -> Model -> ( Model, Cmd Msg )
update _ model =
  ( model, Cmd.none )


-- VIEW

view : Model -> Html Msg
view model =
  text (String.fromInt model.currentTime)


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none
```

<!--
The only important here is the `init` function says it takes an `Int` argument. This is how Elm code gets immediate access to the flags you pass in from JavaScript. From there, you can put things in your model or run some commands. Whatever you need to do.
-->
ここで重要なポイントはただ一つ、`init`関数が引数として`Int`を受け取っていることです。このように、JavaScriptの世界から渡されたフラグはElmからすぐにそのまま利用できます。フラグを受け取った後は、モデルに入れておいたり、コマンドを実行するのに使ったり、必要なら何にでも使うことができます。

<!--
I recommend checking out [this `localStorage` example](https://github.com/elm-community/js-integration-examples/tree/master/localStorage) for a more interesting use of flags!
-->
もっと面白いフラグの使い方を知りたいなら、[この`localStorage`の例](https://github.com/elm-community/js-integration-examples/tree/master/localStorage)を見てみてください！

<!--
## Verifying Flags
-->

## フラグの検証

<!--
But what happens if `init` says it takes an `Int` flag, but someone tries to initialize with `Elm.Main.init({ flags: "haha, what now?" })`?
-->

しかし、`Int`をフラグとして受け取るように`init`を定義したにも関わらず、`Elm.Main.init({ flags: "haha, what now?" })`というように初期化しようとするような人がいたら、いったい何が起こるのでしょうか。

<!--
Elm checks for that sort of thing, making sure the flags are exactly what you expect. Without this check, you could pass in anything, leading to runtime errors in Elm!
-->

Elmはそのような場合に対してもチェックを行い、フラグの型が期待していた通りであることを保証してくれます。もしこのチェックがなければ、どんなデータでも渡すことができてしまい、Elm側では実行時エラーが起きてしまうでしょう！

<!--
There are a bunch of types that can be given as flags:
-->

フラグとして渡すことのできる型には、次のように様々な型があります。

- `Bool`
- `Int`
- `Float`
- `String`
- `Maybe`
- `List`
- `Array`
- tuples
- records
- [`Json.Decode.Value`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#Value)

<!--
Many folks always use a `Json.Decode.Value` because it gives them really precise control. They can write a decoder to handle any weird scenarios in Elm code, recovering from unexpected data in a nice way.
-->

フラグを厳密に制御できるように、常に`Json.Decode.Value`を使うようにしている人もたくさんいます。どんな変な値であっても受け取り、それが予想外のデータであってもうまく修正することができるように、Elm側のコードでデコーダを書いているのです。

<!--
The other supported types actually come from before we had figured out a way to do JSON decoders. If you choose to use them, there are some subtleties to be aware of. The following examples show the desired flag type, and then the sub-points show what would happen with a couple different JS values:
-->

`JSON.Decode.Value` 以外の型をフラグとして渡す機能は、実はJSONデコーダーを使う方法が発明されるよりも前の時代に使われていたものです。
これらの型をフラグとして渡すには、いくつか注意しないといけないことがあります。次の例では、渡そうとしているフラグの型それぞれについて、いろいろなJavaScriptの値を渡すとそれぞれ何が起こるのかを示しています。

- `init : Int -> ...`
  - `0` => `0`
  - `7` => `7`
  - `3.14` => error
  - `6.12` => error

- `init : Maybe Int -> ...`
  - `null` => `Nothing`
  - `42` => `Just 42`
  - `"hi"` => error

- `init : { x : Float, y : Float } -> ...`
  - `{ x: 3, y: 4, z: 50 }` => `{ x = 3, y = 4 }`
  - `{ x: 3, name: "tom" }` => error
  - `{ x: 360, y: "why?" }` => error

- `init : (String, Int) -> ...`
  - `['tom',42]` => `("Tom", 42)`
  - `["sue",33]` => `("Sue", 33)`
  - `["bob","4"]` => error
  - `['joe',9,9]` => error

<!--
Note that when one of the conversions goes wrong, **you get an error on the JS side!** We are taking the “fail fast” policy. Rather than the error making its way through Elm code, it is reported as soon as possible. This is another reason why people like to use `Json.Decode.Value` for flags. Instead of getting an error in JS, the weird value goes through a decoder, guaranteeing that you implement some sort of fallback behavior.
-->

もしこのような変換がひとつでもうまくいかない場合は、**JavaScript側でエラーが起こる**ことに注意してください！　Elmでは『フェイルファスト』(fail fast)の原則をとっています。Elmコード側でエラーを起こすのではなく、可能な限り早く問題を報告するということです。これはフラグに`Json.Decode.Value`を使うのを好む人がいる理由のひとつにもなっています。JavaScript側でエラーが起きるより、デコーダでこの変な値を受け取ることで、何らかのフォールバックが実装されているのを保証するほうがいいということです。
