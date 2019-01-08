# HTTP

---
<!--
#### [Clone the code](https://github.com/evancz/elm-architecture-tutorial/) or follow along in the [online editor](https://ellie-app.com/37gZn34mDJPa1).
-->
#### [サンプルコード](https://github.com/evancz/elm-architecture-tutorial/)をダウンロードするか[オンラインエディタ](https://ellie-app.com/37gZn34mDJPa1)で試してください。
---

<!--
We are about to make an app that fetches a random GIF when the user asks for another image.

I know some readers are skipping around, but this example assumes you read (1) [Random](/effects/random.md) which introduced `update` and `init` functions that can produce commands and (2) [JSON](/effects/json.md) which introduced JSON decoders. This example will not make sense without that background knowledge!
-->

ユーザーが新しい画像を要求するとランダムなGIF画像を取得するアプリケーションをこれから作ってみましょう。

飛ばし読みをしている読者もいると思いますが、この例では(1)コマンドを返す`update`と`init`について説明した[Random](/effects/random.md)の節と(2)JSONデコーダについて説明した[JSON](/effects/json.md)の節をあなたが読んだものと仮定しています。これらの予備知識無しではこの例を実行する意味はありません。

...
<!--
Okay, so you read those sections, right?
-->

これらの節を読みましたね、用意はいいですか？

...

<!--
Good!

This example uses The Elm Architecture, just like we have seen in all the previous examples. The new parts are all because we are using the [`elm/http`][http] and [`elm/url`][url] packages. We will talk about all that after you look through the code a bit:
-->

よろしい！

これまでの様々な例で見てきたように、この例でもThe Elm Architectureを使います。パッケージ[`elm/http`][http]と[`elm/url`][url]を使用しますので、新しい部分だらけになります。次のコードに軽く一通り目を通した後に説明をしていきましょう:

[http]: https://package.elm-lang.org/packages/elm/http/latest
[json]: https://package.elm-lang.org/packages/elm/json/latest
[url]: https://package.elm-lang.org/packages/elm/url/latest

```elm
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode
import Url.Builder as Url



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
  { topic : String
  , url : String
  }


init : () -> (Model, Cmd Msg)
init _ =
  ( Model "cat" "waiting.gif"
  , getRandomGif "cat"
  )



-- UPDATE


type Msg
  = MorePlease
  | NewGif (Result Http.Error String)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    MorePlease ->
      ( model
      , getRandomGif model.topic
      )

    NewGif result ->
      case result of
        Ok newUrl ->
          ( { model | url = newUrl }
          , Cmd.none
          )

        Err _ ->
          ( model
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
    [ h2 [] [ text model.topic ]
    , button [ onClick MorePlease ] [ text "More Please!" ]
    , br [] []
    , img [ src model.url ] []
    ]



-- HTTP


getRandomGif : String -> Cmd Msg
getRandomGif topic =
  Http.send NewGif (Http.get (toGiphyUrl topic) gifDecoder)


toGiphyUrl : String -> String
toGiphyUrl topic =
  Url.crossOrigin "https://api.giphy.com" ["v1","gifs","random"]
    [ Url.string "api_key" "dc6zaTOxFJmzC"
    , Url.string "tag" topic
    ]


gifDecoder : Decode.Decoder String
gifDecoder =
  Decode.field "data" (Decode.field "image_url" Decode.string)
```

<!--
This program is quite similar to the random dice roller we just saw: `Model`, `init`, `update`, `subscriptions`, and `view`. The new stuff is mostly in the `HTTP` section which uses `elm/url`, `elm/json`, and `elm/http`. Let&rsquo;s go through those one-by-one.
-->

このプログラム自体はサイコロを振るアプリケーションとそっくりです：`Model`, `init`, `update`, `subscriptions`そして`view`からなります。新しい内容のほとんどは`elm/url`と`elm/json`そして`elm/http`を使っている`HTTP`の部分になります。これらを一つ一つ調べていきましょう。

## `elm/url`

<!--
Let&rsquo;s look at the `toGiphyUrl` function first. It may seem like we should have just made a string like this:
-->

