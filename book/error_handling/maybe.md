<!--
# Maybe
-->

# Maybe

<!--
As you work more with Elm, you will start seeing the [`Maybe`][Maybe] type quite frequently. It is defined like this:
-->

Elmを書くようになると[`Maybe`][Maybe]型を非常に頻繁にみるようになります。`Maybe`は以下ように定義されています:

```elm
type Maybe a
  = Just a
  | Nothing

-- Just 3.14 : Maybe Float
-- Just "hi" : Maybe String
-- Just True : Maybe Bool
-- Nothing   : Maybe a
```

<!--
This is a type with two variants. You either have `Nothing` or you have `Just` a value. The type variable makes it possible to have a `Maybe Float` and `Maybe String` depending on the particular value.
-->
`Maybe`は2つのバリアントを持つ型です。つまり何も持っていない（=`Nothing`）か、ちょうど（=`Just`）1つの値を持っているか、です。`Maybe a`の型変数は具体定な値次第で`Maybe Float`や`Maybe String`といった型を持つことを可能にします。

<!--
This can be handy in two main scenarios: partial functions and optional fields.
-->

`Maybe`は2つの主なシナリオ、つまり部分関数と省略可能なフィールドで役立ちます。

[Maybe]: https://package.elm-lang.org/packages/elm-lang/core/latest/Maybe#Maybe


<!--
## Partial Functions
-->

## 部分関数

<!--
Sometimes you want a function that gives an answer for some inputs, but not others. Many people run into this with [`String.toFloat`][toFloat] when trying to convert user input into numbers. Open up `elm repl` to see it in action:
-->

ある入力に対しては答えを与えるが他には与えない関数が欲しい場合があります。多くの人がそういう関数に遭遇するのは、ユーザからの入力を数値に変換しようとして[`String.toFloat`][toFloat]関数を使おうとしたときでしょう。実際に`elm repl`を開いて確認してみましょう:

```elm
> String.toFloat
<function> : String -> Maybe Float

> String.toFloat "3.1415"
Just 3.1415 : Maybe Float

> String.toFloat "abc"
Nothing : Maybe Float
```

<!--
Not all strings make sense as numbers, so this function models that explicitly. Can a string be turned into a float? Maybe! From there we can pattern match on the resulting data and continue as appropriate.
-->

すべての文字列が数値として意味をなすわけではありません。この関数はそれを明示的にモデリングします。文字列をfloatに変換できますか？多分（Maybe）！結果を適切に型で表現してから、そのデータをパターンマッチして適切に処理を続けます。

