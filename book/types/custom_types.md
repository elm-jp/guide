<!--
> **Note:** Custom types used to be referred to as “union types” in Elm. Names from other communities include [tagged unions](https://en.wikipedia.org/wiki/Tagged_union) and [ADTs](https://en.wikipedia.org/wiki/Algebraic_data_type).
-->

> **Note:** カスタム型（Custom type）は Elm では以前“ユニオン型（union type）”と呼ばれていました。他のコミュニティでの名前としては[tagged union](https://en.wikipedia.org/wiki/Tagged_union)や[ADT](https://en.wikipedia.org/wiki/Algebraic_data_type)などがあります。

<!--
# Custom Types
-->

# カスタム型（Custom type）

<!--
So far we have seen a bunch of types like `Bool`, `Int`, and `String`. But how do we define our own?
-->

これまで`Bool`や`Int`、`String`のような Elm に元から用意された型を使ってきました。ですが、自分の型をどうやって定義したらよいでしょうか？

<!--
Say we are making a chat room. Everyone needs a name, but maybe some users do not have a permanent account. They just give a name each time they show up.
-->

例えば、チャットルームを作っているとします。全員に名前が必要ですが、永続的なアカウントを作らない人もいるかもしれません。そういう人にはチャットルームに入る度に名前を付けてもらうことにしましょう。

<!--
We can describe this situation by defining a `UserStatus` type, listing all the possible variations:
-->

`UserStatus`型を定義し全ての可能なバリアントを列挙することで、この状況を表現することができます:

```elm
type UserStatus = Regular | Visitor
```

<!--
The `UserStatus` type has two **variants**. Someone can be a `Regular` or a `Visitor`. So we could represent a user as a record like this:
-->

`UserStatus`型は 2 つの **バリアント** を持っています。ユーザーは`Regular`か`Visitor`になれます。つまりユーザーをこのようなレコードで表すことができます:

```elm
type UserStatus
  = Regular
  | Visitor

type alias User =
  { status : UserStatus
  , name : String
  }

thomas = { status = Regular, name = "Thomas" }
kate95 = { status = Visitor, name = "kate95" }
```

<!--
So now we can track if someone is a `Regular` with an account or a `Visitor` who is just passing through. It is not too tough, but we can make it simpler!
-->

こうすれば、誰がアカウントを持っている`Regular`か、通りすがっただけの`Visitor`なのかを把握できます。このやり方は難し過ぎるということはありませんが、もっとシンプルにできます。

<!--
Rather than creating a custom type and a type alias, we can represent all this with just a single custom type. The `Regular` and `Visitor` variants each have an associated data. In our case, the associated data is a `String` value:
-->

上述のようにカスタム型と型エイリアスを1つずつ作成するのではなく、すべてを単一のカスタム型で表すことができます。`Regular`と`Visitor`のバリアントにはそれぞれ関連するデータを持たせることができます。今回の場合、関連するデータは`String`の値です：

```elm
type User
  = Regular String
  | Visitor String

thomas = Regular "Thomas"
kate95 = Visitor "kate95"
```

<!--
The data is attached directly to the variant, so there is no need for the record anymore.
-->

名前のデータはバリアントに直接付与されたので、レコード型はもう必要ありません。

<!--
Another benefit of this approach is that each variant can have different associated data. Say that `Regular` users gave their age when they signed up. There is no nice way to capture that with records, but when you define your own custom type it is no problem. Let's add some associated data to the `Regular` variant in an interactive example:
-->

この方法の別の利点は、各バリアントごとに他のバリアントとは異なる専用のデータを持たせられることです。アカウントを持っているユーザーである`Regular`ユーザーがサインアップのときに年齢を登録することを考えてみてください。レコードではこのようなケースをうまく取り扱うことができませんが、カスタム型を自分で定義するなら何の問題もなく行えます。年齢を登録できるようにするために`Regular`バリアントに関連するデータを追加しましょう。次の対話形式の例を見てください：

{% replWithTypes %}
[
  {
    "add-type": "User",
    "input": "type User\n  = Regular String Int\n  | Visitor String\n"
  },
  {
    "input": "Regular",
    "value": "\u001b[36m<function>\u001b[0m",
    "type_": "String -> Int -> User"
  },
  {
    "input": "Visitor",
    "value": "\u001b[36m<function>\u001b[0m",
    "type_": "String -> User"
  },
  {
    "input": "Regular \"Thomas\" 44",
    "value": "\u001b[96mRegular\u001b[0m \u001b[93m\"Thomas\"\u001b[0m \u001b[95m44\u001b[0m",
    "type_": "User"
  },
  {
    "input": "Visitor \"kate95\"",
    "value": "\u001b[96mVisitor\u001b[0m \u001b[93m\"kate95\"\u001b[0m",
    "type_": "User"
  }
]
{% endreplWithTypes %}

<!--
Try defining a `Regular` visitor with a name and age ⬆️
-->

名前と年齢を指定して`Regular`訪問者を定義してみてください ⬆️

<!--
We only added an age, but variants of a type can diverge quite dramatically. For example, maybe we want to add location for `Regular` users so we can suggest regional chat rooms. Add more associated data! Or maybe we want to have anonymous users. Add a third variant called `Anonymous`. Maybe we end up with:
-->

上記の例では年齢を追加しただけですが、型のバリアントはかなり劇的に分岐することがあります。例えば、地域のチャットルームを提案できるようにするために`Regular`ユーザーに所在地を追加したくなるかもしれません。その場合は`Regular`バリアントに関連するデータを追加します！あるいは匿名ユーザーを用意したくなるかもしれません。`Anonymous`という3つめのバリアントを追加します。おそらく最終的には次のようになります:

```elm
type User
  = Regular String Int Location
  | Visitor String
  | Anonymous
```

<!--
No problem! Let’s see some other examples now.
-->

何も問題はありません！ここで別の例を見てみましょう。

<!--
## Messages
-->

## メッセージ

<!--
In the architecture section, we saw a couple of examples of defining a `Msg` type. This sort of type is extremely common in Elm. In our chat room, we might define a `Msg` type like this:
-->

"The Elm Architecture"の節では`Msg`型の定義の例をいくつか見てきました。この手の型は Elm では非常に一般的です。チャットルームアプリではこのように`Msg`型を定義するかもしれません：

```elm
type Msg
  = PressedEnter
  | ChangedDraft String
  | ReceivedMessage { user : User, message : String }
  | ClickedExit
```

<!--
We have four variants. Some variants have no associated data, others have a bunch. Notice that `ReceivedMessage` actually has a record as associated data. That is totally fine. Any type can be associated data! This allows you to describe interactions in your application very precisely.
-->

この型には4つのバリアントがあり、関連するデータを持つバリアントと持たないバリアントがあります。`ReceivedMessage`が実は関連するデータとしてレコードを持っていることに気づきましたか？これはまったく問題ありません。どんな型でも関連するデータとして持つことができます！そのため、どのユーザーからどんなメッセージを受けたかなど、ただの String や User の組み合わせでは何を意味するのか曖昧になってしまうような情報も非常に厳密に記述することができます。

<!--
## Modeling
-->

## 型の設計

<!--
Custom types become extremely powerful when you start modeling situations very precisely. For example, if you are waiting for some data to load, you might want to model it with a custom type like this:
-->

ある状況を非常に厳密に表現し始めるのにカスタム型は極めて強力です。例えばもし何かデータをロードされるのを待っているとしたら、その状況をこのようにカスタム型で表現したいかもしれません：

```elm
type Profile
  = Failure
  | Loading
  | Success { name : String, description : String }
```

<!--
So you can start in the `Loading` state and then transition to `Failure` or `Success` depending on what happens. This makes it really simple to write a `view` function that always shows something reasonable when data is loading.
-->

Profile のデータの状態を`Loading`から始めて、フェッチに失敗したら`Failure`、成功したら`Success`というように何が起こったかに応じて状態を遷移させることができます。このような設計は`view`関数を書くのを本当にシンプルにします。データの状態がカスタム型で表現されているので`view`関数はデータをロードしているときも常に妥当な見た目を表示することができます。

<!--
Now we know how to create custom types, the next section will show how to use them!
-->

ここまででカスタム型の作り方を知りました。次の節ではそれの使い方を学びましょう！

<!--
> **Note: Custom types are the most important feature in Elm.** They have a lot of depth, especially once you get in the habit of trying to model scenarios more precisely. I tried to share some of this depth in [Types as Sets](/appendix/types_as_sets.html) and [Types as Bits](/appendix/types_as_bits.html) in the appendix. I hope you find them helpful!
-->

> **Note: カスタム型は Elm で最も重要な機能です。** 特に一度でもより厳密にシナリオを設計しようとする習慣を持てば、カスタム型に非常に深みを感じるでしょう。わたしはこの深みを付録の[集合としての型](/appendix/types_as_sets.html)や[型のビット表現](/appendix/types_as_bits.html)で共有しようと試みています。助けになれば幸いです！
