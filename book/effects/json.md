# JSON
<!--

On the next page we are going to ask `api.giphy.com` for some random GIFs. The endpoint [here](https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat) is going to give us JSON like this:
-->
次のページでは適当なGIF画像を取得するために`api.giphy.com`に問い合わせをするつもりです。その[エンドポイント](https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat)は次のようなJSONを返すでしょう：

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
But how do we deal with data like this in Elm?

In JavaScript you can run `JSON.parse` and get a JavaScript object. You then start accessing fields like `response.data.image_url` to get the random GIF. One would expect JavaScript Object Notation (JSON) to integrate easily with JavaScript! But what happens if `api.giphy.com` makes a change to the JSON? We crash! What happens if we have a typo in a field access? We crash! What happens if the endpoint is managed by your backend team and it produces different results in different scenarios? We crash!

So turning JSON directly into JavaScript values is easy _at first_, but you pay for it later. Is this `null`? Is this an integer or a string containing an integer? Does this field exist? Etc. You end up with complicated logic, unpredictable behavior, and a bunch of tests to prove to yourself that it cannot be otherwise.

In Elm, we validate JSON _before_ it gets into our code. Let&rsquo;s see how!
-->

では、この様なデータをElmではどのように取り扱ったら良いのでしょうか？

JavaScriptでは、`JSON.parse`を実行するとJavaScriptのオブジェクトを取得することができます。`response.data.image_url`としてオブジェクトのフィールドにアクセスすることにより、任意のGIF画像を取得することができます。JavaScript Object Notation (JSON)はJavaScriptへ容易に取り込めると期待されがちです！しかし、もし`api.giphy.com`がJSONに変更を加えたらどうなるでしょうか？クラッシュです！もしフィールドにアクセスする際にタイプミスがあったらどうなるでしょうか？クラッシュです！もしエンドポイントがバックエンドチームによって管理されているとして、場合によって異なる結果を返すとしたらどうなるでしょうか？クラッシュです！

JSONをJavaScriptの値に変換するのは _とりあえず_ は簡単ですが、後でしっぺ返しを食らうのです。`null`値なのかどうか？整数なのかそれとも整数を含む文字列なのか？このフィールドは存在するのかどうか？などと。複雑なロジックや、予測不可能なふるまい、ありえないという事を自分に対して証明するための大量のテストなどに行き着くのです。

Elmにおいては、自身のコードに取り込まれる _前_ にJSONを検証します。どうやるか見てみましょう！

<!--
## JSON Decoders
-->

## JSONデコーダー

<!--
Say we have some JSON:
-->

以下のようなJSONがあるとします：

```json
{
	"name": "Tom",
	"age": 42
}
```

<!--
We need to run it through a `Decoder` to access specific information. So if we wanted to get the `"age"`, we would run the JSON through a `Decoder Int` that describes exactly how to access that information:
-->

特定の情報にアクセスするためには、このJSONを`Decoder`で処理する必要があります。もし、`"age"`の値が欲しいなら、どうやってこの情報にアクセスするかを定めた`Decoder Int`を使ってJSONを処理します。

![](diagrams/int.svg)

<!--
If all goes well, we get an `Int` on the other side! And if we wanted the `"name"` we would run the JSON through a `Decoder String` that describes exactly how to access it:
-->

全てが上手く行けば、右側で`Int`型の値を得ます。次にもし、`"name"`の値が欲しいなら、どうやってこの情報にアクセスするかを定めた`Decoder String`を使ってJSONを処理します。

![](diagrams/string.svg)

<!--
If all goes well, we get a `String` on the other side!

How do we create decoders like this though?
-->

全てがうまく行けば、右側で`String`型の値を得ます！

ではどうやってこの様なデコーダーを作ったらよいのでしょうか？

<!--
## Building Blocks
-->

## 構成要素

<!--
The [`elm/json`][json] package gives us the [`Json.Decode`][decode] module. It is filled with tiny decoders that we can snap together.
-->

パッケージ[`elm/json`][json]に[`Json.Decode`][decode]モジュールが含まれています。このモジュールは沢山の最小単位のデコーダーで一杯で、それらを組み合わせることが出来ます。

[json]: https://package.elm-lang.org/packages/elm/json/latest/
[decode]: https://package.elm-lang.org/packages/elm/json/latest/Json-Decode

<!--
So to get `"age"` from `{ "name": "Tom", "age": 42 }` we would create a decoder like this:
-->

例えば、`{ "name": "Tom", "age": 42 }`から`"age"`を取得するためには、次のようなデコーダーを用意します。

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

1. `String` &mdash; a field name. So we are demanding an object with an `"age"` field.
2. `Decoder a` &mdash; a decoder to try next. So if the `"age"` field exists, we will try this decoder on the value there.

So putting it together, `field "age" int` is asking for an `"age"` field, and if it exists, it runs the `Decoder Int` to try to extract an integer.

We do pretty much exactly the same thing to extract the `"name"` field:
-->

