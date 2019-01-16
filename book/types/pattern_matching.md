<!--
# Pattern Matching
-->
# パターンマッチ

<!--
On the previous page, we learned how to create [custom types](/types/custom_types.html) with the `type` keyword. Our primary example was a `User` in a chat room:
-->
前のページで、`type` キーワードを用いた[カスタム型](/types/custom_types.html)の書き方について学びました。
主要な例としてチャットルームの `User` 型を定義しました:

```elm
type User
  = Regular String Int
  | Visitor String
```

<!--
Regulars have a name and age, whereas visitors only have a name. So we have our custom type, but how do we actually use it?
-->

`Regular` ユーザーは名前と年齢を持っているのに対し、`Visitor` ユーザーは名前だけを持っているのでした。
このようにカスタム型の作り方は分かりましたが、実際にはどのように使えば良いのでしょうか？

<!--
## `case`
-->
## `case`

<!--
Say we want a `toName` function that decides on a name to show for each `User`. We need to use a `case` expression:
-->
各 `User` から表示する名前を返す関数 `toName` を定義したいとします。
`case` 式を使う必要があるでしょう:

```elm
toName : User -> String
toName user =
  case user of
    Regular name age ->
      name

    Visitor name ->
      name
-- toName (Regular "Thomas" 44) == "Thomas"
-- toName (Visitor "kate95")    == "kate95"
```

<!--
The `case` expression allows us to branch based on which variant we happen to see, so whether we see Thomas or Kate, we always know how to show their name.
-->
`case`式は見えるバリアントに基づいて処理を分岐できます。なので`Regular`のトーマスが来ようが`Visitor`のケイトが来ようが名前の表示の仕方は常にわかっています。

> **訳注** 上記の「見えるバリアント」とは同モジュール内で定義されているバリアントや、他モジュールからバリアントごと公開されているカスタム型のバリアントを指します。他モジュールがバリアントを公開していない場合、そのカスタム型はパターンマッチで分岐して処理することができません。

<!--
And if we try invalid arguments like `toName (Visitar "kate95")` or `toName Anonymous`, the compiler tells us about it immediately. This means many simple mistakes can be fixed in seconds, rather than making it to users and costing a lot more time overall.
-->
そしてもし、`toName (Visitar "kate95")`　や `toName Anonymous` のような不正な引数を与えた場合には、コンパイラがそのことについてすぐに教えてくれるでしょう。
Elmでは単純なミスをリリースしてユーザにまで届けてしまって、バグ修正にビジネス全体でもっと多大な時間をかけてしまうことありません。大概のミスは数秒で修正できるでしょう。

<!--
## Wild Cards
-->
## ワイルドカード

<!--
The `toName` function we just defined works great, but notice that the `age` is not used in the implementation? When some of the associated data is unused, it is common to use a “wild card” instead of giving it a name:
-->
上で定義した`toName`関数はうまく動きますが、`age`の値を実装内で使っていませんよね？使っていない関連データには名前を付ける代わりに「ワイルドカード」を使うのが普通です。

```elm
toName : User -> String
toName user =
  case user of
    Regular name _ ->
      name

    Visitor name ->
      name
```

<!--
The `_` acknowledges the data there, but also saying explicitly that nobody is using it.
-->
`_`はそこに値があることは認めて、誰もその値を使わないことを意味します。
