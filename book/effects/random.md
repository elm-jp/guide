# Random

---
<!--
#### [Clone the code](https://github.com/evancz/elm-architecture-tutorial/) or follow along in the [online editor](https://ellie-app.com/37gXN5G4T2sa1).
-->
#### [サンプルコード](https://github.com/evancz/elm-architecture-tutorial/)をダウンロードするか[オンラインエディタ](https://ellie-app.com/37gXN5G4T2sa1)で試してください。

---
<!--
We are going to make an app that rolls dice, producing a random number between 1 and 6.

We need the [`elm/random`][readme] package for this. The [`Random`][random] module in particular. Let&rsquo;s start by just looking at all the code. There are some new things, but do not worry. We will go through it all!
-->

サイコロを振るアプリケーションを作って見ましょう。1から6のランダムな数字を生成するものです。

ここではパッケージ[`elm/random`][readme]、特にモジュール[`Random`][random]が必要となります。まずはコード全体を見ていきましょう。新しい部分がいくつかありますが心配は無用です。後ほど全て説明するつもりです。

[readme]: https://package.elm-lang.org/packages/elm/random/latest
[random]: https://package.elm-lang.org/packages/elm/random/latest/Random

```elm
import Browser
import Html exposing (..)
import Html.Events exposing (..)
import Random



-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL


type alias Model =
  { dieFace : Int
  }


init : () -> (Model, Cmd Msg)
init _ =
  ( Model 1
  , Cmd.none
  )



-- UPDATE


type Msg
  = Roll
  | NewFace Int


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Roll ->
      ( model
      , Random.generate NewFace (Random.int 1 6)
      )

    NewFace newFace ->
      ( Model newFace
      , Cmd.none
      )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h1 [] [ text (String.fromInt model.dieFace) ]
    , button [ onClick Roll ] [ text "Roll" ]
    ]
```

<!--
Now there are a couple new things in this program. Let&rsquo;s work through them!
-->
このプログラムの中の2つの新しい部分について、取り組んでいきましょう。

## `update`

<!--
In the previous examples, the `update` function just produced a new `Model`. The new code is doing a bit more:
-->
これまでの例では、`update`関数は新しい`Model`を返すだけでしたが、新しいコードではもう一つ返します。

```elm
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Roll ->
      ( model
      , Random.generate NewFace (Random.int 1 6)
      )

    NewFace newFace ->
      ( Model newFace
      , Cmd.none
      )
```

<!--
Say this `update` function gets a `Roll` message. It is going to produce two values:

1. The `model` without any changes.
2. A **command** to generate a random integer between `1` and `6`.

These both go to Elm&rsquo;s runtime system:
-->
この`update`関数は`Roll`メッセージを受け取ると、次のような2つの値を返します：

1. `model`ですが変更はありません。
2. `1`から`6`の間でランダムな整数を生成するための**コマンド**。

![](diagrams/element.svg)

<!--
The runtime system (RTS) will handle these two values as follows:

1. When the RTS gets a new `Model`, it calls your `view` function. Does the DOM need to change? In this case, it does not!
2. When the RTS gets a command, it immediately starts working on it. In this case, the RTS generates a random number and sends a message like `NewFace 3` or `NewFace 5` back to our `update` function. So `Cmd Msg` is saying &ldquo;this is a command for the RTS, and the RTS will give us back a `Msg` about what happened.&rdquo;

