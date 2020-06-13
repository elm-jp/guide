<!--
# Buttons
-->
# ボタン

<!--
Our first example is a counter that can be incremented or decremented.
-->
最初の例はインクリメントやデクリメントを行うカウンタの作成です。

<!--
I included the full program below. Click the blue "Edit" button to mess with it in the online editor. Try changing text on one of the buttons. **Click the blue button now!**
-->
以下にプログラムの全文を掲載しました。青い"Edit"ボタンをクリックして、オンラインエディタでいじってみましょう。ボタンの文字を書き換えてみてください。**今すぐ青いボタンをクリック！**

<div class="edit-link"><a href="https://elm-lang.org/examples/buttons">Edit</a></div>

```elm
import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)



-- MAIN


main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL

type alias Model = Int

init : Model
init =
  0


-- UPDATE

type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1


-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

<!--
Now that you have poked around the code a little bit, you may have some questions. What is the `main` value doing? How do the different parts fit together? Let's go through the code and talk about it.
-->
コードを少しいじってみたことで、疑問を持ったかもしれませんね。この`main`という値は何をしているのだろうか？どのようにして異なるパーツを組み合わせているのだろうか？と。コードを見ながら説明していきましょう。

<!--
> **Note:** The code here uses [type annotations](/types/reading_types.html), [type aliases](/types/type_aliases.html), and [custom types](/types/custom_types.html). The point of this section is to get a feeling for The Elm Architecture though, so we will not cover them until a bit later. I encourage you to peek ahead if you are getting stuck on these aspects!
-->
> **Note:** ここのコードは[型注釈](/types/reading_types.html)と [型エイリアス](/types/type_aliases.html)、[カスタム型](/types/custom_types.html)を使用しています。この節のポイントはThe Elm Architectureの雰囲気をつかむことなので、これらはもう少し後で取り上げます。もしこういった面で行き詰まっているならば上記の節を覗いてみることをおすすめします！

## Main

<!--
The `main` value is special in Elm. It describes what gets shown on screen. In this case, we are going to initialize our application with the `init` value, the `view` function is going to show everything on screen, and user input is going to be fed into the `update` function. Think of this as the high-level description of our program.
-->
`main`はElmでは特別な値で、画面に何を表示するかを記述します。この例では、アプリケーションを`init`で初期化して、`view`関数ですべてを画面に表示し、ユーザーからの入力を`update`関数に渡します。これがプログラムの大まかな概要だと考えてください。


## Model

<!--
Data modeling is extremely important in Elm. The point of the **model** is to capture all the details about your application as data.
-->
Elmではデータモデリングが非常に重要です。**モデル**のポイントは、アプリケーションに関するすべての詳細をデータとして取り込むことです。

<!--
To make a counter, we need to keep track of a number that is going up and down. That means our model is really small this time:
-->
カウンターを作るためには、増えたり減ったりする数を把握しておく必要がありますね。よって、今回のモデルは本当に小さなものとなります。

```elm
type alias Model = Int
```

<!--
We just need an `Int` value to track the current count. We can see that in our initial value:
-->
現在のカウントを追跡するためには`Int`型の値が必要です。これは初期値で確認できます。

```elm
init : Model
init =
  0
```

<!--
The initial value is zero, and it will go up and down as people press different buttons.
-->
初期値はゼロで、各ボタンを押すと増えたり減ったりします。


## View

<!--
We have a model, but how do we show it on screen? That is the role of the `view` function:
-->
モデルは用意しました。ですがそれを画面に表示するにはどうすればいいでしょうか？それは`view`関数の役割です。

```elm
view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

<!--
This function takes in the `Model` as an argument. It outputs HTML. So we are saying that we want to show a decrement button, the current count, and an increment button.
-->
この関数は`Model`を引数として受け取り、HTMLを出力します。デクリメントボタン、現在のカウント、インクリメントボタンを表示したいというわけです。

