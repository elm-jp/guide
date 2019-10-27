<!--
# HTTP
-->
# HTTP

<!--
It is often helpful to grab information from elsewhere on the internet.
-->
しばしば、インターネット上のどこかにある情報を取得して自分のアプリケーションに表示したいこともあるでしょう。

<!--
For example, say we want to load the full text of _Public Opinion_ by Walter Lippmann. Published in 1922, this book provides a historical perspective on the rise of mass media and its implications for democracy. For our purposes here, we will focus on how to use the [`elm/http`][http] package to get this book into our program!
-->
例えば、1992年に発行されたWalter Lippmann著の_Public Opinion_（この本はマスメディアの興りとそれが民主主義に与えた影響についての歴史的な視点を与えてくれます）の全文を取り込みたいとします。この節では[elm/http][http]パッケージを使い、この本の内容をプログラムに取り込む方法を中心に見ていきます。

<!--
Click the blue "Edit" button to look through this program in the online editor. You will probably see the screen say "Loading..." before the full book shows up. **Click the blue button now!**
-->
<!-- TODO -->
Click the blue "Edit" button to look through this program in the online editor. You will probably see the screen say "Loading..." before the full book shows up. **Click the blue button now!**

[http]: https://package.elm-lang.org/packages/elm/http/latest

<div class="edit-link"><a href="https://elm-lang.org/examples/book">Edit</a></div>

```elm
import Browser
import Html exposing (Html, text, pre)
import Http



-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL


type Model
  = Failure
  | Loading
  | Success String


init : () -> (Model, Cmd Msg)
init _ =
  ( Loading
  , Http.get
      { url = "https://elm-lang.org/assets/public-opinion.txt"
      , expect = Http.expectString GotText
      }
  )



-- UPDATE


type Msg
  = GotText (Result Http.Error String)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    GotText result ->
      case result of
        Ok fullText ->
          (Success fullText, Cmd.none)

        Err _ ->
          (Failure, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  case model of
    Failure ->
      text "I was unable to load your book."

    Loading ->
      text "Loading..."

    Success fullText ->
      pre [] [ text fullText ]
```

<!--
Some parts of this should be familiar from previous examples of The Elm Architecture. We still have a `Model` of our application. We still have an `update` that reacts to messages. We still have a `view` function that shows everything on screen.
-->
これまでにThe Elm Architectureの例を見てきましたので、このコードのある程度については馴染み深いはずです。これまでと同じくアプリケーションの`Model`、メッセージに応答するための`update`関数、そして全てを画面に描画するための`view`関数があります。

<!--
The new parts extend the core pattern we saw before with some changes in `init` and `update`, and the addition of `subscription`.
-->
今まで見てきた上記のような基本のパターンに対して、`init`と`update`にいくつか変更が加えられ、また`subscription`が追加されています。

<!--
## `init`
-->
## `init`

<!--
The `init` function describes how to initialize our program:
-->
この`init`関数にはプログラムをどのように初期化するかを記述します：

```elm
init : () -> (Model, Cmd Msg)
init _ =
  ( Loading
  , Http.get
      { url = "https://elm-lang.org/assets/public-opinion.txt"
      , expect = Http.expectString GotText
      }
  )
```

<!--
Like always, we have to produce the initial `Model`, but now we are also producing some **command** of what we want to do immediately. That command will eventually produce a `Msg` that gets fed into the `update` function.
-->
これまでどおりに`Model`の初期値を返す必要がありますが、ここではただちに実行したいなんらかの**コマンド**も同時に返しています。ここで返しているコマンドは最終的には`update`関数に渡される`Msg`を返します。

<!--
Our book website starts in the `Loading` state, and we want to GET the full text of our book. When making a GET request with [`Http.get`][get], we specify the `url` of the data we want to fetch, and we specify what we `expect` that data to be. So in our case, the `url` is pointing at some data on the Elm website, and we `expect` it to be a big `String` we can show on screen.
-->
この本の内容を表示するウェブサイトは読み込み中(`Loading`)の状態からはじまり、その本の全文を取得（GET）したいとします。[`Http.get`][get]によってGETリクエストを構築する際に、取得したい本のデータがある`url`と、どんなデータになることを期待(`expect`)するかを指定します。今回のケースでは、指定した`url`は Elm のウェブサイト上のとあるデータを指し示していて、そのデータが画面に表示できる長い文字列(`String`)であることを期待(`expect`)しています。

<!--
The `Http.expectString GotText` line is saying a bit more than that we `expect` a `String` though. It is also saying that when we get a response, it should be turned into a `GotText` message:
-->
ただし、この `Http.expectString GotText` の行は単にここでは文字列(`String`)を期待している(`expect`)と言っているだけではありません。なにかレスポンスを受け取った時に、以下のような `GotText` というメッセージに変換されるはずだとも言っているのです。

