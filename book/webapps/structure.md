<!--
# Structuring Web Apps
-->

# Webアプリケーションの構造化

<!--
Like I was saying on the previous page, **all modules should be built around a central type.** So if I was making a web app for blog posts, I would start with modules like this:
-->

前のページで述べたように、**すべてのモジュールはその中核となる型のまわりに組み立てられるべき**です。ブログ投稿のWebアプリケーションを作っているとすると、私なら次のようなモジュール構成で作り始めると思います。

- `Main`
- `Page.Home`
- `Page.Search`
- `Page.Author`

<!--
I would have a module for each page, centered around the `Model` type. Those modules follow The Elm Architecture with the typical `Model`, `init`, `update`, `view`, and whatever helper functions you need. From there, I would just keep growing those modules longer and longer. Keep adding the types and functions you need. If I ever notice that I created a custom type with a couple helper functions, I _might_ move that out into its own module.
-->

`Model`型を中心にして、それぞれのページに対応するモジュールがあります。これらのモジュールはElmアーキテクチャに従っており、`Model`と`init`、`update`、`view`、それから必要に応じて作られた補助関数からなります。ここで、モジュールがどんどん長くなり続けるのに任せていますが、そのまま必要な型と関数を追加し続けます。もし自分がたくさんの補助関数を持つカスタム型を作ったことに気付いたら、そのとき初めてそれを別のモジュールへと切り出しても**構わない**といえるでしょう。

<!--
Before we see some examples, I want to emphasize an important strategy.
-->

いくつか例を見ていく前に、ある重要な方針について強調しておきたいと思います。

<!--
## Do Not Plan Ahead
-->

## 予め計画を練ってはならない

<!--
Notice that my `Page` modules do not make any guesses about the future. I do not try to define modules that can be used in multiple places. I do not try to share any functions. This is on purpose!
-->

ここで私は`Page.Home`モジュールや`Page.Search`モジュール、`Page.Author`モジュールの未来に対してどんな推測もしていないことに注目してください。複数の箇所から使うことができるようなモジュールを定義しようとはしていませんし、どんな関数も共有しようとはしていません。これは意図的なものです！

<!--
Early in my projects, I always have these grand schemes of how everything will fit together. “The pages for editing and viewing posts both care about posts, so I will have a `Post` module!” But as I write my application, I find that only the viewing page should have a publication date. And I actually need to track editing differently to cache data when tabs are closed. And they actually need to be stored a bit differently on servers as a result. Etc. I end up turning `Post` into a big mess to handle all these competing concerns, and it ends up being worse for both pages.
-->

以前の私のプロジェクトでは、すべてをどのようにひとつに組み合わせるかという壮大な計画を練っていました。「このページは編集と投稿の閲覧で、どちらも投稿に関係しているから、`Post`モジュールが必要だな！」しかし私がアプリケーションを書いたとき、閲覧のページだけが公開日を持つということに気付きました。そして、編集中の記事内容は別の方法で管理して、タブを閉じたときにもデータが失われないように一時的に保存するようにする必要がありました。その結果、ページを開いたときにサーバー上のデータをページに表示する処理を、閲覧ページと編集ページでは少し異なるやり方にしなければなりませんでした。私はついに互いに絡み合う要素すべてを`Post`に制御させようとめちゃくちゃにしてしまい、ページは両方ともひどいものになってしまいました。

<!--
By just starting with pages, it becomes much easier to see when things are **similar**, but not **the same**. The norm in user interfaces! So with editing and viewing posts, it seems plausible that we could end up with an `EditablePost` type and a `ViewablePost` type, each with different structure, helper functions, and JSON decoders. Maybe those types are complex enough to warrant their own module. Maybe not! I would just write the code and see what happens.
-->

単にページから作り始めれば、それが**まったく同じ**ではなく**似ている**のだということがわかりやすくなります。これはユーザインターフェイスではよくあることなのです！　投稿の編集と閲覧というのは、どちらも異なる構造、補助関数、JSONデコーダを持ち、結果的にそれぞれ異なる構造を持つ`EditablePost`型と`ViewablePost`型になるというのは、うまくいっているように見えます。これらの型をそれぞれの独自のモジュールへと分割したほうがいいほど複雑になっているかもしれませんし、そこまでではないかもしれません！　私はただコードを書いて、何が起こるのかを見るだけです。

<!--
This works because the compiler makes it really easy to do huge refactors. If I realize I got something majorly wrong across 20 files, I just fix it.
-->

これがうまくいくのは、コンパイラが大規模なリファクタリングを本当に容易にしてくれるからです。もし20ファイルにも渡るような大規模な失敗をしたのにあとで気付いたとしても、私はただそれを修正するだけでいいのです。