<!--
Notice that we have an `onClick` handler for each button. These are saying: **when someone clicks, generate a message**. So the plus button is generating an `Increment` message. What is that and where does it go? To the `update` function!
-->
各ボタンに`onClick`ハンドラーがあることに注目してください。**クリックするとメッセージを生成する**ということです。つまりこのプラスボタンは`Increment`メッセージを生成しています。これは何で、どこに行くのでしょうか？`update`関数に行きます！


## Update

<!--
The `update` function describes how our `Model` will change over time.
-->
`update`関数は`Model`が時間の経過とともにどのように変化するかを記述します。

<!--
We define two messages that it might receive:
-->
受け取る可能性のある2つのメッセージを定義します。

```elm
type Msg = Increment | Decrement
```

<!--
From there, the `update` function just describes what to do when you receive one of these messages.
-->
それでは、メッセージを受信したとき何をすべきかを `update` 関数にそのまま記述しましょう。

```elm
update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1
```

<!--
If you get an `Increment` message, you increment the model. If you get a `Decrement` message, you decrement the model.
-->
`Increment`メッセージを受け取ったらモデルをインクリメントし、`Decrement`メッセージを受け取ったらデクリメントします。

<!--
So whenever we get a message, we run it through `update` to get a new model. We then call `view` to figure out how to show the new model on screen. Then repeat! User input generates a message, `update` the model, `view` it on screen. Etc.
-->
メッセージを受け取るたびに`update`を実行して新しいモデルを取得します。次に`view`を呼び出して新しいモデルを画面に表示しようとします。これの繰り返しです！。ユーザーからの入力はメッセージを生成し、`update`はモデルを更新し、`view`はそれを画面に表示する、などです。


<!--
## Overview
-->
## 概要

<!--
Now that you have seen all the parts of an Elm program, it may be a bit easier to see how they fit into the diagram we saw earlier:
-->
これでElmのプログラムのすべてのパーツを見たわけですが、先ほど見た図にどのように当てはまるかを見てみると、もう少しわかりやすいかもしれません。

<!--
![Diagram of The Elm Architecture](buttons.svg)
-->
![The Elm Architectureの図](buttons.svg)

<!--
Elm starts by rendering the initial value on screen. From there you enter into this loop:
-->
Elmは初期値を画面に表示することから始まります。そこからこのループに入ります。

<!--
1. Wait for user input.
2. Send a message to `update`
3. Produce a new `Model`
4. Call `view` to get new HTML
5. Show the new HTML on screen
6. Repeat!
-->
1. ユーザーからの入力を待ちます
2. `update`にメッセージを送ります
3. 新しい`Model`を生成します
4. `view`関数を呼び出して新しいHTMLを取得します
5. 画面上に新しいHTMLを表示します
6. 繰り返します！

<!--
This is the essence of The Elm Architecture. Every example we see from now on will be a slight variation on this basic pattern.
-->
これがThe Elm Architectureの本質です。これから見るすべての例は、この基本的なパターンにわずかなバリエーションを加えたものになります。

<!--
> **Exercise:** Add a button to reset the counter to zero:
>
> 1. Add a `Reset` variant to the `Msg` type
> 2. Add a `Reset` branch in the `update` function
> 3. Add a button in the `view` function.
-->
> **演習:** カウンターをゼロにリセットするボタンを追加してみましょう
>
> 1. `Reset`バリアントを`Msg`型に追加します
> 2. `update`関数に`Reset`の分岐を追加します
> 3. `view`関数にボタンを追加します
>
<!--
> You can edit the example in the online editor [here](https://elm-lang.org/examples/buttons).
-->
> このサンプルを[こちら](https://elm-lang.org/examples/buttons)のオンラインエディタで編集できます。
>
<!--
> If that goes well, try adding another button to increment by steps of 10.
-->
> これがうまくいったら、10ずつ増えるボタンを追加してみてください。