```elm
type Msg
  = GotText (Result Http.Error String)

-- GotText (Ok "The Project Gutenberg EBook of ...")
-- GotText (Err Http.NetworkError)
-- GotText (Err (Http.BadStatus 404))
```

<!--
Notice that we are using the `Result` type from a couple sections back. This allows us to fully account for the possible failures in our `update` function. Speaking of `update` functions...
-->
いくつか前の節であつかった`Result`型を使っていますね？これにより`update`関数の中でありうる全ての失敗を完全に捉えることが可能となります。これは`update`関数の話のついでの余談ですが...

[get]: https://package.elm-lang.org/packages/elm/http/latest/Http#get

<!--
> **Note:** If you are wondering why `init` is a function (and why we are ignoring the argument) we will talk about it in the upcoming chapter on JavaScript interop! (Preview: the argument lets us get information from JS on initialization.)
-->
> **Note:** ここでなぜ`init`が関数であるのか(そしてなぜその引数を無視するのか)という事に疑問を抱いたかもしれません。それについては後ほどの JavaScriptとの相互運用 の章にて説明します！（予告: この引数により初期化時にJSから情報を受け取ることができます）

<!--
## `update`
-->
## `update`

<!--
Our `update` function is returning a bit more information as well:
-->
今回の例では`update`関数も`init`のようにもう少し追加の情報を返します:

```elm
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    GotText result ->
      case result of
        Ok fullText ->
          (Success fullText, Cmd.none)

        Err _ ->
          (Failure, Cmd.none)
```

<!--
Looking at the type signature, we see that we are not just returning an updated model. We are _also_ producing a **command** of what we want Elm to do.
-->
この型注釈に注目すると、単に更新されたモデルを返しているだけではなく、Elmに実行してほしいことを指示するための**コマンド** _も_ あわせて返していることがわかります。

<!--
Moving on to the implementation, we pattern match on messages like normal. When a `GotText` message comes in, we inspect the `Result` of our HTTP request and update our model depending on whether it was a success or failure. The new part is that we also provide a command.
-->
その実装ではこれまでと同じくメッセージに対してのパターンマッチを行っています。メッセージが`GotText`の場合に、HTTPリクエストの結果を示す`Result`型の値を調べ、その結果が成功か失敗かによってモデルを更新しています。新しい部分はコマンドも返していることです。

<!--
So in the case that we got the full text successfully, we say `Cmd.none` to indicate that there is no more work to do. We already got the full text!
-->
つまり全文の取得に成功した場合には、これ以上は何もしなくて良いことを示す`Cmd.none`を返しています。すでに全文を取得済みなのですから！

<!--
And in the case that there was some error, we also say `Cmd.none` and just give up. The text of the book did not load. If we wanted to get fancier, we could pattern match on the [`Http.Error`][Error] and retry the request if we got a timeout or something.
-->
一方、なんらかのエラーがあった場合には、やはり`Cmd.none`を返してここでは単純にギブアップしています。その結果、画面上に本の内容は表示されません。もしより良い物にしたいのなら[`Http.Error`][Error]に対してパターンマッチを行い、タイムアウトなどのエラーであればリクエストの送信を再度トライすることも可能です。

<!--
The point here is that however we decide to update our model, we are also free to issue new commands. I need more data! I want a random number! Etc.
-->
この`update`関数で大事なことは、どのようにモデルの更新をするかを決定するだけでなく、新しいコマンドを発行することもできるということです。もっとデータが必要だ！とか乱数がほしい！などと。

[Error]: https://package.elm-lang.org/packages/elm/http/latest/Http#Error


<!--
## `subscription`
-->
## `subscription`

<!--
The other new thing in this program is the `subscription` function. It lets you look at the `Model` and decide if you want to subscribe to certain information. In our example, we say `Sub.none` to indicate that we do not need to subscribe to anything, but we will soon see an example of a clock where we want to subscribe to the current time!
-->
このプログラムにおけるもう一つの新しい部分は`subscription`関数になります。`Model`の情報から判断して何らかの情報に対する待ち受けするかどうかを決めることができます。今回の例では`Sub.none`として何も待ち受けする必要がないことを示していますが、後ほど現在時刻を待ち受ける必要がある時計の例を見ていきます。

<!--
## Summary
-->
## サマリー

<!--
When we create a program with `Browser.element`, we set up a system like this:
-->
`Browser.element`を使ってつくるプログラムでは、システムは以下のような構成となります:

![](diagrams/element.svg)

<!--
We get the ability to issue **commands** from `init` and `update`. This allows us to do things like make HTTP requests whenever we want. We also get the ability to **subscribe** to interesting information. (We will see an example of subscriptions later!)
-->
`init`と`update`関数から**コマンド**を発行することができるようになりました。これによりHTTPリクエストの送信といったようなことをいつでもできます。また、なにか意味ある情報を**待ち受け**することもできるようになりました（後ほどの節でサブスクリプションに関する例をあつかいます！）。
