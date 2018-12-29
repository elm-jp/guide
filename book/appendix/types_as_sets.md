<!--
# Types as Sets
-->

# 集合としての型

<!--
We have seen primitive types like `Bool` and `String`. We have made our own custom types like this:
-->

これまで`Bool`や`Int`、`String`のような型を見てきました。 そしてカスタム型を以下のように定義しました。

```elm
type Color = Red | Yellow | Green
```

<!--
One of the most important techniques in Elm programming is to make **the possible values in code** exactly match **the valid values in real life**. This leaves no room for invalid data, and this is why I always encourage folks to focus on custom types and data structures.
-->

Elmにおけるプログラミングの中で最も重要なテクニックのひとつは、**コード中で可能な値**を**現実世界での正当な値**に完全に一致させることです。これにより不正なデータの入り込む余地がなくなるため、私はカスタム型とデータ構造に注力するようにみんなに勧めています。

<!--
In pursuit of this goal, I have found it helpful to understand the relationship between types and sets. It sounds like a stretch, but it really helps develop your mindset!
-->

この目的を追求するにあたっては、私は型と集合の関係を理解することが役に立つということに気づきました。少し難しく聞こえるかもしれませんが、これは本当にマインドセットを開発するのに役立ちます！

<!--
## Sets
-->

## 集合

<!--
You can think of types as a set of values.
-->

型は値の集合だとみなすことが出来ます

<!--
- `Bool` is the set `{ True, False }`
- `Color` is the set `{ Red, Yellow, Green }`
- `Int` is the set `{ ... -2, -1, 0, 1, 2 ... }`
- `Float` is the set `{ ... 0.9, 0.99, 0.999 ... 1.0 ... }`
- `String` is the set `{ "", "a", "aa", "aaa" ... "hello" ... }`
-->

- `Bool` は `{ True, False }` のなす集合
- `Color` は `{ Red, Yellow, Green }` のなす集合
- `Int` は `{ ... -2, -1, 0, 1, 2 ... }` のなす集合
- `Float` は `{ ... 0.9, 0.99, 0.999 ... 1.0 ... }` のなす集合
- `String` は `{ "", "a", "aa", "aaa" ... "hello" ... }` のなす集合

<!--
So when you say `x : Bool` it is like saying `x` is in the `{ True, False }` set.
-->

つまり、`x : Bool`と言うとき、`x`は`{ True, False }`のなす集合の要素であるというようなものです。

<!--
## Cardinality
-->

## 濃度

