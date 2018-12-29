<!--
# Reading Types
-->
# 型を読む

<!--
In the [Core Language](/core_language.html) section of this book, we ran a bunch of code in the REPL. Well, we are going to do it again, but now with an emphasis on the types that are getting spit out. So type `elm repl` in your terminal again. You should see this:
-->
この本の[言語の基礎](/core_language.md)の節では、REPL で一連のコードを実行しました。 さて、私たちはもう一度やってみるつもりですが、今度は表示される型に注目していきましょう。 ターミナルに`elm repl`と入力してください。 このように表示されます:

```elm
---- Elm 0.19.0 ----------------------------------------------------------------
Read <https://elm-lang.org/0.19.0/repl> to learn more: exit, help, imports, etc.
--------------------------------------------------------------------------------
>
```

<!--
## Primitives and Lists
-->
## プリミティブとリスト

<!--
Let's enter some simple expressions and see what happens:
-->
いくつかのシンプルな式を入力して、何が起こるかを見てみましょう:

```elm
> "hello"
"hello" : String

> not True
False : Bool

> round 3.1415
3 : Int
```

<!--
In these three examples, the REPL tells us the resulting value along with what *type* of value it happens to be. The value `"hello"` is a `String`. The value `3` is an `Int`. Nothing too crazy here.
-->
上の 3 つの例では、REPL は結果として得られる値と、その値の*型*を教えてくれます。 値`"hello"`は`String`です。 値`3`は`Int`です。 何もおかしなことはありません。

<!--
Let's see what happens with lists holding different types of values:
-->
様々な型の値を保持するリストで何が起こるか見てみましょう:

```elm
> [ "Alice", "Bob" ]
[ "Alice", "Bob" ] : List String

> [ 1.0, 8.6, 42.1 ]
[ 1.0, 8.6, 42.1 ] : List Float

> []
[] : List a
```

<!--
In the first case, we have a `List` filled with `String` values. In the second, the `List` is filled with `Float` values. In the third case the list is empty, so we do not actually know what kind of values are in the list. So the type `List a` is saying "I know I have a list, but it could be filled with anything". The lower-case `a` is called a *type variable*, meaning that there are no constraints in our program that pin this down to some specific type. In other words, the type can vary based on how it is used.
-->
最初のケースでは、`List`には`String`の値が入っています。 ２番目のケースでは、`List`には`Float`の値が入っています。 3 番目のケースでは、リストは空なので実際にどのような値がリストに入っているかはわかりません。 なので `List a`という型は、「リストがあるのはわかるが、何の型が入るかはわからない」ということを表現しています。 小文字の `a`は*型変数*と呼ばれます。つまり、この型変数には特定の型に固定する制約がありません。 言い換えると、その型は使用方法に基づいて変化する可能性があるということです。


<!--
## Functions
-->
## 関数

<!--
Let's see the type of some functions:
-->
関数の型を見てみましょう:

```elm
> String.length
<function> : String -> Int
```

<!--
The function `String.length` has type `String -> Int`. This means it *must* take in a `String` argument, and it will definitely return an integer result. So let's try giving it an argument:
-->
`String.length`関数は`String -> Int`という型を持っています。 必ず`String`型の引数を１つ受け取り、整数の結果を返すことをこの型は意味します。

```elm
> String.length "Supercalifragilisticexpialidocious"
34 : Int
```

<!--
So we start with a `String -> Int` function and give it a `String` argument. This results in an `Int`.
-->
なので`String -> Int`関数から始めて、`String`を与えてみましょう。 結果は`Int`が得られます。

<!--
What happens when you do not give a `String` though?
-->
`String`以外を与えたら何が起こるでしょうか？

```elm
> String.length [1,2,3]
-- error!

> String.length True
-- error!
```

<!--
A `String -> Int` function *must* get a `String` argument!
-->
`String -> Int`の関数は*必ず*`String`型の値を引数にしなくてはなりません！

<!--
> **Note:** Functions that take multiple arguments end up having more and more arrows. For example, here is a function that takes two arguments:
>
-->
> **Note:** 複数の引数を取る関数は、より多くの矢印を持つことになります。 例えば、2つの引数をとる関数はこうなります:
>
```elm
String.repeat : Int -> String -> String
```
>
<!--
> Giving two arguments like `String.repeat 3 "ha"` will produce `"hahaha"`. It works to think of `->` as a weird way to separate arguments, but I explain the real reasoning [here](/appendix/function_types.md). It is pretty neat!
-->
> `String.repeat 3 "ha"`、このように２つ引数を与えると`"hahaha"`が生成されます。 `->`を引数のセパレータとして考えるのは奇妙に思えますが、本当の理由は[ここで](/appendix/function_types.md)説明しています。 それはとてもすっきりした説明です！

<!--
## Type Annotations
-->
## 型注釈（タイプアノテーション）

<!--
So far we have just let Elm figure out the types, but it also lets you write a **type annotation** on the line above a definition if you want. So when you are writing code, you can say things like this:
-->
今のところElmに型を推論させているだけですが、必要ならば、定義の上の行に**型注釈**を書くこともできます。 つまり、次のようにコードを書くことができます:

```elm
half : Float -> Float
half n =
  n / 2

-- half 256 == 128
-- half "3" -- error!

hypotenuse : Float -> Float -> Float
hypotenuse a b =
  sqrt (a^2 + b^2)

-- hypotenuse 3 4  == 5
-- hypotenuse 5 12 == 13

checkPower : Int -> String
checkPower powerLevel =
  if powerLevel > 9000 then "It's over 9000!!!" else "Meh"

-- checkPower 9001 == "It's over 9000!!!"
-- checkPower True -- error!
```

