<!--
# Pattern Matching
-->
# パターンマッチ

<!--
On the previous page, we learned how to create [custom types](/types/custom_types.html) with the `type` keyword. Our primary example was a `User` in a chat room:
-->
前のページで、`type` キーワードを用いた[カスタム型](/types/custom_types.html)の書き方について学びました。
主要な例としてチャットルームの `User` 型を定義しました:

```elm
type User
  = Regular String
  | Visitor String
```

<!--
So we have our custom type, but how do we actually use it?
-->
カスタム型について見てきましたが、実際にはどのように使えば良いのでしょうか？

<!--
## `case`
-->
## `case`

<!--
Say we want a `toName` function that decides on a name to show for each `User`. We need to use a `case` expression:
-->
各 `User` から表示する名前を返す関数 `toName` を定義したいとします。
`case` 式を使う必要があるでしょう:

```elm
toName : User -> String
toName user =
  case user of
    Regular name ->
      name

    Visitor name ->
      name
```

<!--
The incoming `User` value can come in two different variants. The `case` expression allows us to branch based on which variant we happen to see. Here are some example uses:
-->
`User` は2つの異なるバリアントを値として持つことが出来ます。
`case` 式はどのようなバリアントかに基づいて分岐することを可能にします。
`toName` 関数を使った例はこちらです:

```elm
toName (Regular "Thomas") == "Thomas"
toName (Visitor "kate95") == "kate95"
```

<!--
And if we try invalid arguments like `toName (Visitar "kate95")` or `toName Anonymous`, the compiler tells us about it immediately. This means many “silly mistakes” can be fixed in seconds, rather than making it to users and costing a lot more time overall.
-->
そしてもし、`toName (Visitar "kate95")`　や `toName Anonymous`  のような不正な引数を与えた場合には、コンパイラがそのことについてすぐに教えてくれるでしょう。
つまり、多くの “愚かな間違い” は、たくさんの時間を費やすことなく、数秒で修正できるでしょう。

## Refactoring Support

<!--
Say we want to track the age of `Regular` users so we can try to encourage cross-generational discussions in our chat room. We first add that to our custom type:
-->

私たちのチャットルームにて世代間の議論を推奨するために、`Regular` のユーザーの年齢を追跡したいとしましょう。
まずはカスタム型に年齢の型を追加します:

```elm
type User
  = Regular String Int
  | Visitor String
```

<!--
At this point, the compiler will tell us about every single `case` expression that needs to be updated as a result. So for `toName` we might update to:
-->
この時点でコンパイラは、更新する必要のある全ての `case` 式を結果として教えてくれます。
それにより、`toName` を次のように更新するかもしれません:

```elm
toName : User -> String
toName user =
  case user of
    Regular name age ->
      name ++ " (" ++ String.fromInt age ++ ")"

    Visitor name ->
      name
```

<!--
I decided that I want to show the age as part of the display name, but maybe it should be displayed some other way. The important point is just that the compiler actively asks you to consider this question!
-->
今回は、年齢を表示する名前の一部として表示したいとしましたが、別の方法で表示すべきだと考える人も居るかもしれません。
しかし、ここでの重要なポイントはコンパイラがこの問題について考えるようにと積極的に促してくれる点です！

<!--
This is especially helpful when you start refactoring in large codebases. Say you have 20 `case` expressions that handle `User` values. They are scattered throughout a bunch of different files. The files are written and maintained by different people. And say someone adds a `Anonymous` variant to `User`:
-->
これは、あなたが大規模なコードのリファクタリングを始めたときに、特に助けになるでしょう。
例えば、`User` 型に対する20個もの `case` 式を書いていたとします。
それらは様々なファイルに散在しており、ファイルは異なる人たちによってメンテナンスされています。
そこで、新しく `Anonymous` バリアントを `User` 型に追加したいとしましょう:


```elm
type User
  = Regular String Int
  | Visitor String
  | Anonymous
```

<!--
The compiler will inform you about all 20 `case` expressions that need to be updated. You can hop around deciding exactly how to handle `Anonymous` users in each situation.
-->
コンパイラは20個もの `case` 式全てについて、更新が必要である旨を報告してくれるでしょう。
あなたは、それぞれの状況で `Anonymous` なユーザーをどのように扱うべきかを決めることができるのです。

<!--
I feel like this sounds pretty boring, but experientially, it is one of my favorite things about languages like Elm. You change a type and then the compiler helps you methodically make the necessary updates. I find it strangely relaxing. Maybe because I get to focus on the fun programming puzzles, but without the anxiety about forgetting something and spending hours trying to figure out what it was. Unclear!
-->
このようなリファクタリングはとても退屈なものだと感じますが、経験的に、Elm のようなプログラミング言語の好きな点の一つです。
型を変えると、コンパイラは必要になる更新箇所を見つけ出してくれます。
私はそこから不思議な安らぎを感じます。
これはおそらく、楽しいプログラミングパズルに集中したいが、何かを忘れてしまいそれを思い出すために時間を費やすことに対する不安を感じずにはいられないからだと思います。
知らんけど。

<!--
> **Note:** When refactoring is easy, it changes the dynamics of large projects quite significantly.
>
> Refactors like this are so risky in JavaScript that many people do not even try. Will the tests cover all 20 cases? Probably not. Will you notice all the cases that are not covered? Probably not. What about the cases in code written by your colleagues? Wait, they worked on this code too?! This leads to a (justifiable) preoccupation with getting file structure right from the first day in JavaScript projects.
>
> But when refactoring is easy, it actually works better to make changes as you learn more about the problem. Do not worry about it so much. If you get something wrong, just fix it when you find out. I describe this change in mindset in more detail in [The Life of a File](https://youtu.be/XpDsk374LDE).
-->
> **Note:** リファクタリングが容易であるならば、大規模なプロジェクトのダイナミクスをかなり大幅に変えることができます。
>
> 多くの人々が試さないであろう JavaScript でのこのようなリファクタリングはとてもリスキーです。20個全てのケースをテストでカバーできるでしょうか？おそらく無理でしょう。カバーされてない全てのケースについて気づくでしょうか？おそらく無理でしょう。あなたの同僚によって書かれたコードはどうでしょうか？待って、彼らもこのコードを弄っていませんでしたか！？これにより、初日から JavaScript プロジェクトのファイル構造が正しく取得出来ているか、という(正当な)先入観が生じることでしょう。
>
> しかし、リファクタリングが簡単なときは、問題についてもっと良く知るにつれて改善した方が実際には良く機能するでしょう。そんなに心配しないでください。何か間違えたところがあったなら、見つけたときに修正すれば良いのです。このような考え方の変化についての詳細は [The Life of a File](https://youtu.be/XpDsk374LDE) で説明します。
