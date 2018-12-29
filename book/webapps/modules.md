<!--
# Modules
-->

# モジュール

<!--
Elm has **modules** to help you grow your codebase in a nice way. On the most basic level, modules let you break your code into multiple files.
-->

Elm にはコードベースをうまく拡大していくときに役に立つ**モジュール**があります。最も基本的には、モジュールはコードを複数のファイルへと分割できるようにします。

<!--
## Defining Modules
-->

## モジュールの定義

<!--
Elm modules work best when you define them around a central type. Like how the `List` module is all about the `List` type. So say we want to build a module around a `Post` type for a blogging website. We can create something like this:
-->

Elm のモジュールは、型を中心にして定義していくようにすると最もうまくいきます。`List`型に対する`List`モジュールがまさにそうなっています。そうなると、ブログサイトであれば、`Post`型を中心にしてモジュールを組み立てたくなる思います。たとえば次のようにモジュールを作ることができるでしょう。

```elm
module Post exposing (Post, estimatedReadTime, encode, decoder)

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

<!--
The only new syntax here is that `module Post exposing (..)` line at the very top. That means the module is known as `Post` and only certain values are available to outsiders. As written, the `wordCount` function is only available _within_ the `Post` module. Hiding functions like this is one of the most important techniques in Elm!
-->

ここで出てくる新しい構文は、最上部にある`module Post exposing (..)`の行だけです。この行が意味しているのは、このモジュールが`Post`という名前であることと、ここに並んだいくつかの値だけがモジュールの外部から利用できるということです。ここに書かれているように、`wordCount`関数は `Post`モジュールの**中でだけ**利用可能になります。このように関数を隠すのは、Elm で最も重要なテクニックのひとつです！

<!--
> **Note:** If you forget to add a module declaration, Elm will use this one instead:
>
>```elm
module Main exposing (..)
```
>
> This makes things easier for beginners working in just one file. They should not be confronted with the module system on their first day!
-->

> **Note:** もしモジュールの宣言を追加するのを忘れてしまったら、Elm は代わりに次のようなものを使います。
>
> ```elm
> module Main exposing (..)
> ```

>
> これは初心者がひとつのファイルだけで作業するときに簡単にしてくれます。Elmを学び始めた最初の日からいきなりモジュールシステムに向き合うべきではありません！

<!--
## Growing Modules
-->

## モジュールを拡大する

<!--
As your application gets more complex, you will end up adding things to your modules. It is normal for Elm modules to be in the 400 to 1000 line range, as I explain in [The Life of a File](https://youtu.be/XpDsk374LDE). But when you have multiple modules, how do you decide _where_ to add new code?
-->

アプリケーションがより複雑になっていくにつれて、モジュールにいろいろなものを追加していくことになります。[The Life of a File](https://youtu.be/XpDsk374LDE)で説明したように、Elmのモジュールが400行から1000行になるのは普通のことです。しかし複数のモジュールがあるとき、新しいコードを**どこ**に追加するのかをどうやって決めたらいいでしょうか？

<!--
I try to use the following heuristics when code is:
-->

コードがどのようなものであるかに応じて、私は次のような経験則に従うことにしています。

<!--
- **Unique** &mdash; If logic only appears in one place, I break out top-level helper functions as close to the usage as possible. Maybe use a comment header like `-- POST PREVIEW` to indicate that the following definitions are related to previewing posts.
- **Similar** &mdash; Say we want to show `Post` previews on the home page and on the author pages. On the home page, we want to emphasize the interesting content, so we want longer snippets. But on the author page, we want to emphasize the breadth of content, so we want to focus on titles. These cases are _similar_, not the same, so we go back to the **unique** heuristic. Just write the logic separately.
- **The Same** &mdash; At some point we will have a bunch of **unique** code. That is fine! But perhaps we find that some definitions contain logic that is _exactly_ the same. Break out a helper function for that logic! If all the uses are in one module, no need to do anything more. Maybe put a comment header like `-- READ TIME` if you really want.
-->

- **コードがその場所でしか使われていないとき** &mdash; もしロジックが一箇所だけに出現するのなら、トップレベルの補助関数として分割し、それを使用している箇所になるべく近いところに置きます。すぐ後ろに続く定義がブログ投稿のプレビューと関係していることを表すため、`-- POST PREVIEW`というようなコメントヘッダを使うこともあります。
- **似たようなコードがあるとき** &mdash; 投稿(`Post`)のプレビューを、サイトのホームページと投稿者のページの両方に表示したいとしましょう。サイトのホームページでは、その興味深い内容を強調したいので、長めの抜粋が欲しいです。それに対して投稿者のページでは、内容の幅を強調したいのでタイトルに注目したいです。これらは**よく似てはいます**が同じではありませんから、**『その場所でしか使われていないとき』**の経験則に戻りましょう。ただロジックを別々に書けばいいのです。
- **コードがまったく同じであるとき** &mdash; たくさんの**その場所でしか使われていない**コードがあちこちに現れることになるでしょう。これは良いことです！しかしおそらくその中に、**完全に**同じロジックを含む定義があることに気づくでしょう。そのようなロジックは補助関数へと分割しましょう！　もしそのすべての使用箇所がひとつのモジュールのなかにあるなら、これ以上何もする必要はありません。もし本当にそうしたいのなら、`-- READ TIME`というようなコメントヘッダを置いてもいいでしょう。

<!--
These heuristics are all about making helper functions within a single file. You only want to create a new module when a bunch of these helper functions all center around a specific custom type. For example, you start by creating a `Page.Author` module, and do not create a `Post` module until the helper functions start piling up. At that point, creating a new module should make your code feel easier to navigate and understand. If it does not, go back to the version that was clearer. More modules is not more better! Take the path that keeps the code simple and clear.
-->

これらの経験則はすべて、ひとつのファイルのなかに補助関数を作ることについてです。ある独自の型を中心としてたくさんの補助関数すべてがあるときだけ、新しいモジュールを作りたくなるでしょう。たとえば、Postモジュールを作っていない状態でPage.Authorモジュールを先に作りはじめて補助関数が山積みになった場合、新しくPostモジュールを作ると、探しているコードを見つけやすくなったり、コードを理解するのが簡単になるはずです。そうでないとしたら、わかりやすかったバージョンに戻しましょう。モジュールがたくさんあるほど良いというわけではありません！コードを単純かつわかりやすく保つ道を選びましょう。

<!--
To summarize, assume **similar** code is **unique** by default. (It usually is in user interfaces in the end!) If you see logic that is **the same** in different definitions, make some helper functions with appropriate comment headers. When you have a bunch of helper functions about a specific type, _consider_ making a new module. If a new module makes your code clearer, great! If not, go back. More files is not inherently simpler or clearer.
-->

まとめると、**似ている**コードは最初は**その場所でし使われていない**コードであると見なしましょう(たいていそういうコードは最終的にユーザインターフェイスにあります)。異なる定義のなかに**まったく同じ**ロジックを見かけたら、適切なコメントヘッダのついた補助関数を作りましょう。特定の型に対するたくさんの補助関数があるなら、それを新しいモジュールに分割することを**検討**してください。もし新たなモジュールがコードをわかりやすくしてくれるのなら、それは素晴らしいです！でもそうでないのなら、元に戻しましょう。多くのファイルがあるというのは、単純だとかわかりやすいということとは本質的に異なるのです。

<!--
> **Note:** One of the most common ways to get tripped up with modules is when something that was once **the same** becomes **similar** later on. Very common, especially in user interfaces! Folks will often try to create a Frankenstein function that handles all the different cases. Adding more arguments. Adding more _complex_ arguments. The better path is to accept that you now have two **unique** situations and copy the code into both places. Customize it exactly how you need. Then see if any of the resulting logic is **the same**. If so, move it out into helpers. **Your long functions should split into multiple smaller functions, not grow longer and more complex!**
-->

> **Note:** モジュールについて失敗する最もよくあるケースは、最初は**『まったく同じ』**であったものが、あとから**『似ている』**に変わったときです。ユーザインターフェイスではそれが特によく起こります！　それぞれ異なる場合をぜんぶまとめて扱おうとして、引数を追加し、そして**複雑な**引数をさらに追加しては、つぎはぎだらけの関数を作ろうとする人もいます。より良い方法は、ふたつの**『その場所でしか使われていない』**という状況があることを受け入れ、それら両方の箇所にコードを複製することです。それから必要に応じてカスタマイズします。それから、ロジックのいずれかが結果的に**まったく同じ**になったかどうかを見てください。もしそうなら、それを補助関数へと括りだしてください。**長い関数は複数の小さい関数へと分割するべきで、長く複雑にしてしまうべきではありません！**

<!--
## Using Modules --->

## モジュールの使用

<!--
It is customary in Elm for all of your code to live in the `src/` directory. That is the default for [`elm.json`](https://github.com/elm/compiler/blob/0.19.0/docs/elm.json/application.md) even. So our `Post` module would need to live in a file named `src/Post.elm`. From there, we can `import` a module and use its exposed values. There are four ways to do that:
-->


コードはすべて`src/`ディレクトリの中に入れておくというのがElmの慣習です。これは[`elm.json`](https://github.com/elm/compiler/blob/0.19.0/docs/elm.json/application.md)の既定値でもあります。そのため、この`Post`モジュールは`src/Post.elm`という名前のファイルにする必要があるでしょう。これでこのモジュールを`import`し、`exposing`節でモジュール外に公開するよう指定された値を使えるようになりました。インポートには４種類の方法があります。


```elm
import Post
-- Post.Post, Post.estimatedReadTime, Post.encode, Post.decoder

