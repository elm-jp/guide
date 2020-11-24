<!--
# JSON
-->
# JSON

<!--
We just saw an example that uses HTTP to get the content of a book. That is great, but a ton of servers return data in a special format called JavaScript Object Notation, or JSON for short.
-->
前節ではHTTPリクエストを使ってある本の内容を取得する例を見てきました。これはこれで素晴らしいのですが、非常に多くのサーバーはJavaScript Object Notation（略してJSON）と呼ばれる特別な形式でデータを返してきます。

<!--
So our next example shows how to fetch some JSON data, allowing us to press a button to show random cat GIFs. Click the blue "Edit" button and look through the program a bit. Try not to only look at the cats! **Click the blue button now!**
-->

そこで、次の例では JSON データを取得する方法を紹介します。これを利用して「押すとランダムな猫の GIF 画像を表示するボタン」を作ることができます。青い "Edit" ボタンをクリックしてこのプログラムに目を通してみてください。猫ばかり見ていてはいけませんよ！ **今すぐ青いボタンをクリック！**

<div class="edit-link"><a href="https://elm-lang.org/examples/cat-gifs">Edit</a></div>

```elm
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (Decoder, field, string)



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
  (Loading, getRandomCatGif)



-- UPDATE


type Msg
  = MorePlease
  | GotGif (Result Http.Error String)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    MorePlease ->
      (Loading, getRandomCatGif)

    GotGif result ->
      case result of
        Ok url ->
          (Success url, Cmd.none)

        Err _ ->
          (Failure, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h2 [] [ text "Random Cats" ]
    , viewGif model
    ]


viewGif : Model -> Html Msg
viewGif model =
  case model of
    Failure ->
      div []
        [ text "I could not load a random cat for some reason. "
        , button [ onClick MorePlease ] [ text "Try Again!" ]
        ]

    Loading ->
      text "Loading..."

    Success url ->
      div []
        [ button [ onClick MorePlease, style "display" "block" ] [ text "More Please!" ]
        , img [ src url ] []
        ]



-- HTTP


getRandomCatGif : Cmd Msg
getRandomCatGif =
  Http.get
    { url = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat"
    , expect = Http.expectJson GotGif gifDecoder
    }


gifDecoder : Decoder String
gifDecoder =
  field "data" (field "image_url" string)
```

<!--
This example is pretty similar to the last one:
-->
この例は前節のものと非常によく似ていますね：

<!--
- `init` starts us off in the `Loading` state, with a command to get a random cat GIF.
- `update` handles the `GotGif` message for whenever a new GIF is available. Whatever happens there, we do not have any additional commands. It also handles the `MorePlease` message when someone presses the button, issuing a command to get more random cats.
- `view` shows you the cats!
-->
- `init`関数は`Loading`の状態とランダムな猫のGIF画像を取得するコマンドの組から始まります。
- `update`関数では、新しいGIF画像が得られる時の`GotGif`メッセージを処理します。成功か失敗かにかかわらず、続くコマンドがないことを示すCmd.noneを返しています。また、誰かがボタンが押した際に発生する`MorePlease`メッセージも処理し、ランダムな猫の画像を更に取得するためのコマンドを発行しています。
- `view`関数では取得された猫のGIF画像を表示します！

<!--
The main difference is in the `getRandomCatGif` definition. Instead of using `Http.expectString`, we have switched to `Http.expectJson`. What is the deal with that?
-->
前節との主な違いは`getRandomCatGif`関数の定義にあります。`Http.expectString`関数を使用する代わりに、`Http.expectJson`に切り替えました。これはどういうことでしょうか？


<!--
## JSON
-->
## JSON

<!--
When you ask [`api.giphy.com`](https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat) for a random cat GIF, their server produces a big string of JSON like this:
-->

サイト[`api.giphy.com`](https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat)に対してランダムな猫のGIF画像を要求すると、対応するサーバーは次のようなJSON形式の長い文字列を生成します：