<!--
> **Exercise:** I wrote a little program [here](https://ellie-app.com/3P9hcDhdsc5a1) that converts from Celsius to Fahrenheit. Try refactoring the `view` code in different ways. Can you put a red border around invalid input? Can you add more conversions? Fahrenheit to Celsius? Inches to Meters?
-->

> **演習:** 摂氏から華氏に変換する小さなプログラムを[ここ](https://ellie-app.com/3P9hcDhdsc5a1)に書きました。さまざまな方法で`view`コードをリファクタリングしてみてください。無効な入力の周りに赤い枠を付けることはできますか？他の変換を追加することができますか。華氏から摂氏？インチからメートル？

[toFloat]: https://package.elm-lang.org/packages/elm-lang/core/latest/String#toFloat


<!--
## Optional Fields
-->

## 省略可能なフィールド

<!--
Another place you commonly see `Maybe` values is in records with optional fields.
-->

もう1つの`Maybe`の値がよく出てくる場所は省略可能なフィールドを持つレコードの中です。

<!--
For example, say we are running a social networking website. Connecting people, friendship, etc. You know the spiel. The Onion outlined our real goals best back in 2011: [mine as much data as possible for the CIA](https://www.theonion.com/cias-facebook-program-dramatically-cut-agencys-costs-1819594988). And if we want *all* the data, we need to ease people into it. Let them add it later. Add features that encourage them to share more and more information over time.
-->

例えば、人がつながったり、友達になったりするSNSを運営しているとします。spielのことは知っていると思いますが、Onionは2011年の最も良い目標を[CIAのためにできるだけ多くのデータを採掘する](https://www.theonion.com/cias-facebook-program-dramatically-cut-agencys-costs-1819594988)という記事で概説しました。もしある人に関する *すべての* データが欲しいのなら、人々をまずSNSに引き込む必要があります。情報は後から設定できるようにしましょう。そのうちより多くの情報を共有したくなるような機能を追加しましょう。

<!--
So let's start with a simple model of a user. They must have a name, but we are going to make the age optional.
-->

それでは単純なユーザのモデルから始めましょう。ユーザは必ず名前を持たなければなりません。しかし年齢は省略可能にしようと思います。

```elm
type alias User =
  { name : String
  , age : Maybe Int
  }
```

<!--
Now say Sue creates an account, but decides not to provide her birthday:
-->

スー（Sue）がアカウントを作ることにしたが、誕生日は提供しないと決めたとしましょう:

```elm
sue : User
sue =
  { name = "Sue", age = Nothing }
```

<!--
Sue’s friends cannot wish her a happy birthday though. I wonder if they _really_ care about her... Later Tom creates a profile and *does* give his age:
-->

スーの友達は彼女の誕生日を祝うことはできません。彼女の友達はスーを大切にしているのだろうか……。後にトム（Tom）がプロフィールを作成し、 *年齢を設定しました* 。

```elm
tom : User
tom =
  { name = "Tom", age = Just 24 }
```

<!--
Great, that will be nice on his birthday. But more importantly, Tom is part of a valuable demographic! The advertisers will be pleased.
-->

素晴らしい、これで誕生日にはいいことがあるでしょう。しかしもっと重要なことは、トムが今や貴重な人口統計データの一部になったことです。広告主は喜ぶでしょう。

<!--
Alright, so now that we have some users, how can we market alcohol to them without breaking any laws? People would probably be mad if we market to people under 21, so let's check for that:
-->

さて、今ではユーザが何人かいます。法律を破らずにアルコールを販売するにはどうしたらいいでしょうか。もし20歳未満の人に売り出そうとしたら、人々はおそらく怒り狂うでしょう。なので年齢をちゃんと確認しましょう:

```elm
canBuyAlcohol : User -> Bool
canBuyAlcohol user =
  case user.age of
    Nothing ->
      False

    Just age ->
      age >= 21
```

<!--
Notice that the `Maybe` type forces us to pattern match on the users age. It is actually impossible to write code where you forget that users may not have an age. Elm makes sure of it! Now we can advertise alcohol confident that we are not influencing minors directly! Only their older peers.
-->

`Maybe`型はユーザの年齢を使うときにパターンマッチするのを強いることに注意してください。ユーザが年齢を持っていない可能性があることを忘れたようなコードを書くことはElmでは実際に不可能です。Elmはそれを保証します！これで未成年者に直接影響を与えていないと確信してアルコールを宣伝できます。成人済みのユーザにだけ宣伝します。


<!--
## Avoiding Overuse
-->

## 使いすぎを避ける

<!--
This `Maybe` type is quite useful, but there are limits. Beginners are particularly prone to getting excited about `Maybe` and using it everywhere, even though a custom type would be more appropriate.
-->

この`Maybe`型は非常に便利ですが、限界があります。 たとえカスタム型でエラーを表現するのがより適切な場合であっても、初心者は特に`Maybe`型に興奮して、いたるところでそれを使用する傾向があります。

<!--
For example, say we have an exercise app where we compete against our friends. You start with a list of your friend’s names, but you can load more fitness information about them later. You might be tempted to model it like this:
-->

例えば、友達と競争するエクササイズアプリがあるとします。最初に友達の名前のリストを取ってきておいて、必要になったら後からその友達のフィットネス情報をロードするようにできます。この状況を以下のようにモデリングしたくなるかもしれません:

```elm
type alias Friend =
  { name : String
  , age : Maybe Int
  , height : Maybe Float
  , weight : Maybe Float
  }
```

<!--
All the information is there, but you are not really modeling the way your particular application works. It would be much more precise to model it like this instead:
-->

すべての情報がそこに表現されていますが、特定のアプリケーションがどう動作するかを本当にモデリングしていません。代わりに以下のようにモデリングする方がはるかに正確です:

```elm
type Friend
  = Less String
  | More String Info

type alias Info =
  { age : Int
  , height : Float
  , weight : Float
  }
```

<!--
This new model is capturing much more about your application. There are only two real situations. Either you have just the name, or you have the name and a bunch of information. In your view code, you just think about whether you are showing a `Less` or `More` view of the friend. You do not have to answer questions like &ldquo;what if I have an `age` but not a `weight`?&rdquo; That is not possible with our more precise type!
-->

この新しいモデルはアプリケーションについてもっと多くのことを捉えています。実際の状況は2つしかありません。名前だけを持っているか、あるいは名前とたくさんの情報を持っているかのどちらかです。viewのコードでは、もはや単に`Friend`型の`Less`か`More`のどちらのviewを表示するかについて考えるだけです。&ldquo;私が年齢を持っていて体重を持っていない場合はどうすればいいのか&rdquo;というような疑問に答える必要はありません。そのような状況はこの、より正確な型では不可能です！

<!--
Point is, if you find yourself using `Maybe` everywhere, it is worth examining your `type` and `type alias` definitions to see if you can find a more precise representation. This often leads to a lot of nice refactors in your update and view code!
-->

ポイントは、どこかで`Maybe`を使っているのを見つけたら、より正確な表現を見つけられるかどうかみるために`type`と`type alias`を使った型の定義を調べる価値があるということです。これはしばしばupdateとviewのコードにたくさんの素晴らしいリファクタリングを導きます！


<!--
> ## Aside: Connection to `null` references
>
> The inventor of `null` references, Tony Hoare, described them like this:
>
> > I call it my billion-dollar mistake. It was the invention of the null reference in 1965. At that time, I was designing the first comprehensive type system for references in an object oriented language (ALGOL W). My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.
>
> That design makes failure **implicit**. Any time you think you have a `String` you just might have a `null` instead. Should you check? Did the person giving you the value check? Maybe it will be fine? Maybe it will crash your server? I guess we will find out later!
>
> Elm avoids these problems by not having `null` references at all. We instead use custom types like `Maybe` to make failure **explicit**. This way there are never any surprises. A `String` is always a `String`, and when you see a `Maybe String`, the compiler will ensure that both variants are accounted for. This way you get the same flexibility, but without the surprise crashes.
-->

> ## 余談: `null`参照と関連して
>
> `null`参照の発明者であるTony Hoareは、`null`参照を次のように述懐しました。
>
> > それは10億ドル相当の過ちだったと私は思います。それとは1965年のnull参照の発明です。当時、私はオブジェクト指向言語（ALGOL W）での参照のための最初の包括的な型システムを設計していました。私の目標は、コンパイラが自動的にチェックを実行して参照の使用がすべて絶対に安全であると保証することです。しかし、私はnull参照を入れるという誘惑に耐えることができませんでした。それは単に実装がとても簡単だったからです。これにより、無数のエラー、脆弱性、およびシステムクラッシュが発生し、過去40年間でおそらく数十億ドルもの痛みと損害が発生しています。
>
> その設計は失敗を **暗黙的** にします。あなたが`String`を持っていると思っているときは、いつだって代わりに`null`を持っているだけなのかもしれません。nullかどうか確認すべきでしょうか？あなたのコードに値を渡す誰かは確認したでしょうか？多分大丈夫？サーバーをクラッシュするかもしれない？問題があるかどうかはあとで分かると思います！
>
> Elmは`null`参照をまったく持たないことでこれらの問題を回避します。代わりに失敗を **明示的** にするために `Maybe`のようなカスタム型を使用します。この方法に驚くようなことは何もありません。`String`は常に` String`であり、`Maybe String`があればコンパイラは両方のバリアントが適切に処理されていることを保証します。このようにしてnull参照と同じ柔軟性を得られまが、突然クラッシュするようなことはありません。
