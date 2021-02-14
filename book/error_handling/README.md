<!--
# Error Handling
-->

# エラーハンドリング

<!--
One of the guarantees of Elm is that you will not see runtime errors in practice. This is partly because **Elm treats errors as data**. Rather than crashing, we model the possibility of failure explicitly with custom types. For example, say you want to turn user input into an age. You might create a custom type like this:
-->

Elmが保証してくれる安全性の1つに、ランタイムエラーを実際に見ることはないということがあります。その理由としては **Elmはエラーをデータとして扱うということ** が挙げられます。エラーが起こってアプリケーション全体がクラッシュするよりは失敗の可能性を明示的にカスタム型を使って表現するほうが好まれます。例えば、ユーザからの入力を年齢に変換したいとしましょう。カスタム型をこのように作りましょう:

```elm
type MaybeAge
  = Age Int
  | InvalidInput

toAge : String -> MaybeAge
toAge userInput =
  ...

-- toAge "24" == Age 24
-- toAge "99" == Age 99
-- toAge "ZZ" == InvalidInput
```

<!--
No matter what input is given to the `toAge` function, it always produces a value. Valid input produces values like `Age 24` and `Age 99`, whereas invalid input produces the `InvalidInput` value. From there, we use pattern matching which will ensure that both possibilities are accounted for. No crashing!
-->

`toAge`関数にどのような入力が与えられた場合でも常に値を生成します。有効な入力の場合は`Age 24`や`Age 99`などの値を生成するのに対して、無効な入力の場合は`InvalidInput`という値を生成します。それからパターンマッチを使って両方の可能性が確実に処理されるようにします。クラッシュはしません！

<!--
This kind of thing comes up all the time! For example, maybe you want to turn a bunch of user input into a `Post` to share with others. But what happens if they forget to add a title? Or there is no content in the post? We could model all these problems explicitly:
-->

こういう問題には常に遭遇します！例えば、他の人と共有するために、ユーザからの大量の入力を`Post`型に変換したいとします。しかし、タイトルを入力するのを忘れたらどうなるでしょうか？もしくはその投稿に中身がなかったら？すべての問題を明示的にモデリングしましょう:

```elm
type MaybePost
  = Post { title : String, content : String }
  | NoTitle
  | NoContent

toPost : String -> String -> MaybePost
toPost title content =
  ...

-- toPost "hi" "sup?" == Post { title = "hi", content = "sup?" }
-- toPost ""   ""     == NoTitle
-- toPost "hi" ""     == NoContent
```

<!--
Instead of just saying that the input is invalid, we are describing each of the ways things might have gone wrong. If we have a `viewPreview : MaybePost -> Html msg` function to preview valid posts, now we can give more specific error messages in the preview area when something goes wrong!
-->

入力が無効であるというだけではなく、入力がどう間違っているかをそれぞれ表現しています。有効な投稿をプレビューするための`viewPreview：MaybePost -> Html msg`関数があれば、何か問題が発生したときにプレビュー領域にもっと具体的なエラーメッセージを表示できるようになります！

<!--
These kinds of situations are extremely common. It is often valuable to create a custom type for your exact situation, but in some of the simpler cases, you can use an off-the-shelf type instead. So the rest of this chapter explores the `Maybe` and `Result` types, showing how they can help you treat errors as data!
-->

このような状況は極めて一般的です。その場その場に合わせてカスタム型を作成したほうがしばしば有益ですが、より単純な場合には代わりに既製の型を使用することができます。それでこの章の残りの部分では`Maybe`型と`Result`型を新たに学び、この2つの型がどのようにエラーをデータとして扱うのを助けることができるかを示します！