```json
{
  "data": {
    "type": "gif",
    "id": "l2JhxfHWMBWuDMIpi",
    "title": "cat love GIF by The Secret Life Of Pets",
    "image_url": "https://media1.giphy.com/media/l2JhxfHWMBWuDMIpi/giphy.gif",
    "caption": "",
    ...
  },
  "meta": {
    "status": 200,
    "msg": "OK",
    "response_id": "5b105e44316d3571456c18b3"
  }
}
```

<!--
We have no guarantees about any of the information here. The server can change the names of fields, and the fields may have different types in different situations. It is a wild world!
-->
ここに含まれている情報について、我々はなんの裏付けも持っていません。サーバーはフィールド名を変更することもできますし、状況によって各フィールドは異なる型を持つ可能性もあります。荒んだ世界なのです！

<!--
In JavaScript, the approach is to just turn JSON into JavaScript objects and hope nothing goes wrong. But if there is some typo or unexpected data, you get a runtime exception somewhere in your code. Was the code wrong? Was the data wrong? It is time to start digging around to find out!
-->
JavaScriptの世界で使われる手法は、JSONを単にJavaScriptオブジェクトに変換し、何も間違いが起こらないよう祈るだけです。しかし、もし何らかのタイプミスや想定外のデータに遭遇すると、あなたのコードのどこかで実行時例外が発生してしまいます。コードの間違いなのか？それともデータの間違いなのか？その原因を探る作業の始まりです！

<!--
In Elm, we validate the JSON before it comes into our program. So if the data has an unexpected structure, we learn about it immediately. There is no way for bad data to sneak through and cause a runtime exception three files over. This is accomplished with JSON decoders.
-->
Elmの世界では、我々のプログラムにデータを取り込むより前にJSONを検証します。もしデータに想定外の形式が含まれていれば、すぐにその点について気づくはずです。おかしなデータが忍びこんで、忍び込んだところからちょっと離れた別の場所で実行時例外を発するような余地はありません。これはJSONデコーダーによって達成されるのです。



<!--
## JSON Decoders
-->
## JSONデコーダー

<!--
Say we have some JSON:
-->
次のようなJSONがあるとします：


```json
{
	"name": "Tom",
	"age": 42
}
```

<!--
We need to run it through a `Decoder` to access specific information. So if we wanted to get the `"age"`, we would run the JSON through a `Decoder Int` that describes exactly how to access that information:
-->
特定の情報にアクセスするためには、このJSONを`Decoder`に通す必要があります。もし`"age"`の値が欲しいとしたら、どのようにこの情報にアクセスするかを定めたデコーダー`Decoder Int`に通します：

![](diagrams/int.svg)

<!--
If all goes well, we get an `Int` on the other side! And if we wanted the `"name"` we would run the JSON through a `Decoder String` that describes exactly how to access it:
-->
全てが上手く行けば、出力側で`Int`型の値を得ます。次にもし`"name"`の値が欲しいとしたら、どのようにこの情報にアクセスするかを厳密に定めたデコーダー`Decoder String`に通します：

![](diagrams/string.svg)

<!--
If all goes well, we get a `String` on the other side!
-->
全てがうまく行けば、出力側で`String`型の値を得ます！

<!--
How do we create decoders like this though?
-->
ではどうやってこの様なデコーダーを作ったらよいのでしょうか？


<!--
## Building Blocks
-->
## 構成要素

<!--
The [`elm/json`][json] package gives us the [`Json.Decode`][decode] module. It is filled with tiny decoders that we can snap together.
-->
パッケージ[`elm/json`][json]に[`Json.Decode`][decode]モジュールが含まれています。このモジュールには複数の最小単位のデコーダーが含まれていて、それらを組み合わせることができます。

[json]: https://package.elm-lang.org/packages/elm/json/latest/
[decode]: https://package.elm-lang.org/packages/elm/json/latest/Json-Decode

<!--
So to get `"age"` from `{ "name": "Tom", "age": 42 }` we would create a decoder like this:
-->
例えば、`{ "name": "Tom", "age": 42 }`から`"age"`を取得するためには、次のようなデコーダーを用意します：


