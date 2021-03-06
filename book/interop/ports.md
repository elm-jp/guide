<!--
# Ports
-->

# ポート（Ports）

<!--
Ports allow communication between Elm and JavaScript.
-->

ポートを使うと、ElmとJavaScriptの間でやりとりができます。

<!--
Ports are probably most commonly used for [`WebSockets`](https://github.com/elm-community/js-integration-examples/tree/master/websockets) and [`localStorage`](https://github.com/elm-community/js-integration-examples/tree/master/localStorage). Let's focus on the `WebSockets` example.
-->

よくあるポートの使いみちとして[`WebSocket`](https://github.com/elm-community/js-integration-examples/tree/master/websockets)や[`localStorage`](https://github.com/elm-community/js-integration-examples/tree/master/localStorage)が挙げられますが、ここでは`WebSocket`を使った例に注目してみましょう。

<!--
## Ports in JavaScript
-->

## JavaScriptでのポート

<!--
Here we have pretty much the same HTML we have been using on the previous pages, but with a bit of extra JavaScript code in there. We create a connection to `wss://echo.websocket.org` that just repeats back whatever you send it. You can see in the [live example](https://ellie-app.com/8yYgw7y7sM2a1) that this lets us make the skeleton of a chat room:
-->

以前のページに出てきたHTMLとほとんど同じですが、少しだけJavaScriptが追加されています。ここで接続している`wss://echo.websocket.org`は、送ったものを何でもそのまま返してくるWebSocketサーバーです。[こちらのデモ](https://ellie-app.com/8yYgw7y7sM2a1)から、このコードでチャットルームを作るための骨組みを見ることができます。

```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="UTF-8">
  <title>Elm + Websockets</title>
  <script type="text/javascript" src="elm.js"></script>
</head>

<body>
	<div id="myapp"></div>
</body>

<script type="text/javascript">

// Elmアプリケーションを開始します
var app = Elm.Main.init({
	node: document.getElementById('myapp')
});

// WebSocketの通信を確立します
var socket = new WebSocket('wss://echo.websocket.org');

// `sendMessage`というポートにコマンドが送られてきたとき、
// 受け取ったメッセージをWebSocketに渡します
app.ports.sendMessage.subscribe(function(message) {
    socket.send(message);
});

// WebSocketがメッセージを受信したら、今度は
// `messageReceiver`のポートを通してElmにメッセージを送ります
socket.addEventListener("message", function(event) {
	app.ports.messageReceiver.send(event.data);
});

// WebSocketを扱うのにJavaScriptライブラリを
// 使いたいときは、このコードの実装を置き換えてください
</script>

</html>
```

<!--
We call `Elm.Main.init()` like in all of our interop examples, but this time we are actually using the resulting `app` object. We are subscribing to the `sendMessage` port and we are sending to the `messageReceiver` port.
-->

この「JavaScriptとの相互運用」の章に出てくる他の例と同じように`Elm.Main.init()`関数を呼んでいますが、今回はその戻り値の`app`オブジェクトを利用します。`sendMessage`ポートでElmからのメッセージを待ち受けつつ、`messageReceiver`ポートを使ってElmへデータを送信します。

<!--
Those correspond to code written on the Elm side.
-->

これはちょうど、Elm側のコードと対応しています。

<!--
## Ports in Elm
-->

## Elmでのポート

<!--
Check out the lines that use the `port` keyword in the corresponding Elm file. This is how we define the ports that we just saw on the JavaScript side.
-->

こちらが対応するElmのコードです。特に、予約語の`port`が使われている行に注意してみてください。さっきJavaScript側でポートが使われているところを見ましたが、そのポートをElmではこんなふうに定義します。

```elm
port module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as D



-- MAIN


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }




-- PORTS


port sendMessage : String -> Cmd msg
port messageReceiver : (String -> msg) -> Sub msg



-- MODEL


type alias Model =
  { draft : String
  , messages : List String
  }


init : () -> ( Model, Cmd Msg )
init flags =
  ( { draft = "", messages = [] }
  , Cmd.none
  )



-- UPDATE


type Msg
  = DraftChanged String
  | Send
  | Recv String


-- ユーザーがエンターキーを押すか、Send ボタンをクリックしたとき、`sendMessage`ポートを使っています。
-- これがどんなふうにWebSocketとつながっているのかindex.htmlにあるJavaScriptと対応させてみてください。
--
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    DraftChanged draft ->
      ( { model | draft = draft }
      , Cmd.none
      )

    Send ->
      ( { model | draft = "" }
      , sendMessage model.draft
      )

    Recv message ->
      ( { model | messages = model.messages ++ [message] }
      , Cmd.none
      )



-- SUBSCRIPTIONS


-- `messageReceiver`ポートを使って、JavaScriptから送られるメッセージを待ち受けています。
-- どうやってWebSocketとつながっているのかは、index.htmlファイルを見てください。
--
subscriptions : Model -> Sub Msg
subscriptions _ =
  messageReceiver Recv



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h1 [] [ text "Echo Chat" ]
    , ul []
        (List.map (\msg -> li [] [ text msg ]) model.messages)
    , input
        [ type_ "text"
        , placeholder "Draft"
        , onInput DraftChanged
        , on "keydown" (ifIsEnter Send)
        , value model.draft
        ]
        []
    , button [ onClick Send ] [ text "Send" ]
    ]



-- DETECT ENTER


ifIsEnter : msg -> D.Decoder msg
ifIsEnter msg =
  D.field "key" D.string
    |> D.andThen (\key -> if key == "Enter" then D.succeed msg else D.fail "some other key")
```

<!--
Notice that the first line says `port module` rather than just `module`. This makes it possible to define ports in a given module. The compiler gives a hint about this if it is needed, so hopefully no one gets too stuck on that!
-->

最初の行でただの`module`の代わりに`port module`と書いていることに気をつけましょう。これでモジュールの中でポートを定義できるようになります。もし忘れてしまってもコンパイラーがヒントを表示してくれるので、ここでつまづく人は少ないでしょう。

<!--
Okay, but what is going on with the `port` declarations for `sendMessage` and `messageReceiver`?
-->

さて、`sendMessage`と`messageReceiver`の`port`の宣言ではいったい何が起きているのでしょうか？

<!--
## Outgoing Messages (`Cmd`)
-->

## 外向きのメッセージ（`Cmd`）

<!--
The `sendMessage` declaration lets us send messages out of Elm.
-->

`sendMessage`はElmから外の世界へメッセージを送るために使います。

```elm
port sendMessage : String -> Cmd msg
```

<!--
Here we are declaring that we want to send out `String` values, but we could send out any of the types that work with flags. We talked about those types on the previous page, and you can check out [this `localStorage` example](https://ellie-app.com/8yYddD6HRYJa1) to see a [`Json.Encode.Value`](https://package.elm-lang.org/packages/elm/json/latest/Json-Encode#Value) getting sent out to JavaScript.
-->

ここでは`String`の値を送ると宣言していますが、フラグに使えるものならどんな型でもポートを通して送信できます。どの型が利用できるかは、1つ前のページで解説しています。[この`localStorage`の例](https://ellie-app.com/8yYddD6HRYJa1)では[`Json.Encode.Value`](https://package.elm-lang.org/packages/elm/json/latest/Json-Encode#Value)をJavaScriptに送っています。

<!--
From there we can use `sendMessage` like any other function. If your `update` function produces a `sendMessage "hello"` command, you will hear about it on the JavaScript side:
-->

`sendMessage`ポートは他の関数とまったく同じように使うことができます。もし`update`関数から`sendMessage "hello"`というコマンドを発行したなら、JavaScriptでそれを受け取るやり方はこうです:

```javascript
app.ports.sendMessage.subscribe(function(message) {
    socket.send(message);
});
```

<!--
This JavaScript code is subscribed to all of the outgoing messages. You can `subscribe` multiple functions and `unsubscribe` functions by reference, but we generally recommend keeping things static.
-->

このJavaScriptコードは`sendMessage`から送られてくる外向きのあらゆるメッセージを待ち構えています。もしそうしたければ複数の関数を`subscribe`に登録することができます。

```javascript
var foo = function(message) {...};
var bar = function(message) {...};

app.ports.sendMessage.subscribe(foo);
app.ports.sendMessage.subscribe(bar);
```

> 注: JavaScriptの他の関数と同じように1度の`subscribe`で複数の関数を登録することはできません。
>
> ```javascript
> // これは2つ目以降の引数は無視されます
> app.ports.sendMessage.subscribe(foo, bar);
> ```

また、登録した関数の参照を渡すことでメッセージの受け取りを停止させる`unsubscribe`もあります。

```javascript
var foo = function(message) {...};

app.ports.sendMessage.subscribe(foo);
...
app.ports.sendMessage.unsubscribe(foo);
```

ですが、ふつうは一度登録したあとで変更せず静的に扱うのがよいでしょう。

<!--
We also recommend sending out richer messages, rather than making lots of individual ports. Maybe that means having a custom type in Elm that represents everything you might need to tell JS, and then using [`Json.Encode`](https://package.elm-lang.org/packages/elm/json/latest/Json-Encode) to send it out to a single JS subscription. Many people find that this creates a cleaner separation of concerns. The Elm code clearly owns some state, and the JS clearly owns other state.
-->

もう1つポートを定義するときに大切なことがあります。JavaScriptの関数を逐語的にポートで定義して、必要に応じてたくさんのポートを使い分けるのはいい方法ではありません。それよりもポートを通して送るメッセージのほうをリッチにして、ポート自体は抽象度を高めて数を少なくしておくほうが好ましいでしょう。例えば、Elmの側ではカスタム型で送りたいデータを表現し、[`Json.Encode`](https://package.elm-lang.org/packages/elm/json/latest/Json-Encode)で変換して送ります。そしてJavaScriptでは、そのメッセージを処理する専用の関数を書いて待ち構えておくのです。多くの開発者が、そのほうが関心事をきれいに分離できると言っています。ElmにはElmの、JavaScriptにはJavaScriptの管理するべき状態がはっきりとあるはずです。


<!--
## Incoming Messages (`Sub`)
-->

## 内向きのメッセージ（`Sub`）

<!--
The `messageReceiver` declaration lets us listen for messages coming in to Elm.
-->

`messageReceiver`はElmの外の世界から送られてくるメッセージを待ち受けるために使います。

```elm
port messageReceiver : (String -> msg) -> Sub msg
```

<!--
We are saying we are going to receive `String` values, but again, we can listen for any type that can come in through flags or outgoing ports. Just swap out the `String` type with one of the types that can cross the border.
-->

これは`String`の値を受け取ることを示していますが、ここでも、フラグや外向きのポートで使える型は何でも受け取ることができます。`String`の指定を、JavaScriptとの境界をまたぐことのできる好きな型に入れ替えてください。

<!--
Again we can use `messageReceiver` like any other function. In our case we call `messageReceiver Recv` when defining our `subscriptions` because we want to hear about any incoming messages from JavaScript. This will let us get messages like `Recv "how are you?"` in our `update` function.
-->

`messageReceiver`もまた、他の関数と同じように使えます。この例では`subscriptions`の定義においてJavaScriptからのメッセージを待ち受けるために`messageReceiver Recv`を呼び出しています。こうすることで、`update`関数の中で`Recv "how are you?"`のようなメッセージを受け取ることができます。

<!--
On the JavaScript side, we are able to send things to this port whenever we want:
-->

JavaScript側では、いつでも好きな時にポートを使ってメッセージを送れます。

```javascript
socket.addEventListener("message", function(event) {
	app.ports.messageReceiver.send(event.data);
});
```

<!--
We happen to be sending whenever the websocket gets a message, but you could send at other times as well. Maybe we are getting messages from another data source as well. That is fine, and Elm does not need to know anything about it! Just send the strings through the relevant port.
-->

今回はたまたまWebSocketが受信したのと同じタイミングでデータをElmに送っていますが、別のタイミングで送りたくなることがあるかもしれません。もしかすると、WebSocketから送られてくるデータと一緒に他の場所にあるデータを使うかもしれません。その場合もElmは「データがどこから取得されたのか」「メッセージをいつ受け取るのか」といったことを予め知っておく必要はありません！　ただJavaScript側でデータを整形し、対応するポートに送るだけでいいのです。

<!--
## Notes
-->

## 注意するべきこと

<!--
**Ports are about creating strong boundaries!** Definitely do not try to make a port for every JS function you need. You may really like Elm and want to do everything in Elm no matter the cost, but ports are not designed for that. Instead, focus on questions like “who owns the state?” and use one or two ports to send messages back and forth. If you are in a complex scenario, you can even simulate `Msg` values by sending JS like `{ tag: "active-users-changed", list: ... }` where you have a tag for all the variants of information you might send across.
-->

**ポートはElmとJavaScriptを強く結合させます！** 欲しいJavaScriptの関数すべてに1対1で対応するポートを作るようなことは絶対に避けるべきです。あなたはElmが大好きで、何もかもElmの中で解決したいと考えているかもしれませんが、ポートはそのために作られた道具ではありません。誤った使いかたをしないためには、 Elm と JavaScript が受け持つべき責務を、例えば「状態を管理するのはどちらか？」というぐあいに1つずつ取り上げて問いかけてみましょう。そして1つか2つだけのポートを使い、責務を果たすために過不足のないメッセージをやりとりしましょう。もし複雑なシナリオでポートを使う必要があるなら、JavaScriptへ送るメッセージの中に、カスタム型が取りうる選択肢を `{ tag: "active-users-changed", list: ... }` のようにタグとして埋め込むことで、Elm側の`Msg`を再現することができます。

<!--
Here are some simple guidelines and common pitfalls:
-->

では、ポートを使う上での簡単なガイドラインと、よくある落とし穴を示しておきましょう。

<!--
- **Sending `Json.Encode.Value` through ports is recommended.** Like with flags, certain core types can pass through ports as well. This is from the time before JSON decoders, and you can read about it more [here](/interop/flags.html#verifying-flags).
-->

- **`Json.Encode.Value`型の値はポートでやり取りするのに向いています。** そのほかにも、フラグの例で見たように`elm/core`に含まれる型にもポートを通して渡せるものがあります。これは Elm に JSON デコーダーが導入される前から存在しているものです。詳しくは[こちら](/interop/flags.html#フラグの検証)を読んでみてください。

<!--
- **All `port` declarations must appear in a `port module`.** It is probably best to organize all your ports into one `port module` so it is easier to see the interface all in one place.
-->

- **すべての `port` は `port module` の中で宣言されなくてはいけません。**  ひとつの `port module` の中にすべてのポートをまとめてしまうのがおそらく最善で、ひとつの場所にすべての JavaScript とのインターフェイスがあったほうがより把握しやすいでしょう。

<!--
- **Ports are for applications.** A `port module` is available in applications, but not in packages. This ensures that application authors have the flexibility they need, but the package ecosystem is entirely written in Elm. We think this will create a stronger ecosystem and community in the long run, and we get into the tradeoffs in depth in the upcoming section on the [limits](/interop/limits.html) of Elm/JS interop.
-->

- **ポートはアプリケーションのためのものです。** `port module` はアプリケーションでは使えますが、パッケージでは使えません。こうすることで、アプリケーションを作るときには必要に応じて JavaScript を使えるよう融通を効かせながらも、公開されているパッケージはすべて Elm で書かれていることを保証しているのです。長い目で見ると、これが強固なエコシステムとコミュニティを構築する助けになります。JavaScriptとの相互運用に関するこの[制限事項](/interop/limits.html)によって、Elmが何を得て何を失ったのか、次の節で詳しく解説しています。

<!--
- **Ports can be dead code eliminated.** Elm has quite aggressive [dead code elimination](https://en.wikipedia.org/wiki/Dead_code_elimination), and it will remove ports that are not used within Elm code. The compiler does not know what goes on in JavaScript, so try to hook things up in Elm before JavaScript.
-->

- **ポートは最適化によって消されることがあります。** Elmコンパイラーはとても積極的に[デッドコード除去](https://en.wikipedia.org/wiki/Dead_code_elimination)による最適化を行っており、Elmコードの中で一度も呼び出されていないポートは、コンパイル後のJavaScriptから取り除かれてしまいます。Elmのコンパイラーは、JavaScript側のコードがポートを使っていることを知らないのです。JavaScriptでポートを使ったコードを書く前に、まずElmの側でそのポートを使うようにしましょう。

<!--
I hope this information will help you find ways to embed Elm in your existing JavaScript! It is not as glamorous as doing a full-rewrite in Elm, but history has shown that it is a much more effective strategy.
-->

既にJavaScriptで書かれたアプリケーションを運用しているなら、ぜひともこの節で学んだ知識を使って、JavaScriptの中にElmを組み込む方法を模索してみてください。ElmとJavaScriptを共存させるという考え方はあまり魅力的に思えないかもしれません。しかし、このやり方はサービスの運用やプロジェクトの管理を円滑にするという点で、全体をElmで書き直すよりずっと大きな効果を示すことがわかっており、実績に裏打ちされた戦略なのです。
