<!--
# Function Types
-->
# 関数の型

<!--
As you look through packages like [`elm/core`][core] and [`elm/html`][html], you will definitely see functions with multiple arrows. For example:
-->
[`elm/core`][core]や[`elm/html`][html]などのパッケージを見ると、間違いなく複数の矢印を持つ関数が見つかるでしょう。例を示します:


```elm
String.repeat : Int -> String -> String
String.join : String -> List String -> String
```

<!--
Why so many arrows? What is going on here?!
-->
なぜこんなに矢印があるのでしょうか？何が起こっているのでしょうか？！

[core]: https://package.elm-lang.org/packages/elm/core/latest/
[html]: https://package.elm-lang.org/packages/elm/html/latest/


<!--
## Hidden Parentheses
-->
## 隠れた括弧

<!--
It starts to become clearer when you see all the parentheses. For example, it is also valid to write the type of `String.repeat` like this:
-->
省略されている全ての括弧を見るとより分かりやすくなります。例えば`String.repeat`の型は以下のように書いても問題ありません:

```elm
String.repeat : Int -> (String -> String)
```

<!--
It is a function that takes an `Int` and then produces _another_ function. So if we go into `elm repl` we can see this in action:
-->
これは`Int`を受け取って _新たな_ 関数を作る関数です。`elm repl`で実行してみると、以下のように動くことが分かります:

```elm
> String.repeat 4
<function> : String -> String

> String.repeat 4 "ha"
"hahahaha" : String

> String.join "|"
<function> : List String -> String

> String.join "|" ["red","yellow","green"]
"red|yellow|green" : String
```

<!--
So conceptually, **every function accepts one argument.** It may return another function that accepts one argument. Etc. At some point it will stop returning functions.
-->
つまり概念的には**全ての関数は1つの引数を受け取ります**。 関数は新たな1引数の関数を返すかもしれません。これを繰り返すと、どこかで関数を返すのを止めるでしょう。

<!--
We _could_ always put the parentheses to indicate that this is what is really happening, but it starts to get pretty unwieldy when you have multiple arguments. It is the same logic behind writing `4 * 2 + 5 * 3` instead of `(4 * 2) + (5 * 3)`. It means there is a bit extra to learn, but it is so common that it is worth it.
-->
実際に起こっていることを明示するために常に括弧をつけることはできますが、複数の引数を持つ関数などではとても扱いづらくなってしまいます。これは`4 * 2 + 5 * 3`を`(4 * 2) + (5 * 3)`とは書かないのと同じことです。型における括弧の省略ルールを新たに学ぶことは少し手間かもしれませんが、一般的に価値のあることです。

<!--
Fine, but what is the point of this feature in the first place? Why not do `(Int, String) -> String` and give all the arguments at once?
-->
ですが、そもそもこの特徴の意味は何なのでしょうか？どうして`(Int, String) -> String`のように引数を一度に渡してしまわないのでしょうか？

<!--
## Partial Application
-->
## 部分適用

<!--
It is quite common to use the `List.map` function in Elm programs:
-->
Elmにおいて`List.map`関数はごく当たり前に使われます:


```elm
List.map : (a -> b) -> List a -> List b
```

<!--
It takes two arguments: a function and a list. From there it transforms every element in the list with that function. Here are some examples:
-->
これは関数とリストの2つを引数に取ります。そしてリストの全ての要素に関数を適用したリストを返します。いくつか例を見てみましょう:

- `List.map String.reverse ["part","are"] == ["trap","era"]`
- `List.map String.length ["part","are"] == [4,3]`

<!--
Now remember how `String.repeat 4` had type `String -> String` on its own? Well, that means we can say:
-->
さて、`String.repeat 4`が`String -> String`型であったことを覚えていますか？よって以下のように使うことができます:

- `List.map (String.repeat 2) ["ha","choo"] == ["haha","choochoo"]`

<!--
The expression `(String.repeat 2)` is a `String -> String` function, so we can use it directly. No need to say `(\str -> String.repeat 2 str)`.
-->
`(String.repeat 2)`は`String -> String`型の関数ですから、直接使うことができます。`(\str -> String.repeat 2 str)`とする必要はありません。

<!--
Elm also uses the convention that **the data structure is always the last argument** across the ecosystem. This means that functions are usually designed with this possible usage in mind, making this a pretty common technique.
-->
Elmにはエコシステム全体において**データ構造は常に最後の引数である**という慣習があります。これは、通常、関数がこの使い方を念頭において設計されることを意味し、かなり一般的なテクニックです。

<!--
Now it is important to remember that **this can be overused!** It is convenient and clear sometimes, but I find it is best used in moderation. So I always recommend breaking out top-level helper functions when things get even a _little_ complicated. That way it has a clear name, the arguments are named, and it is easy to test this new helper function. In our example, that means creating:
-->
ここで**部分適用は過度に使用される可能性がある**ということを覚えておくことが大切です。部分適用は時に便利で簡潔ですが、節度を持って使うことがベストです。つまり _少しでさえ_ 複雑になった場合にはトップレベルにヘルパー関数を定義することを常に勧めます。こうすることで関数は名前を持ち、引数も名前を持ちそして新たに追加されたヘルパー関数をテストすることが容易になります。先ほどの例においては、この関数を作ることに当たります:

```elm
-- List.map reduplicate ["ha","choo"]

reduplicate : String -> String
reduplicate string =
  String.repeat 2 string
```

<!--
This case is really simple, but (1) it is now clearer that I am interested in the linguistic phenomenon known as [reduplication](https://en.wikipedia.org/wiki/Reduplication) and (2) it will be quite easy to add new logic to `reduplicate` as my program evolves. Maybe I want [shm-reduplication](https://en.wikipedia.org/wiki/Shm-reduplication) support at some point?
-->
上のケースはとてもシンプルです。しかし(1)[reduplication](https://en.wikipedia.org/wiki/Reduplication)として知られる言語学の現象に興味を持っていることがより明確になり、そして(2) `reduplicate`に新たなロジックを追加するのが非常に簡単になります。もしかしたら[shm-reduplication](https://en.wikipedia.org/wiki/Shm-reduplication)をどこかでサポートしたくなるかもしれないでしょう？


<!--
In other words, **if your partial application is getting long, make it a helper function.** And if it is multi-line, it should _definitely_ be turned into a top-level helper! This advice applies to using anonymous functions too.
-->
言い換えると、**もし部分適用が長くなっているなら、ヘルパー関数を作る**ということです。そしてもし部分適用が複数行にまたがるならば、_絶対に_ トップレベルのヘルパー関数に変えるべきです。このアドバイスは無名関数を使うときにも当てはまります。

<!--
> **Note:** If you are ending up with “too many” functions when you use this advice, I recommend using comments like `-- REDUPLICATION` to give an overview of the next five or ten functions. Old school! I have shown this with `-- UPDATE` and `-- VIEW` comments in previous examples, but it is a generic technique that I use in all my code. And if you are worried about files getting too long with this advice, I recommend watching [The Life of a File](https://youtu.be/XpDsk374LDE)!
-->
> **Note:** もしもこのアドバイスに従った結果、最終的に"あまりにも多くの"関数を定義してしまった場合、続く5個や10個の関数の概要を示すために関数に`-- REDUPLICATION`のようなコメントをつけることを推奨します。以前の例で`-- UPDATE`や`-- VIEW`などのコメントがついたものを示しましたが、これは私の全てのコードで使っている一般的なテクニックです。アドバイスに従ったらファイルがあまりに長くなっていくのではと心配しているなら、[The Life of a File](https://youtu.be/XpDsk374LDE)を見ることをおすすめします！

<!--

## Pipelines
-->
## パイプライン

<!--
Elm also has a [pipe operator][pipe] that relies on partial application. For example, say we have a `sanitize` function for turning user input into integers:
-->
Elmにも部分適用を利用する[パイプ演算子][pipe]があります。例えば、`sanitize`関数を入力を整数に変換する関数として定義されているとします:

```elm
-- BEFORE
sanitize : String -> Maybe Int
sanitize input =
  String.toInt (String.trim input)
```

<!--
We can rewrite it like this:
-->
上を以下のように書き直すことができます:

```elm
-- AFTER
sanitize : String -> Maybe Int
sanitize input =
  input
    |> String.trim
    |> String.toInt
```

<!--
So in this “pipeline” we pass the input to `String.trim` and then that gets passed along to `String.toInt`.
-->
つまり上の"パイプライン"では`String.trim`に入力を渡して、そしてその結果を`String.toInt`に入力として渡しています。

<!--
This is neat because it allows a “left-to-right” reading that many people like, but **pipelines can be overused!** When you have three or four steps, the code often gets clearer if you break out a top-level helper function. Now the transformation has a name. The arguments are named. It has a type annotation. It is much more self-documenting that way, and your teammates and your future self will appreciate it! Testing the logic gets easier too.
-->
パイプラインは多くの人が好むように、"左から右へ"読むことを可能にするため、コードをすっきりさせることができます。 しかし**パイプラインは過度に使われる可能性があります**。3、4つのパイプラインとなった場合トップレベルにヘルパー関数を書いた方がコードがより簡潔になる場合が多くあります。トップレベルに定義することで変換自体に関数名が付き、その引数にも名前が付けられ、型注釈も書くことになります。つまりソースコード自体がその意味するところを雄弁に語るようになり、チームメイトや将来の自分自身は感謝することでしょう！更にロジックをテストすることもより簡単になります。

<!--
> **Note:** I personally prefer the `BEFORE`, but perhaps that is just because I learned functional programming in languages without pipes!
-->
> **Note:** 私は個人的にはむしろ`BEFORE`のほうが好きですが、これはおそらくパイプが無い言語で関数型プログラミングを学んだからでしょう！

[pipe]: https://package.elm-lang.org/packages/elm/core/latest/Basics#|&gt;