まずは`toGiphyUrl`関数を見てみてください。この関数は次のように単に文字列を結合するだけでも良い気がするかもしれません。

```elm
toBrokenGiphyUrl : String -> String
toBrokenGiphyUrl topic =
  "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" ++ topic
```

<!--
This is nice and simple. But it will have quite odd results if `topic` contains characters like `=` or `&`. The user could start adding totally different query parameters!
-->

これはこれで簡潔で良いのですが、もし`topic`に`=`や`&`などの文字が含まれていたらとても不都合な結果となってしまいます。ユーザーがでたらめなクエリパラメータを追加できてしまうのです！

<!--
So instead we use the [`Url.Builder`][builder] module from the `elm/url` package. We use two specific helper functions:
-->

したがって代わりに、パッケージ`elm/url`のモジュール[`Url.Builder`][builder]に含まれる次の二つのヘルパー関数を使います:

<!--
- [`crossOrigin`][crossOrigin] takes three arguments: (1) the domain, (2) each level of the path, and (3) a list of query parameters. It also guarantees that the query parameters are properly encoded. That means having `=` or `&` in the `topic` is not a problem anymore.
- [`string`][string] takes a `key` and a `value`. The `crossOrigin` function will turn them into `?key=value` to make the final URL, and the `value` will always be properly encoded.
-->

- [`crossOrigin`][crossOrigin]は三つの引数をとります：(1)ドメイン名、(2)パスの各階層、(3)クエリパラメータのリスト。またクエリパラメータが適切にエンコードされていることを保証してくれます。つまり、`=`や`&`などの文字が`topic`に含まれていても問題はありません。
- [`string`][string]は`key`と`value`を引数に取ります。最終的なURLを作るために、`crossOrigin`関数がこれらを`?key=value`といった形式に変換しますが、その際に`value`は常に適切にエンコードされます。

<!--
So when you put them together, we end up with this `toGiphyUrl` function:
-->

これらを一つにまとめると、次のような`toGiphyUrl`関数に辿りつきます:

```elm
toGiphyUrl : String -> String
toGiphyUrl topic =
  Url.crossOrigin "https://api.giphy.com" ["v1","gifs","random"]
    [ Url.string "api_key" "dc6zaTOxFJmzC"
    , Url.string "tag" topic
    ]
```

<!--
In this version, the `topic` will definitely be encoded correctly!
-->

このバージョンでは、`topic`は必ず正しくエンコードされるでしょう！

[builder]: https://package.elm-lang.org/packages/elm/url/latest/Url-Builder
[crossOrigin]: https://package.elm-lang.org/packages/elm/url/latest/Url-Builder#crossOrigin
[string]: https://package.elm-lang.org/packages/elm/url/latest/Url-Builder#string


## `elm/json`

<!--
That URL is going to send back some JSON like this:
-->

先のURLは以下のようなJSONを送り返してきます:

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
We actually saw this exact JSON on the previous page, and we learned how to create a JSON decoder to extract the info we need:
-->

前のページでこれと全く同じJSONを見ましたね。そこでは、必要な情報を抽出するためのJSONデコーダの作り方を学びました:

```elm
gifDecoder : Decode.Decoder String
gifDecoder =
  Decode.field "data" (Decode.field "image_url" Decode.string)
```

<!--
In the `"data"` field, in the `"image_url"` field, we want to read a `String`.
-->

欲しいのは`"data"`フィールドの中の、`"image_url"`フィールドの中の`String`です。

## `elm/http`

<!--
Alright, the only thing missing now is the HTTP request! It is created with the following function:
-->

いいですね、あと残っているのはHTTPリクエストになります！これは次の関数になります:

```elm
getRandomGif : String -> Cmd Msg
getRandomGif topic =
  Http.send NewGif (Http.get (toGiphyUrl topic) gifDecoder)
```

<!--
We need to break this down into smaller parts!
-->

ここはもう少し細かく見てく必要がありますね！

