<!--
# Types
-->

# 型について

<!--
One of Elm's major benefits is that **users do not see runtime errors in practice**. This is possible because the Elm compiler can analyze your source code very quickly to see how values flow through your program. If a value can ever be used in an invalid way, the compiler tells you about it with a friendly error message. This is called _type inference_. The compiler figures out what _type_ of values flow in and out of all your functions.
-->

Elm の主な利点の 1 つは、**ランタイムエラーが実際に起きないことです**。 Elm コンパイラが非常に素早くソースコードを分析して、値がプログラム中でどのように使われているか解析できるためです。 値を間違った方法で使用すると、コンパイラがフレンドリーなエラーメッセージで警告してくれます。 これは _型推論_ と呼ばれています。 コンパイラは、全ての関数の引数と返り値の型を解析します。

<!--
## An Example of Type Inference
-->

## 型推論の例

<!--
The following code defines a `toFullName` function which extracts a person’s full name as a string:
-->

次のコードはフルネームを文字列で返す `toFullName` 関数を定義しています:

```elm
toFullName person =
  person.firstName ++ " " ++ person.lastName

fullName =
  toFullName { fistName = "Hermann", lastName = "Hesse" }
```

<!--
Like in JavaScript or Python, we just write the code with no extra clutter. Do you see the bug though?
-->

JavaScript や Python のように、余分なものなしにこのコードは書けます。 だけどバグがあることに気づきましたか？

<!--
In JavaScript, the equivalent code spits out `"undefined Hesse"`. Not even an error! Hopefully one of your users will tell you about it when they see it in the wild. In contrast, the Elm compiler just looks at the source code and tells you:
-->

JavaScript で同等のコードは`"undefined Hesse"`を吐き出します。 エラーですらありません！ うまくいけばユーザーがこのバグを見つけたときに報告してくれるかもしれません。 対照的に、Elm コンパイラは単にソースコードを解析するだけで警告してくれます:

```
-- TYPE MISMATCH ---------------------------------------------------------------

The argument to function `toFullName` is causing a mismatch.
# `toFullName` 関数の引数の型が合いません

6│   toFullName { fistName = "Hermann", lastName = "Hesse" }
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Function `toFullName` is expecting the argument to be:
# `toFullName`関数は以下の型の引数を期待しています:

    { …, firstName : … }

But it is:
# しかし、実際は:

    { …, fistName : … }

Hint: I compared the record fields and found some potential typos.
# 解決のヒント: レコードのフィールドを比べたところ、typoらしきものが見つかりました。

    firstName <-> fistName
```

<!--
It sees that `toFullName` is getting the wrong _type_ of argument. Like the hint in the error message says, someone accidentally wrote `fist` instead of `first`.
-->

`toFullName` が引数の _型_ を間違って取得していることがわかります。 エラーメッセージのヒントのように、誰かが誤って `first`の代わりに `fist`を書きました。

<!--
It is great to have an assistant for simple mistakes like this, but it is even more valuable when you have hundreds of files and a bunch of collaborators making changes. No matter how big and complex things get, the Elm compiler checks that _everything_ fits together properly just based on the source code.
-->

このような単純ミスを防ぐための仕組みは素晴らしいものですが、何百ものファイルや、変更を加えるたくさんのコラボレーターがいる場合、より価値のあるものになります。 どんなに大きく複雑なものでも、Elm コンパイラはソースコードに基づいて `全て` が適切かをチェックします。

<!--
The better you understand types, the more the compiler feels like a friendly assistant. So let's start learning more!
-->

型についてより理解が深まると、コンパイラはフレンドリーなアシスタントのように感じられます。 だからもっと型について学びましょう！