<!--
## Examples
-->

## 例

<!--
You can see examples of this structure in the following open-source projects:
-->

次のオープンソースプロジェクトのディレクトリ構造が参考になります。

- [`elm-spa-example`](https://github.com/rtfeldman/elm-spa-example)
- [`package.elm-lang.org`](https://github.com/elm/package.elm-lang.org)

<!--

> ## Aside: Culture Shock
>
> Folks coming from JavaScript tend to bring habits, expectations, and anxieties that are specific to JavaScript. They are legitimately important in that context, but they can cause some pretty severe troubles when transferred to Elm.
>
>
> ### Defensive Instincts
>
> In [The Life of a File](https://youtu.be/XpDsk374LDE) I point out some JavaScript Folk Knowledge that leads you astray in Elm:
>
> - ~~**“Prefer shorter files.”**~~ In JavaScript, the longer your file is, the more likely you have some sneaky mutation that will cause a really difficult bug. But in Elm, that is not possible! Your file can be 2000 lines long and that still cannot happen.
> - ~~**“Get architecture right from the beginning.”**~~ In JavaScript, refactoring is extremely risky. In many cases, it is cheaper just to rewrite it from scratch. But in Elm, refactoring is cheap and reliable! You can make changes in 20 different files with confidence.
>
> These defensive instincts are protecting you from problems that do not exist in Elm. Knowing this in your mind is different than knowing it in your gut though, and I have observed that JS folks often feel deeply uncomfortable when they see files pass the 400 or 600 or 800 line mark. **So I encourage you to push your limit on number of lines!** See how far you can go. Try using comment headers, try making helper functions, but keep it all in one file. Having this experience yourself is extremely valuable!
>
>
> ### MVC
>
> Some folks see The Elm Architecture and have the intuition to divide their code into separate modules for `Model`, `Update`, and `View`. Do not do this!
>
> It leads to unclear and debatable boundaries. What happens when `Post.estimatedReadTime` is used in both the `update` and `view` functions? Totally reasonable, but it does not clearly _belong_ to one or the other. Maybe you need a `Utils` module? Maybe it actually is a controller kind of thing? The resulting code tends to be hard to navigate because placing each function is now an [ontological](https://en.wikipedia.org/wiki/Ontology) question, and all of your colleagues have different theories. What is an `estimatedReadTime` really? What is its essence? Estimation? What would Richard think is its essence? Time?
>
> **If you build each module around a type, you rarely run into these kinds of questions.** You have a `Page.Home` module that contains your `Model`, `update`, and `view`. You write helper functions. You add a `Post` type eventually. You add an `estimatedReadTime` function. Maybe someday there are a bunch of helpers about that `Post` type, and maybe it is worth splitting into its own module. With this convention, you end up spending a lot less time considering and reconsidering module boundaries. I find that the code also comes out much clearer.
>
>
> ### Components
>
> Folks coming from React expect everything to be components. **Actively trying to make components is a recipe for disaster in Elm.** The root issue is that components are objects:
>
> - components = local state + methods
> - local state + methods = objects
>
> It would be odd to start using Elm and wonder "how do I structure my application with objects?" There are no objects in Elm! Folks in the community would recommend using custom types and functions instead.
>
> Thinking in terms of components encourages you create modules based on the visual design of your application. “There is a sidebar, so I need a `Sidebar` module.” It would be way easier to just make a `viewSidebar` function and pass it whatever arguments it needs. It probably does not even have any state. Maybe one or two fields? Just put it in the `Model` you already have. If it really is worth splitting out into its own module, you will know because you will have a custom type with a bunch of relevant helper functions!
>
> Point is, writing a `viewSidebar` function **does not** mean you need to create a corresponding `update` and `Model` to go with it. Resist this instinct. **Just write the helper functions you need.**
-->

> ## 余談：カルチャーショック
>
> JavaScriptからやってきた人たちは、JavaScript特有の習慣や思い込み、不安も持ち込んでしまいがちです。それらは状況によっては正しく重要ですが、Elmに引っ越してきたときにかなり重大なトラブルを引き起こすこともあります。
>
> ### 防衛本能
>
> [The Life of a File](https://youtu.be/XpDsk374LDE)で私は、その人がElmへと入ってきたときに迷子にさせてしまうような、JavaScriptの神話的知識について指摘しました。
>
> - ~~**『ファイルは短くしよう』**~~ JavaScriptでは、とてもやっかいなバグを引き起こす、隠れた状態変化が起きやすいです。しかしElmでは、そのようなことは起こりえません！ファイルは2000行の長さになってもいいですし、それでもそのようなバグは起きないのです。
> - ~~**『最初から正しいアーキテクチャにしよう』**~~ JavaScriptではリファクタリングはとてつもなく危険で、最初からすべて書き直したほうが手っ取り早いでしょう。でもElmでは、リファクタリングは簡単で安全です！20の異なるファイルでも自信を持って変更することができます。
> 
> これらの『防衛本能』は問題からあなたを守ってくれると思うかもしれませんが、そんな問題はそもそもElmには存在しないのです。これらの神話を頭の片隅に置いたままにしても、防衛本能に振り回されるよりはいいでしょう。でも、ファイルが400行、600行、800行と増えていくのを見た時に、このJavaScriptの神話はとても落ち着かない気持ちにさせてくるのがわかりました。**行数の限界をもっと押し上げておくのをお勧めします！** どこまで行けるのか試してみてください。コメントヘッダを使ってみたり、補助関数を作ってみましょう。でもそれらをすべてひとつのファイルに入れたままにしておいてください。これは自分自身で経験する価値があります！
>
> ### MVC
>
> Elmアーキテクチャを見た人のなかには、`Model`と`Update`、そして`View`というようにモジュールを分割すればいいんだなという直感を抱く人もいます。やめておきましょう！
>
> これはコードをわかりにくくし、どの関数をどのモジュールに置けばいいのかという議論が生じてしまいます。`Post.estimatedReadTime` が`update`関数と`view`関数の両方で使われていたときは、何が起こるのでしょうか？これはまったく正当な疑問ですが、viewのほうに**所属**しているか、それともupdateのほうに所属しているのか、明らかではありません。`Utils`モジュールが必要なのでしょうか？　もしかしてそれは本当はコントローラか何かではないのでしょうか？　それぞれの関数を配置するのは[存在論](https://ja.wikipedia.org/wiki/%E5%AD%98%E5%9C%A8%E8%AB%96)の問題になってしまい、あなたの同僚みんなが異なった見解をもつことになりますので、結果的に目的のコードを見つけ出すのは難しくなります。そもそも`estimatedReadTime`って本当は何なのでしょうか？　その本質とは何なのでしょうか？　見積(Estimation)でしょうか？　リチャード[^1]が考えているのはその本質といえるのでしょうか？　時間(Time)のほうでしょうか？
> 
> **もし型を中心にしてモジュールを組み立てれば、このような問題にぶつかることはほとんどなくなります。**  `Model`と`update`、`view`を含む`Page.Home`モジュールがあります。そして補助関数を書きます。やがて`Post`型を追加します。 `estimatedReadTime`関数を追加します。そのうち、`Post`型についての補助関数がたくさんできるかもしれませんし、それらを別のモジュールへと切り出す価値があるかもしれません。この話の中で、モジュールの範囲について考え、考えぬく時間を大幅に減らすことができることでしょう。このようにして書かれたコードは、とても読みやすくなることもわかっています。
>
> ### コンポーネント
>
> Reactから来た人たちは、すべてがコンポーネントであると考えています。**Elmでは、積極的にコンポーネントを作ろうとするのは災厄の種でしかありません。**根本的な問題は、コンポーネントがオブジェクトであるということです。
>
> - components = local state + methods
> - local state + methods = objects
>
> Elmを使い始めておいて、「オブジェクトでアプリケーションを作るにはどうすればいいの？」と考えるのは変です。Elmにオブジェクトはありませんから！　Elmコミュニティの人たちは、代わりにカスタム型と関数を使うことをお勧めしています。
> 
> コンポーネントという用語を考えると、アプリケーションの視覚的デザインに基いてモジュールを作ってしまいがちになります。「サイドバーがあるな、じゃあ`Sidebar`モジュールを作る必要があるな」もっと簡単な方法は、単に`viewSidebar`関数を作って必要に応じて何かの引数を渡すというものです。それはおそらくどんな状態も持たないでしょう。ひとつかふたつフィールドがありますか？　ではそれはすでに定義されている `Model` の中に入れてしまいましょう。もしカスタム型とそれに関連する補助関数がたくさん増えてきたら、そのときそれは別のモジュールへと切り出すといいでしょう！
>
> 重要なのは、`viewSidebar`関数を書くということは、対応する`update`と`Model`を一緒に作る必要があるということを**意味しない**ということです。そのような直感には従わないでください。**必要な補助関数だけを書けばいいのです。**


[^1]: 訳注：リチャード・フェルドマン(Richard Feldman)は著者エヴァンの同僚です。エヴァンと同じ [NoRedInk](https://www.noredink.com/) に勤務しており、Elmの発展にも多大な貢献をしています。