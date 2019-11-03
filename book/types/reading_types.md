<!--
# Reading Types
-->
# 型を読む

<!--
In the [Core Language](/core_language.html) section of this book, we went through a bunch of interactive examples to get a feeling for the language. Well, we are going to do it again, but with a new question in mind. What **type** of value is that?
-->
このガイドの[言語の基礎](/core_language.md)の節では、言語の雰囲気を掴むために多くのインタラクティブな例を試しました。さて、もう一度例を試していこうと思いますが、今度は新たな問いを念頭に置いてやっていきましょう。つまり、この値の **型** はなんだろうか？ということです。


<!--
## Primitives and Lists
-->
## プリミティブとリスト

<!--
Let's enter some simple expressions and see what happens:
-->
いくつかのシンプルな式を入力して、何が起こるかを見てみましょう:

{% replWithTypes %}
[
	{
		"input": "\"hello\"",
		"value": "\u001b[93m\"hello\"\u001b[0m",
		"type_": "String"
	},
	{
		"input": "not True",
		"value": "\u001b[96mFalse\u001b[0m",
		"type_": "Bool"
	},
	{
		"input": "round 3.1415",
		"value": "\u001b[95m3\u001b[0m",
		"type_": "Int"
	}
]
{% endreplWithTypes %}

<!--
Click on this black box ⬆️ and the cursor should start blinking. Type in `3.1415` and press the ENTER key. It should print out `3.1415` followed by the type `Float`.
-->

この黒い部分 ⬆️ をクリックするとカーソルが点滅し始めます。`3.1415`と入力してエンターキーを押してください。すると、型である`Float`が付加されて`3.1415`が出力されるはずです。

<!--
Okay, but what is going on here exactly? Each entry shows value along with what **type** of value it happens to be. You can read these examples out loud like this:
-->
さて、ここでは正確には一体何が起こっているのでしょうか？出力行には値に加えてその値の **型** が表示されています。これらは次のように読み上げることができます：

<!--
- The value `"hello"` is a `String`.
- The value `False` is a `Bool`.
- The value `3` is an `Int`.
- The value `3.1415` is a `Float`.
-->
- 値`"hello"`は`String`型です。
- 値`False`は`Bool`型です。
- 値`3`は`Int`型です。
- 値`3.1415`は`Float`型です。

<!--
Elm is able to figure out the type of any value you enter! Let's see what happens with lists:
-->
Elmはあなたが入力したどんな値の型も推論することができます！今度はリストの動作を確認してみましょう：

{% replWithTypes %}
[
	{
		"input": "[ \"Alice\", \"Bob\" ]",
		"value": "[\u001b[93m\"Alice\"\u001b[0m,\u001b[93m\"Bob\"\u001b[0m]",
		"type_": "List String"
	},
	{
		"input": "[ 1.0, 8.6, 42.1 ]",
		"value": "[\u001b[95m1.0\u001b[0m,\u001b[95m8.6\u001b[0m,\u001b[95m42.1\u001b[0m]",
		"type_": "List Float"
	}
]
{% endreplWithTypes %}

<!--
You can read these types as:

1. We have a `List` filled with `String` values.
2. We have a `List` filled with `Float` values.
-->
これらの型は次のように読みます：

1. `String`型の値の要素を持つ`List`型
2. `Float`型の値の要素を持つ`List`型

<!--
The **type** is a rough description of the particular value we are looking at.
-->
**型** は私たちが注目している値の大まかな説明になります。

<!--
## Functions
-->
## 関数

<!--
Let's see the type of some functions:
-->
関数の型を見てみましょう:

{% replWithTypes %}
[
	{
		"input": "String.length",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "String -> Int"
	}
]
{% endreplWithTypes %}

<!--
Try entering `round` or `sqrt` to see some other function types ⬆️
-->
`round`や`sqrt`を入力して他の関数の型を見てみましょう ⬆️

<!--
The `String.length` function has type `String -> Int`. This means it *must* take in a `String` argument, and it will definitely return an `Int` value. So let's try giving it an argument:
-->
`String.length`関数は`String -> Int`という型を持っています。これは、*必ず*`String`型の引数を１つ受け取り、絶対に`Int`型の値を返すことを意味しています。さぁ、実際に引数を与えてみましょう：

{% replWithTypes %}
[
	{
		"input": "String.length \"Supercalifragilisticexpialidocious\"",
		"value": "\u001b[95m34\u001b[0m",
		"type_": "Int"
	}
]
{% endreplWithTypes %}

<!--
So we start with a `String -> Int` function and give it a `String` argument. This results in an `Int`.
-->
まず`String -> Int`の関数に`String`を与えてみましょう。結果は`Int`です。

