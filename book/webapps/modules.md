<!--
# Modules
-->

# モジュール

<!--
Elm has **modules** to help you grow your codebase in a nice way. On the most basic level, modules let you break your code into multiple files.
-->

Elmには**モジュール**という素晴らしい機能があります。これを使うことで、コード量が増えても無理なく保守できるようになります。ひとことで言えば、コードを複数のファイルに分割することができる機能です。

<!--
## Defining Modules
-->

## モジュールを定義する

<!--
Elm modules work best when you define them around a central type. Like how the `List` module is all about the `List` type. So say we want to build a module around a `Post` type for a blogging website. We can create something like this:
-->

Elmでモジュールを定義するときは、そのモジュールの主役となる型を中心にするとうまくいきます。これは`List`モジュールをイメージすると分かりやすいでしょう。`List`モジュールも`List`型という主役が中心にあり、それに関わるものが詰め込まれています。ではイメージがわいたところで、実際にブログサイトの投稿を表現する`Post`型を中心としたモジュールを作成してみましょう。

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

基本的には今まで学んできた構文だけしか使っていませんが、一番上に新しい構文があります。この`module Post exposing (..)`という行が意味するのは、以下の2点です。

* このモジュールを`Post`という名前にすること
* 括弧内に明記したものだけが外部から利用可能であること

ゆえに、上記の例で括弧内に明記されていない`wordCount`関数は`Post`モジュール**内**でしか利用できません。このように関数を外の世界から見えないように隠蔽するのは、Elmにおいてかなり重要なテクニックです。

<!--
> **Note:** If you forget to add a module declaration, Elm will use this one instead:
>
>```elm
module Main exposing (..)
```
>
> This makes things easier for beginners working in just one file. They should not be confronted with the module system on their first day!
-->

> **Note:** モジュールの先頭に書く`module`から始まる行を省くこともできます。その場合、Elmでは以下の行が指定されていると判断されます。
>
> ```elm
> module Main exposing (..)
> ```
>
> つまり1ファイルだけのElmアプリケーションであれば、Elmがうまいこと気を利かせてアプリケーションとして動くようにしてくれるということです。このおかげで、Elmを初めて学ぶときにモジュールの仕組みを知らなくてもアプリケーションを書き始めることができるのです。

<!--
## Growing Modules
-->

## モジュールを拡張する