Adding type annotations is not required, but it is definitely recommended! Benefits include:

1. **Error Message Quality** &mdash; When you add a type annotation, it tells the compiler what you are _trying_ to do. Your implementation may have mistakes, and now the compiler can compare against your stated intent. &ldquo;You said argument `powerLevel` was an `Int`, but it is getting used as a `String`!&rdquo;
2. **Documentation** &mdash; When you revisit code later (or when a colleague visits it for the first time) it can be really helpful to see exactly what is going in and out of the function without having to read the implementation super carefully.
<!-- TODO -->

<!--
People can make mistakes in type annotations though, so what happens if the annotation does not match the implementation? The compiler figures out all the types on its own, and it checks that your annotation matches the real answer. In other words, the compiler will always verify that all the annotations you add are correct. So you get better error messages _and_ documentation always stays up to date!
-->
型注釈で間違いを犯す可能性がありますが、実装した内容と一致しない型を書いたらどうなるでしょうか？ コンパイラはその実装内で使われている全ての型を推論し、型注釈が実際の型と一致するかどうかをチェックします。 つまり、コンパイラは追加された型注釈が全て正しいことを常に確認します。 それにより、わかりやすいエラーメッセージを出すだけではなく、型が実装の内容を示す _ドキュメントとしても_ 常に最新になっていることを担保できます！

<!--
## Type Variables
-->
## 型変数（タイプバリアブル）

<!--
As you look through the functions in [`elm/core`][core], you will see some type signatures with lower-case letters in them. We can check some of them out in `elm repl`:
-->
[`elm/core`][core]の関数を見ると、小文字の型シグネチャがいくつかあることがわかります。
以下のように `elm repl` で実際に確かめることができます。
> **訳注:** 型シグネチャは関数の引数の型と返り値の型の組み合わせのこと。

```elm
> List.length
<function> : List a -> Int
```

<!--
Notice that lower-case `a` in the type? That is called a **type variable**. It can vary depending on how [`List.length`][length] is used:
-->
型の中に小文字の `a` があることに気づきましたか？ これは **型変数** と呼ばれるものです。
この `a` が実際にどんな型になるかは、 `[List.length][length]` がどのように使われるかによって変わります。

```elm
> List.length [1,1,2,3,5,8]
6 : Int

> List.length [ "a", "b", "c" ]
3 : Int

> List.length [ True, False ]
2 : Int
```

We just want the length, so it does not matter what is in the list. So the type variable `a` is saying that we can match any type. Let&rsquo;s look at another common example:

<!-- TODO -->

```elm
> List.reverse
<function> : List a -> List a

> List.reverse [ "a", "b", "c" ]
["c","b","a"] : List String

> List.reverse [ True, False ]
[False,True] : List Bool
```

Again, the type variable `a` can vary depending on how [`List.reverse`][reverse] is used. But in this case, we have an `a` in the argument and in the result. This means that if you give a `List Int` you must get a `List Int` as well. Once we decide what `a` is, that’s what it is everywhere.
<!-- TODO -->

> **Note:** Type variables must start with a lower-case letter, but they can be full words. We could write the type of `List.length` as `List value -> Int` and we could write the type of `List.reverse` as `List element -> List element`. It is fine as long as they start with a lower-case letter. Type variables `a` and `b` are used by convention in many places, but some type annotations benefit from more specific names.
<!-- TODO -->

[core]: https://package.elm-lang.org/packages/elm/core/latest/
[length]: https://package.elm-lang.org/packages/elm/core/latest/List#length
[reverse]: https://package.elm-lang.org/packages/elm/core/latest/List#reverse


<!--
## Constrained Type Variables
-->
## 制約付き型変数

<!--
There are a few “constrained” type variables. The most common example is probably the `number` type. The [`negate`][negate] function uses it:
-->
いくつか"制約付き"の型変数があります。 最も一般的な例はおそらく`number`型です。 [`negate`][negate]関数は`number`を使用します：

```elm
negate : number -> number
```

<!--
Normally type variables can get filled in with _anything_, but `number` can only be filled in by `Int` and `Float` values. It constrains the possibilities.
-->
通常、型変数は _どんな型_ でも埋めることができますが、`number`は`Int`と`Float`でのみ埋められます。 制約は可能性を制限します。

<!--
The full list of constrained type variables is:
-->
制約付き型変数の完全なリストは次の通りです:

<!--
- `number` permits `Int` and `Float`
- `appendable` permits `String` and `List a`
- `comparable` permits `Int`, `Float`, `Char`, `String`, and lists/tuples of `comparable` values
- `compappend` permits `String` and `List comparable`
-->

- `number` は `Int` か `Float` で埋められます
- `appendable` は `String` か `List a` で埋められます
- `comparable` は `Int`, `Float`, `Char`, `String`, そして `comparable` な値で構成されるリストまたはタプルで埋められます
- `compappend` は `String` か `List comparable` で埋められます


<!--
These constrained type variables exist to make operators like `(+)` and `(<)` a bit more flexible.
-->
これらの制約付き型変数は、`(+)`や`(<)`のような演算子をより柔軟に使えるように存在します。

[negate]: https://package.elm-lang.org/packages/elm/core/latest/Basics#negate