<!--
What happens when you do not give a `String` though? Try entering `String.length [1,2,3]` or `String.length True` to see what happens ⬆️
-->
`String`以外を与えたら何が起こるでしょうか？`String.length [1,2,3]`と入力するか`String.length True`と入力して動作を見てみましょう ⬆️

<!--
You will find that a `String -> Int` function *must* get a `String` argument!
-->
`String -> Int`の関数は*必ず*`String`型の値を引数にしなくてはならないことが確認できたでしょう！

<!--
> **Note:** Functions that take multiple arguments end up having more and more arrows. For example, here is a function that takes two arguments:
>
-->
> **Note:** 複数の引数を取る関数は、より多くの矢印を持つことになります。例えば、2つの引数をとる関数はこうなります:
>
> {% replWithTypes %}
[
	{
		"input": "String.repeat",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "Int -> String -> String"
	}
]
{% endreplWithTypes %}
>
<!--
> Giving two arguments like `String.repeat 3 "ha"` will produce `"hahaha"`. It works to think of `->` as a weird way to separate arguments, but I explain the real reasoning [here](/appendix/function_types.md). It is pretty neat!
-->
> `String.repeat 3 "ha"`、このように２つ引数を与えると`"hahaha"`が生成されます。`->`を引数の区切り文字として考えるのは奇妙に思えますが、本当の理由は[ここで](/appendix/function_types.md)説明しています。それはとてもすっきりした説明です！

<!--
## Type Annotations
-->
## 型注釈（タイプアノテーション）

<!--
So far we have just let Elm figure out the types, but it also lets you write a **type annotation** on the line above a definition. So when you are writing code, you can say things like this:
-->
今のところElmに型を推論させているだけですが、定義の上の行に**型注釈**を書くこともできます。つまり、次のようにコードを書くことができます:

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

<!--
Adding type annotations is not required, but it is definitely recommended! Benefits include:
-->
型注釈を書くのは必須ではありませんが、絶対にお勧めします。利点は次のとおりです:

<!--
1. **Error Message Quality** &mdash; When you add a type annotation, it tells the compiler what you are _trying_ to do. Your implementation may have mistakes, and now the compiler can compare against your stated intent. &ldquo;You said argument `powerLevel` was an `Int`, but it is getting used as a `String`!&rdquo;
2. **Documentation** &mdash; When you revisit code later (or when a colleague visits it for the first time) it can be really helpful to see exactly what is going in and out of the function without having to read the implementation super carefully.
-->
1. **エラーメッセージの質** &mdash; 型注釈を書いておけば、あなたがそのコードで何を_しようと_しているかを型注釈がコンパイラに教えてくれます。あなたの実装は間違っているかもしれません。そして今コンパイラはあなたが型注釈で記述した意図と実装を比較してくれます。コンパイラ「あなたは引数`powerLevel`が`Int`だと言いましたが、`String`として使われるようになっています！」
2. **ドキュメントとしての効用** &mdash; あとでコードを見直すとき（または同僚が初めて読むとき）、実装を非常に注意深く読む必要なくその関数に何が入って何が出ていくかを正確に理解するのに型注釈は本当に役に立ちます。

<!--
People can make mistakes in type annotations though, so what happens if the annotation does not match the implementation? The compiler figures out all the types on its own, and it checks that your annotation matches the real answer. In other words, the compiler will always verify that all the annotations you add are correct. So you get better error messages _and_ documentation always stays up to date!
-->
型注釈で間違いを犯す可能性がありますが、実装した内容と一致しない型を書いたらどうなるでしょうか？コンパイラはその実装内で使われている全ての型を推論し、型注釈が実際の型と一致するかどうかをチェックします。つまり、コンパイラは追加された型注釈が全て正しいことを常に確認しています。それにより、わかりやすいエラーメッセージを出すだけではなく、型が実装の内容を示す _ドキュメントとしても_ 常に最新になっていることを担保できます！

<!--
## Type Variables
-->
## 型変数（タイプバリアブル）

<!--
As you look through more Elm code, you will start to see type annotations with lower-case letters in them. A common example is the `List.length` function:
-->
より多くのElmのコードを見てみると、小文字の型注釈があることがわかるでしょう。一般的な例として`List.length`関数が挙げられます：

{% replWithTypes %}
[
	{
		"input": "List.length",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "List a -> Int"
	}
]
{% endreplWithTypes %}

<!--
Notice that lower-case `a` in the type? That is called a **type variable**. It can vary depending on how [`List.length`][length] is used:
-->
型の中に小文字`a`があることに気づきましたか？これは **型変数** と呼ばれるものです。この`a`が実際にどんな型になるかは、[`List.length`][length]がどのように使われるかによって変わります。

