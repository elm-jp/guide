<!--
# Type Aliases
-->
# 型の別名（タイプエイリアス）

<!--
Elm allows you to create a **type alias**. An alias is just a shorter name for some other type. It looks like this:
-->
Elmでは **型の別名（タイプエイリアス）** を作ることができます。 別名は単に他の型の短い名前です。 このように定義できます:

```elm
type alias User =
  { name : String
  , bio : String
  }
```

<!--
So rather than having to type out this record type all the time, we can just say `User` instead. For example, you can shorten type annotations like this:
-->
つまりこのレコード型をいつも書くのではなく、代わりに`User`と書くだけで済ませることができます。 例えば、型注釈をこのように短く書くことができます:

```elm
hasDecentBio : User -> Bool
hasDecentBio user =
  String.length user.bio > 80
```

<!--
That would be `{ name : String, bio : String } -> Bool` without the type alias. **The main point of type aliases is to help us write shorter and clearer type annotations.** This becomes more important as your application grows. Say we have a `updateBio` function:
-->
型の別名を使わずに書けば`{ name : String, bio : String } -> Bool`のようになります。 **型の別名の主なポイントは短く明確な型注釈を書くのを助けることです。** これはアプリケーションが成長するにつれてより重要になってきます。 `updateBio`関数があるとします:

```elm
updateBio : String -> User -> User
updateBio bio user =
  { user | bio = bio }
```

<!--
First, think about the type signature without a type alias! Now, imagine that as our application grows we add more fields to represent a user. We could add 10 or 100 fields to the `User` type alias, and we do not need any changes to our `updateBio` function. Nice!
-->

まず、型の別名を使わない型注釈について考えてみましょう。 今度はアプリケーションが成長するにつれてユーザを表すフィールドが増えることを想像しましょう。 10個や100個のフィールドを`User`型に追加するかもしれません。 しかし`updateBio`関数に変更を加える必要はありません。 やったね！

<!--
## Record Constructors
-->
## レコードコンストラクタ

<!--
When you create a type alias specifically for a record, it also generates a **record constructor**. So if we define a `User` type alias in `elm repl` we could start building records like this:
-->
レコード用に型の別名を作成すると、 **レコードコンストラクタ**も一緒に生成されます。 つまり`elm repl`で`User`型を定義したら、このようにレコードを作れます:

```elm
> type alias User = { name : String, bio : String }

> User "Tom" "Friendly Carpenter"
{ name = "Tom", bio = "Friendly Carpenter" }
```

<!--
The arguments are in the order they appear in the type alias declaration. This can be pretty handy.
-->
引数は型の別名の定義に現れる順になります。 これはかなり便利です。

<!--
And again, this is only for records. Making type aliases for non-record types will not result in a constructor.
-->
この機能はレコード型のためだけのものです。 レコード型ではない型に別名を付けてもコンストラクタは生成されません。
