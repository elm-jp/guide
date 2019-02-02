<!--
# HTTP
-->
# HTTP

<!--
#### [Clone the code](https://github.com/evancz/elm-architecture-tutorial/) or follow along in the [online editor](https://ellie-app.com/3SYRVMrLnGHa1).
-->

---
#### [サンプルコード](https://github.com/evancz/elm-architecture-tutorial/)をダウンロードするか[オンラインエディタ](https://ellie-app.com/3SYRVMrLnGHa1)で試してください。
---

<!--
It is often helpful to grab information from elsewhere on the internet.
-->
インターネット上から情報を引き出すということがしばし役に立ちます。

<!--
For example, say we want to load the full text of _Public Opinion_ by Walter Lippmann. Published in 1922, this book provides a historical perspective on the rise of mass media and its implications for democracy. For our purposes here, we will focus on how to use the [`elm/http`][http] package to get this book into our app!
-->
例えば、1992年に発行されたWalter Lippmann著の_Public Opinion_（この本はマスメディアとそれが示唆する民主主義についての歴史的展望を与えてくれます）の全文を取り込みたいとします。この節での目的は[`elm/http`][http]パッケージを使って、この本の内容を我々のアプリケーションに取り込む方法になります！

<!--
Let&rsquo;s start by just looking at all the code. There are some new things, but do not worry. We will go through it all!
-->
まずは一通りコード全体に目を通してください。いくつか新しい事柄がありますが心配無用です。順を追って見ていきましょう！

[http]: https://package.elm-lang.org/packages/elm/http/latest


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
これまでにThe Elm Architectureの例を見てきましたので、このコードのある程度については馴染みがあるかと思います。これまでどおり、アプリケーションの`Model`があり、メッセージに応答するための`update`関数があり、そして全てを画面に描画するための`view`関数があります。

<!--
The new parts extend the core pattern we saw before with some changes in `init` and `update`, and the addition of `subscription`.
-->
新しい部分は`init`と`update`へのいくつかの変更と`subscription`の追加を伴い、今まで見てきた中心となるパターンを拡張します。

<!--
## `init`
-->
## `init`

<!--
The `init` function describes how to initialize our program:
-->
この`init`関数は我々のプログラムをどのように初期化するかを記述しています:


```elm
init : () -> (Model, Cmd Msg)
init _ =
  ( Loading
  , Http.get
      { url = "http://www.gutenberg.org/cache/epub/6456/pg6456.txt"
      , expect = Http.expectString GotText
      }
  )
```

<!--
Like always, we have to produce the initial `Model`, but now we are also producing some **command** of what we want to do immediately. That command will eventually produce a `Msg` that gets fed into the `update` function.
-->
これまでどおりに初期値としての`Model`を返す必要がありますが、直ちに実行したいなんらかの**コマンド**も同時に返します。コマンドは最終的には`update`関数に渡される`Msg`を返します。

<!--
Our book website starts in the `Loading` state, and we want to GET the full text of our book. When making a GET request with [`Http.get`][get], we specify the `url` of the data we want to fetch, and we specify what we `expect` that data to be. So in our case, the `url` is pointing at some data on the Project Gutenberg website, and we `expect` it to be a big `String` we can show on screen.
-->
本の内容を表示する我々のウェブサイトは`Loading`の状態から始まり、本の全文を取得（GET）する事を要求します。[`Http.get`][get]によってGETリクエストを構築する際には、取得したい本のデータがある`url`を指定し、そしてどんなデータになることを期待(`expect`)するかを指定します。我々の場合、`url`には Project Gutenberg のウェブサイト上にあるデータを指定し、そのデータが文字列(`String`)であることを`expect`します。

<!--
The `Http.expectString GotText` line is saying a bit more than that we `expect` a `String` though. It is also saying that when we get a response, it should be turned into a `GotText` message:
-->
ただし、この`Http.expectString GotText`の部分は、`expect`するのは単なる`String`以上の何かであると示しています。また、あるレスポンスを受け取ったときに、`GotText`というメッセージに変換されなければならない事を示しています。


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
いくつか前の節にて`Result`型を使った事を思い出してください。これにより`update`関数の中で失敗の可能性についても完全に捉えることが可能となります。`update`関数といえば...

