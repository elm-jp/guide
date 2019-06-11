# Random

---
<!--
#### [Clone the code](https://github.com/evancz/elm-architecture-tutorial/) or follow along in the [online editor](https://ellie-app.com/37gXN5G4T2sa1).
-->
### [サンプルコード]((https://github.com/evancz/elm-architecture-tutorial/)をダウンロードするか[オンラインエディタ](https://ellie-app.com/37gXN5G4T2sa1)で試してください。
---


<!--
So far we have only seen commands to make HTTP requests, but we can command other things as well, like generating random values! So we are going to make an app that rolls dice, producing a random number between 1 and 6.
-->
これまで見てきたコマンドはHTTPリクエストを送るためのコマンドだけでしたが、ランダムな値を生成するというような他のコマンドを発行することができます。この節では1から6のランダムな数字を生成するサイコロアプリケーションを作っていきましょう。

<!--
We need the [`elm/random`][readme] package for this. The [`Random`][random] module in particular. Let&rsquo;s start by just looking at all the code:
-->
ここではパッケージ[`elm/random`][readme]が必要となります。特に[`Random`][random]モジュールが重要となります。まずはコード全体を見ていきましょう：

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
The new thing here is command issued in the `update` function:
-->
ここでの新しい部分は`update`関数の中で発行されるコマンドです：



```elm
Random.generate NewFace (Random.int 1 6)
```

<!--
Generating random values works a bit different than in languages like JavaScript, Python, Java, etc. So let&rsquo;s see how it works in Elm!
-->
乱数生成の方法はJavaScript、Python、Javaやその他の言語とはやや異なります。Elmの場合にどのようになるか見ていきましょう！


<!--
## Random Generators
-->
## 乱数生成器

<!--
The core idea is that we have random `Generator` that describes _how_ to generate a random value. For example:
-->
ここで中心となる概念は、乱数生成の_方法_が記述された乱数生成器`Generator`を使うということです。例えば：


```elm
import Random

probability : Random.Generator Float
probability =
  Random.float 0 1

roll : Random.Generator Int
roll =
  Random.int 1 6

usuallyTrue : Random.Generator Bool
usuallyTrue =
  Random.weighted (80, True) [ (20, False) ]
```

<!--
So here we have three random generators. The `roll` generator is saying it will produce an `Int`, and more specifically, it will produce an integer between `1` and `6` inclusive. Likewise, the `usuallyTrue` generator is saying it will produce a `Bool`, and more specifically, it will be true 80% of the time.
-->
ここでは三つの乱数生成器が定義されています。乱数生成器`roll`関数は`Int`型の値を生成すると定義されており、より正確に言うならば`1`から`6`までの間の整数を生成すると定義されています。同様に、乱数生成器`usuallyTrue`関数は`Bool`型の値を生成すると定義されており、より正確に言うと80%の場合は真となります。

<!--
The point is that we are not actually generating the values yet. We are just describing _how_ to generate them. From there you use the [`Random.generate`][gen] to turn it into a command:
-->
大事な点はこの段階では値の生成は実際には行われていないということです。その値を生成するための_方法_がが記述されているだけです。そこから[`Random.generate`][gen]を使ってコマンドに変換します：


```elm
generate : (a -> msg) -> Generator a -> Cmd msg
```

<!--
When the command is performed, the `Generator` produces some value, and then that gets turned into a message for your `update` function. So in our example, the `Generator` produces a value between 1 and 6, and then it gets turned into a message like `NewFace 1` or `NewFace 4`. That is all we need to know to get our random dice rolls, but generators can do quite a bit more!
-->
このコマンドが実行されると、`Generator`は何らかの値を生成し、あなたのコードの`update`関数で処理されるメッセージに変換されます。我々の例では`Generator`は1から6の間の値を生成し、`NewFace 1`や`NewFace 4`などのメッセージに変換されます。サイコロを振る際に必要なのはこれで全てですが、乱数生成器にはもっと様々な使い方があります！

[gen]: https://package.elm-lang.org/packages/elm/random/latest/Random#generate



<!--
## Combining Generators
-->
## 乱数生成器の結合

<!--
Once we have some simple generators like `probability` and `usuallyTrue`, we can start snapping them together with functions like [`map3`](https://package.elm-lang.org/packages/elm/random/latest/Random#map3). Imagine we want to make a simple slot machine. We could create a generator like this:
-->
`probability` や `usuallyTrue`といったシンプルな乱数生成器を一度用意すれば、それらを[`map3`](https://package.elm-lang.org/packages/elm/random/latest/Random#map3)のような関数によって結合することができるようになってきます。シンプルなスロットマシーンを作りたくなったとしましょう。例えば次のような乱数生成器を作ることができます：


```elm
import Random

type Symbol = Cherry | Seven | Bar | Grapes

symbol : Random.Generator Symbol
symbol =
  Random.uniform Cherry [ Seven, Bar, Grapes ]

type alias Spin =
  { one : Symbol
  , two : Symbol
  , three : Symbol
  }

spin : Random.Generator Spin
spin =
  Random.map3 Spin symbol symbol symbol
```

<!--
We first create `Symbol` to describe the pictures that can appear on the slot machine. We then create a random generator that generates each symbol with equal probability.
-->
最初にスロットマシーンの絵柄を表すための`Symbol`型を用意します。そして同じ確率でそれぞれの絵柄を返す乱数生成器を作ります。

<!--
From there we use `map3` to combine them into a new `spin` generator. It says to generate three symbols and then put them together into a `Spin`.
-->
次に`map3`関数を使ってこの乱数生成器を結合して新たな乱数生成器`spin`を作ります。三つの絵柄を生成しそれらを`Spin`型の値にまとめるということを示しています。

<!--
The point here is that from small building blocks, we can create a `Generator` that describes pretty complex behavior. And then from our application, we just have to say something like `Random.generate NewSpin spin` to get the next random value.
-->
ここで大事な点は、小さな構成要素から始めてとても複雑なふるまいをする`Generator`を生成できるということです。また、サイコロアプリケーションから分かる通り、新しい乱数値を得るためには`Random.generate NewSpin spin`のように呼び出すだけでよいのです。

<!--
> **Exercises:** Here are a few ideas to make the example code on this page a bit more interesting!
>
>   - Instead of showing a number, show the die face as an image.
>   - Instead of showing an image of a die face, use [`elm/svg`][svg] to draw it yourself.
>   - Create a weighted die with [`Random.weighted`][weighted].
>   - Add a second die and have them both roll at the same time.
>   - Have the dice flip around randomly before they settle on a final value.
-->
> **練習問題：** この例のコードをもう少し楽しいものにするために幾つかのアイデアがあります！
>
>   - 数字の代わりにサイコロの面を画像で表示してみましょう。
>   - サイコロの面を画像で表示する代わりに、[`elm/svg`][svg]を使って実際に描いてみましょう。
>   - 目の偏ったサイコロを[`Random.weighted`][weighted]で作ってみましょう。
>   - 2個目のサイコロを追加して、2つを同時に振ってみましょう。
>   - サイコロの目が決まる前に、ランダムにサイコロの目が切り替わるようにしてみましょう。

[svg]: https://package.elm-lang.org/packages/elm/svg/latest/
[weighted]: https://package.elm-lang.org/packages/elm/random/latest/Random#weighted