import Post as P
-- P.Post, P.estimatedReadTime, P.encode, P.decoder

import Post exposing (Post, estimatedReadTime)
-- Post, estimatedReadTime
-- Post.Post, Post.estimatedReadTime, Post.encode, Post.decoder

import Post as P exposing (Post, estimatedReadTime)
-- Post, estimatedReadTime
-- P.Post, P.estimatedReadTime, P.encode, P.decoder
```

<!--
I recommend using `exposing` pretty rarely. Ideally on zero or one of your imports. Otherwise, it can start getting hard to figure out where things came from when reading though. “Wait, where is `filterPostBy` from again? What arguments does it take?” It gets harder and harder to read through code as you add more `exposing`. I tend to use it for `import Html exposing (..)` but not on anything else. For everything else, I recommend using the standard `import` and maybe using `as` if you have a particularly long module name!
-->

`exposing`を使うのはほんのちょっとだけにしておくのをお勧めします。まったく使わないか、ひとつのインポートだけで使うのが理想的でしょう。そうしないと、読むときに型や関数がどのモジュールから来ているのかを把握するのが難しくなっていくことがあります。「待って、`filterPostBy`はどこから来たんだっけ？　引数は何を取るんだっけ？」`exposing`を追加するにつれて、コードを読んでいくのはどんどん難しくなっていきます。私は`import Html exposing (..)` をよく使いますが、それ以外ではまったく使いません。まずは基本的な`import`を使い、もし特に長いモジュール名であるときは`as`を使うことをお勧めします！