<!--
Some interesting things happen when you start figuring out how many values are in these sets. For example the `Bool` set `{ True, False }` contains two values. So math people would say that `Bool` has a [cardinality](https://en.wikipedia.org/wiki/Cardinality) of two. So conceptually:
-->

これらの集合にどれだけ多くの値が含まれるかを考え始めると興味深いことがわかります。例えば、`Bool`集合の`{ True, False }`は2つの値を含みます。そこで数学のわかる人なら`Bool`が[濃度](https://en.wikipedia.org/wiki/Cardinality)2を持つということがわかります。つまり概念的にはこうなります:

<!--
- cardinality(`Bool`) = 2
- cardinality(`Color`) = 3
- cardinality(`Int`) = ∞
- cardinality(`Float`) = ∞
- cardinality(`String`) = ∞
-->

- `Bool`の濃度 = 2
- `Color`の濃度 = 3
- `Int`の濃度 = ∞
- `Float`の濃度 = ∞
- `String`の濃度 = ∞

<!--
This gets more interesting when we start thinking about types like `(Bool, Bool)` that combine sets together.
-->

`(Bool, Bool)`のような集合の組み合せを考え始めるとより興味深いことがわかります。

<!--
> **Note:** The cardinality for `Int` and `Float` are actually smaller than infinity. Computers need to fit the numbers into a fixed amount of bits (as described [here](/appendix/types-as-bits.html)) so it is more like cardinality(`Int32`) = 2^32 and cardinality(`Float32`) = 2^32. The point is just that it is a lot.
-->

> **Note:** `Int`と`Float`の濃度は実際には無限より小さくなります。コンピュータは([ここ](/appendix/types-as-bits.html)で説明されているように)固定ビット長に数値を収めねばならないため、`Int32`の濃度 = 2^32　`Float32`の濃度 = 2^32　のようになります。大事なことは、これらの濃度は大きいということです。

<!--
## Multiplication (Tuples and Records)
-->

## 乗算 (タプルとレコード)

<!--
When you combine types with tuples, the cardinalities get multiplied:
-->

型を組み合わせてタプルを作るとき、濃度は乗算になります:

<!--
- cardinality(`(Bool, Bool)`) = cardinality(`Bool`) × cardinality(`Bool`) = 2 × 2 = 4
- cardinality(`(Bool, Color)`) = cardinality(`Bool`) × cardinality(`Color`) = 2 × 3 = 6
-->

- `(Bool, Bool)`の濃度 = `Bool`の濃度 × `Bool`の濃度 = 2 × 2 = 4
- `(Bool, Color)`の濃度 = `Bool`の濃度 × `Color`の濃度 = 2 × 3 = 6

<!--
To make sure you believe this, try listing all the possible values of `(Bool, Bool)` and `(Bool, Color)`. Do they match the numbers we predicted? How about for `(Color, Color)`?
-->

自分でこれが正しいのだと信じるためには、`(Bool, Bool)`と`(Bool, Color)`で可能な値を全て挙げてみてください。挙げてみた値は予想と一致しましたか？`(Color, Color)`の場合はどうですか？

<!--
But what happens when we use infinite sets like `Int` and `String`?
-->

しかし、`Int`や`String`のような無限集合を扱う場合はどうなるでしょう？

<!--
- cardinality(`(Bool, String)`) = 2 × ∞
- cardinality(`(Int, Int)`) = ∞ × ∞
-->

- `(Bool, String)`の濃度 = 2 × ∞
- `(Int, Int)`の濃度 = ∞ × ∞

<!--
I personally really like the idea of having two infinities. One wasn’t enough? And then seeing infinite infinities. Aren’t we going to run out at some point?
-->

個人的に無限が2つあるという発想は好きです。ひとつで十分じゃないかって？もし無限個の無限集合があったら、どこかで収集がつかなくなるんじゃないかですって？

<!--
> **Note:** So far we have used tuples, but records work exactly the same way:
>
> - cardinality(`(Bool, Bool)`) = cardinality(`{ x : Bool, y : Bool }`)
> - cardinality(`(Bool, Color)`) = cardinality(`{ active : Bool, color : Color }`)
>
> And if you define `type Point = Point Float Float` then cardinality(`Point`) is equivalent to cardinality(`(Float, Float)`). It is all multiplication!
-->

> **Note:** ここまではタプル型を見てきました。しかしレコード型についても全く同じことが言えます:
>
> - `(Bool, Bool)`の濃度 = `{ x : Bool, y : Bool }`の濃度
> - `(Bool, Color)`の濃度 = `{ active : Bool, color : Color }`の濃度
>
> そしてもし`type Point = Point Float Float`のような定義をすれば`Point`の濃度は`(Float, Float)`の濃度と等しくなります。これは全て乗算です！

<!--
## Addition (Custom Types)
-->

## 加算 (カスタム型)

<!--
When figuring out the cardinality of a custom type, you add together the cardinality of each variant. Let’s start by looking at some `Maybe` and `Result` types
-->

カスタム型の濃度はそれぞれのバリアントの濃度を足し合わせることによっても求められます。まず最初に`Maybe`型と`Result`型を見てみましょう

<!--
- cardinality(`Result Bool Color`) = cardinality(`Bool`) + cardinality(`Color`) = 2 + 3 = 5
- cardinality(`Maybe Bool`) = 1 + cardinality(`Bool`) = 1 + 2 = 3
- cardinality(`Maybe Int`) = 1 + cardinality(`Int`) = 1 + ∞
-->
- `Result Bool Color`の濃度 = `Bool`の濃度 + `Color`の濃度 = 2 + 3 = 5
- `Maybe Bool`の濃度 = 1 + `Bool`の濃度 = 1 + 2 = 3
- `Maybe Int`の濃度 = 1 + `Int`の濃度 = 1 + ∞

<!--
To persuade yourself that this is true, try listing out all the possible values in the `Maybe Bool` and `Result Bool Color` sets. Does it match the numbers we got?
-->

自分でこれが正しいと納得するためには、`Maybe Bool`と`Result Bool Color`で可能な値を全て挙げてみてください。結果は上記の計算と一致しましたか？

<!--
Here are some other examples:
-->

その他の例はこちらです:

<!--
```elm
type Height
  = Inches Int
  | Meters Float

-- cardinality(Height)
-- = cardinality(Int) + cardinality(Float)
-- = ∞ + ∞


type Location
  = Nowhere
  | Somewhere Float Float

-- cardinality(Location)
-- = 1 + cardinality((Float, Float))
-- = 1 + cardinality(Float) × cardinality(Float)
-- = 1 + ∞ × ∞
```
-->

```elm
type Height
  = Inches Int
  | Meters Float

-- Heightの濃度
-- = Intの濃度 + Floatの濃度
-- = ∞ + ∞


type Location
  = Nowhere
  | Somewhere Float Float

-- Locationの濃度
-- = 1 + (Float, Float)の濃度
-- = 1 + Floatの濃度 × Floatの濃度
-- = 1 + ∞ × ∞
```

<!--
Looking at custom types this way helps us see when two types are equivalent. For example, `Location` is equivalent to `Maybe (Float, Float)`. Once you know that, which one should you use? I prefer `Location` for two reasons:
-->

カスタム型をこのような視点からみることは2つの型が等しいときに役立ちます。例えば、`Location`は`Maybe (Float, Float)`と等しくなります。それを踏まえた上で、どちらを使うべきでしょう？私は以下の2つの理由から`Location`が好ましいと思います。

<!--
1. The code becomes more self-documenting. No need to wonder if `Just (1.6, 1.8)` is a location or a pair of heights.
2. The `Maybe` module may expose functions that do not make sense for my particular data. For example, combining two locations probably should not work like `Maybe.map2`. Should one `Nowhere` mean that everything is `Nowhere`? Seems weird!
-->

1. ソースコード自身がその意味するところを雄弁に語るようになります。`Just (1.6, 1.8)`が場所を表すのか、身長の値のペアを表すのか悩む必要がありません。
2. `Maybe`モジュールは自分のデータでは意味をなさないメソッドを持っているかもしれません。例えば2つの`Location`の値を連結することは`Maybe.map2`とは違う意味になるでしょう。中にひとつだけ`Nowhere`が含まれていたら、全てが`Nowhere`になってしまうのでしょうか?それは奇妙だと思います!

<!--
In other words, I write a couple lines of code that are _similar_ to other code, but it gives me a level of clarity and control that is extremely valuable for large code bases and teams.
-->
言い換えれば、もし他のある部分と似た複数行のコードを書いても、ある程度明確さをもたせ、統制の取れたコードを書くことができるため、それは大規模なコードベースとチームに対して非常に価値のあるものとなります。

<!--
## Who Cares?
-->

## 誰が気にするの？

<!--
Thinking of “types as sets” helps explain an important class of bugs: **invalid data**. For example, say we want to represent the color of a traffic light. The set of valid values are { red, yellow, green } but how do we represent that in code? Here are three different approaches:
-->
「集合としての型」について考えることは**不正なデータ**という重要なバグの一群を説明するのに役立ちます。例えば、交通信号の色を表したいとしましょう。値の集合は{ red, yellow, green }ですが、どうやってコードで表現するのでしょう。以下は3つの異なるアプローチです:

<!--
- `type alias Color = String` &mdash; We could decide that `"red"`, `"yellow"`, `"green"` are the three strings we will use, and that all the other ones are _invalid data_. But what happens if invalid data is produced? Maybe someone makes a typo like `"rad"`. Maybe someone types `"RED"` instead. Should all functions have checks for incoming color arguments? Should all functions have tests to make sure color results are valid? The root issue is that cardinality(`Color`) = ∞, meaning there are (∞ - 3) invalid values. We will need to do a lot of checking to make sure none of them ever show up!
-->
- `type alias Color = String` &mdash; `"red"`, `"yellow"`, `"green"`という3つの文字列を使い、その他は全て不正なデータとして扱うことが出来ます。しかし、もし不正なデータが生成されてしまったらどうでしょう？誰かが `"rad"`という誤字を入力するかもしれません。または大文字の`"RED"`と入力してしまうかもしれません。全ての関数で引数のチェックを行うべきでしょうか？すべての関数は結果の色の値の正当性を確認すべきでしょうか？根本的な問題は`Color`の濃度 = ∞であるため、(∞ - 3)個の不正な値があることです。これら不正な値が入り込まないように大量のチェックを行わなければなりません！

<!--
- `type alias Color = { red : Bool, yellow : Bool, green : Bool }` &mdash; The idea here is that the idea of “red” is represented by `Color True False False`. But what about `Color True True True`? What does it mean for it to be all the colors at once? This is _invalid data_. Just like with the `String` representation, we end up writing checks in our code and tests to make sure there are no mistakes. In this case, cardinality(`Color`) = 2 × 2 × 2 = 8, so there are only 5 invalid values. There are definitely fewer ways to mess up, but we should still have some checks and tests.
-->
- `type alias Color = { red : Bool, yellow : Bool, green : Bool }` &mdash; これは“red”を`Color True False False`という形で表現しようというアイデアです。しかし`Color True True True`という場合はどうでしょう？全ての色値が同時にTrueになるというのはどういう意味でしょう？これは不正なデータです。`String`で色を表現するときのように、たくさんのチェックやテストを行い間違いが起こらないようにすることになります。この場合、`Color`の濃度 = 2 × 2 × 2 = 8です、つまり5つの不正な値しかありません。混乱を引き起こす組み合わせはぐっと減りましたが、それでもチェックとテストは行わなくてはなりません。

<!--
- `type Color = Red | Yellow | Green` &mdash; In this case, invalid data is impossible. cardinality(`Color`) = 1 + 1 + 1 = 3, exactly corresponding to the set of three values in real life. So there is no point checking for invalid color data in our code or tests. It cannot exist!
-->
- `type Color = Red | Yellow | Green` &mdash; この場合、不正なデータが使われることはありません。`Color`の濃度 = 1 + 1 + 1 = 3であり、現実世界で可能な3つの組み合わせと完全に一致します。そのため、不正な値が使われていることをチェックしたりテストしたりする必要はありません。それらは存在し得ないのです！

<!--
So the whole point here is that **ruling out invalid data makes your code shorter, simpler, and more reliable.** By making sure the set of _possible_ values in code exactly matches the set of _valid_ values in real life, many problems just go away. This is a sharp knife!
-->
肝心なことは、不正なデータを排除することはソースコードをより短くし、より単純にし、そしてより信頼性を上げることです。コード中で可能な値を現実世界で可能な値に完全に一致させることで、数多くの問題がなくなります。これは切れ味鋭いナイフのようです！

<!--
As your program changes, the set of possible values in code may start to diverge from the set of valid values in real life. **I highly recommend revisiting your types periodically to make them match again.** This is like noticing your knife has become dull and sharpening it with a whetstone. This kind of maintenance is a core part of programming in Elm.
-->
プログラムが変化していくに連れ、コード中での可能な値は現実世界で正当な値の集合から離れていってしまうかもしれません。**そういうときは自分の型を見つめ直して、それらを一致させることを強く勧めます。**これはナイフの切れ味が鈍くなった事に気づいて、砥石で研ぎ直すようなものです。このような保守はElmでのプログラミングの中心となる作業のひとつです。

<!--
**When you start thinking this way, you end up needing fewer tests, yet having more reliable code.** You start using fewer dependencies, yet accomplishing things more quickly. Similarly, someone skilled with a knife probably will not buy a [SlapChop](https://www.slapchop.com/). There is definitely a place for blenders and food processors, but it is smaller than you might think. No one runs ads about how you can be independent and self-sufficient without any serious downsides. No money in that!
-->
こういった考え方をしだすと、より少ないテストしか必要にならなくなり、それでいてより信頼性の高いコードを書くことが出来ます。依存性が少なくなるにも関わらず、やるべきことをすばやく片付けられます。これはナイフを扱う技術を持った人はおそらく[SlapChop](https://www.slapchop.com/)を買わないことと似たようなものです。料理用ミキサーやフードプロセッサーが活躍する場面はもちろんあります、しかしあなたが思うよりもそれは少ないものです。人はつい、シンプルな道具よりも簡単に使いはじめられる道具を選んでしまいます。でも、そういった道具は実際にはシンプルな道具に比べて構造が複雑でどうやって動いているのかもわかりにくいため壊れやすく自分で修理できない上に、使える範囲も限られてしまうものです。

<!--
> ## Aside on Language Design
>
> Thinking of types as sets like this can also be helpful in explaining why a language would feel “easy” or “restrictive” or “error-prone” to some people. For example:
>
> - **Java** &mdash; There are primitive values like `Bool` and `String`. From there, you can create classes with a fixed set of fields of different types. This is much like records in Elm, allowing you to multiply cardinalities. But it quite difficult to do addition. You can do it with subtyping, but it is quite an elaborate process. So where `Result Bool Color` is easy in Elm, it is pretty tough in Java. I think some people find Java “restrictive” because designing a type with cardinality 5 is quite difficult, often seeming like it is not worth the trouble.
>
> - **JavaScript** &mdash; Again, there are primitive values like `Bool` and `String`. From there you can create objects with a dynamic set of fields, allowing you to multiply cardinalities. This is much more lightweight than creating classes. But like Java, doing addition is not particularly easy. For example, you can simulate `Maybe Int` with objects like `{ tag: "just", value: 42 }` and `{ tag: "nothing" }`, but this is really still multiplication of cardinality. This makes it quite difficult to exactly match the set of valid values in real life. So I think people find JavaScript “easy” because designing a type with cardinality (∞ × ∞ × ∞) is super easy and that can cover pretty much anything, but other people find it “error-prone” because desiging a type with cardinality 5 is not really possible, leaving lots of space for invalid data.
>
> Interestingly, some imperative languages have custom types! Rust is a great example. They call them [enums](https://doc.rust-lang.org/book/second-edition/ch06-01-defining-an-enum.html) to build on the intuition folks may have from C and Java. So in Rust, addition of cardinalities is just as easy as in Elm, and it brings all the same benefits!
>
> I think the point here is that “addition” of types is extraordinarily underrated in in general, and thinking of “types as sets” helps clarify why certain language designs would produce certain frustrations.
-->

> ## 言語デザインの余談
>
> このように型や集合を考えることは、ある言語がどうして「簡単」もしくは「制約的」あるいは「エラーを起こしやすい」と感じるのかを説明するのにも役立ちます。例えば:
>
> - **Java** &mdash; `Bool`や`String`といったプリミティブな値があります。そこから、固定された数の異なるフィールドを組み合わせてクラスを作ることが出来ます。これは濃度を乗算することができるためElmのレコードに似ています。しかしJavaでは濃度の加算をすることは非常に難しいです。継承をすることでそれは可能になりますが、それは負担の大きいプロセスです。Elmでは`Result Bool Color`と簡単に書けるのに、Javaではそれはとても大変なことなのです。Javaが濃度5の型をデザインするのがとても難しく、多くの場合割に合わないという意味で、Javaが「制約的」だと考える人もいるでしょう。
>
> - **JavaScript** &mdash; こちらでも `Bool`や`String`といったプリミティブな値があります。そこから動的なフィールドの集合を使ってオブジェクトを作ることが出来、濃度を乗算することが出来ます。これはクラスを作るより非常に軽量な作業です。しかしJavaのように濃度の加算はとても難しいです。例えば、`Maybe Int`を`{ tag: "just", value: 42 }`や`{ tag: "nothing" }`といった形でシミュレートすることが出来ます、しかし実際にはこれは濃度を乗算しているのです。これだと現実の世界での可能な値に合わせることが非常に困難になります。人によっては(∞ × ∞ × ∞)という濃度の型を作ることが非常に簡単でありそれで全てを扱えることからJavaScriptを簡単だと考える人がいるでしょう、しかし反対に濃度5の型をデザインすることは不可能で不正なデータが存在する可能性を大きく広げてしまうため「エラーを起こしやすい」と考える人もいます。
>
> 興味深いことに、いくつかの手続き型言語はカスタム型を持っています！Rustは良い例でしょう。RustはCやJavaから来た人々が直感的に理解しやすい[enums](https://doc.rust-lang.org/book/second-edition/ch06-01-defining-an-enum.html)を持っています。つまりRustでは濃度の加算はElmと同じくらい簡単で、同様の恩恵を全てもたらしてくれます！
>
> 肝心な点は、一般に型の「加算」は非常に過小評価されているということです。そして「集合としての型」を考えることは、なぜある言語のデザインが特定の不満を生み出すのか明確にするのに役立ちます。
