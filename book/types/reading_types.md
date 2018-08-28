<!--
# Reading Types
-->
# 型を読む

<!--
In the [Core Language](../core_language.md) section of this book, we ran a bunch of code in the REPL. Well, we are going to do it again, but now with an emphasis on the types that are getting spit out. So type `elm repl` in your terminal again. You should see this:
-->
この本の[言語の基礎](../core_language.md)セクションでは、REPL で一連のコードを実行しました。 さて、私たちはもう一度やってみるつもりですが、今度は表示される型に注目していきましょう。 ターミナルに`elm repl`と入力してください。 このように表示されます:

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
> import String
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
So far we have just let Elm figure out the types, but it also lets you write a *type annotation* on the line above a definition if you want. So when you are writing code, you can say things like this:
-->
今のところElmに型を推論させているだけですが、必要ならば、定義の上の行に*型注釈*を書くこともできます。 つまり、次のようにコードを書くことができます:

```elm
half : Float -> Float
half n =
  n / 2

divide : Float -> Float -> Float
divide x y =
  x / y

askVegeta : Int -> String
askVegeta powerLevel =
  if powerLevel > 9000 then
    "It's over 9000!!!"

  else
    "It is " ++ toString powerLevel ++ "."
```

<!--
People can make mistakes in type annotations, so what happens if they say the wrong thing? The compiler still figures out the type on its own, and it checks that your annotation matches the real answer. In other words, the compiler will always verify that all the annotations you add are correct!
-->
型注釈で間違いを犯す可能性がありますが、間違った型を書いたらどうなりますか？ コンパイラは関数の実装の型を推論し、型注釈が実際の型と一致するかどうかをチェックします。 つまり、コンパイラは追加したアノテーションが全て正しいことを常に確認します。

<!--
> **Note:** Some folks feel that it is odd that the type annotation goes on the line above the actual definition. The reasoning is that it should be easy and noninvasive to add a type annotation *later*. This way you can turn a sloppy prototype into higher-quality code just by adding lines.
-->
> **Note:** 型注釈を関数定義の上の行に書くのは奇妙だと感じている人もいます。 型注釈を*後から*追加することが簡単で、関数定義に影響なく書けるようになっていなけれならない、というのが上の行に書く理由です。 このようにして１行追加するだけで、厄介なプロトタイプを高品質のコードに変えることができます。

<!--
## Type Variables
-->
## 型変数（タイプバリアブル）

<!--
As you look through the functions in [`elm/core`][core], you will see some type signatures with lower-case letters in them. [`List.reverse`][reverse] is a good example:
-->
[`elm/core`][core]の関数を見ると、小文字の型シグネチャがいくつかあることがわかります。 [`List.reverse`][reverse]はちょうどよい例です:
> **訳注:** 型シグネチャは関数の引数の型と返り値の型の組み合わせのこと。

```elm
List.reverse : List a -> List a
```

<!--
That lower-case `a` is called a **type variable**. It means we can use `List.reverse` as if it has type:
-->
小文字の`a`は **型変数** と呼ばれるものです。 つまり`List.reverse`をこのような型を持つ関数として使えることを意味します:

- `List String -> List String`
- `List Float -> List Float`
- `List Int -> List Int`
- ...

<!--
The `a` can vary and match any type. The `List.reverse` function does not care. But once you decide that `a` is a `String` in the argument, it must also be a `String` in the result. That means `List.reverse` can never be `List String -> List Int`. All `a` values must match in any specific reversal!
-->
`a`はどのような型にも変更できます。 `List.reverse`関数は`a`の型を気にしません。 しかし、 引数の型の`a`を`String`と決めると、返り値の型の`a`も`String`でなければなりません。 つまり、`List.reverse`の型は`List String -> List Int`になることはありません。 全ての`a`の値は一致しなければなりません！

<!--
> **Note:** Type variables must start with a lower-case letter, and they do not have to be just one character! Imagine we create a function that takes an argument and then gives it back without changes. This is often called the identity function:
-->
> **Note:** 型変数は小文字で始まる必要がありますが、１文字である必要はありません！ 引数を１つ取り、それを変更せずに返す関数を作成するとします。 これはしばしばアイデンティティ関数と呼ばれます:
>
```elm
identity : value -> value
identity x =
  x
```
>
<!--
> I wrote the type signature as `value -> value`, but it could also be `a -> a`. The only thing that matters is that the type of values going in matches the type of values going out!
-->
> 型シグネチャを `value -> value`と書きましたが、`a -> a`でもかまいません。 重要なのは、関数に入る値の型と外に出る値の型が一致することだけです。

[core]: https://package.elm-lang.org/packages/elm/core/latest/
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

- `number` = `Int` or `Float`
- `appendable` = `String` or `List a`
- `compappend` = `String` or `List comparable`
- `comparable` = `Int`, `Float`, `Char`, `String`, `comparable`な値のリストかタプル

<!--
- `comparable` = `Int`, `Float`, `Char`, `String`, lists and tuples of `comparable` values
-->

<!--
These constrained type variables exist to make operations like `(+)` and `(<)` a bit more flexible.
-->
これらの制約付き型変数は、`(+)`や`(<)`のような操作をより柔軟にするために存在します。

[negate]: https://package.elm-lang.org/packages/elm/core/latest/Basics#negate
