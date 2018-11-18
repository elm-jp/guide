# Time

---
<!--
#### [Clone the code](https://github.com/evancz/elm-architecture-tutorial/) or follow along in the [online editor](https://ellie-app.com/37gYpCSxQHGa1).
-->
#### [サンプルコード](https://github.com/evancz/elm-architecture-tutorial/)をダウンロードするか[オンラインエディタ](https://ellie-app.com/37gYpCSxQHGa1)で試してください。
---
<!--
Now we are going to make a digital clock. (Analog will be an exercise!)

So far we have focused on commands. With the HTTP and randomness examples, we commanded Elm to do specific work immediately, but that is sort of a weird pattern for a clock. We _always_ want to know the current time. This is where **subscriptions** come in!

After you read through the code, we will talk about how we are using the [`elm/time`][time] package here:
-->
まずはデジタル時計を作って見ましょう（アナログ時計は今後の課題です！）

これまでは、コマンドに注目してきました。乱数に関する例では、ランダムな値をよこすようランタイムシステムに対してコマンドを発行しましたが、時計の例の場合には奇妙な感じのパターンとなってしまいます。現在の時刻を _常に_ 知りたいのです。ここで **サブスクリプション** が登場します。

あなたが以下のコードに一通り目を通した後に、どのように[`elm/time`][time]パッケージを使用するかを説明していきます：

[time]: https://package.elm-lang.org/packages/elm/time/latest/

```elm
import Browser
import Html exposing (..)
import Task
import Time



-- MAIN


main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }



-- MODEL


type alias Model =
  { zone : Time.Zone
  , time : Time.Posix
  }


init : () -> (Model, Cmd Msg)
init _ =
  ( Model Time.utc (Time.millisToPosix 0)
  , Task.perform AdjustTimeZone Time.here
  )



-- UPDATE


type Msg
  = Tick Time.Posix
  | AdjustTimeZone Time.Zone



update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Tick newTime ->
      ( { model | time = newTime }
      , Cmd.none
      )

    AdjustTimeZone newZone ->
      ( { model | zone = newZone }
      , Cmd.none
      )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Time.every 1000 Tick



-- VIEW


view : Model -> Html Msg
view model =
  let
    hour   = String.fromInt (Time.toHour   model.zone model.time)
    minute = String.fromInt (Time.toMinute model.zone model.time)
    second = String.fromInt (Time.toSecond model.zone model.time)
  in
  h1 [] [ text (hour ++ ":" ++ minute ++ ":" ++ second) ]
```
<!-- 
Let&rsquo;s go through the new stuff.
-->

新しく導入された部分を見ていきましょう。

<!-- 
## `Time.Posix` and `Time.Zone`
-->

## `Time.Posix` と `Time.Zone`

<!--
To work with time successfully in programming, we need three different concepts:
-->
プログラミングにおいて時間を正しく取り扱うためには、以下の３つの概念が必要となります：

<!--
- **Human Time** &mdash; This is what you see on clocks (8am) or on calendars (May 3rd). Great! But if my phone call is at 8am in Boston, what time is it for my friend in Vancouver? If it is at 8am in Tokyo, is that even the same day in New York? (No!) So between [time zones][tz] based on ever-changing political boundaries and inconsistent use of [daylight saving time][dst], human time should basically never be stored in your `Model` or database! It is only for display!
-->

- **人間にとっての時間** &mdash; これは時計（午前8時）やカレンダー（5月3日）で目にするものです。しかし、もしボストンで午前8時に電話をかけると、バンクーバーにいる友人にとっては何時になるでしょうか？もし、東京で午前8時だとして、ニューヨークでも同じ日付なのでしょうか？（違います！）人間にとっての時間とは、常に変化する政治的な境界に基づいた[タイムゾーン][tz]や、一貫性のない使われ方をする[サマータイム][dst]によって異なってしまうので、基本的には`Model`やデータベースに保存されるべきではありません。あくまでも表示だけの目的とすべきでしょう！

<!--
- **POSIX Time** &mdash; With POSIX time, it does not matter where you live or what time of year it is. It is just the number of seconds elapsed since some arbitrary moment (in 1970). Everywhere you go on Earth, POSIX time is the same.
-->

- **POSIX時間** &mdash; POSIX時間では、どこに住んでいるとか、どの時期であるとかは関係ありません。あくまでも（1970年の）ある時間からの経過秒数を数字として表しているだけです。地球上のどこに行こうとも、POSIX時間は同じなのです。

<!--
- **Time Zones** &mdash; A “time zone” is a bunch of data that allows you to turn POSIX time into human time. This is _not_ just `UTC-7` or `UTC+3` though! Time zones are way more complicated than a simple offset! Every time [Florida switches to DST forever][florida] or [Samoa switches from UTC-11 to UTC+13][samoa], some poor soul adds a note to the [IANA time zone database][iana]. That database is loaded onto every computer, and between POSIX time and all the corner cases in the database, we can figure out human times!
-->
- **タイムゾーン** &mdash; "タイムゾーン"とは、POSIX時間から人間にとっての時間へ変換するために必要なデータの集まりです。これは単なる`UTC-7`とか`UTC+3`などとは _異なります_ ！タイムゾーンは単純なオフセットではなく、かなりもっと複雑なのです！[フロリダにおけるサマータイムへの恒久的な移行][florida]、[サモアでのUTC-11からUCT+13への移行][samoa]、などと[IANAのタイムゾーンデータベース][iana]に無慈悲な脚注が追加されてしまいます。このデータベースが個々のコンピュータに読み込まれ、POSIX時間をデータベースに記載された全てのコーナーケースの情報を反映するよう計算することにより、人間にとっての時間として表示することが可能となるのです。

