<!--
# Ports
-->

# ポート

<!--
The previous two pages, we saw the JavaScript needed to start Elm programs and a way to pass in flags on initialization:
-->

先ほどのふたつのページでは、JavaScriptがElmプログラムを開始する必要があり、初期化のさいにフラグを渡すことができるのを見てきました。



```elm
// initialize
var app = Elm.Main.init({
  node: document.getElementById('elm')
});

// initialize with flags
var app = Elm.Main.init({
  node: document.getElementById('elm'),
  flags: Date.now()
});
```

<!--
We can give information to the Elm program, but only when it starts. What if you want to talk to JavaScript while the program is running?
-->

このようにして JavaScript から Elm プログラムに情報を与えることができますが、この方法が使えるのはプログラムを開始したときだけに限られます。 プログラムの実行中に JavaScript と対話するにはどのようにしたらいいのでしょうか？



<!--
## Message Passing
-->

## メッセージの受け渡し

<!--
Elm allows you to pass messages between Elm and JavaScript through **ports**. Unlike the request/response pairs you see with HTTP, the messages sent through ports just go in one direction. It is like sending a letter. For example, banks in the United States send me hundreds of unsolicited letters, cajoling me to indebt myself to them so I will finally be happy. Those messages are all one-way. All letters are like that really. I may send a letter to my friend and she may reply, but there is nothing inherent about messages that demands request/response pairs. Point is, **Elm and JavaScript can communicate by sending these one-way messages through ports.**
-->

Elm では、**ポート**を通じて Elm と JavaScript のあいだでのメッセージの受け渡しを行います。HTTPで見たようなリクエスト/レスポンスの組とは異なり、メッセージはポートを通じて一方向に送信されます。これはまるで手紙を郵送するみたいですね。例えば、アメリカ合衆国にある銀行が事前の承諾なしに私に大量の手紙を送り、幸せになれますよと銀行からお金を借りるように私を丸め込んだりします。これらのメッセージはまったくもって一方通行です。すべての手紙はまさにこのようになっています。友達に手紙を送ることもあり、彼女は返信することもありますが、リクエスト/レスポンスの組を要求するメッセージに対して、必ず返信しなければならないという決まりがあるわけではありません。ポイントは、**Elm と JavaScript は、ポートを通じて一方的に送信を行うことで、互いにコミュニケーションをすることができるということです。**



<!--
## Outgoing Messages
-->

## 外向きのメッセージ

<!--
Say we want to use [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) to cache some information. The solution is to set up a port that sends information out to JavaScript.
-->

何らかの情報のキャッシュをするために、[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage)を使いたいとしましょう。それを実現するには、JavaScroiptへと情報を送出するポートを用意します。

<!--
On the Elm side, this means defining the `port` like this:
-->

Elm 側では、`port` を次のように定義するという意味です。


```elm
port module Main exposing (..)

import Json.Encode as E

port cache : E.Value -> Cmd msg
```

