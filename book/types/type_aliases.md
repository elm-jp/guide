<!--
# Type Aliases
-->
# 型エイリアス

<!--
Type annotations can start to get long. This might be a real problem if you have records with many fields! This is the core motivation for type aliases. A **type alias** is a shorter name for a type. For example, you could create a `User` alias like this:
-->
型注釈は時として長ったらしくなってしまうものです。例えば、フィールドがいくつもあるようなレコードを使っているような場合に実際に困ったことになります。主にこのような問題を解決するために、型エイリアスが存在します。**型エイリアス**とはある型につけた短い別名のことです。例えば、`User`という型エイリアスを以下のように作成したりします。

```elm
type alias User =
  { name : String
  , age : Int
  }
```

<!--
Rather than writing the whole record type all the time, we can just say `User` instead. This helps us write type annotations that are easier to read:
-->
毎度レコード型の内容を全部ズラーッと書かなくても、単に`User`とだけ書けば良いのです。これを活用すれば、読みやすい型注釈を書けます。

```elm
-- WITH ALIAS

isOldEnoughToVote : User -> Bool
isOldEnoughToVote user =
  user.age >= 18


-- WITHOUT ALIAS

isOldEnoughToVote : { name : String, age : Int } -> Bool
isOldEnoughToVote user =
  user.age >= 18
```

<!--
These two definitions are equivalent, but the one with a type alias is shorter and easier to read. So all we are doing is making an **alias** for a long type.
-->
上記の例はどちらも等価なものですが、型エイリアスを使っているものの方が型注釈が短く読みやすくなっています。このように、型エイリアスでやっているのは、そのまま書いたら長い型に対して**別名（エイリアス）**を作っているというだけのことです。

<!--
## Models
-->
## モデル

<!--
It is extremely common to use type aliases when designing a model. When we were learning about The Elm Architecture, we saw a model like this:
-->
型エイリアスの典型的な使いみちとして、モデルを設計するときが挙げられます。The Elm Architectureについて学んだ際に、以下のようなモデルをあつかいました。

```
type alias Model =
  { name : String
  , password : String
  , passwordAgain : String
  }
```

<!--
The main benefit of using a type alias for this is when we write the type annotations for the `update` and `view` functions. Writing `Msg -> Model -> Model` is so much nicer than the fully expanded version! It has the added benefit that we can add fields to our model without needing to change any type annotations.
-->
このようなモデル型に対して型エイリアスを使うと、`update`関数や`view`関数の型注釈を書く際にとてもいいことがあります。全部フィールドを漏れなく書くのに比べて、`Msg -> Model -> Model`と書くほうがずっといい感じです！ 単に見た目がスッキリするだけでなく、モデルにフィールドを追加しても型注釈を全く変更しなくていいという別の嬉しさもあります。

<!--
## Record Constructors
-->
## レコードコンストラクター

<!--
When you create a type alias specifically for a record, it also generates a **record constructor**. So if we define a `User` type alias, we can start building records like this:
-->
レコード用に型エイリアスを作成すると、 **レコードコンストラクター**も一緒に生成されます。 つまり`elm repl`で`User`型を定義したら、このようにレコードを作れます:

{% replWithTypes %}
[
	{
		"add-type": "User",
		"input": "type alias User = { name : String, age : Int }"
	},
	{
		"input": "User",
		"value": "\u001b[36m<function>\u001b[0m",
		"type_": "String -> Int -> User"
	},
	{
		"input": "User \"Sue\" 58",
		"value": "{ \u001b[37mname\u001b[0m = \u001b[93m\"Sue\"\u001b[0m, \u001b[37mage\u001b[0m = \u001b[95m58\u001b[0m }",
		"type_": "User"
	},
	{
		"input": "User \"Tom\" 31",
		"value": "{ \u001b[37mname\u001b[0m = \u001b[93m\"Tom\"\u001b[0m, \u001b[37mage\u001b[0m = \u001b[95m31\u001b[0m }",
		"type_": "User"
	}
]
{% endreplWithTypes %}

別のユーザを作成したり、自分で型エイリアスを作ってみたりしてください⬆️

<!--
Note that the order of arguments in the record constructor match the order of fields in the type alias!
-->
なお、レコードコンストラクターを使う際は、与える引数の順番が型エイリアスを定義したときのフィールドの順番と一致している必要があります。

<!--
And again, **this is only for records.** Making type aliases for other types will not result in a constructor.
-->
念のため再度の確認ですが、**これはレコードの場合に限った話です**。レコード以外の型に対して型エイリアスを作っても、コンストラクターは作成されません。
