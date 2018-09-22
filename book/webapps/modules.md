<!-- # Modules -->

# モジュール

<!-- Elm has **modules** to help you grow your codebase in a nice way. On the most basic level, modules let you break your code into multiple files. -->

Elmにはコードベースをうまく拡大していくときに役に立つ**モジュール**があります。最も基本的な段階としては、モジュールはコードを複数のファイルへと分割できるようにします。


<!-- ## Defining Modules -->

## モジュールの定義

<!-- Elm modules work best when you define them around a central type. Like how the `List` module is all about the `List` type. So say we want to build a module around a `Post` type for a blogging website. We can create something like this: -->

Elmのモジュールは、中核となる型の周りに定義していくようにすると最もうまくいきます。`List`型に対する`List`モジュールがまさしくそうであるようにです。そうなると、ブログサイトでは、`Post`型を中心にしてモジュールを組み立てたくなる思います。いろいろなものを次のように作ることができます。

```elm
module Post exposing (Post, estimatedReadTime, encode, decode)

import Json.Decode as D
import Json.Encode as E


-- POST

type alias Post =
  { title : String
  , author : String
  , content : String
  }


-- READ TIME

estimatedReadTime : Post -> Float
estimatedReadTime post =
  toFloat (wordCount post) / 220

wordCount : Post -> Int
wordCount post =
  List.length (String.words post.content)


-- JSON

encode : Post -> E.Value
encode post =
  E.object
    [ ("title", E.string post.title)
    , ("author", E.string post.author)
    , ("content", E.string post.content)
    ]

decoder : D.Decoder Post
decoder =
  D.map3 Post
    (D.field "title" D.string)
    (D.field "author" D.string)
    (D.field "content" D.string)
```

<!-- The only new syntax here is that `module Post exposing (..)` line at the very top. That means the module is known as `Post` and only certain values are available to outsiders. As written, the `wordCount` function is only available _within_ the `Post` module. Hiding functions like this is one of the most important techniques in Elm! -->

ここで新たな構文は、最上部にある`module Post exposing (..)`の行だけです。これが意味するのは、このモジュールが`Post`と呼ばれていることと、これらのいくつかの値が外部から利用できるということです。以前に書いたように、`wordCount`関数は `Post`モジュールの**中からだけで**利用可能です。このように関数を隠すのは、Elmで最も重要なテクニックのひとつです！

<!--
> **Note:** If you forget to add a module declaration, Elm will use this one instead:
>
>```elm
module Main exposing (..)
```
>
> This makes things easier for beginners working in just one file. They should not be confronted with the module system on their first day!
-->

> **ノート:** もしモジュールの定義を追加するのを忘れてしまったら、Elmは代わりに次のようなものを使います。
>
>```elm
module Main exposing (..)
```
>
> これは初心者がひとつのファイルだけで作業するのには簡単です。最初の日からいきなりモジュールシステムに向き合うべきではありません！　

<!-- ## Growing Modules -->

## モジュールを拡大する