Let&rsquo;s say the command produces a `NewFace 3` message. That triggers the second branch of our `update` function. In this case, we update our `Model` with the new value and give [`Cmd.none`](https://package.elm-lang.org/packages/elm/core/latest/Platform-Cmd#none) to indicate that we have no commands this time.
-->
ランタイムシステム(RTS)はこれらの2つの値を次のように処理します：

1. RTSが新しい`Model`を受け取ると`view`関数を呼び出します。DOMの変更が必要でしょうか？この場合は必要ありません！
2. RTSはあるコマンドを受け取ると、その処理をすぐに実行し始めます。この例では、RTSは乱数を生成し、`NewFace 3`や`NewFace 5`といったようなメッセージを`update`関数に返します。ここで`Cmd Msg`が意味するところは、&ldquo;このコマンドはRTSに対してのもので、何が起こったかについての`Msg`をRTSは返します&rdquo;ということです。

コマンドが`NewFace 3`というメッセージを発行したとすると、`update`関数の2番目の分岐が実行されます。そこでは、新しい値で`Model`が更新し、コマンドが不要で有ることを示す、[`Cmd.none`](https://package.elm-lang.org/packages/elm/core/latest/Platform-Cmd#none)を返します。

<!--
> **Note:** One crucial detail here is that **commands are data**. So just because you create a command does not mean it is happening. Here are some analogies:
>
> - Maybe you find a cake recipe (command) on the internet. It outlines exactly how to make a delicious cake. You have to give it to a baker (RTS) to actually turn it into a cake.
> - Maybe you have a grocery list (command) on your fridge. You need a sack of potatoes. You can only get those potatoes if you (RTS) go to the store and buy them.
> - Maybe I tell you to eat an entire watermelon in one bite (command) right this second. Did you do it? No! You (RTS) kept reading before you even *thought* about buying a tiny watermelon.
>
> None of these analogies are perfect, particularly because the Elm runtime system is much more reliable than you or a baker! When you give it a command, it starts working on it immediately and it follows your directions exactly.
-->

> **Note:** ここでとても重要な事は、**コマンドとはデータである**ということです。すなわち、あるコマンドを作ったからといって、それで何かが起こるということを意味しているわけではありません。いくつかのアナロジーを挙げてみます：
>
> - あるケーキのレシピ（コマンド）をインターネットで見つけたとしましょう。美味しいケーキをどのように作るかがそこには正確にまとめられています。実際にケーキを作るためには、このレシピをパン職人(RTS)に渡す必要があります。
> - 冷蔵庫の中にある食料品のリスト(コマンド)があるとします。ポテトが一袋が必要だとします。このポテトを入手するための方法は、あなた(RTS)がお店に行って買ってくることです。
> - スイカまるごと1個を一口で食べるように今この時点であなたに指示するとします(command)。出来ましたか？いいえ！小さなメロンを買ってこようかと*考える*よりも前に、あなた(RTS)はまだこの指示を読んでいたはずです。
>
> どのアナロジーも完璧ではありませんね、というのはElmのランタイムシステムはあなたやパン屋よりもずっと信頼性が高いからです！あなたがコマンドをランタイムシステムに渡すと、すぐに実行を開始してあなたの指示に正確に従います。

## `init`
<!--

In previous examples, `init` was a value specifying the initial `Model` for our Elm program. In our new version, it is a function:
-->

これまでの例では、`init`はElmプログラムにおける初期の`Model`を決めるための値でした。新しい例では以下のような関数になります：

```elm
init : () -> (Model, Cmd Msg)
init _ =
  ( Model 1
  , Cmd.none
  )
```
<!--

Like our new `update` function, we are now producing (1) a new model and (2) some commands for the RTS. In our dice rolling program, we give `Cmd.none` because we do not need to do anything on initialization, but later you may want to do things like trigger HTTP requests from here.
-->

新しい`update`関数のように、(1) 新しいモデル と (2) 何らかのコマンド をRTSに対して返します。サイコロを振るプログラムでは、初期化時には何もすることがありませんので、`Cmd.none`を返しますが、後々はここでHTTPリクエストを送信したくなるかもしれませんね。

<!--

> **Note:** Why is it taking that `()` argument though? We are just ignoring it. What is the point? Well, this program switches from [`Browser.sandbox`][sandbox] to [`Browser.element`][element], enabling the command features we have been looking at so far. It _also_ allows the program to get &ldquo;flags&rdquo; from JavaScript on initialization. So the `()` is saying that we are not getting any interesting flags. We will talk about this more in the chapter on interop. It is not too important right now!
-->

> **Note:** なぜ`()`を引数として取るのでしょうか？なんの説明もありませんが、どういった意味なのでしょうか？このプログラムでは、[`Browser.sandbox`][sandbox] から [`Browser.element`][element] へと切り替わり、これまで見てきたようにコマンドの機能が有効となりました。[`Browser.element`][element]では、プログラムの初期化時に、JavaScriptから&ldquo;flags&rdquo;を受け取ることを可能とします。つまり、`()`はflagsとしては何も受け取らないことを示しています。今の所はまだ重要ではありませんので、さらに詳しくはinteropに関するチャプターで取り上げる予定です。

[sandbox]: https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox
[element]: https://package.elm-lang.org/packages/elm/browser/latest/Browser#element


## `subscriptions`
<!--

The final new thing that we need to specify if we subscribe to anything. For now we are saying [`Sub.none`](https://package.elm-lang.org/packages/elm/core/latest/Platform-Sub#none) to indicate that there are no subscriptions. We will get into subscriptions in one of the next examples!
-->

最後の新しい部分は、何かを購読する際にはそれを明示する必要があるという事です。今のところは、[`Sub.none`](https://package.elm-lang.org/packages/elm/core/latest/Platform-Sub#none)として、サブスクリプションが不要であることを示しています。続く例の中でサブスクリプションについて学んでいく予定です。

<!--

# Summary

We have now seen our first **command** to generate random values.

Rather than generating random values willy-nilly, you create a [`Random.Generator`][generator] that describes exactly how to generate random values. In our case we used `Random.int 1 6`, but we could have made a weighted die with [`Random.weighted`][weighted] if we wanted.

From there we send our command off to the runtime system which (1) dutifully generates a random value to our exact specification and (2) sends it back as a `NewFace 6` or `NewFace 1` message.

At this point, the best way to improve your understanding of commands is just to see more of them! They will appear prominently with the `Http` and `WebSocket` libraries, so if you are feeling shaky, the only path forward is practicing with randomness and playing with other examples of commands!
-->

# サマリー

ここでは乱数を生成するために初めての**コマンド**の例を見てきました。

乱数を無理やり生成するのではなく、どのように乱数の生成をするのかという正確な記述として[`Random.Generator`][generator]を作りました。今回の例では、`Random.int 1 6`を使いましたが、[`Random.weighted`][weighted]を使うと目の偏ったサイコロを作ることも出来ます。

そして、このコマンドをランタイムシステムに送りました。ランタイムシステムは(1)仕様に厳密に従うような乱数を生成し、(2)それを`NewFace 6`や`NewFace 1`の様なメッセージとして返します。

今の時点で、コマンドに関する理解を深めるための最良の方法は、もっと多くのコマンドの例に触れることです。コマンドについては`Http`や`WebSocket`等のライブラリによくでてきますので、もし心もとないと感じた時に取り組むべき唯一の方法は、乱数の使い方に慣れる事とコマンドに関するこれらの例を試してみることです。

[generator]: https://package.elm-lang.org/packages/elm/random/latest/Random#Generator
[weighted]: https://package.elm-lang.org/packages/elm/random/latest/Random#weighted

<!--

> **Exercises:** Here are a few ideas to make the program here a bit more interesting!
>
>   - Instead of showing a number, show the die face as an image.
>   - Instead of showing an image of a die face, use [`elm/svg`][svg] to draw it yourself.
>   - Create a weighted die with [`Random.weighted`][weighted].
>   - Add a second die and have them both roll at the same time.
>   - Have the dice flip around randomly before they settle on a final value.
-->

> **練習問題：** このプログラムをもう少し楽しいものにするために幾つかのアイデアがあります！
>
>   - 数字の代わりにサイコロの面を画像で表示してみましょう。
>   - サイコロの面を画像で表示する代わりに、[`elm/svg`][svg]を使って実際に描いてみましょう。
>   - 目の偏ったサイコロを[`Random.weighted`][weighted]で作ってみましょう。
>   - 2番目のサイコロを追加して、2つを同時に振ってみましょう。
>   - サイコロの目が決まる前に、ランダムにサイコロの目が切り替わるようにしてみましょう。

[svg]: https://package.elm-lang.org/packages/elm/svg/latest/
