<!--
# Type Aliases
-->
# 型の別名（タイプエイリアス）

<!--
Elm allows you to create a **type alias**. An alias is just a shorter name for some other type. It looks like this:
-->
Elmでは **型の別名（タイプエイリアス）** を作ることができます。 別名は単に他の型の短い名前です。 このように定義できます:

```elm
type alias User =
  { name : String
  , age : Int
  }
```

<!--
So rather than having to type out this record type all the time, we can just say `User` instead. For example, you can shorten type annotations like this:
-->
つまりこのレコード型をいつも書くのではなく、代わりに`User`と書くだけで済ませることができます。 例えば、型注釈をこのように短く書くことができます:

```elm
isOldEnoughToVote : User -> Bool
isOldEnoughToVote user =
  user.age >= 18

-- The following type annotations are equivalent:
--
--     isOldEnoughToVote : User -> Bool
--     isOldEnoughToVote : { name : String, age : Int } -> Bool
--
```

<!--
So all we are doing is making an **alias** for a long type. **Type aliases help us write shorter and clearer type annotations.** This becomes more important as your application grows. Say we have a `celebrateBirthday` function:
-->
<!-- TODO -->
So all we are doing is making an **alias** for a long type. **Type aliases help us write shorter and clearer type annotations.** This becomes more important as your application grows. Say we have a `celebrateBirthday` function:

```elm
celebrateBirthday : User -> User
celebrateBirthday user =
  { user | age = user.age + 1 }

-- The following type annotations are equivalent:
--
--     celebrateBirthday : User -> User
--     celebrateBirthday : { name : String, age : Int } -> { name : String, age : Int }
--
```

<!--
It is much nicer to read with the type alias, and this is only for a record with two fields! Imagine we need to add fields as our application grows. When we use type aliases, we could add 10 or 100 fields to the `User` type alias without needing to make any changes to our `celebrateBirthday` function. Nice!
-->
<!-- TODO -->
It is much nicer to read with the type alias, and this is only for a record with two fields! Imagine we need to add fields as our application grows. When we use type aliases, we could add 10 or 100 fields to the `User` type alias without needing to make any changes to our `celebrateBirthday` function. Nice!


<!--
## Record Constructors
-->
## レコードコンストラクタ

<!--
When you create a type alias specifically for a record, it also generates a **record constructor**. So if we define a `User` type alias, we can start building records like this:
-->
レコード用に型の別名を作成すると、 **レコードコンストラクタ**も一緒に生成されます。 つまり`User`型を定義したら、このようにレコードを作れます:

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

Try creating another user or creating a type alias of your own ⬆️

<!--
Note that the order of arguments in the record constructor match the order of fields in the type alias!
-->
<!-- TODO -->
Note that the order of arguments in the record constructor match the order of fields in the type alias!

<!--
And again, **this is only for records.** Making type aliases for other types will not result in a constructor.
-->
**この機能はレコード型のためだけのものです。** その他の型に別名を付けてもコンストラクタは生成されません。