ここで[`field`][field]関数は2つの引数をとります：

1. `String` &mdash; フィールド名。ここでは`"age"`フィールドを含むオブジェクトを要求しています。
2. `Decoder a` &mdash; 次に試すべきデコーダー。もし`"age"`フィールドが存在すれば、その値の処理をこのデコーダーで試みます。

これらをまとめると、`field "age" int`では、`"age"`フィールドがあるか尋ね、もし存在する場合には、`Decoder Int`を実行し整数の値の抽出を試みます。

`"name"`フィールドについても同様に処理することができます。

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

ここでは、`"name"`フィールドを含むオブジェクトを求め、もし存在する場合にはその値が`String`であることを要求します。

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

任意のGIFを表示するために`response.data.image_url`にアクセスしたかったわけですが、今はそのためのツールがあります！

```elm
import Json.Decode exposing (Decoder, field, string)

gifDecoder : Decoder String
gifDecoder =
  field "data" (field "image_url" string)
```

<!--
Is there a `"data"` field? If so, does that value have an `"image_url"` field? If so, is the value there a string?

So we are essentially building up a _contract_ of what we expect. &ldquo;If you give me JSON like this, I will turn them into Elm values.&rdquo;
-->

`"data"`フィールドがあるかな？もしそうなら、`"image_url"`フィールドを値として持っているかな？そうだとして、その値は文字列かな？

こんな感じで、我々が期待する _契約_ を組み合わせて行くのです。&ldquo;君がこういった形式のJSONを渡してくれたら、僕がElmの値に変換して返すよ&rdquo;的な。

<!--
## Combining Decoders
-->

## デコーダーの結合

<!--
So far we have only been accessing one field at a time, but what if we want _two_ fields? We snap decoders together with [`map2`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map2):
-->

これまでは、一度に一つのフィールドしかアクセスしてきませんでしたが、_二つ_ のフィールドにアクセスしたい場合はどうしたら良いのでしょうか？デコーダー同士を[`map2`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map2)でくっつけてあげます：

```elm
map2 : (a -> b -> value) -> Decoder a -> Decoder b -> Decoder value
```

<!--
This function takes in two decoders. It tries them both and combines their results. So now we can put together two different decoders:
-->

この関数は二つのデコーダーを引数に取ります。両方の処理を試みてそれらの結果を結合します。二つの異なるデコーダーをまとめることができるのです：

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

If we really wanted to get into the spirit of decoders, we would define `personDecoder` as `map2 Person nameDecoder ageDecoder` using our previous definitions. You always want to be building your decoders up from smaller building blocks!
-->

もし`personDecoder`デコーダーを`{ "name": "Tom", "age": 42 }`というJSON文字列に適用すると、Elmの値として`Person "Tom" 42`を得ることが出来ます。

デコーダーの流儀に従うとするなら、以前に定義したデコーダーを使って、`personDecoder`を`map2 Person nameDecoder ageDecoder`として書くことも可能です。小さな構成要素からデコーダーを組み立てたいと常に思うようになるでしょう！

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

全ての種類のデータ構造を抽出するために色々な方法が存在します。無茶苦茶なJSON（例えば、数字を、整数として受け取ったり、桁を含む文字列で受け取ったり、困りますよね！）をデコードする際に`oneOf`関数が非常に役に立ちます。

<!--
There are also [`map3`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map3), [`map4`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map4), and others for handling objects with more than two fields. But as you start working with larger JSON objects, it is worth checking out [`NoRedInk/elm-json-decode-pipeline`](https://package.elm-lang.org/packages/NoRedInk/elm-json-decode-pipeline/latest). The types there are a bit fancier, but some folks find them much easier to read and work with.
-->

[`map3`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map3)や[`map4`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map4)などという、二つ以上のフィールドを含むオブジェクトを取り扱うための関数もあります。しかし、さらに大きなJSONオブジェクトを取り扱うのであれば、[`NoRedInk/elm-json-decode-pipeline`](https://package.elm-lang.org/packages/NoRedInk/elm-json-decode-pipeline/latest)もチェックして見る価値があるでしょう。そこで使われている記法には好みが別れるかもしれませんが、一部の人達はずっと読みやすく扱いやすいとの知見を得ています。

<!--
> **Fun Fact:** I have heard a bunch of stories of folks finding bugs in their _server_ code as they switched from JS to Elm. The decoders people write end up working as a validation phase, catching weird stuff in JSON values. So when NoRedInk switched from React to Elm, it revealed a couple bugs in their Ruby code!
-->

> **面白い事実：** JSからElmに切り替えたら、_サーバー_ 側のコードのバグを見つけ出すことができたと言うような話題を幾つも聞いたことがあります。人々が書くデコーダーが検証として働く結果となりJSONの不自然な部分を捉えてくれます。NoRedInkがReactからElmに切り替えた際には彼らのRubyコードに幾つかのバグがあることが判明しました！