{% replWithTypes %}
[
	{
		"input": "List.length [1,1,2,3,5,8]",
		"value": "\u001b[95m6\u001b[0m",
		"type_": "Int"
	},
	{
		"input": "List.length [ \"a\", \"b\", \"c\" ]",
		"value": "\u001b[95m3\u001b[0m",
		"type_": "Int"
	},
	{
		"input": "List.length [ True, False ]",
		"value": "\u001b[95m2\u001b[0m",
		"type_": "Int"
	}
]
{% endreplWithTypes %}

<!--
We just want the length, so it does not matter what is in the list. So the type variable `a` is saying that we can match any type. Let&rsquo;s look at another common example:
-->

単に長さが欲しいだけなのでリストの中に何が入っているかは気にしません。つまり型変数`a`はどんな型にも使えるということです。もう1つよくある例を見てみましょう:

{% replWithTypes %}
[
	{
		"input": "List.reverse",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "List a -> List a"
	},
	{
		"input": "List.reverse [ \"a\", \"b\", \"c\" ]",
		"value": "[\u001b[93m\"c\"\u001b[0m,\u001b[93m\"b\"\u001b[0m,\u001b[93m\"a\"\u001b[0m]",
		"type_": "List String"
	},
	{
		"input": "List.reverse [ True, False ]",
		"value": "[\u001b[96mFalse\u001b[0m,\u001b[96mTrue\u001b[0m]",
		"type_": "List Bool"
	}
]
{% endreplWithTypes %}

<!--
Again, the type variable `a` can vary depending on how [`List.reverse`][reverse] is used. But in this case, we have an `a` in the argument and in the result. This means that if you give a `List Int` you must get a `List Int` as well. Once we decide what `a` is, that’s what it is everywhere.
-->

繰り返しになりますが、型変数`a`は[`List.reverse`][reverse]がどう使われるかによって変化します。この場合は`List.reverse`の型をみると`a`は引数と結果にあることがわかります。これはつまり`List Int`を渡せば必ず同じ型`List Int`が返ってくるということです。一度`a`が何の型かを決めたらどこであってもその`a`はその型になります。

<!--
> **Note:** Type variables must start with a lower-case letter, but they can be full words. We could write the type of `List.length` as `List value -> Int` and we could write the type of `List.reverse` as `List element -> List element`. It is fine as long as they start with a lower-case letter. Type variables `a` and `b` are used by convention in many places, but some type annotations benefit from more specific names.
-->

> **Note:** 型変数は小文字から始めなければなりませんが、完全な単語でも構いません。つまり例のように1文字の変数でなくても問題ありません。`List.length`の型を`List value -> Int`とも書けますし、`List.reverse`の型は`List element -> List element`とも書けます。小文字で始まっていれば大丈夫です。型変数の`a`や`b`といった1文字のものは慣例によりいたるところで使われていますが、より具体的な名前を付けたほうがいい場合もあります。

[length]: https://package.elm-lang.org/packages/elm/core/latest/List#length
[reverse]: https://package.elm-lang.org/packages/elm/core/latest/List#reverse


<!--
## Constrained Type Variables
-->
## 制約付き型変数

<!--
There is a special variant of type variables in Elm called **constrained** type variables. The most common example is the `number` type. The [`negate`](https://package.elm-lang.org/packages/elm/core/latest/Basics#negate) function uses it:
-->
Elmには **制約付き** 型変数と呼ばれる特殊な型変数があります。最も一般的な例は`number`型です。[`negate`][negate]関数は`number`を使用します：

{% replWithTypes %}
[
	{
		"input": "negate",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "number -> number"
	}
]
{% endreplWithTypes %}

Try expressions like `negate 3.1415` and `negate (round 3.1415)` and `negate "hi"` ⬆️

<!--
Normally type variables can get filled in with anything, but `number` can only be filled in by `Int` and `Float` values. It _constrains_ the possibilities.
-->
通常、型変数にはどんな型でも当てはめることができますが、`number`には`Int`か`Float`しか当てはめられません。制約は型変数の可能性を_制限_します。

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

- `number`には`Int`か`Float`を当てはめられます
- `appendable`には`String`か`List a`を当てはめられます
- `comparable`には`Int`か`Float`,`Char`,`String`,そして`comparable`な値で構成されるリストまたはタプルを当てはめられます
- `compappend`には`String`か`List comparable`を当てはめられます


<!--
These constrained type variables exist to make operators like `(+)` and `(<)` a bit more flexible.
-->
これらの制約付き型変数は、`(+)`や`(<)`のような演算子をより柔軟に使えるようにするために存在しています。

<!--
By now we have covered types for values and functions pretty well, but what does this look like when we start wanting more complex data structures?
-->
ここまでで値と関数の型については非常によくカバーしてきましたが、より複雑なデータ構造が必要になったときにはどの様にしますか？
