<!--
> **Note:** Custom types used to be referred to as “union types” in Elm. Names from other communities include [tagged unions](https://en.wikipedia.org/wiki/Tagged_union) and [ADTs](https://en.wikipedia.org/wiki/Algebraic_data_type).
-->
> **Note:** カスタム型（Custom type）はElmでは以前“ユニオン型（union type）”と呼ばれていました。他のコミュニティでの名前としては[tagged union](https://en.wikipedia.org/wiki/Tagged_union)や[ADT](https://en.wikipedia.org/wiki/Algebraic_data_type)などがあります。


<!--
# Custom Types
-->
# カスタム型（Custom type）

<!--
So far we have seen a bunch of types like `Bool`, `Int`, and `String`. But how do we define our own?
-->
これまで`Bool`や`Int`、`String`のような型を見てきました。では自分の型をどのように定義したらよいでしょうか？


<!--
Say we are making a chat room. Everyone needs a name, but maybe some users do not have a permanent account. They just give a name each time they show up.
-->
例えば、チャットルームを作っているとします。全ユーザに名前が必要ですが、一部のユーザは永続的なアカウントを持っていない可能性があります。アカウントを持っていないユーザはチャットルームに入るたびに名前を付けなくてはなりません。

<!--
We can describe this situation by defining a `UserStatus` type, listing all the possible variations:
-->
`UserStatus`型を定義し、全ての可能性をリストすることで、この状況を記述することができます:


```elm
type UserStatus = Regular | Visitor
```

<!--
The `UserStatus` type has two **variants**. Someone can be a `Regular` or a `Visitor`. So we could represent a user as a record like this:
-->
`UserStatus`型は2つの **バリアント** を持っています。ユーザは`Regular`か`Visitor`になれます。つまりユーザをこのようなレコードで表すことができます:

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
こうすれば、誰がアカウントを持っている`Regular`か、通りすがっただけの`Visitor`なのかをトラッキングできます。このやり方は難しいということはありませんが、もっとシンプルにできます。

<!--
Rather than creating a custom type and a type alias, we can represent all this with just a single custom type. The `Regular` and `Visitor` variants each have an associated data. In our case, the associated data is a `String` value:
-->
上述のようにカスタム型と型の別名を作成するのではなく、すべてを単一のカスタム型で表すことができます。`Regular`と`Visitor`のバリアントにはそれぞれ関連するデータを持たせます。今回の場合、関連するデータは`String`の値です：

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
Another benefit of this approach is that each variant can have different associated data. Say that `Regular` users gave their age when they signed up. There is no nice way to capture that with records, but when you define your own custom type it is no problem. We add some associated data to the `Regular` variant:
-->
この方法の別の利点は各バリアントには別の関連データを持たせられることです。`Regular`なユーザがサインアップのときに年齢を登録することを考えてみてください。これをレコード型でどうにかするいい方法はありませんが、カスタム型を自分で定義するなら問題はありません。`Regular`バリアントに他の関連データを追加してみましょう：

```elm
type User
  = Regular String Int
  | Visitor String

thomas = Regular "Thomas" 33
kate95 = Visitor "kate95"
```

<!--
The different variants of a type can diverge quite dramatically. For example, maybe we add location for `Regular` users so we can suggest regional chat rooms. Add more associated data! Or maybe we want to have anonymous users. Add a third variant called `Anonymous`. Maybe we end up with:
-->
ある型の様々なバリアントはかなり劇的にデータを追加されて分岐していく可能性があります。例えば、`Regular`ユーザに地域ローカルなチャットルームを提供するために現在地を追加することがあるかもしれません。関連データを追加しましょう。また、匿名ユーザが欲しいかもしれません。3つ目の`Anonymous`バリアントを追加しましょう。最終的にこうなります：

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
アーキテクチャセクションでは`Msg`型の定義の例をいくつか見てきました。この手の型はElmでは非常に一般的です。チャットルームアプリではこのように`Msg`型を定義しています：

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
4つのバリアントがあります。いくつかのバリアントは関連データを持っていません。他のバリアントは関連データを持っています。`ReceivedMessage`が実際にレコード型を関連データとして持っていることに気づきましたか？これはまったく問題ありません。どんな型も関連データにすることができます！カスタム型よってアプリケーション内のインタラクションを非常に正確に記述することができます。

<!--
So you will be defining your own custom types, but you will also run into types defined by others.
-->
つまり他の人が定義した型を利用して自分のカスタム型を作っていくことになるでしょう。


<!--
## Common Examples
-->
## 一般的な例

<!--
There are quite a few types defined in `elm/core` that you are sure to run into. For example, the [`Bool`][Bool] type:
-->
あなたが必ず使用することになる`elm/core`にはたくさんの型が定義されています。例えば[`Bool`][Bool]型はこのように定義されています：

```elm
type Bool = True | False
```

<!--
It has two variants. `True` and `False`. Neither has associated data.
-->
2つのバリアントを持っています。`True`と`False`です。どちらも関連データは持っていません。

<!--
Another common one is the [`Maybe`][Maybe] type:
-->
もう1つの一般的なものに[`Maybe`][Maybe]型があります：

```elm
type Maybe a = Just a | Nothing
```

<!--
This is useful for functions that may not succeed. The function [`String.toInt`][toInt] has type `String -> Maybe Int`, making it a great example:
-->
これは成功しないかもしれない関数に便利です。[`String.toInt`][toInt]関数は`String -> Maybe Int`という型を持っています。この関数は素晴らしい例です：

- `String.toInt "abc" == Nothing`
- `String.toInt "2x4" == Nothing`
- `String.toInt "403" == Just 403`
- `String.toInt "100" == Just 100`

<!--
Not all `String` values can become `Int` values in a reasonable way. By using `Maybe` we are able to capture that explicitly.
-->
すべての`String`値が合理的な方法で`Int`値に変換できるわけではありません。`Maybe`型を使うことでそれを明示的に表現することができます。

[Bool]: https://package.elm-lang.org/packages/elm-lang/core/latest/Basics#Bool
[Maybe]: https://package.elm-lang.org/packages/elm-lang/core/latest/Maybe#Maybe
[toInt]: https://package.elm-lang.org/packages/elm-lang/core/latest/String#toInt


<!--
> **Note: Custom types are the most important feature in Elm.**
>
> They may seem sort of boring on the surface, but do not be fooled! I think of them like kitchen knives. They may seem like any other boring utensil, but they have surprising depth. From [design](https://youtu.be/LO35cdWL1MQ) to [maintenance](https://youtu.be/SIw5ChGOADE) to [use](https://youtu.be/RjWkO9A-Ckk), there are so many techniques that are both foundational and totally invisible.
>
> For example, if no one tells you that knives must be sharpened with a whetstone periodically, your knives become dull and annoying. And then cooking becomes dull and annoying. The more you practice, the worse it gets. But once you know about whetstones, chopping becomes easier and more fun. Cooking becomes easier and more fun. The more you practice, the better it gets. It is a cruel pair of feedback loops, seperated only by technique. And until you know to look for it, you cannot see it!
>
> Point is, ~~knives~~ custom types are extremely important. I tried to share some of the hidden knowledge in [Types as Sets](/appendix/types_as_sets.html) and [Types as Bits](/appendix/types_as_bits.html) in the appendix. I hope you find them helpful!
-->
> **Note: カスタム型はElmではもっとも重要な機能です。**
>
> カスタム型は表面上退屈なものに見えますが、騙されてはいけません！わたしはカスタム型をキッチンナイフのように便利なものだと思っています。カスタム型は他の退屈な道具と同じように見えるかもしれませんが、驚くべき深さを持っています。[デザイン](https://youtu.be/LO35cdWL1MQ)から[手入れ](https://youtu.be/SIw5ChGOADE)や[使い方](https://youtu.be/RjWkO9A-Ckk)にいたるまで、基礎的で一見しただけではまったくわからない多くの技術がそこにはあります。
>
> 例えば誰もあなたにナイフを砥石で研がなければならないということを教えなかったら、ナイフは切れ味が鈍くなって使えないものになり、料理もつまらなく面倒なものになります。やってみればみるほど事態は悪化するでしょう。しかし砥石でナイフを研ぐことを知ったなら、刻むことはより簡単でより楽しくなるでしょう。さらに、料理も簡単で楽しくなるでしょう。やってみればみるほど上手くなっていくでしょう。この好ましいフィードバックループと好ましくないフィードバックループの差は技術にのみによって生じています。そして技術の探し方を知らない限り、その技術をわかることはないでしょう！
>
> ポイントは ~~ナイフ~~ カスタム型は非常に重要だということです。わたしはこの暗黙知を付録の[集合としての型](/appendix/types_as_sets.html)や[型のビット表現](/appendix/types_as_bits.html)で共有しようと試みています。助けになれば幸いです。
