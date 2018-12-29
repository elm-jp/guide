
<!--
# Core Language
-->

# 言語の基礎

<!--
This section will walk you through Elm's simple core language.
-->

この節では、Elmの言語の基礎についてざっと見ていきましょう。

<!--
This works best when you follow along, so after [installing](install.md), run `elm repl` in the terminal. You should see something like this:
-->

以下の説明の流れをたどっていくときには、REPLを使って実際に手を動かしながら読み進めていくと理解しやすいので、[インストール](install.md)が終わったらターミナルで`elm repl`を実行してみてください。ターミナルに次のようなものが表示されるはずです。

```elm
---- Elm 0.19.0 ----------------------------------------------------------------
Read <https://elm-lang.org/0.19.0/repl> to learn more: exit, help, imports, etc.
--------------------------------------------------------------------------------
>
```

<!--
The REPL prints out the type of every result, but **we will leave the type annotations off in this tutorial** for the sake of introducing concepts gradually.
-->

このREPLは入力のたびにその結果の型を出力してくれますが、Elmの概念を徐々に導入していけるように、**このチュートリアルでは型注釈は省略することにします。**


<!--
We will cover [values](#values), [functions](#functions), [lists](#lists), [tuples](#tuples), and [records](#records). These building blocks all correspond pretty closely with structures in languages like JavaScript, Python, and Java.
-->

ここでは[値](#values)や[関数](#functions)、[リスト](#lists)、[タプル](#tuples)、[レコード](#records)を取り扱います。これらの言語の要素はいずれも、JavaScriptやPython、Javaのような言語にある構造とよく似たものです。

<!--
## Values
-->

## 値


<!--
Let's get started with some strings:
-->

まずは文字列から始めましょう。

```elm
> "hello"
"hello"

> "hello" ++ "world"
"helloworld"

> "hello" ++ " world"
"hello world"
```

<!--
Elm uses the `(++)` operator to put strings together. Notice that both strings are preserved exactly as is when they are put together so when we combine `"hello"` and `"world"` the result has no spaces.
-->

Elmでは文字列の連結に`(++)`演算子を使います。これらの文字列は厳密にそのまま連結されることに注意してください。`"hello"`と`"world"`を連結したとき、その結果には空白文字は含まれません。

<!--
Math looks normal too:
-->

数式の見た目はごく普通です。

```elm
> 2 + 3 * 4
14

> (2 + 3) * 4
20
```

<!--
Unlike JavaScript, Elm makes a distinction between integers and floating point numbers. Just like Python 3, there is both floating point division `(/)` and integer division `(//)`.
-->

JavaScriptとは異なり、Elmは整数と浮動小数点数を区別します。ちょうどPython 3と同じように、浮動小数点数の除算`(/)`と整数の除算`(//)`の両方が別々に存在します。

```elm
> 9 / 2
4.5

> 9 // 2
4
```

<!--
## Functions
-->

## 関数

<!--
Let's start by writing a function `isNegative` that takes in some number and checks if it is less than zero. The result will be `True` or `False`.
-->

引数にとった数がゼロよりも小さいかどうかを調べる、`isNegative`関数を書いてみましょう。この関数の結果は、`True`か`False`になるでしょう。

```elm
> isNegative n = n < 0
<function>

> isNegative 4
False

> isNegative -7
True

> isNegative (-3 * -4)
False
```

<!--
Notice that function application looks different than in languages like JavaScript and Python and Java. Instead of wrapping all arguments in parentheses and separating them with commas, we use spaces to apply the function. So `(add(3,4))` becomes `(add 3 4)` which ends up avoiding a bunch of parens and commas as things get bigger. Ultimately, this looks much cleaner once you get used to it! The [elm/html][html] package is a good example of how this keeps things feeling light.
-->

JavaScriptやPython、Javaのような言語とは関数適用の見た目が異なっていることに注目してください。括弧の中にすべての引数をカンマで区切って書くのではなく、関数を適用するのには単に空白を使います。そのため、`(add(3,4))`は`(add 3 4)`になり、結果として括弧やカンマをたくさん書いてコードが長くなるのを避けることができるのです。いったんこれに慣れてしまえば、括弧やカンマを使う構文よりもずっと読みやすく感じられるようになるはずです！　[elm/html][html]パッケージを見ると、この関数適用の構文のお陰でコードが読みやすく保たれているのがわかると思います。

[html]: https://elm-lang.org/blog/blazing-fast-html-round-two

<!--
You can also define _anonymous functions_ like this:
-->

**無名関数**を使えば、この関数を次のように定義することもできます。

```elm
> \n -> n < 0
<function>

> (\n -> n < 0) 4
False
```

<!--
This anonymous function is the same as `isNegative`, it just is not named! Also, the parentheses in `(\n -> n < 0) 4` are important. After the arrow, Elm is just going to keep reading code as long as it can. The parentheses put bounds on this, indicating where the function body ends. This helps Elm know that `4` is an argument to the function.
-->

名前が付いていないだけで、この無名関数は`isNegative`と同じものです。また、`(\n -> n < 0) 4`に付けられた括弧は重要です。矢印に続けて、Elmはなるべく長くコードを読み続けようとします。この括弧はその範囲を制限し、関数本体がどこで終わるのかを示しているのです。これによってElmは`4`が関数の引数であるとわかるのです。

<!--
> **Note:** The backslash that starts anonymous functions is supposed to look like a lambda `λ` if you squint. This is a possibly ill-conceived wink to the intellectual history that led to languages like Elm.
-->

> **Note:** 目を細めて見ると、無名関数の先頭のバックスラッシュはラムダ(`λ`)と似ているように見えると思います。これはひょっとしたら、Elmのような言語を産んだ数学の歴史的背景を、何気なく覗き見てしまっているのかもしれませんね。

<!--
## If Expressions
-->

## If式

<!--
When you want to have conditional behavior in Elm, you use an if-expression.
-->

Elmで条件に応じて振る舞いを変えたいなら、if式を使うといいでしょう。

```elm
> if True then "hello" else "world"
"hello"

> if False then "hello" else "world"
"world"
```

<!--
The keywords `if` `then` `else` are used to separate the conditional and the two branches so we do not need any parentheses or curly braces.
-->

この`if`と`then`、`else`という予約語は、条件部分とふたつの分岐部分を区切るのに使われており、丸括弧や波括弧を使う必要はまったくありません。

<!--
Elm does not have a notion of &ldquo;truthiness&rdquo; so numbers and strings and lists cannot be used as boolean values. If we try it out, Elm will tell us that we need to work with a real boolean value.
-->

Elmは"truthiness"の概念を持たず、数や文字列、リストを真偽値として使うことはできません。もしそうしようとすると、本当の真偽値を使う必要があることをElmは教えてくれます。

<!--
Now let's make a function that tells us if a number is over 9000.
-->

次は9000以上の数であるかどうかを教えてくれる関数を作ってみましょう。

```elm
> over9000 powerLevel = \
|   if powerLevel > 9000 then "It's over 9000!!!" else "meh"
<function>

> over9000 42
"meh"

> over9000 100000
"It's over 9000!!!"
```

<!--
Using a backslash in the REPL lets us split things on to multiple lines. We use this in the definition of `over9000` above. Furthermore, it is best practice to always bring the body of a function down a line. It makes things a lot more uniform and easy to read, so you want to do this with all the functions and values you define in normal code.
-->

REPLでバックスラッシュを使うと、1行のコードを複数行に分割して入力することができます。上の`over9000`の定義でこれを使っていますね。それから、関数の本体でいつも1行下げるのはElmの良い習慣です。こうすると一貫性があり読むのが楽になるので、通常はコード中のすべての関数や値についてこのように字下げしたくなると思います。

<!--
> **Note:** Make sure that you add a whitespace before the second line of the function. Elm has a "syntactically significant whitespace" meaning that indentation is a part of its syntax.
-->

> **Note:** 関数の二行目の先頭には、空白文字を追加するようにしてください。「構文として意味のある空白」、つまりElmはその構文の一部としてインデントを持っているのです。

<!--
## Lists
-->

## リスト

<!--
Lists are one of the most common data structures in Elm. They hold a sequence of related things, similar to arrays in JavaScript.
-->

リストはElmでも最もよく使われるデータ構造のひとつです。リストは互いに関連する値の連続を保持するもので、JavaScriptの配列にも似ています。

<!--
Lists can hold many values. Those values must all have the same type. Here are a few examples that use functions from the [`List`][list] module:
-->

リストは複数の値を持つことができますが、それらの値はすべて同じ型を持っていなければなりません。例として、[`List`][list]モジュールから幾つかの関数を見てみましょう。

[list]: https://package.elm-lang.org/packages/elm/core/latest/List

```elm
> names = [ "Alice", "Bob", "Chuck" ]
["Alice","Bob","Chuck"]

> List.isEmpty names
False

> List.length names
3

> List.reverse names
["Chuck","Bob","Alice"]

> numbers = [1,4,3,2]
[1,4,3,2]

> List.sort numbers
[1,2,3,4]

> double n = n * 2
<function>

> List.map double numbers
[2,8,6,4]
```

<!--
Again, all elements of the list must have the same type.
-->

繰り返しますが、リストのすべての要素は同じ型を持っていなければならないことに注意してください。


<!--
## Tuples
-->

## タプル

<!--
Tuples are another useful data structure. A tuple can hold a fixed number of values, and each value can have any type. A common use is if you need to return more than one value from a function. The following function gets a name and gives a message for the user:
-->

タプルはリストとはまた異なった便利なデータ構造です。タプルは固定された個数の値を保持することができ、それらの値の型はそれぞれ別々にすることができます。典型的な使いかたとしては、関数からふたつ以上の値を返す必要があるときです。次の関数は名前を受け取り、ユーザにメッセージを返します。

```elm
> import String

> goodName name = \
|   if String.length name <= 20 then \
|     (True, "name accepted!") \
|   else \
|     (False, "name was too long; please limit it to 20 characters")

> goodName "Tom"
(True, "name accepted!")
```

<!--
This can be quite handy, but when things start becoming more complicated, it is often best to use records instead of tuples.
-->

タプルはとても便利な場面もありますが、それによってコードが複雑になり始めたときは、タプルではなくレコードを使うほうがいいでしょう。


<!--
## Records
-->

## レコード

<!--
A record is a fixed set of key-value pairs, similar to objects in JavaScript or Python. You will find that they are extremely common and useful in Elm! Let's see some basic examples.
-->

レコードはJavaScriptやPythonのオブジェクトに似たデータ型で、レコードは任意個のフィールドを持っていて、それぞれのフィールドに値を格納したり、フィールドから値を取り出すことができます。ただしElmのレコードのフィールドは固定されていて、レコードに動的にフィールドを付け加えたり取り除いたりすることはできません。レコードはElmではとても頻繁に使われる便利なものであることがすぐにわかるでしょう！　いくつか簡単な例を見ていきます。

```elm
> point = { x = 3, y = 4 }
{ x = 3, y = 4 }

> point.x
3

> bill = { name = "Gates", age = 62 }
{ age = 62, name = "Gates" }

> bill.name
"Gates"
```

<!--
So we can create records using curly braces and access fields using a dot. Elm also has a version of record access that works like a function. By starting the variable with a dot, you are saying *please access the field with the following name*. This means that `.name` is a function that gets the `name` field of the record.
-->

波括弧を使うとレコードを作ることができ、フィールドにアクセスするにはドットを使います。Elmのレコードアクセスには、関数のように振る舞う別の構文もあります。変数名の先頭にドットを付けると、「次の名前でフィールドにアクセスしてください」と言っていることになります。`.name`はレコードの`name`フィールドを取り出す関数であるという意味です。


```elm
> .name bill
"Gates"

> List.map .name [bill,bill,bill]
["Gates","Gates","Gates"]
```

<!--
When it comes to making functions with records, you can do some pattern matching to make things a bit lighter.
-->

関数がレコードを引数にとるときは、パターンマッチを使えば少しコードをわかりやすくすることができます。

```elm
> under70 {age} = age < 70
<function>

> under70 bill
True

> under70 { species = "Triceratops", age = 68000000 }
False
```

<!--
So we can pass any record in as long as it has an `age` field that holds a number.
-->

数値型の`age`フィールドを持っているレコードであれば、どんなレコードであっても渡すことができます。

<!--
It is often useful to update the values in a record.
-->

レコードが持つ値を更新するときに便利な、次のような構文もあります。

```elm
> { bill | name = "Nye" }
{ age = 62, name = "Nye" }

> { bill | age = 22 }
{ age = 22, name = "Gates" }
```

<!--
It is important to notice that we do not make *destructive* updates. When we update some fields of `bill` we actually create a new record rather than overwriting the existing one. Elm makes this efficient by sharing as much content as possible. If you update one of ten fields, the new record will share the nine unchanged values.
-->

この構文ではレコードの**破壊的な更新**をしているのではないことに注意してください。`bill`のフィールドを更新したとき、実際には既存のレコードを上書きしているのではなく、新たなレコードが作成されています。効率のため、Elmは新しいレコードの内容を古いレコードとなるべく共有しようとします。もし10個のフィールドのうちのひとつを更新したとしたら、変更されていない残りの9個の値は新しいレコードも共有します。


<!--
> ### Records vs Objects
>
> Records in Elm are *similar* to objects in JavaScript, but there are some important differences. With records:
>
> - You cannot ask for a field that does not exist.
> - No field will ever be `undefined` or `null`.
> - You cannot create recursive records with a `this` or `self` keyword.
>
> Elm encourages a strict separation of data and logic, and the ability to say `this` is primarily used to break this separation. This is a systemic problem in Object Oriented languages that Elm is purposely avoiding.
>
> Records also support [structural typing][st] which means records in Elm can be used in any situation as long as the necessary fields exist. This gives us flexibility without compromising reliability.

[st]: https://en.wikipedia.org/wiki/Structural_type_system "Structural Types"
-->

> ### レコードとオブジェクトの比較
>
> ElmのレコードはJavaScriptのオブジェクトと**似ています**が、幾つか重要な違いもあります。レコードには次のような特徴があります。
>
> - 存在しないフィールドにアクセスすることはできません。
> - フィールドが `undefined` や `null`　になることもありません。
> - `this` や `self` キーワードを使って再帰的なレコードを作ることはできません。
>
> Elmではデータとロジックを厳格に分離することが推奨されますが、この分離を破壊するのは主に `this` だと言って差し支えないでしょう。これはオブジェクト指向言語のシステム上の問題であり、Elmはこの問題を意図的に避けています。
>
> レコードは[構造的部分型][st]も提供しており、Elmでは必要なフィールドが存在している限りは、そのレコードを関数の引数などとして使うことができます。これにより、信頼性について妥協することなく、柔軟性も得ることができるのです。

[st]: https://en.wikipedia.org/wiki/Structural_type_system "Structural Types"