<!-- As your application gets more complex, you will end up adding things to your modules. It is normal for Elm modules to be in the 400 to 1000 line range, as I explain in [The Life of a File](https://youtu.be/XpDsk374LDE). But when you have multiple modules, how do you decide _where_ to add new code? -->

アプリケーションがより複雑になっていくにつれて、モジュールにいろいろ追加していくことになります。Elmモジュールが400行から1000行になるのは普通のことで、これについては[The Life of a File](https://youtu.be/XpDsk374LDE)で説明したとおりです。しかし複数のモジュールがあるとき、新しいコードを**どこ**に追加するのかをどうやって決めたらいいでしょうか？

<!-- I try to use the following heuristics when code is: -->

私は次のような経験則に従うことにしています。

<!--
- **Unique** &mdash; If logic only appears in one place, I break out top-level helper functions as close to the usage as possible. Maybe use a comment header like `-- POST PREVIEW` to indicate that the following definitions are related to previewing posts.
- **Similar** &mdash; Say we want to show `Post` previews on the home page and on the author pages. On the home page, we want to emphasize the interesting content, so we want longer snippets. But on the author page, we want to emphasize the breadth of content, so we want to focus on titles. These cases are _similar_, not the same, so we go back to the **unique** heuristic. Just write the logic separately.
- **The Same** &mdash; At some point we will have a bunch of **unique** code. That is fine! But perhaps we find that some definitions contain logic that is _exactly_ the same. Break out a helper function for that logic! If all the uses are in one module, no need to do anything more. Maybe put a comment header like `-- READ TIME` if you really want.
-->

- **コードが唯一である** &mdash; もしロジックが一箇所だけに出現するのなら、使用している箇所になるべく近い、トップレベルの補助関数として分割します。すぐ後ろに続く定義が、その直前の表示と関係していることを表すため、`-- POST PREVIEW`というようなコメントヘッダを使うこともあります。
- **コードが類似している** &mdash; `Post`(投稿)のプレビューを、ホームページと作者のページの両方に表示したいとしましょう。ホームページでは、その興味深い内容を強調したいので、長めの抜粋が欲しいです。それに対して作者のページでは、内容の幅を強調したいのでタイトルに注目したいです。これらは**よく似てはいます**が、同じではありません。ですから、**『唯一』**の経験則に戻りましょう。ただロジックを別々に書きましょう。
- **コードが同一である** &mdash; **唯一の**コードが複数の箇所に現れることもあります。これは素晴らしいことです！しかしおそらく、それらの定義が**完全に**同一であることに気づくでしょう。ロジックを補助関数へと分割しましょう！　もしその使用箇所すべてがひとつのモジュールのなかであるなら、これ以上何もする必要はありません。本当にそうしたいのなら、`-- READ TIME`というようにコメントヘッダを置いてもいいかもしれません。

<!-- These heuristics are all about making helper functions within a single file. You only want to create a new module when a bunch of these helper functions all center around a specific custom type. For example, you start by creating a `Page.Author` module, and do not create a `Post` module until the helper functions start piling up. At that point, creating a new module should make your code feel easier to navigate and understand. If it does not, go back to the version that was clearer. More modules is not more better! Take the path that keeps the code simple and clear. -->

これらの経験則は、ひとつのファイルのなかに補助関数を作ることがそのすべてです。ある独自の型を中心としてたくさんの補助関数すべてがあるときだけ、新しいモジュールを作りたくなるでしょう。たとえば、`Page.Author`モジュールを作成することから始めて、補助関数が山積みになるまで`Post`モジュールは作りません。このとき、新しいモジュールを作ることは、目的のコードを見つけたりコードを理解するのを簡単にしてくれるはずです。そうでないとしたら、それがクリーンだったバージョンに戻りましょう。モジュールがたくさんあるほど良いというわけではありません！コードをシンプルかつクリーンに保つ道を選びましょう。

<!-- To summarize, assume **similar** code is **unique** by default. (It usually is in user interfaces in the end!) If you see logic that is **the same** in different definitions, make some helper functions with appropriate comment headers. When you have a bunch of helper functions about a specific type, _consider_ making a new module. If a new module makes your code clearer, great! If not, go back. More files is not inherently simpler or clearer. -->

まとめると、**類似した**コードは最初は**独自の**コードであると見なしましょう。(最後にはユーザインターフェイスでも)　　定義の異なった**同一の**ロジックを見かけたら、適切なコメントヘッダのついた補助関数を作りましょう。　　特定の型に対する大量の補助関数があるなら、それを新しいモジュールに分割することを**検討**してください。もし新たなモジュールがコードをクリーンにしてくれるのなら、それは素晴らしいです。でもそうでないのなら、止めておきましょう。多くのファイルはあるというのは、シンプルだとかクリーンだということとは本質的に異なるのです。

<!--
> **Note:** One of the most common ways to get tripped up with modules is when something that was once **the same** becomes **similar** later on. Very common, especially in user interfaces! Folks will often try to create a Frankenstein function that handles all the different cases. Adding more arguments. Adding more _complex_ arguments. The better path is to accept that you now have two **unique** situations and copy the code into both places. Customize it exactly how you need. Then see if any of the resulting logic is **the same**. If so, move it out into helpers. **Your long functions should split into multiple smaller functions, not grow longer and more complex!**
-->

> **ノート:** モジュールについて躓く最もよくあるケースのひとつは、それが最初は**『同一』**であった何らかのものが、あとから**『類似』**に変わったときです。ユーザインターフェイスではそれが特によく起こります！　それぞれ異なる場合をぜんぶまとめて扱おうとする、つぎはぎだらけの関数を作ろうとする人もいます。引数を追加します。**複雑な**引数をさらに追加します。より良い方法は、あなたはふたつの独自の状況を持っていることを受け入れ、両方の箇所にコードを複製することです。それから必要に応じてカスタマイズします。それから、ロジックが結果的に**同一**になったかどうかを見てください。もしそうなら、それを補助関数へと括りだしてください。**長い関数は複数の小さい関数へと分割するべきで、長く複雑にしてしまうべきではありません！**

<!-- ## Using Modules --->

## モジュールの使用

<!-- It is customary in Elm for all of your code to live in the `src/` directory. That is the default for [`elm.json`](https://github.com/elm/compiler/blob/0.19.0/docs/elm.json/application.md) even. So our `Post` module would need to live in a file named `src/Post.elm`. From there, we can `import` a module and use its exposed values. There are four ways to do that: -->


コードはすべて`src/`ディレクトリの中に入れておくというのがElmの慣習です。これは[`elm.json`](https://github.com/elm/compiler/blob/0.19.0/docs/elm.json/application.md)の既定値でもあります。そのため、`Post`モジュールは`src/Post.elm`という名前にする必要があります。ここまで、モジュールを`import`し、公開された値を使うことができました。これにはいくつかの方法があります。


```elm
import Post
-- Post.Post, Post.estimatedReadTime, Post.encode, Post.decoder

import Post as P
-- P.Post, P.estimatedReadTime, P.encode, P.decoder

import Post exposing (Post, estimatedReadTime)
-- Post, estimatedReadTime
-- Post.Post, Post.estimatedReadTime, Post.encode, Post.decoder

import Post as P exposing (Post, egitstimatedReadTime)
-- Post, estimatedReadTime
-- P.Post, P.estimatedReadTime, P.encode, P.decoder
```

<!-- I recommend using `exposing` pretty rarely. Ideally on zero or one of your imports. Otherwise, it can start getting hard to figure out where things came from when reading though. “Wait, where is `filterPostBy` from again? What arguments does it take?” It gets harder and harder to read through code as you add more `exposing`. I tend to use it for `import Html exposing (..)` but not on anything else. For everything else, I recommend using the standard `import` and maybe using `as` if you have a particularly long module name! -->

`exposing`を使うのは、ごくたまにだけにしておくのをお勧めします。ゼロか、ひとつのインポートだけで使うのが理想的でしょう。そうしないと、全体を通して読んだときに、それらがどこから来ているのかを把握するのが難しくなってしまいます。「待って、`filterPostBy`はどこから来たんだっけ？　引数は何を取るんだっけ？」`exposing`を追加するにつれて、コードを読んでいくのがどんどん難しくなっていきます。私は`import Html exposing (..)` を使うことはよくありますが、それ以外は使いません。まずは基本的な`import`を使い、もし特に長いモジュール名であるときは`as`を使うことをお勧めします。
