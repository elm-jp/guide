<!--
# Result
-->

# Result

<!--
The `Maybe` type can help with simple functions that may fail, but it does not tell you _why_ it failed. Imagine if a compiler just said `Nothing` if anything was wrong with your program. Good luck figuring out what went wrong!
-->

`Maybe`型は失敗するかもしれない単純な関数には役に立ちますが、 _なぜ_ 失敗したかは教えてくれません。あなたのプログラムに何か問題があってコンパイラが`Nothing`としか言ってくれなかったらどうしましょうか？何が問題だったのか調べて運良く分かるといいですね！

<!--
This is where the [`Result`][Result] type becomes helpful. It is defined like this:
-->

こんなとき[`Result`][Result]型が役に立ちます。`Result`型は以下のように定義されます:

```elm
type Result error value
  = Ok value
  | Err error
```

<!--
The point of this type is to give additional information when things go wrong. It is really helpful for error reporting and error recovery!
-->

この型のポイントは、問題が起こったときに問題が起こったということだけではなくさらなる情報を提供できるところにあります。この情報はエラーを通知したりエラーに対処したりするのにとても役に立ちます。

[Result]: https://package.elm-lang.org/packages/elm-lang/core/latest/Result#Result


<!--
## Error Reporting
-->

## エラーを通知する

<!--
Perhaps we have a website where people input their age. We could check that the age is reasonable with a function like this:
-->

ひょっとしたら、我々は年齢を入力するサイトを持っているかもしれません。入力された年齢が無効な値ではないか以下のような関数で確認しましょう:

```elm
isReasonableAge : String -> Result String Int
isReasonableAge input =
  case String.toInt input of
    Nothing ->
      Err "That is not a number!"

    Just age ->
      if age < 0 then
        Err "Please try again after you are born."

      else if age > 135 then
        Err "Are you some kind of turtle?"

      else
        Ok age

-- isReasonableAge "abc" == Err ...
-- isReasonableAge "-13" == Err ...
-- isReasonableAge "24"  == Ok 24
-- isReasonableAge "150" == Err ...
```

<!--
Not only can we check the age, but we can also show people error messages depending on the particulars of their input. This kind of feedback is much better than `Nothing`!
-->

年齢を確認するだけではなく、ユーザに個々の入力に応じてエラーメッセージを表示することもできます。このようなフィードバックはただ`Nothing`を返すよりとてもよいです。

<!--
## Error Recovery
-->

## エラーに対処する

<!--
The `Result` type can also help you recover from errors. One place you see this is when making HTTP requests. Say we want to show the full text of _Anna Karenina_ by Leo Tolstoy. Our HTTP request results in a `Result Error String` to capture the fact that the request may succeed with the full text, or it may fail in a bunch of different ways:
-->

`Result`型はエラーに対処するのにも役に立ちます。役に立っている場所の1つとしてHTTPリクエストを作るところがあります。レフ・トルストイによる小説、 _アンナ・カレーニナ_ の全文を表示したいとしましょう。これを表現しようとすると、HTTPリクエストは結果的に`Result Error String`という型になります。この型はリクエストが成功して全文を得られるか、さまざまな理由で失敗するかを捕捉しています。

```elm
type Error
  = BadUrl String
  | Timeout
  | NetworkError
  | BadStatus Int
  | BadBody String

-- Ok "All happy ..." : Result Error String
-- Err Timeout        : Result Error String
-- Err NetworkError   : Result Error String
```

<!--
From there we can show nicer error messages as we discussed before, but we can also try to recover from the failure! If we see a `Timeout` it may work to wait a little while and try again. Whereas if we see a `BadStatus 404` then there is no point in trying again.
-->

ここでも先ほどの「エラーを通知する」の例でお見せしたようにより良いエラーメッセージを見せることができますが、それだけではなくエラーが起きたときの対処に使うこともできます。エラーが`Timeout`だったら、少し待ってリクエストしなおせばうまくいくでしょう。一方`BadStatus 404`だったらリクエストしなおす意味はないでしょう。

<!--
The next chapter shows how to actually make HTTP requests, so we will run into the `Result` and `Error` types again very soon!
-->

次の章では実際にHTTPリクエストの作り方を見せていきます。なのですぐさま`Result`型と`Error`型に再会することになりますよ！