<!--
As your application gets more complex, you will end up adding things to your modules. It is normal for Elm modules to be in the 400 to 1000 line range, as I explain in [The Life of a File](https://youtu.be/XpDsk374LDE). But when you have multiple modules, how do you decide _where_ to add new code?
-->

アプリケーションが複雑になれば、それにつれてモジュールにもいろいろ追加が必要になります。もちろん、そうやってモジュールを拡張していって行数が増えること自体は問題ありません。Elmにとってモジュールの行数が400行から1000行くらいになるのはふつうのことです。それについては[The Life of a File](https://youtu.be/XpDsk374LDE)という動画で説明しています。ですから行数が増えること自体は問題ないのですが、「モジュールが複数ある場合に**どこに**新しいコードを追加するか」という問いが生まれます。

<!--
I try to use the following heuristics when code is:
-->

この問いへの答えとして、私は追加するコードの特性によって以下のような経験則で判断しています。

<!--
- **Unique** &mdash; If logic only appears in one place, I break out top-level helper functions as close to the usage as possible. Maybe use a comment header like `-- POST PREVIEW` to indicate that the following definitions are related to previewing posts.
- **Similar** &mdash; Say we want to show `Post` previews on the home page and on the author pages. On the home page, we want to emphasize the interesting content, so we want longer snippets. But on the author page, we want to emphasize the breadth of content, so we want to focus on titles. These cases are _similar_, not the same, so we go back to the **unique** heuristic. Just write the logic separately.
- **The Same** &mdash; At some point we will have a bunch of **unique** code. That is fine! But perhaps we find that some definitions contain logic that is _exactly_ the same. Break out a helper function for that logic! If all the uses are in one module, no need to do anything more. Maybe put a comment header like `-- READ TIME` if you really want.
-->

- **コードがその場所でしか使われていないとき** &mdash; もしもそのロジックがそこでしか使われていないのであれば、私はそのロジックを独立したトップレベルの補助関数として抜き出します。そしてその関数を利用している箇所となるべく近い所に起きます。その際、`-- POST PREVIEW`（この下に投稿の表示に関わる定義が書かれてるよ）といった見出しをコメントで付けることもあります。
- **似たようなコードがあるとき** &mdash; 例として投稿をあらわす`Post`をトップページと投稿者のページに表示することを考えましょう。トップページでは内容に興味を持ってもらうことを重視して、長めの抜粋を表示します。一方で投稿者のページでは幅広い内容の記事を書いていることを示すために、タイトルが目立つようにします。そう考えると、これらは同じコードではなく、似ているだけのコードだと言えます。ですから「コードがその場所でしか使われていないとき」の経験則にしたがいましょう。単に別々の独立したコードとしてそれぞれのロジックを実装すれば良いのです。
- **コードがまったく同じとき** &mdash; 「コードがその場所でしか使われていないとき」の経験則にしたがってコードを管理していると、そのうち同じコードが複数箇所にあらわれてきます。それ自体は悪いことではありません！ でももしかしたらその中に**完全に**同じ意味合いを持つ同じ内容のコードが見つかるかもしれません。そうなって初めて、そのロジックを共通の補助関数としてくくりだせばいいのです！ もしどうしても必要なら、`-- READ TIME`（読むのにかかる時間）といった見出しをまたコメントとしてつけておいても構いません。もしそのロジックを使っているモジュールが1つだけなら、やることはたったそれだけです。

<!--
These heuristics are all about making helper functions within a single file. You only want to create a new module when a bunch of these helper functions all center around a specific custom type. For example, you start by creating a `Page.Author` module, and do not create a `Post` module until the helper functions start piling up. At that point, creating a new module should make your code feel easier to navigate and understand. If it does not, go back to the version that was clearer. More modules is not more better! Take the path that keeps the code simple and clear.
-->

さて、ここで紹介した方法はどれも1つのファイル内に補助関数を作るものばかりです。新しいモジュールを作ったりはしていません。ではどんなときに新しいモジュールを作るべきなのでしょうか？ それは、上記の経験則にしたがって抜き出した補助関数のうちいくつかが全て特定のカスタム型に関わるものだった場合です。ですから、例えば投稿者ページを管理する`Page.Author`モジュールを作り始めたら、`Post`型に関連した補助関数が十分に溜まるまでは`Post`モジュールを作ってはなりません。そこまでちゃんと我慢してから`Post`モジュールを作ったのであれば、コードはより流れを追いやすく、また理解しやすくなっているはずです。逆にもしも`Post`モジュールを作ったのにそういった効果が得られなかったとしたら、それはまだその時期でなかったということです。モジュールを作る前の、もっとコードがわかりやすかった時代のものに戻しましょう。このように、なんでもモジュールをたくさん作ればいいというわけではありません！ 「コードをシンプルで分かりやすく保つ」という初心を忘れないことです。

<!--
To summarize, assume **similar** code is **unique** by default. (It usually is in user interfaces in the end!) If you see logic that is **the same** in different definitions, make some helper functions with appropriate comment headers. When you have a bunch of helper functions about a specific type, _consider_ making a new module. If a new module makes your code clearer, great! If not, go back. More files is not inherently simpler or clearer.
-->

話が長くなったので一旦整理しましょう。まず**似ている**コードがあっても、それぞれ**別の独立した**コードであると見なします。こういう似て非なるコードはだいたいユーザーインターフェイスに関わる部分で発生するものです。次に、もし**完全に同じ**ロジックが別々の場所にあるのを見つけたら、そこで初めて共通の補助関数としてそのロジックをくくりだします。この際、内容が分かるように見出しをコメントで付けておいてもいいでしょう。そして最後に、そういった補助関数の中に同じ特定の型に関するものがいくつか見つかったら、そこで初めて新しくモジュールを作るべきか**検討**するのです。そうすることでコードが分かりやすくなるなら万々歳。そうでないならもとに戻しましょう。ファイルがたくさんあることと、コードがシンプルで分かりやすいことは、本質的に異なるのです。

<!--
> **Note:** One of the most common ways to get tripped up with modules is when something that was once **the same** becomes **similar** later on. Very common, especially in user interfaces! Folks will often try to create a Frankenstein function that handles all the different cases. Adding more arguments. Adding more _complex_ arguments. The better path is to accept that you now have two **unique** situations and copy the code into both places. Customize it exactly how you need. Then see if any of the resulting logic is **the same**. If so, move it out into helpers. **Your long functions should split into multiple smaller functions, not grow longer and more complex!**
-->

> **Note:** モジュールについて失敗するよくあるケースは、最初**同じ**だったものが後から**似ている**コードに変わってしまう場合です。こういう事件はユーザーインターフェイスに関わる部分で本当によく起きます！ そうして業深き人類は、様々なケースに対応するためにつぎはぎだらけのおぞましい関数を作り出してしまうのです。「引数が足りなぁ〜い！」「こんな単純な引数じゃ制御しきれない！ もっと**複雑怪奇**にしなくては……」。マッドサイエンティストのうめき声がこだまします。そんな倫理から外れた狂気の改造手術をやめて、2つの**独立した別々の**コードがあるという状況を許容しましょう。それぞれの場所に同じコードをコピーすることを受け入れるのです。そうすることで余計な条件分岐などを書かずに済み、本業に集中できます。その結果**全く同じ**ロジックが出てきたら、その段階になって初めて共通の補助関数としてくくりだせば良いのです。そうすれば長大な関数は**複数の小さな関数に分割**されます。決して無駄な条件分岐とつぎはぎだらけの**もっと長大で複雑な関数になることはありえません**。

<!--
## Using Modules
--->

## モジュールを使用する

<!--
It is customary in Elm for all of your code to live in the `src/` directory. That is the default for [`elm.json`](https://github.com/elm/compiler/blob/0.19.0/docs/elm.json/application.md) even. So our `Post` module would need to live in a file named `src/Post.elm`. From there, we can `import` a module and use its exposed values. There are four ways to do that:
-->

Elmの慣習では、ソースコードをすべて`src/`ディレクトリーに入れます。事実、[`elm.json`](https://github.com/elm/compiler/blob/0.19.0/docs/elm.json/application.md)でもそれを初期値にしています。ですから、`Post`モジュールも`src/Post.elm`というファイルとして保存する必要があります。こういう風にファイルを配置することで、あるモジュールが公開している値を別のモジュールで読み込むインポート（`import`）が可能になります。具体的には、インポートには以下の4種類の方法があります。それぞれのインポート文で実際に読み込まれる値をコメントで示しました。

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

インポート方法によっては、コメントに示したように使用時に`P.`や`Post.`などのプレフィックスをつける必要があります。面倒に思えるかもしれませんが、むしろこちらのインポート方法をお勧めします。できれば`exposing`を使うのは1モジュール以内に納めておくことが理想です。そうしないと、コードを読む際にどの値がどのモジュールからインポートされたものか分かりづらくなります。「え？ この`filterPostBy`ってどのモジュールに定義されてるんだっけ？ もぉ〜！ どんな引数を取るか知りたいのにぃ〜💢🐐」なんてことになりかねません。このように、`exposing`で読み込むモジュールが増えるほどにその苦痛も増していくのです。私自身、`import Html exposing (..)`以外では`exposing`を使いません。それ以外の場面では上記4つの例の最初に示したような基本の`import`文を使うのがお勧めです。それを基本として、特にモジュール名がかなり長い場合などには、必要な範囲内で`as`を使ったら良いのです。
