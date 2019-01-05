<!--
# Flags
-->

# フラグ

<!--
The previous page showed the JavaScript needed to start an Elm program:
-->

先ほどのページでは、次のようなJavaSriptを実行することで、Elmのプログラムを起動する必要があることを説明しました。

```elm
var app = Elm.Main.init({
  node: document.getElementById('elm')
});
```
<!--
It is possible to pass in some additional data though. For example, if we wanted to pass in the current time we could say:
-->

ここでは、JavaScriptからElmへと追加でデータを渡すことができます。たとえば、次のようにすれば、現在の時刻を渡すことができます。

```javascript
var app = Elm.Main.init({
  node: document.getElementById('elm'),
  flags: Date.now()
});
```

<!--
We call this additional data `flags`. This allows you to customize the Elm program with all sorts of data!
-->

この追加のデータは**フラグ**(`flags`)と呼ばれています。これにより、いろいろな種類のデータに基づいて、Elmプログラムをカスタマイズすることができるようになるのです。

<!--
> **Note:** This additional data is called “flags” because it is kind of like command line flags. You can call `elm make src/Main.elm`, but you can add some flags like `--optimize` and `--output=main.js` to customize its behavior. Same sort of thing.
-->

> **Note:** この追加のデータが『フラグ』と呼ばれているのは、それがコマンドラインフラグのようなものだからです。`elm make src/Main.elm`を実行するとき、`--optimize`や`--output=main.js`のようなフラグを追加して、その動作をカスタマイズすることができます。フラグもそれと似たようなものです。

<!--
## Handling Flags
-->

## フラグの操作

<!--
Just passing in JavaScript values is not enough. We need to handle them on the Elm side! The [`Browser.element`][element] function provides a way to handle flags with `init`:
-->

Elmでフラグを扱うには、JavaScriptから値を渡すだけでは不十分です。Elm側でそれを受け取る必要があるからです！ [`Browser.element`][element]関数を使うと、`init`でフラグを受け取ることができるようになります。

```elm
element :
  { init : flags -> ( model, Cmd msg )
  , update : msg -> model -> ( model, Cmd msg )
  , subscriptions : model -> Subs msg
  , view : model -> Html msg
  }
  -> Program flags model msg
```

[element]: https://package.elm-lang.org/packages/elm/browser/latest/Browser#element

<!--
Notice that `init` has an argument called `flags`. So assuming we want to pass in the current time, we could write an `init` function like this:
-->


`init`が`flag`という名前の引数を持っていることに注目してください。現在の時刻を渡したいということだったので、`init`関数を次のように書くといいでしょう。


```elm
init : Int -> ( Model, Cmd Msg )
init currentTime =
  ...
```

<!--
This means that Elm code gets immediate access to the flags you pass in from JavaScript. From there, you can put things in your model or run some commands. Whatever you need to do.
-->

つまりこれは、JavaScriptから渡されたフラグの値を、即座に`init`で受け取るようになったということです。`init`では、その受け取ったフラグの値をモデルの中に格納したり、何かコマンドを実行することもできます。必要なことは何でもできるのです。

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

前述のフラグとして渡すことができる型のうち、`Json.Decode.Value` 以外の型は、事前にElmのランタイムシステムが「どうやってJSONをデコードしたら良いか」を算出し、変換された値が渡されます。もしこの方法を使うのなら、いくつか注意することがあります。次の例では、渡そうとしているフラグの型それぞれについて、いろいろなJavaScriptの値を渡すとそれぞれ何が起こるのかを示しています。

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