<!--
So to show a human being a time, you must always know `Time.Posix` and `Time.Zone`. That is it! So all that “human time” stuff is for the `view` function, not the `Model`. In fact, you can see that in our `view`:
-->
したがって人に対して時間を示すためには、常に`Time.Posix`と`Time.Zone`について知っていなければなりません。そうです！全ての"人間にとっての時間"なるものは`view`関数のためであって、`Model`のためではありません。その事は以下の`view`に見ることができます：

```elm
view : Model -> Html Msg
view model =
  let
    hour   = String.fromInt (Time.toHour   model.zone model.time)
    minute = String.fromInt (Time.toMinute model.zone model.time)
    second = String.fromInt (Time.toSecond model.zone model.time)
  in
  h1 [] [ text (hour ++ ":" ++ minute ++ ":" ++ second) ]
```
<!--
The [`Time.toHour`][toHour] function takes `Time.Zone` and `Time.Posix` gives us back an `Int` from `0` to `23` indicating what hour it is in _your_ time zone.
-->
関数[`Time.toHour`][toHour]は、`Time.Zone`と`Time.Posix`を引数にとり、_あなた_のタイムゾーンにおける時間を示す`0`から`23`の`Int`型の数字を返します。

<!--
There is a lot more info about handling times in the README of [`elm/time`][time]. Definitely read it before doing more with time! Especially if you are working with scheduling, calendars, etc.
-->
時間を取り扱うためのさらに多くの情報が[`elm/time`][time]のREADMEに含まれていますので、時間についてもっと何かする前には必ず読むべきです！特に、もしスケジューリングやカレンダー等について何かするなら読んでみてください。

[tz]: https://en.wikipedia.org/wiki/Time_zone
[dst]: https://en.wikipedia.org/wiki/Daylight_saving_time
[iana]: https://en.wikipedia.org/wiki/IANA_time_zone_database
[samoa]: https://en.wikipedia.org/wiki/Time_in_Samoa
[florida]: https://www.npr.org/sections/thetwo-way/2018/03/08/591925587/
[toHour]: https://package.elm-lang.org/packages/elm/time/latest/Time#toHour


## `subscriptions`

<!--
Okay, well how should we get our `Time.Posix` though? With a **subscription**!
-->
それではどのように`Time.Posix`を取得するのでしょうか？そう**サブスクリプション**です！

```elm
subscriptions : Model -> Sub Msg
subscriptions model =
  Time.every 1000 Tick
```

<!--
We are using the [`Time.every`][every] function:
-->
[`Time.every`][every]関数を使っています：

[every]: https://package.elm-lang.org/packages/elm/time/latest/Time#every

```elm
every : Float -> (Time.Posix -> msg) -> Sub msg
```
<!--
It takes two arguments:

1. A time interval in milliseconds. We said `1000` which means every second. But we could also say `60 * 1000` for every minute, or `5 * 60 * 1000` for every five minutes.
2. A function that turns the current time into a `Msg`. So every second, the current time is going to turn into a `Tick <time>` for our `update` function.

That is the basic pattern of any subscription. You give some configuration, and you describe how to produce `Msg` values. Not too bad!
-->
この関数は2つの引数を取ります：

1. ミリ秒単位での時間間隔。`1000`と言えば毎秒を意味します。`60 * 1000`とすれば毎分、`5 * 50 * 1000`とすれば5分毎と言う事も出来ます。
2. 現時刻をある`Msg`に変換する関数、すなわち毎秒ごとに、現時刻が`update`関数のための`Tick <time>`メッセージに変換されていきます。

これがサブスクリプションの基本的なパターンです。何らかの設定を与え、どのように`Msg`の値を発行するか記述します。悪くないでしょ！

## `Task.perform`

<!--
Getting `Time.Zone` is a bit trickier. Our program created a **command** with:
-->
`Time.Zone`を取得するのはちょっと工夫が必要です。次のような**コマンド**を発行しました：

```elm
Task.perform AdjustTimeZone Time.here
```

<!--
Reading through the [`Task`][task] docs is the best way to understand that line. The docs are written to actually explain the new concepts, and I think it would be too much of a digression to include a worse version of that info here. The point is just that we command the runtime to give us the `Time.Zone` wherever the code is running.
-->
この行を理解するための最良の方法は、[`Task`][task]のドキュメントに一通り目を通すことです。そのドキュメントの中で、実際に`Task`という新しい概念について説明がなされています。ここで中途半端な説明をして脱線するのはやめようと思いますが、大事な点はランタイムシステムに対して、このコードの実行時に`Time.Zone`を返すように指示しているだけということです。

[utc]: https://package.elm-lang.org/packages/elm/time/latest/Time#utc
[task]: https://package.elm-lang.org/packages/elm/core/latest/Task

<!--
> **Exercises:**
-->
> **練習問題：**
>
<!--
> - Add a button to pause the clock, turning the `Time.every` subscription off.
> - Make the digital clock look nicer. Maybe add some [`style`][style] attributes.
> - Use [`elm/svg`][svg] to make an analog clock with a red second hand!
-->
> - 時計を止めるためのボタンを追加し、`Time.every`のサブスクリプションを止めてみましょう。
> - デジタル時計の見栄えを良くしてください。なんらかの[`style`][style]属性を追加してみましょう。
> - [`elm/svg`][svg]を使って、赤い秒針のアナログ時計を作ってみましょう。

[style]: https://package.elm-lang.org/packages/elm/html/latest/Html-Attributes#style
[svg]: https://package.elm-lang.org/packages/elm/svg/latest/