<!--
The most important line is the `port` declaration. That creates a `cache` function, so we can create commands like `cache (E.int 42)` that will send a [`Json.Encode.Value`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#Value) out to JavaScript.
-->

もっとも重要な行は、`port` の定義のところです。ここでは `cache` 関数を作成しており、JavaScript へ [`Json.Encode.Value`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#Value) を送信する、`cache (E.int 42)` のようなコメンドを作成することができるようになります。

<!--
On the JavaScript side, we initialize the program like normal, but we then subscribe to all the outgoing `cache` messages:
-->

JavaScript 側では、通常のようにプログラムを初期化しますが、そのあとで外向きの `cache` メッセージをすべて購読するようにします。

```javascript
var app = Elm.Main.init({
  node: document.getElementById('elm')
});
app.ports.cache.subscribe(function(data) {
  localStorage.setItem('cache', JSON.stringify(data));
});
```

<!--
Commands like `cache (E.int 42)` send values to anyone subscribing to the `cache` port in JavaScript. So the JS code would get `42` as `data` and cache it in `localStorage`.
-->

`cache (E.int 42)` のようなコマンドは、JavaScript のこの `cache` ポートを購読している誰かに、値を送信します。JavaScript コードは `data` として `42` を受け取り、それを `localStorage` にキャッシュします。

<!--
In most programs that want to cache information like this, you communicate with JavaScript in two ways:
-->

ほとんどのプログラムでは、このように情報をキャッシュしたいと思いますが、JavaScript でコミュニケーションをするには次のふたつの方法があります。

<!--
1. You pass in cached data through flags on initialization
2. You send data out periodically to update the cache
-->

1. 初期化時にキャッシュされたデータをフラグを通じて渡します。　　　　　
2. キャッシュを更新するために適宜データを送出します。

<!--
So there are only _outgoing_ messages for this interaction with JS. And I would not get too intense trying to minimize the data crossing the border. Keep it simple, and be more tricky only if you find it necessary in practice!
-->

このため、JavaScriptでこのような相互作用を行うときには、**外向きの**メッセージだけが存在します。私はこの Elm と JavaScript の境界を超えるデータを最小化することにこだわりすぎないようにしています。なるべくシンプルに保ち、複雑にするのは実用上どうしてもその必要があるとわかったときにだけにしてください。

<!--
> **Note 1:** This is not a binding to the `setItem` function! This is a common misinterpretation. **The point is not to cover the LocalStorage API one function at a time.** It is to ask for some caching. The JS code can decide to use LocalStorage, IndexedDB, WebSQL, or whatever else. So instead of thinking “should each JS function be a port?” think about “what needs to be accomplished in JS?” We have been thinking about caching, but it is the same in a fancy restaurant. You decide what you want, but you do not micromanage exactly how it is prepared. Your high-level message (your food order) goes back to the kitchen and you get a bunch of very specific messages back (drinks, appetizers, main course, desert, etc.) as a result. My point is that **well-designed ports create a clean separation of concerns.** Elm can do the view however it wants and JavaScript can do the caching however it wants.
>
> **Note 2:** There is not a LocalStorage package for Elm right now, so the current recommendation is to use ports like we just saw. Some people wonder about the timeline to get support directly in Elm. Some people wonder quite aggressively! I tried to write about that [here](https://github.com/elm/projects/blob/master/roadmap.md#where-is-the-localstorage-package).
>
> **Note 3:** Once you `subscribe` to outgoing port messages, you can `unsubscribe` as well. It works like `addEventListener` and `removeEventListener`, also requiring reference-equality of functions to work.
-->

> **Note 1:** ここでは `setItem` 関数へと結び付けているわけではありません！　それはよくある間違いです。**ポイントは、LocalStorage API をひとつの関数で一度にカバーしないということです。**このコマンドは何らかのキャッシュを行うように要求します。JavaScript コードは LocalStorage や IndexedDB、WebSQLなどを使うと決定することができます。そこで、「JavaScriptの関数それぞれをポートにするべきだろうか？」と考えるのではなく、「JavaScriptで要求を達成するには何が必要か？」を考えるようにしてください。ここではキャッシュについて考えてきましたが、おしゃれなレストランでも同じことが言えます。あなたは自分が食べたいものを決めますが、その料理をどのようにして用意するかまで細かく指定したりはしないでしょう。あなたの高水準なメッセージ(あなたの注文)がキッチンへと伝えられ、結果として具体的なメッセージたち(飲み物や前菜、主菜、デザートなど)を受け取ります。ポイントは**うまく設計されたポートは関心をきれいに分離します。** Elmはそれがどのような要求であれビューを担当し、JavaScript はそれがどのような要求であれキャッシュを担当します。
> 
> **Note 2:** Elm の LocalStorage パッケージは今のところ存在しませんので、現在のお勧めはまさにここで説明したようにポートを使うことです。Elm で直接サポートをする予定がないものかと思っている人もいます。とても切望している人もいます！　それについては[ここ](https://github.com/elm/projects/blob/master/roadmap.md#where-is-the-localstorage-package)に書かれているとおりです。
> 
> **Note 3:** いったん外向きのメッセージの `subscribe` を行うと、購読を停止する `unsubscribe` を行うこともできます。これは `addEventListener` と `removeEventListener` のように動きますが、これがうまく動作するためには関数の参照の等価性が必要となります。

<!--
## Incoming Messages
-->

## 内向きのメッセージ

<!--
Say we are creating a chat room in JavaScript, and we are curious to try out Elm a bit. Pretty much every company that uses Elm today, started by converting just one element to try it out. Does it work nice? Does the team like it? If so, great, try more elements! If not, no big deal, revert and use the technologies that work best for you!
-->

JavaScript でチャットルームを作っているとして、Elm を試すのにもちょっと興味があるとしましょう。こんにちではElm を使っているほとんどの企業が、まずはひとつの HTML の要素だけを Elm に置き換えて試すことから始めています。これはうまくいくのでしょうか？　私たちのチームはこれを気に入るのでしょうか？　もしうまくいったのであれば、素晴らしいです。もっといろんな要素についても試してみてください。そうでないのなら、たいしたことはありません。それを元に戻して、あなたにとって最もうまくいく技術を使ってください！

<!--
So when we look at our chat room app, we decide to convert an element that shows all active users. That means Elm needs to know about any changes to the active users list. Well, that sort of thing happens through ports!
-->

それではこのチャットルームアプリケーションについて見ていきますが、アクティブなユーザすべてを表示する要素を Elm へと変えることを決意したとしましょう。これはつまり、アクティブなユーザの一覧に起こるすべての変更を、Elm は知る必要があるということです。それはポートを通じて行われます！

<!--
On the Elm side, this means defining the `port` like this:
-->

Elm 側では、次のように`port`を定義するということです。

```elm
port module Main exposing (..)

import Json.Encode as E

type Msg
  = Searched String
  | Changed E.Value

port activeUsers : (E.Value -> msg) -> Sub msg
```

<!--
Again, the important line is the `port` declaration. It creates a `activeUsers` function, and if we subscribe to `activeUsers Changed`, we will get a `Msg` whenever folks send values in from JavaScript.
-->

繰り返しますが、重要な行は、この `port` 定義のところです。この定義は `activeUsers` 関数を作りますが、もし `activeUsers Changed` を購読すると、誰かが JavaScript から値を送信すると、そのたびに `Msg` を受け取ります。

<!--
On the JavaScript side, we initialize the program like normal, but now we are able to send messages to any `activeUsers` subscriptions:
-->

JavaScript 側ではいつもと同じようにプログラムを初期化しますが、これでどんな `activeUsers` サブスクリプションに対してもメッセージを送信することができるようになりました。

<!--
```javascript
var activeUsers = // however this is defined

var app = Elm.Main.init({
  node: document.getElementById('elm'),
  flags: activeUsers
});

// after someone enters or exits
app.ports.activeUsers.send(activeUsers);
```
-->

```javascript
var activeUsers = // ここがどのように定義されていたとしても

var app = Elm.Main.init({
  node: document.getElementById('elm'),
  flags: activeUsers
});

// 誰かが入室したり退室したりしたあと
app.ports.activeUsers.send(activeUsers);
```


<!--
I start the Elm program with any known active users, and every time the active user list changes, I send the entire list through the `activeUsers` port.
-->

既知のアクティブユーザを使ってこの Elm プログラムを開始しますが、アクティブユーザの一覧が変更されたときは毎回、`activeUsers` ポートを通じてリスト全体を送信します。

<!--
Now you may be wondering, why send the _entire_ list though? Why not just say who enters or exits? This approach sounds nice, but it creates the risk of synchronization errors. JavaScript thinks there are 20 active users, but somehow Elm thinks there are 25. Is there a bug in Elm code? Or in JavaScript? Forgot to send an exit message through ports? These bugs are extremely tricky to sort out, and you can end up wasting hours or days trying to figure them out.
-->

ここで疑問に思った人もいるかもしれませんが、一覧の**全体**を送信するのはなぜなのでしょうか。なぜ誰かが入室したり退室したということだけを伝えるのではないのでしょうか？　このアプローチは一見良さそうに見えますが、同期エラーを作り出す危険があるのです。JavaScriptが20のアクティブユーザがいると考えているが、Elmは25のアクティブユーザがいると考えているということがあったとしましょう。このとき、Elm のコードにバグがあるということでしょうか？　それともJavaScriptのほうでしょうか？　ポートを通じて退室メッセージを送信するのを忘れてしまったのでしょうか？　このようなバグに対処するというのは非常に厄介で、原因を見つけ出そうとしてついには数時間や数日といった時間を棒に振るということもあり得ます。

<!--
Instead, I chose a design that makes synchronization errors impossible. JavaScript owns the state. All the Elm code does is get the complete list and display it. If the Elm code needs to change the list for some reason, it cannot! JavaScript owns the state. Instead, I would send a message out to JavaScript asking for specific changes. Point is, **state should be owned by Elm or by JavaScript, never both.** This dramatically reduces the risk of synchronization errors. Many folks who struggle with ports fall into this trap of never really deciding who owns the state. Be wary!
-->

その代わりに、私ならそのような同期エラーが起こりえないような設計を選びます。状態を保持するのはJavaScriptが行います。Elmコードが行うのは完全なリストを表示することだけです。もし何らかの理由でElmコードがリストを変更する必要があったとしても、それは不可能です！　状態を管理しているのはJavaScriptなのです。その代わりに、その特定の変更を知らせるようなメッセージをJavaScriptへと送信するでしょう。ポイントは、**状態はElmかJavaScriptのどちらか一方だけが管理するべきで、その両方が管理してはいけない**ということです。これは同期エラーの危険を劇的に小さくします。多くの人がポートで躓き、誰が状態を管理するのかを明確にしないというこの罠に陥っています。油断しないでください！　　　　　

<!--
## Notes
-->

## ノート

<!--
I want to add a couple notes about the examples we saw here:
-->

先ほどの例について、ここで幾つか捕食を加えておきたいと思います。

<!--
- **All `port` declarations must appear in a `port module`.** It is probably best to organize all your ports into one `port module` so it is easier to see the interface all in one place.
-->

- **すべての `port` は `port module` の中で定義されなくてはいけません。**  ひとつの `port module` の中にすべてのポートをまとめてしまうのが最良かもしれません。

<!--
- **Sending `Json.Decode.Value` through ports is recommended, but not the only way.** Like with flags, certain core types can pass through ports as well. This is from the time before JSON decoders, and you can read about it more [here](/interop/flags.html#verifying-flags).
-->

**ポートを通じて送信するのは `Json.Decode.Value` がお勧めですが、それが送信できる唯一のデータ型というわけではありません。**　フラグでやったように、中核となる型のなかにもポートを通じて渡すことができるものがあります。JSONデコーダの前までに、[こちら](/interop/flags.html#verifying-flags)を読んでおくのもいいでしょう。

<!--
- **Ports are for applications.** A `port module` is available in applications, but not in packages. This ensures that application authors have the flexibility they need, but the package ecosystem is entirely written in Elm. I argued [here](https://groups.google.com/d/msg/elm-dev/1JW6wknkDIo/H9ZnS71BCAAJ) that this will help us build a much stronger ecosystem and community in the long run.
-->

**ポートはアプリケーションのためのものです。** `port module`はアプリケーションでは使えますが、パッケージでは使えません。アプリケーションの作者が必要な柔軟性を持つことを保証しますが、パッケージエコシステムは全体がElmで書かれています。　長い目で見ると、このことがはるかに強固なエコシステムとコミュニティを構築するのを助けてくれるということを、[こちら](https://groups.google.com/d/msg/elm-dev/1JW6wknkDIo/H9ZnS71BCAAJ)で述べています。

<!--
- **Ports are about creating strong boundaries!** Definitely do not try to make a port for every JS function you need. You may really like Elm and want to do everything in Elm no matter the cost, but ports are not designed for that. Instead, focus on questions like “who owns the state?” and use one or two ports to send messages back and forth. If you are in a complex scenario, you can even simulate `Msg` values by sending JS like `{ tag: "active-users-changed", list: ... }` where you have a tag for all the variants of information you might send across.
-->

**ポートは強い境界を作成するようなものです。** 必要なすべての JavaScript 関数についてポートを作成しようするのは、絶対にやめてください。あなたは本当に Elm が大好きで、どんな犠牲を払ってでもすべてを Elm でやろうとしているのかも知れませんが、ポートはそのようには設計されていないのです。その代わりに、「この状態を所有しているのは誰？」のような質問に焦点を合わせて、ひとつかふたつのポートを使ってメッセージを送受信してみてください。もしあなたがもっと複雑なシナリオに直面しているのであれば、送信しようとしている情報のすべてのヴァリアントについてのタグを持つ、`{ tag: "active-users-changed", list: ... }`のようなJavaScriptを送信することで、`Msg`の値をシミュレートしてみてもいいでしょう。

<!--
I hope this information will help you find ways to embed Elm in your existing JavaScript! It is not as glamorous as doing a full-rewrite in Elm, but history has shown that it is a much more effective strategy.
-->


この情報が既存のJavaScriptにElmを埋めこむ方法を見つける助けになれば幸いです！　すべてをElmで書きなおすというのが魅力的でないとまではいいませんが、Elmを埋め込むほうがより効率的な戦略であるということは歴史が示しています。

<!--
> ## Aside: Design Considerations
>
> Ports are somewhat of an outlier in the history of languages. There are two common interop strategies, and Elm did neither of them:
>
> 1. **Full backwards compatibility.** For example, C++ is a superset of C, and TypeScript is a superset of JavaScript. This is the most permissive approach, and it has proven extremely effective. By definition, everyone is using your language already.
> 2. **Foreign function interface (FFI)** This allows direct bindings to functions in the host language. For example, Scala can call Java functions directly. Same with Clojure/Java, Python/C, Haskell/C, and many others. Again, this has proven quite effective.
>
> These paths are attractive, but they are not ideal for Elm for two main reasons:
>
> 1. **Losing Guarantees.** One of the best things about Elm is that there are entire categories of problems you just do not have to worry about, but if we can use JS directly in any package, all that goes away. Does this package produce runtime exceptions? When? Will it mutate the values I give to it? Do I need to detect that? Does the package have side-effects? Will it send messages to some 3rd party servers? A decent chunk of Elm users are drawn to the language specifically because they do not have to think like that anymore.
> 2. **Package Flooding.** There is quite high demand to directly copy JavaScript APIs into Elm. In the two years before `elm/html` existed, I am sure someone would have contributed jQuery bindings if it was possible. This has already happened in the typed functional languages that use more traditional interop designs. As far as I know, package flooding is unique to compile-to-JS languages. The pressure is not nearly as high in Python for example, so I think that downside is a product of the unique culture and history of the JavaScript ecosystem.
>
> Given these pitfalls, ports are attractive because they let you get things done in JavaScript while preserving the best parts of Elm. Great! On the flipside, it means Elm cannot piggyback on the JS ecosystem to gain more libraries more quickly. If you take a longer-view, I think this is actually a key strength. As a result:
>
> 1. **Packages are designed for Elm.** As members of the Elm community get more experience and confidence, we are starting to see fresh approaches to layout and data visualization that work seamlessly with The Elm Architecture and the overall ecosystem. I expect this to keep happening with other sorts of problems!
> 2. **Packages are portable.** If the compiler someday produces x86 or WebAssembly, the whole ecosystem just keeps working, but faster! Ports guarantee that all packages are written entirely in Elm, and Elm itself was designed such that other non-JS compiler targets are viable.
>
> So this is definitely a longer and harder path, but languages live for 30+ years. They have to support teams and companies for decades, and when I think about what Elm will look like in 20 or 30 years, I think the tradeoffs that come with ports look really promising! My talk [What is Success?](https://youtu.be/uGlzRt-FYto) starts a little slow, but it gets into this a bit more!
-->

> ## 余談：設計についての検討事項
> 
> 言語の歴史の中でも、ポートは特別な存在です。相互作用については次のようなふたつの戦略がありましたが、Elmはこのどちらでもありませんでした。
> 
> 1. **完全な後方互換性。** 例えば、C++ は C のスーパーセットであり、TypeScript は JavaScript のスーパーセットです。これはとても寛大なアプローチですが、極めて効率的であることも実装されています。その名の通り、誰もがその言語をすでに使っているのです。
> 2. **外部関数インターフェイス(Foreign Function Interface, FFI)。** これは母体となる言語の関数への直接のバインディングを可能にします。例えば、Scala は Java の関数を直接呼ぶことができます。Closure/Java や Python/C、Haskell/C などの多くの言語が同様のアプローチをとっています。繰り返しますが、これも効率的であることが実証されています。
> 
> これらの方針は興味深いものですが、主に次のふたつの理由により、Elm にとってはどちらも理想的とはいえませんでした。
> 
> 1. **保証の欠如。** Elmの最も良いところのひとつは、さまざまな問題をまるごと心配しなくていいということです。しかし、もしどんなパッケージでもJavaScriptを直接使うことができるとしたら、それらはすべて台無しになってしまいます。このパッケージは実行時エラーを起こすでしょうか？　それはどんなとき？　こちらが渡したデータをそのパッケージが変更することはあるのでしょうか？　その変更を検出する必要はあるのでしょうか？　そのパッケージは副作用を持つのでしょうか？　サードパーティのサーバへとメッセージを送信することはあるのでしょうか？ Elmユーザの多くがElm に特に惹きつけられているのは、これ以上このようなことに頭を悩ませる必要がないからなのです。
> 2. **パッケージの氾濫。** JavaScriptのAPIをELmへ直接複製したいという要求は極めて高いです。`elm/html`が導入される前の２年のあいだ、もしそれが可能であれば、きっと誰かが jQuery のバインディングを作ってくれるだろうと確信していました。相互作用のより伝統的な設計を使っている静的型付け関数型言語ではすでに起こっています。私が知る限り、パッケージの氾濫はJavaScriptへとコンパイルする言語に特有の現象です。たとえばPythonのような言語ではこのような圧力はそれほど高くないことから、私が思うに、独自の文化やJavaScriptのエコシステムの歴史がうい出したものがその欠点だといえるでしょう。
> 
> これらの落とし穴を考えると、Elmの最も良い部分を維持しつつ、JavaScriptでやってきたことも可能にするポートは、興味深いものではないかと思います。素晴らしいでしょう！　対照的に、Elmは、より迅速にライブラリを増加するために、JavaScript のエコシステムを取り込むことはできません。長い目で見たとしたら、このことはElmの強さの要そのものになるのではないかと考えています。結果的に、
> 
> 1. **パケージはElmのために設計されます。** Elmコミュニティのメンバーがより経験を積んで信頼を寄せるようになったので、The Elm Architectureとエコシステム全体をシームレスに動作させる、レイアウトとデータ可視化への新しいアプローチを見てくるようになっています。異なる種類の問題が起こり続けるようにこれを期待しています！
> 2. **パッケージはポータブルです。** もしいつかコンパイラが x86 や WebAssembly を出力するようになったとしても、エコシステム全体は引き続き動作し続けますが、実行速度は速くなります！　ポートはすべてのパッケージが全体をElmで書かれていることを保証しますので、JavaScript以外のコンパイラターゲットも実現可能であるように、Elm自身は設計されているのです。
> 
> これは長く険しい道のりになることは間違いありませんが、言語は更に30年は長生きできるようになるでしょう。数十年のあいだ　チームや企業をサポートする必要があるので、20年から30年先にElmがどうなっているのかを見据えて考えると、このポートによるトレードオフは、とても期待できるのではないかと思えます！　私の講演、[What is Success?](https://youtu.be/uGlzRt-FYto)はちょっとゆっくりとスタートしますが、この事についてより深く踏み込んでいます。