<!--
First we use [`Http.get`](https://package.elm-lang.org/packages/elm/http/latest/Http#get) to describe our request:
-->

まず初めに、リクエストを記述するために[`Http.get`](https://package.elm-lang.org/packages/elm/http/latest/Http#get)を使います:

```elm
get : String -> Decode.Decoder value -> Http.Request value
```

<!--
This function lets us describe GET requests. We must provide (1) the URL we want to access and (2) a JSON decoder to process the information in the response. We happen to have both prepared already! So we call `Http.get (toGiphyUrl topic) gifDecoder` and end up with a `Http.Request String`, describing a GET request that will produce a `String` value if successful.
-->

この関数によりGETリクエストの記述が可能となります。ここでは(1)アクセスしたいURLと(2)レスポンスとして得られる情報を処理する為のJSONデコーダを渡す必要があります。すでにどちらも持ち合わせていますね！したがって、`Http.get (toGiphyUrl topic) gifDecoder`を呼び出すと`Http.Request String`が結果として返ります。これは、もし成功した場合には`String`の値を返すGETリクエストであるという記述になります。

<!--
Now we have not actually sent the request yet. We have only described what we want to happen. We still need to turn it into a **command** and give it to the Elm runtime system. The runtime system will do its best, but there are all sorts of ways the HTTP request might fail: the URL may not exist, the request may time out, the JSON sent back may be unexpected, etc. So our command must also describe what to do with all those possible failures! That is the role of [`Http.send`](https://package.elm-lang.org/packages/elm/http/latest/Http#send):
-->

この時点では、まだ実際のリクエストは送っていません。起こって欲しいことを記述しただけです。これを**コマンド**に変換し、Elmのランタイムシステムに渡す必要があるのです。ランタイムシステムは最善を尽くしてくれるでしょうが、HTTPリクエストは様々な理由により失敗する場合があります: 例えば、URLが存在しなかったり、リクエストがタイムアウトしたり、予想外の形式のJSONが送り返されたりなどと。したがって、コマンドはこれらの起こりうる失敗に対してどのように対処すべきかも記述しておく必要があります。この役目を果たしてくれるのが[`Http.send`](https://package.elm-lang.org/packages/elm/http/latest/Http#send)になります:

```elm
send : (Result Http.Error value -> msg) -> Http.Request value -> Cmd msg
```

<!--
The second argument should be familiar. That is the request we have built up so far. In our case an `Http.Request String`. Now the result of that request will be a `Result Http.Error String`, meaning that it can succeed with `Ok "..."` or fail with `Err ...`. The first argument turns that result into a `Msg` for our `update` function.
-->

二番目の引数についてはすでに馴染みがあるはずです。先に組んだリクエストですね。我々の場合、`Http.Request String`となります。このリクエストの結果は`Result Http.Error String`となるでしょう。これの意味するところは、`Ok "..."`として成功する場合と`Err ...`として失敗する場合があるということです。一番目の引数がこの結果を`update`関数で処理される`Msg`に変換してくれます。

<!--
So rather than defaulting to ignoring errors like in JavaScript, this API requires that you handle them. There are no surprises here. Maybe you will decide not to do anything special on failure (like we do in our `update` function) but it is always a _decision_
.
-->

JavaScriptのようにエラーを無視することを前提とはせずに、このAPIではエラーの面倒も見ることを要求します。何も驚くことはありません。エラーに対して特に何もしないという選択もありえます（この例の`update`関数のように）が、常にはそれは _選択_ に過ぎません。

<!--
> **Exercises:**
>
> - Show a message explaining why the image didn't change when you get an [`Http.Error`](https://package.elm-lang.org/packages/elm/http/latest/Http#Error).
> - Allow the user to modify the `topic` with a text field.
> - Allow the user to modify the `topic` with a drop down menu.
> - Try decoding other parts of the JSON received from `api.giphy.com`.
-->

> **練習問題**
>
> - 結果として[`Http.Error`](https://package.elm-lang.org/packages/elm/http/latest/Http#Error)が返ったときに、どうして画像が変化しなかったかをお知らせするメッセージを表示してみましょう。
> - ユーザが`topic`をテキストフィールドから変更できるようにしてみましょう。
> - ユーザが`topic`をドロップダウンメニューから変更できるようにしてみましょう。
> - `api.giphy.com`から受け取ったJSONの他の部分のデコードに挑戦してみましょう。