```elm
import Json.Decode exposing (Decoder, field, int)

ageDecoder : Decoder Int
ageDecoder =
  field "age" int

 -- int : Decoder Int
 -- field : String -> Decoder a -> Decoder a
```

<!--
The [`field`][field] function takes two arguments:
-->
ここで[`field`][field]関数は2つの引数をとります：

<!--
1. `String` &mdash; a field name. So we are demanding an object with an `"age"` field.
2. `Decoder a` &mdash; a decoder to try next. So if the `"age"` field exists, we will try this decoder on the value there.
-->
1. `String` &mdash; フィールド名。つまりこのデコーダーは`"age"`フィールドを含むオブジェクトを要求しています。
2. `Decoder a` &mdash; 次に試すべきデコーダー。もし`"age"`フィールドが存在すれば、その値のデコード処理をこのデコーダーで試みます。

<!--
So putting it together, `field "age" int` is asking for an `"age"` field, and if it exists, it runs the `Decoder Int` to try to extract an integer.
-->
これらをまとめると、`field "age" int`では、`"age"`フィールドがあるかを尋ね、もし存在する場合には、`Decoder Int`でデコード処理を実行し整数の値の抽出を試みます。

<!--
We do pretty much exactly the same thing to extract the `"name"` field:
-->

`"name"`フィールドについても全く同様に記述することができます：


```elm
import Json.Decode exposing (Decoder, field, string)

nameDecoder : Decoder String
nameDecoder =
  field "name" string

-- string : Decoder String
```

<!--
In this case we demand an object with a `"name"` field, and if it exists, we want the value there to be a `String`.
-->
この場合`"name"`フィールドを含むオブジェクトを要求し、もし存在する場合にはその値が`String`であることを要求します。

[field]: https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#field


<!--
## Nesting Decoders
-->
## 入れ子になった複数のデコーダー

<!--
Remember the `api.giphy.com` data?
-->
`api.giphy.com`のデータについて覚えていますか？


```json
{
  "data": {
    "type": "gif",
    "id": "l2JhxfHWMBWuDMIpi",
    "title": "cat love GIF by The Secret Life Of Pets",
    "image_url": "https://media1.giphy.com/media/l2JhxfHWMBWuDMIpi/giphy.gif",
    "caption": "",
    ...
  },
  "meta": {
    "status": 200,
    "msg": "OK",
    "response_id": "5b105e44316d3571456c18b3"
  }
}
```

<!--
We wanted to access `response.data.image_url` to show a random GIF. Well, we have the tools now!
-->
ランダムなGIFを表示するために`response.data.image_url`にアクセスしたかったわけですが、今はそのためのツールがあります！


```elm
import Json.Decode exposing (Decoder, field, string)

gifDecoder : Decoder String
gifDecoder =
  field "data" (field "image_url" string)
```

<!--
This is the exact `gifDecoder` definition we used in our example program above! Is there a `"data"` field? Does that value have an `"image_url"` field? Is the value there a string? All our expectations are written out explicitly, allowing us to safely extract Elm values from JSON.
-->
これは上記の例のプログラムで使った`gifDecoder`の定義そのものです！まずは`"data"`フィールドがあるかどどうかを調べ、そのフィールドに`"image_url"`というフィールドが含まれているかどうか、そしてその値が文字列であるかどうかを調べます。我々の期待するところが明示的に記述されることにより、安全にJSONからElmの値を抽出することができるのです。


<!--
## Combining Decoders
-->
## デコーダーの結合

<!--
That is all we needed for our HTTP example, but decoders can do more! For example, what if we want _two_ fields? We snap decoders together with [`map2`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map2):
-->

HTTPの例で必要とされたのはこれで全てですが、デコーダーを組み合せてもっと色々とできます！例えば、_二つ_ のフィールドが欲しい場合にどうしたら良いでしょうか？この場合[`map2`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map2)を使ってデコーダーを組み合わせます：