[get]: https://package.elm-lang.org/packages/elm/http/latest/Http#get

<!--
> **Note:** If you are wondering why `init` is a function (and why we are ignoring the argument) we will talk about it in the upcoming chapter on JavaScript interop! (Preview: the argument lets us get information from JS on initialization.)
-->
**Note:** もしあなたが、なぜ`init`が関数であるのか(そしてなぜ引数を無視しているのか)という事に疑問を抱いたら、続く JavaScriptとの相互運用 の章にて説明します！（予告: この引数により初期化時にJSから情報を受け取ることができます）




<!--
## `update`
-->
## `update`

<!--
Our `update` function is returning a bit more information as well:
-->
我々の`update`関数も同様にもう少しの情報を返します:


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
型シグネチャを見てみると、単に更新されたモデルが返されるだけでないことがわかります。ここでも _やはり_ Elmに実行して欲しい事を指示する**コマンド**を返します。

<!--
Moving on to the implementation, we pattern match on messages like normal. When a `GotText` message comes in, we inspect the `Result` of our HTTP request and update our model depending on whether it was a success or failure. The new part is that we also provide a command.
-->
実装では通常通りにメッセージに対してパターンマッチを行っています。`GotText`メッセージが来たときに、HTTPリクエストの`Result`の値を調べ、その結果が成功か失敗かによって我々のモデルを更新します。新しい部分は、ここでもやはりコマンドを返していることです。

<!--
So in the case that we got the full text successfully, we say `Cmd.none` to indicate that there is no more work to do. We already got the full text!
-->
つまり、全文の取得に成功した場合には`Cmd.none`としてこれ以上は何もしなくて良いことを示します。すでに全文を取得済みなのですから！

<!--
And in the case that there was some error, we also say `Cmd.none` and just give up. The text of the book did not load. If we wanted to get fancier, we could pattern match on the [`Http.Error`][Error] and retry the request if we got a timeout or something.
-->
そしてなんらかのエラーがあった場合には、やはり`Cmd.none`としてギブアップしてしまいます。本の内容を読み込むことができませんでしたので。もしより良い物にしたいのなら[`Http.Error`][Error]に対してパターンマッチを行い、タイムアウトなどのエラーであれば再度トライすることも可能です。

<!--
The point here is that however we decide to update our model, we are also free to issue new commands. I need more data! I want a random number! Etc.
-->
この`update`関数で大事なことは、モデルの更新をするかどうかを決めるだけでなく、新しいコマンドを発行する事も自由なのです。もっとデータが必要だ！とか乱数がほしい！だとか。

[Error]: https://package.elm-lang.org/packages/elm/http/latest/Http#Error



<!--
## `subscription`
-->
## `subscription`

<!--
The other new thing in this program is the `subscription` function. It lets you look at the `Model` and decide if you want to subscribe to certain information. In our example, we say `Sub.none` to indicate that we do not need to subscribe to anything, but we will soon see an example of a clock where we want to subscribe to the current time!
-->
このプログラムにおけるもう一つの新しい部分は`subscrption`関数になります。`Model`の情報から判断して何らかの情報に対する待ち受けするかどうかを決めることができます。我々の例では`Sub.none`として何も待ち受けする必要がないことを示していますが、後ほど現在時刻に対する待ち受けをする時計という例を見ることになるでしょう。



<!--
## Summary
-->
## サマリー

<!--
When we create a program with `Browser.element`, we set up a system like this:
-->
`Browser.element`を使ってプログラムを作ると、システムは以下のように構成されます:

![](diagrams/element.svg)

<!--
We get the ability to issue **commands** from `init` and `update`. This allows us to do things like make HTTP requests whenever we want. We also get the ability to **subscribe** to interesting information. (We will see an example of subscriptions later!)
-->
我々は`init`および`update`関数から**コマンド**を発行する方法を習得しました。これによりHTTPリクエストを送信するといったような事を、必要なときにできるようになりました。また、関心のある情報を**待ち受け**する方法も習得しました（後ほどサブスクリプションに関する例を見るでしょう！）。
