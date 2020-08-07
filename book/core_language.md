
<!--
# Core Language
-->

# 言語の基礎

<!--
Let's start by getting a feeling for Elm code!
-->
まずはElmコードの雰囲気をつかむことから始めましょう！

<!--
The goal here is to become familiar with **values** and **functions** so you will be more confident reading Elm code when we get to the larger examples later on.
-->
ここでの目標は、**値**と**関数**に慣れることです。そうすることで、のちほどもっと大きなサンプルコードに触れたときに、より自信を持ってElmコードを読むことができます。


<!--
## Values
-->

## 値

<!--
The smallest building block in Elm is called a **value**. This includes things like `42`, `True`, and `"Hello!"`.
-->
Elmにおける最小の構成要素は**値**と呼ばれます。値には`42`、`True`、`"Hello！"`のようなものが含まれます。

<!--
Let's start by looking at numbers:
-->
まずは数値から見ていきましょう。

{% repl %}
[
	{
		"input": "1 + 1",
		"value": "\u001b[95m2\u001b[0m",
		"type_": "number"
	}
]
{% endrepl %}

<!--
All the examples on this page are interactive, so click on this black box ⬆️ and the cursor should start blinking. Type in `2 + 2` and press the ENTER key. It should print out `4`. You should be able to interact with any of the examples on this page the same way!
-->
このページの例はすべて対話形式で、黒い領域⬆️をクリックするとカーソルが点滅し始めます。`2 + 2`と入力してEnterキーを押してみてください。`4`と出力されるはずです。このページにあるどの例も同じように操作できるはずです！

<!--
Try typing in things like `30 * 60 * 1000` and `2 ^ 4`. It should work just like a calculator!
-->
`30 * 60 * 1000`や`2 ^ 4`などを入力してみてください。まるで電卓のように動くはずです！

<!--
Doing math is fine and all, but it is surprisingly uncommon in most programs! It is much more common to work with **strings** like this:
-->
計算は問題なくできましたが、ほとんどのプログラムでは計算をすることは意外に少ないものです！次のように**文字列**を操作することの方がはるかに多いです。

{% repl %}
[
	{
		"input": "\"hello\"",
		"value": "\u001b[93m\"hello\"\u001b[0m",
		"type_": "String"
	},
	{
		"input": "\"butter\" ++ \"fly\"",
		"value": "\u001b[93m\"butterfly\"\u001b[0m",
		"type_": "String"
	}
]
{% endrepl %}

<!--
Try putting some strings together with the `(++)` operator ⬆️
-->
`（++）`演算子を使って、いくつかの文字列を組み合わせて出力してみてください ⬆️

<!--
These primitive values get more interesting when we start writing functions to transform them!
-->
数値や文字列などのプリミティブな値は、値を変換する関数を作り始めるとさらに面白くなります！