```elm
map2 : (a -> b -> value) -> Decoder a -> Decoder b -> Decoder value
```

<!--
This function takes in two decoders. It tries them both and combines their results. So now we can put together two different decoders:
-->
この関数は二つのデコーダーを引数に取り、双方のデコードを試みてその結果を組み合わせます。したがって二つの異なるデコーダーを一纏めにすることができます：


```elm
import Json.Decode exposing (Decoder, map2, field, string, int)

type alias Person =
  { name : String
  , age : Int
  }

personDecoder : Decoder Person
personDecoder =
  map2 Person
  	(field "name" string)
  	(field "age" int)
```

<!--
So if we used `personDecoder` on `{ "name": "Tom", "age": 42 }` we would get out an Elm value like `Person "Tom" 42`.
-->
`personDecoder`を`{ "name": "Tom", "age": 42 }`に対して使用したとすると、`Person "Tom" 42`といったElmの値を得ることになるでしょう。

<!--
If we really wanted to get into the spirit of decoders, we would define `personDecoder` as `map2 Person nameDecoder ageDecoder` using our previous definitions. You always want to be building your decoders up from smaller building blocks!
-->
デコーダーの流儀に従うとするなら、以前に定義したデコーダーを使って、`personDecoder`を`map2 Person nameDecoder ageDecoder`として書くことも可能
です。小さな構成要素からデコーダーを組み立てたいと常に思うようになるでしょう！

<!--
## Next Steps
-->
## 次のステップ

<!--
There are a bunch of important functions in `Json.Decode` that we did not cover here:
-->
ここでは紹介しきれませんでしたが、`Json.Decode`には沢山の重要な関数があります：

- [`bool`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#bool) : `Decoder Bool`
- [`list`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#list) : `Decoder a -> Decoder (List a)`
- [`dict`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#dict) : `Decoder a -> Decoder (Dict String a)`
- [`oneOf`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#oneOf) : `List (Decoder a) -> Decoder a`

<!--
So there are ways to extract all sorts of data structures. The `oneOf` function is particularly helpful for messy JSON. (e.g. sometimes you get an `Int` and other times you get a `String` containing digits. So annoying!)
-->
つまり、あらゆる種類のデータ構造を抽出するための方法が存在するのです。とくにoneOf関数は一貫性のないJSONをデコードする際にとても役に立ちます（例えば、数字をInt型として受け取る場合や文字列で表現したString型として受け取る場合があったりと、困りますよね！）。

<!--
There are also [`map3`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map3), [`map4`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map4), and others for handling objects with more than two fields. But as you start working with larger JSON objects, it is worth checking out [`NoRedInk/elm-json-decode-pipeline`](https://package.elm-lang.org/packages/NoRedInk/elm-json-decode-pipeline/latest). The types there are a bit fancier, but some folks find them much easier to read and work with.
-->
[`map3`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map3)や[`map4`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map4)などという、二つ以上のフィールドを含むオブジェクトを取り扱うための関数もあります。しかし、さらに大きなJSONオブジェクトを取り扱うのであれば、[`NoRedInk/elm-json-decode-pipeline`](https://package.elm-lang.org/packages/NoRedInk/elm-json-decode-pipeline/latest)もチェックして見る価値があるでしょう。そこで使われている型にはややわかりづらい部分がありますが、一部の人達はずっと読みやすく扱いやすいとの知見を得ています。


<!--
> **Fun Fact:** I have heard a bunch of stories of folks finding bugs in their _server_ code as they switched from JS to Elm. The decoders people write end up working as a validation phase, catching weird stuff in JSON values. So when NoRedInk switched from React to Elm, it revealed a couple bugs in their Ruby code!
-->
> **面白い事実：** JSからElmに切り替えたら、_サーバー_ 側のコードのバグを見つけ出すことができたというような話題をいくつも聞いたことがあります。人々が書くデコーダーが検証として働く結果となりJSONの不自然な部分を捉えてくれます。NoRedInkがReactからElmに切り替えた際には彼らのRubyコードに幾つかのバグがあることが判明しました！
