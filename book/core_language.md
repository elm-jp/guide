
<!--
# Core Language
-->

# 言語の基礎

<!--
Let's start by getting a feeling for Elm code!
-->
<!-- TODO -->
Let's start by getting a feeling for Elm code!

<!--
The goal here is to become familiar with **values** and **functions** so you will be more confident reading Elm code when we get to the larger examples later on.
-->
<!-- TODO -->
The goal here is to become familiar with **values** and **functions** so you will be more confident reading Elm code when we get to the larger examples later on.


<!--
## Values
-->

## 値

<!--
The smallest building block in Elm is called a **value**. This includes things like `42`, `True`, and `"Hello!"`.
-->
<!-- TODO -->
The smallest building block in Elm is called a **value**. This includes things like `42`, `True`, and `"Hello!"`.

<!--
Let's start by looking at numbers:
-->
<!-- TODO -->
Let's start by looking at numbers:

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
<!-- TODO -->
All the examples on this page are interactive, so click on this black box ⬆️ and the cursor should start blinking. Type in `2 + 2` and press the ENTER key. It should print out `4`. You should be able to interact with any of the examples on this page the same way!

<!--
Try typing in things like `30 * 60 * 1000` and `2 ^ 4`. It should work just like a calculator!
-->
<!-- TODO -->
Try typing in things like `30 * 60 * 1000` and `2 ^ 4`. It should work just like a calculator!

<!--
Doing math is fine and all, but it is surprisingly uncommon in most programs! It is much more common to work with **strings** like this:
-->
<!-- TODO -->
Doing math is fine and all, but it is surprisingly uncommon in most programs! It is much more common to work with **strings** like this:

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
<!-- TODO -->
Try putting some strings together with the `(++)` operator ⬆️

<!--
These primitive values get more interesting when we start writing functions to transform them!
-->
<!-- TODO -->
These primitive values get more interesting when we start writing functions to transform them!

<!--
> **Note:** You can learn more about operators like [`(+)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#+) and [`(/)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#/) and [`(++)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#++) in the documentation for the [`Basics`](https://package.elm-lang.org/packages/elm/core/latest/Basics) module. It is worth reading through all the docs in that package at some point!
-->
<!-- TODO -->
> **Note:** You can learn more about operators like [`(+)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#+) and [`(/)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#/) and [`(++)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#++) in the documentation for the [`Basics`](https://package.elm-lang.org/packages/elm/core/latest/Basics) module. It is worth reading through all the docs in that package at some point!


<!--
## Functions
-->

## 関数

<!--
A **function** is a way to transform values. Take in one value, and produce another.
-->
<!-- TODO -->
A **function** is a way to transform values. Take in one value, and produce another.

<!--
For example, here is a `greet` function that takes in a name and says hello:
-->
<!-- TODO -->
For example, here is a `greet` function that takes in a name and says hello:

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
<!-- TODO -->
Try greeting someone else, like `"Stokely"` or `"Kwame"` ⬆️

<!--
The values passed in to the function are commonly called **arguments**, so you could say "`greet` is a function that takes one argument."
-->
<!-- TODO -->
The values passed in to the function are commonly called **arguments**, so you could say "`greet` is a function that takes one argument."

<!--
Okay, now that greetings are out of the way, how about an `madlib` function that takes _two_ arguments?
-->
<!-- TODO -->
Okay, now that greetings are out of the way, how about an `madlib` function that takes _two_ arguments?

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
<!-- TODO -->
Try giving two arguments to the `madlib` function ⬆️

<!--
Notice how we used parentheses to group `"butter" ++ "fly"` together in the second example. Each argument needs to be a primitive value like `"cat"` or it needs to be in parentheses!
-->
<!-- TODO -->
Notice how we used parentheses to group `"butter" ++ "fly"` together in the second example. Each argument needs to be a primitive value like `"cat"` or it needs to be in parentheses!

<!--
> **Note:** People coming from languages like JavaScript may be surprised that functions look different here:
-->
<!-- TODO -->
> **Note:** People coming from languages like JavaScript may be surprised that functions look different here:
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
<!-- TODO -->
> This can be surprising at first, but this style ends up using fewer parentheses and commas. It makes the language feel really clean and minimal once you get used to it!


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
<!-- TODO -->
Let's make a new `greet` function that is appropriately respectful to president Abraham Lincoln:

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
<!-- TODO -->
There are probably other cases to cover, but that will do for now!


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
<!-- TODO -->
Try making your own list and using functions like `List.length` ⬆️

<!--
And remember, all elements of the list must have the same type!
-->
<!-- TODO -->
<!-- 元の文章：
繰り返しますが、リストのすべての要素は同じ型を持っていなければならないことに注意してください。
-->
And remember, all elements of the list must have the same type!


<!--
## Tuples
-->

## タプル

<!--
Tuples are another useful data structure. A tuple can hold two or three values, and each value can have any type. A common use is if you need to return more than one value from a function. The following function gets a name and gives a message for the user:
-->
<!-- TODO -->
<!-- 元の文章
タプルはリストとはまた異なった便利なデータ構造です。タプルは固定された個数の値を保持することができ、それらの値の型はそれぞれ別々にすることができます。典型的な使いかたとしては、関数からふたつ以上の値を返す必要があるときです。次の関数は名前を受け取り、ユーザにメッセージを返します。
-->
Tuples are another useful data structure. A tuple can hold two or three values, and each value can have any type. A common use is if you need to return more than one value from a function. The following function gets a name and gives a message for the user:

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
<!-- TODO -->
A **record** can hold many values, and each value is associated with a name.

<!--
Here is a record that represents British economist John A. Hobson:
-->
<!-- TODO -->
Here is a record that represents British economist John A. Hobson:

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
<!-- TODO -->
We defined a record with three **fields** containing information about John's name and age.

<!--
Try accessing other fields like `john.age` ⬆️
-->
<!-- TODO -->
Try accessing other fields like `john.age` ⬆️

<!--
You can also access record fields by using a "field access function" like this:
-->
<!-- TODO -->
You can also access record fields by using a "field access function" like this:

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
<!-- TODO -->
It is often useful to **update** values in a record:

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
<!-- TODO -->
If you wanted to say these expressions out loud, you would say something like, "I want a new version of John where his last name is Adams" or "john where the age is 22".

<!--
Notice that when we update some fields of `john` we create a whole new record. It does not overwrite the existing one. Elm makes this efficient by sharing as much content as possible. If you update one of ten fields, the new record will share the nine unchanged values.
-->
<!-- TODO -->
Notice that when we update some fields of `john` we create a whole new record. It does not overwrite the existing one. Elm makes this efficient by sharing as much content as possible. If you update one of ten fields, the new record will share the nine unchanged values.

<!--
So a function to update ages might look like this:
-->
<!-- TODO -->
So a function to update ages might look like this:

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
<!-- TODO -->
Updating record fields like this is really common, so we will see a lot more of it in the next section!