<!--
> **Note:** You can learn more about operators like [`(+)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#+) and [`(/)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#/) and [`(++)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#++) in the documentation for the [`Basics`](https://package.elm-lang.org/packages/elm/core/latest/Basics) module. It is worth reading through all the docs in that package at some point!
-->
> **Note:** [`Basics`](https://package.elm-lang.org/packages/elm/core/latest/Basics)モジュールのドキュメントを参照することで、[`(+)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#+)、[`(/)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#/)、[`(++)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#++)
などの演算子についてより詳しく知ることができます。どこかのタイミングで、Basicsモジュールのすべてのドキュメントに目を通しておくと良いでしょう！


<!--
## Functions
-->

## 関数

<!--
A **function** is a way to transform values. Take in one value, and produce another.
-->
**関数**は値を変換するための手段です。ある値を取り込み、別の値を生成します。

<!--
For example, here is a `greet` function that takes in a name and says hello:
-->
たとえば、名前を取り込んで挨拶をする`greet`関数は次の通りです。

{% repl %}
[
	{
		"add-decl": "greet",
		"input": "greet name =\n  \"Hello \" ++ name ++ \"!\"\n",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "String -> String"
	},
	{
		"input": "greet \"Alice\"",
		"value": "\u001b[93m\"Hello Alice!\"\u001b[0m",
		"type_": "String"
	},
	{
		"input": "greet \"Bob\"",
		"value": "\u001b[93m\"Hello Bob!\"\u001b[0m",
		"type_": "String"
	}
]
{% endrepl %}

<!--
Try greeting someone else, like `"Stokely"` or `"Kwame"` ⬆️
-->
`"Stokely"`や`"Kwame"`など、他の誰かに挨拶してみてください⬆️

<!--
The values passed in to the function are commonly called **arguments**, so you could say "`greet` is a function that takes one argument."
-->
関数に渡された値は一般に**引数**と呼ばれます。「`greet`は1つの引数を取る関数である」と言えます。

<!--
Okay, now that greetings are out of the way, how about an `madlib` function that takes _two_ arguments?
-->
さて、これで挨拶はできましたが、_2つの_引数を取る`madlib`関数はどうでしょうか？

{% repl %}
[
	{
		"add-decl": "madlib",
		"input": "madlib animal adjective =\n  \"The ostentatious \" ++ animal ++ \" wears \" ++ adjective ++ \" shorts.\"\n",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "String -> String -> String"
	},
	{
		"input": "madlib \"cat\" \"ergonomic\"",
		"value": "\u001b[93m\"The ostentatious cat wears ergonomic shorts.\"\u001b[0m",
		"type_": "String"
	},
	{
		"input": "madlib (\"butter\" ++ \"fly\") \"metallic\"",
		"value": "\u001b[93m\"The ostentatious butterfly wears metallic shorts.\"\u001b[0m",
		"type_": "String"
	}
]
{% endrepl %}

<!--
Try giving two arguments to the `madlib` function ⬆️
-->
`madlib`関数に2つの引数を渡してみてください⬆️

<!--
Notice how we used parentheses to group `"butter" ++ "fly"` together in the second example. Each argument needs to be a primitive value like `"cat"` or it needs to be in parentheses!
-->
2つ目の例では、括弧を使って`"butter" ++ "fly"`を一緒のグループにする方法に注目してください。各引数は`"cat"`のようなプリミティブな値であるか、括弧で囲む必要があります！

<!--
> **Note:** People coming from languages like JavaScript may be surprised that functions look different here:
>
>     madlib "cat" "ergonomic"                  -- Elm
>     madlib("cat", "ergonomic")                // JavaScript
>
>     madlib ("butter" ++ "fly") "metallic"      -- Elm
>     madlib("butter" + "fly", "metallic")       // JavaScript
>
-->
> **Note:** JavaScriptなどの言語を使用している方々は、次の例のように関数が違って見えることに驚くかもしれません。
>
>     madlib "cat" "ergonomic"                  -- Elm
>     madlib("cat", "ergonomic")                // JavaScript
>
>     madlib ("butter" ++ "fly") "metallic"      -- Elm
>     madlib("butter" + "fly", "metallic")       // JavaScript
>
<!--
> This can be surprising at first, but this style ends up using fewer parentheses and commas. It makes the language feel really clean and minimal once you get used to it!
-->
> はじめは驚くかもしれませんが、Elmのスタイルは括弧やカンマをあまり使わずに済みます。慣れるとElm言語が本当にきれいで最小限なものに感じられます！


<!--
## If Expressions
-->

## If式

<!--
When you want to have conditional behavior in Elm, you use an if-expression.
-->

Elmで条件に応じて振る舞いを変えたいなら、if式を使うといいでしょう。

<!--
Let's make a new `greet` function that is appropriately respectful to president Abraham Lincoln:
-->
エイブラハム・リンカーン大統領に適切に敬意を払う、新しい`greet`関数を作りましょう。

{% repl %}
[
	{
		"add-decl": "greet",
		"input": "greet name =\n  if name == \"Abraham Lincoln\" then\n    \"Greetings Mr. President!\"\n  else\n    \"Hey!\"\n",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "String -> String"
	},
	{
		"input": "greet \"Tom\"",
		"value": "\u001b[93m\"Hey!\"\u001b[0m",
		"type_": "String"
	},
	{
		"input": "greet \"Abraham Lincoln\"",
		"value": "\u001b[93m\"Greetings Mr. President!\"\u001b[0m",
		"type_": "String"
	}
]
{% endrepl %}

<!--
There are probably other cases to cover, but that will do for now!
-->
他にも解説すべき例があるかもしれませんが、今はこれくらいで十分です！


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

リストは複数の値を持つことができますが、それらの値はすべて同じ型を持っていなければなりません。例として、[`List`][list]モジュールからいくつかの関数を見てみましょう。

[list]: https://package.elm-lang.org/packages/elm/core/latest/List

{% repl %}
[
	{
		"add-decl": "names",
		"input": "names =\n  [ \"Alice\", \"Bob\", \"Chuck\" ]\n",
		"value": "[\u001b[93m\"Alice\"\u001b[0m,\u001b[93m\"Bob\"\u001b[0m,\u001b[93m\"Chuck\"\u001b[0m]",
		"type_": "List String"
	},
	{
		"input": "List.isEmpty names",
		"value": "\u001b[96mFalse\u001b[0m",
		"type_": "Bool"
	},
	{
		"input": "List.length names",
		"value": "\u001b[95m3\u001b[0m",
		"type_": "String"
	},
	{
		"input": "List.reverse names",
		"value": "[\u001b[93m\"Chuck\"\u001b[0m,\u001b[93m\"Bob\"\u001b[0m,\u001b[93m\"Alice\"\u001b[0m]",
		"type_": "List String"
	},
	{
		"add-decl": "numbers",
		"input": "numbers =\n  [4,3,2,1]\n",
		"value": "[\u001b[95m4\u001b[0m,\u001b[95m3\u001b[0m,\u001b[95m2\u001b[0m,\u001b[95m1\u001b[0m]",
		"type_": "List number"
	},
	{
		"input": "List.sort numbers",
		"value": "[\u001b[95m1\u001b[0m,\u001b[95m2\u001b[0m,\u001b[95m3\u001b[0m,\u001b[95m4\u001b[0m]",
		"type_": "List number"
	},
	{
		"add-decl": "increment",
		"input": "increment n =\n  n + 1\n",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "number -> number"
	},
	{
		"input": "List.map increment numbers",
		"value": "[\u001b[95m5\u001b[0m,\u001b[95m4\u001b[0m,\u001b[95m3\u001b[0m,\u001b[95m2\u001b[0m]",
		"type_": "List number"
	}
]
{% endrepl %}

<!--
Try making your own list and using functions like `List.length` ⬆️
-->
独自のリストを作成して`List.length`などの関数を使ってみてください⬆️

<!--
And remember, all elements of the list must have the same type!
-->
繰り返しになりますが、リストのすべての要素は同じ型でなくてはいけません！


<!--
## Tuples
-->

## タプル

<!--
Tuples are another useful data structure. A tuple can hold two or three values, and each value can have any type. A common use is if you need to return more than one value from a function. The following function gets a name and gives a message for the user:
-->
タプルはリストとはまた異なった便利なデータ構造です。タプルは2～3個の値を保持することができ、それらの値の型はそれぞれ別々にすることができます。典型的な使いかたとしては、関数からふたつ以上の値を返す必要があるときです。次の関数は名前を受け取り、ユーザーにメッセージを返します。

{% repl %}
[
	{
		"add-decl": "isGoodName",
		"input": "isGoodName name =\n  if String.length name <= 20 then\n    (True, \"name accepted!\")\n  else\n    (False, \"name was too long; please limit it to 20 characters\")\n",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "String -> ( Bool, String )"
	},
	{
		"input": "isGoodName \"Tom\"",
		"value": "(\u001b[96mTrue\u001b[0m, \u001b[93m\"name accepted!\"\u001b[0m)",
		"type_": "( Bool, String )"
	}
]
{% endrepl %}

<!--
This can be quite handy, but when things start becoming more complicated, it is often best to use records instead of tuples.
-->

タプルはとても便利な場面もありますが、それによってコードが複雑になり始めたときは、タプルではなくレコードを使うほうがいいでしょう。


<!--
## Records
-->

## レコード

<!--
A **record** can hold many values, and each value is associated with a name.
-->
**レコード**は多くの値を保持でき、さらに、それぞれの値は名前に関連付けられています。

<!--
Here is a record that represents British economist John A. Hobson:
-->
以下はイギリスの経済学者ジョンA.ホブソンを表すレコードです。

{% repl %}
[
	{
		"add-decl": "john",
		"input": "john =\n  { first = \"John\"\n  , last = \"Hobson\"\n  , age = 81\n  }\n",
		"value": "{ \u001b[37mage\u001b[0m = \u001b[95m81\u001b[0m, \u001b[37mfirst\u001b[0m = \u001b[93m\"John\"\u001b[0m, \u001b[37mlast\u001b[0m = \u001b[93m\"Hobson\"\u001b[0m }",
		"type_": "{ age : number, first : String, last : String }"
	},
	{
		"input": "john.last",
		"value": "\u001b[93m\"Hobson\"\u001b[0m",
		"type_": "String"
	}
]
{% endrepl %}

<!--
We defined a record with three **fields** containing information about John's name and age.
-->
ジョンの名前と年齢に関する3つの**フィールド**を持つレコードを定義しました。

<!--
Try accessing other fields like `john.age` ⬆️
-->
`john.age`のように名前以外のフィールドにもアクセスしてみてください⬆️

<!--
You can also access record fields by using a "field access function" like this:
-->
次のような「フィールドアクセス関数」を使用してレコードのフィールドにアクセスすることもできます。

{% repl %}
[
	{
		"add-decl": "john",
		"input": "john = { first = \"John\", last = \"Hobson\", age = 81 }",
		"value": "{ \u001b[37mage\u001b[0m = \u001b[95m81\u001b[0m, \u001b[37mfirst\u001b[0m = \u001b[93m\"John\"\u001b[0m, \u001b[37mlast\u001b[0m = \u001b[93m\"Hobson\"\u001b[0m }",
		"type_": "{ age : number, first : String, last : String }"
	},
	{
		"input": ".last john",
		"value": "\u001b[93m\"Hobson\"\u001b[0m",
		"type_": "String"
	},
	{
		"input": "List.map .last [john,john,john]",
		"value": "[\u001b[93m\"Hobson\"\u001b[0m,\u001b[93m\"Hobson\"\u001b[0m,\u001b[93m\"Hobson\"\u001b[0m]",
		"type_": "List String"
	}
]
{% endrepl %}

<!--
It is often useful to **update** values in a record:
-->
「フィールドアクセス関数」はレコードの値を**更新**するのに役立つことが多いです。

{% repl %}
[
	{
		"add-decl": "john",
		"input": "john = { first = \"John\", last = \"Hobson\", age = 81 }",
		"value": "{ \u001b[37mage\u001b[0m = \u001b[95m81\u001b[0m, \u001b[37mfirst\u001b[0m = \u001b[93m\"John\"\u001b[0m, \u001b[37mlast\u001b[0m = \u001b[93m\"Hobson\"\u001b[0m }",
		"type_": "{ age : number, first : String, last : String }"
	},
	{
		"input": "{ john | last = \"Adams\" }",
		"value": "{ \u001b[37mage\u001b[0m = \u001b[95m81\u001b[0m, \u001b[37mfirst\u001b[0m = \u001b[93m\"John\"\u001b[0m, \u001b[37mlast\u001b[0m = \u001b[93m\"Adams\"\u001b[0m }",
		"type_": "{ age : number, first : String, last : String }"
	},
	{
		"input": "{ john | age = 22 }",
		"value": "{ \u001b[37mage\u001b[0m = \u001b[95m22\u001b[0m, \u001b[37mfirst\u001b[0m = \u001b[93m\"John\"\u001b[0m, \u001b[37mlast\u001b[0m = \u001b[93m\"Hobson\"\u001b[0m }",
		"type_": "{ age : number, first : String, last : String }"
	}
]
{% endrepl %}

<!--
If you wanted to say these expressions out loud, you would say something like, "I want a new version of John where his last name is Adams" or "john where the age is 22".
-->
上記の式を声に出して読み上げるとしたら「姓がAdamsになった新しいバージョンのjohnのが欲しい」とか「年齢が22歳のjohn」などと言いますよね。

<!--
Notice that when we update some fields of `john` we create a whole new record. It does not overwrite the existing one. Elm makes this efficient by sharing as much content as possible. If you update one of ten fields, the new record will share the nine unchanged values.
-->
`john`の一部のフィールドを更新すると、まったく新しいレコードが作成されることに注意してください。既存のレコードにあるフィールドが上書きされることはありません。Elmはできるだけ多くの内容を共有することによって効率的にレコードの更新を行います。10個あるフィールドの1つを更新するとき、新しいレコードは変更されていない9つの値を既存のレコードと共有します。

<!--
So a function to update ages might look like this:
-->
これらを踏まえて年齢を更新する関数を書いてみると次のようになるでしょう。

{% repl %}
[
	{
		"add-decl": "celebrateBirthday",
		"input": "celebrateBirthday person =\n  { person | age = person.age + 1 }\n",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "{ a | age : number } -> { a | age : number }"
	},
	{
		"add-decl": "john",
		"input": "john = { first = \"John\", last = \"Hobson\", age = 81 }",
		"value": "{ \u001b[37mage\u001b[0m = \u001b[95m81\u001b[0m, \u001b[37mfirst\u001b[0m = \u001b[93m\"John\"\u001b[0m, \u001b[37mlast\u001b[0m = \u001b[93m\"Hobson\"\u001b[0m }",
		"type_": "{ age : number, first : String, last : String }"
	},
	{
		"input": "celebrateBirthday john",
		"value": "{ \u001b[37mage\u001b[0m = \u001b[95m82\u001b[0m, \u001b[37mfirst\u001b[0m = \u001b[93m\"John\"\u001b[0m, \u001b[37mlast\u001b[0m = \u001b[93m\"Hobson\"\u001b[0m }",
		"type_": "{ age : number, first : String, last : String }"
	}
]
{% endrepl %}

<!--
Updating record fields like this is really common, so we will see a lot more of it in the next section!
-->
このようにしてレコードのフィールドを更新することは本当によくあります。次の章ではさらに多くの例を見ていきます！
