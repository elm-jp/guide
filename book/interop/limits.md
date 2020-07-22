<!--
# The Limits of Elm/JS Interop
-->
# 制限事項

<!-- 
Many languages have a Foreign Function Interface (FFI) that allows direct bindings functions in the host language. For example, Scala can call Java functions directly. Same with Clojure/Java, Python/C, Haskell/C, and many others.
-->

ホストとなる言語と実行環境を共有する言語は、多くが外部関数インターフェイス（Foreign Function Interface, FFI）と呼ばれる、ホスト言語の関数を直接呼び出すための仕組みを備えています。例えば、Scala は Java の関数を直接呼ぶことができます。他にも Clojure/Java や Python/C、Haskell/C など同様の例が多くあります。

<!-- 
**Elm does not have a traditional Foreign Function Interface with JavaScript.** It is not possible to call arbitrary JavaScript functions at any time. This has tradeoffs that some people really love, but it is not for everyone! If you are evaluating Elm for commercial use, I highly encourage you to look through [these interop examples](https://github.com/elm-community/js-integration-examples) to get a feeling for whether flags, ports, and custom elements can cover everything you need. -->

**ElmはJavaScriptに対するFFIの仕組みを提供していません。** 好きな時に好きなJavaScriptの関数を呼び出す方法は存在しないのです。この決断によってElmはさまざまな長所を得ましたが、同時に覆すことのできない制約も生まれました。これらを好ましい利点として大いに気に入る人もいるでしょうし、到底受け入れられないという人もいるでしょう。Elmを仕事で使うことを検討しているなら、フラグ、ポートとカスタムエレメンツを使ってあなたの要求を満たせるかどうか、[JavaScriptとの相互運用の例](https://github.com/elm-community/js-integration-examples)を見てみてください。

<!--
Why does Elm make a different choice than other languages on this?
-->

FFIについて、Elmが他の言語と異なる選択をしたのはなぜでしょうか？

<!--
## Tradeoffs
-->
## トレードオフ

<!--
Ports are somewhat of an outlier in the history of languages. There are two common interop strategies, and Elm did neither of them:
-->

プログラミング言語の歴史の中でも、ポートは特別な存在です。一般的に、異なる言語を相互運用するやり方として次に紹介するふたつの戦略のどちらかひとつが用いられてきましたが、Elmはどちらも選びませんでした。

<!--
1. **Full backwards compatibility.** For example, C++ is a superset of C, and TypeScript is a superset of JavaScript. This is the most permissive approach, and it has proven extremely effective. By definition, everyone is using your language already.
2. **Foreign function interface (FFI)** This allows direct bindings to functions in the host language. For example, Scala can call Java functions directly. Same with Clojure/Java, Python/C, Haskell/C, and many others. Again, this has proven quite effective.

These paths are attractive for faster adoption and greater flexibility, but they are not ideal for Elm for two main reasons:
-->

1. **完全な後方互換性。** 例えば C++ は C のスーパーセットであり、TypeScript は JavaScript のスーパーセットです。これはとても寛大なアプローチであり、極めて効果的な手法であることも実証されています。スーパーセットであるということは、誰もがその言語をすでに使っているということです。
2. **外部関数インターフェイス（Foreign Function Interface, FFI）。** これはホスト言語の関数を直接呼び出すための仕組みです。例えば、Scala は Java の関数を直接呼ぶことができます。Clojure/Java や Python/C、Haskell/C などの多くの言語が同様のアプローチをとっています。繰り返しになりますが、これもとても効果的であることが実証されています。

これらふたつの手法は、言語に柔軟性を与え、より早く普及させるという点では魅力的ですが、主に次のふたつの理由により、Elm にとってはどちらも理想的とはいえませんでした。

<!--
1. **Losing Guarantees.** One of the best things about Elm is that there are entire categories of problems you just do not have to worry about. There are no surprise exceptions to catch, and functions cannot mutate data in surprising ways. I think this is the core value of Elm over alternative languages, but if we can call JS directly, all that goes away. Does this package produce runtime exceptions? When? Will it mutate the values I give to it? Do I need to detect that? Does the package have side-effects? Will it send messages to some 3rd party servers? Log passwords? A decent chunk of Elm users are drawn to the language specifically because they do not have to think like that anymore.
2. **Package Flooding.** There is quite high demand to directly copy JavaScript APIs into Elm. In the two years before `elm/html` existed, I am sure someone would have contributed jQuery bindings if it was possible. This has already happened in the typed functional languages that compile to JS, but have more traditional interop designs. As far as I know, package flooding is somewhat unique to compile-to-JS languages. The pressure is not nearly as high in Python for example, so I think that downside is a product of the unique culture and history of the JavaScript ecosystem.
-->
1. **安全性の保証の欠如。** Elmのすばらしい点のひとつは、Elmを使っているだけで、ある種の問題については一切頭を悩ませる必要がなくなるということです。予期しない例外が送出されることもなければ、関数が意図せずデータに破壊的変更を加える方法もありません。しかし、もし JavaScript を直接呼び出すことができるとしたら、その安全性はすべて台無しになってしまいます。使っているパッケージが実行時エラーを起こすかもしれませんし、それがいつ起きるのか予測することもできません。Elmが渡したデータをそのパッケージが変更してしまうかもしれません。データが変更されたとして、その変更を検出する必要があるでしょうか？　パッケージは副作用を持っているでしょうか？　外部のサーバーへデータを送信することはないでしょうか？　パスワードを記録することは？　JavaScriptを直接使うときには、これだけのことを気にしなくてはならないのです。多くのユーザーが Elm に特に惹きつけられているのは、このようなことに頭を悩ませる必要がまったくないからなのです。
2. **パッケージの氾濫。** JavaScriptで利用できるものを直接Elmにも複製したいという要望は極めて強く存在しています。もしElmからJavaScriptの関数を直接呼び出せるようになっていたなら、`elm/html` が導入される前の２年のうちに、間違いなく誰かが jQuery のバインディングを作っていたことでしょう。Elmと同じようにJavaScriptへコンパイルされる静的型付け関数型言語でも、より伝統的な相互運用の仕組みを採用している言語では、すでにパッケージの氾濫が起こっています。私が知る限り、パッケージの氾濫は JavaScript へコンパイルされる言語に特有の現象です。他の言語、たとえば Python ではパッケージへの要求はこれほど強くありません。私が思うに、これはJavaScript の独特な文化やエコシステムの歴史がもたらした欠点ではないでしょうか。

<!--
Given these pitfalls, ports and custom elements are attractive because they let you get things done in JavaScript while preserving the best parts of Elm. Great! On the flip side, it means Elm cannot piggyback on the JS ecosystem to gain more libraries more quickly. If you take a longer-view, I think this is actually a key strength. As a result:
-->

これらの落とし穴を考えると、Elm の良い部分を損なわずに、必要であれば JavaScript を使って問題を解決することのできるポートとカスタムエレメンツは、とても魅力的ではないかと思います。素晴らしいですね！　一方で、Elm は JavaScript のエコシステムに乗っかって迅速にライブラリを増やすことはできません。それでもなお、長い目で見るとこの点こそが Elm の強さの要になるでしょう。結果として得られるのは、次のような長所です。

<!--
1. **Packages are designed for Elm.** As members of the Elm community get more experience and confidence, we are starting to see fresh approaches to layout and data visualization that work seamlessly with The Elm Architecture and the overall ecosystem. I expect this to keep happening with other sorts of problems!
2. **Code is portable.** If the compiler someday produces x86 or WebAssembly, the whole ecosystem just keeps working, but faster! Ports guarantee that all packages are written entirely in Elm, and Elm itself was designed such that other non-JS compiler targets are viable.
3. **Packages are more secure.** Languages like JavaScript have serious security concerns with packages. Reports of [stealing credentials](https://www.bleepingcomputer.com/news/security/compromised-javascript-package-caught-stealing-npm-credentials/) and [stealing API keys](https://winbuzzer.com/2020/01/14/microsoft-discovers-an-npm-package-thats-been-stealing-unix-user-data-xcxwbn/) are not uncommon, imposing a permanent auditing cost on all packages. Do they add a keylogger to `window`? Elm packages can guarantee that entire categories of exploits just cannot happen, reducing auditing cost and security risks overall.
4. **Optimization is easier.** The style of generated code has changed significantly from release to release in the past. For example, the [0.19 release](https://elm-lang.org/news/small-assets-without-the-headache) was able to dramatically reduce asset size by (1) generating code in a way that works better with JavaScript minifiers and (2) using different runtime representations of custom types depending on your optimization level. I expect it will change again for code slicing or if we find a faster calling convention for currying. Furthermore, the compiler can safely assume that all code is pure, which may allow it to move code around more aggressively than other compilers. Locking into a specific calling convention now is likely to make some of these optimizations impossible. -->
1. **パッケージは Elm のやり方に合うように、よりよく設計されるようになります。** Elmコミュニティは経験を積み、自信をもって Elm を使うことができるようになってきました。そのため、とくにレイアウトとデータ可視化の分野では、Elm のエコシステムを活用しやすく、The Elm Architecture とも親和性の高い新しいアプローチを採用したパッケージが見られるようになってきました。他の分野でも、このような革新が起こり続けることを期待しています！
2. **コードの移植性が保たれます。** 将来コンパイラーが x86 や WebAssembly を出力するようになったとしても、エコシステムはそのまま動作し続けますし、そのうえ実行速度は速くなります！　ポートの仕組みはすべてのパッケージが Elm だけで書かれていることを保証します。そして Elm 自身も、JavaScript 以外のコンパイラーターゲットを実現できるように設計されているのです。
3. **パッケージの安全性が向上します。** JavaScriptのような言語にはパッケージ管理そのものに重大なセキュリティ上の懸念があります。[資格情報が窃取された事例](https://www.bleepingcomputer.com/news/security/compromised-javascript-package-caught-stealing-npm-credentials/)や[APIキーが窃取された事例](https://winbuzzer.com/2020/01/14/microsoft-discovers-an-npm-package-thats-been-stealing-unix-user-data-xcxwbn/)は決してめずらしくありません。`window`オブジェクトにキーロガーが仕掛けられる、などの危険があるため、JavaScriptのエコシステムはすべてのパッケージを認証するコストを強いられています。Elmのパッケージシステムは、パッケージの認証にかかるコストと、セキュリティ上のリスクを全体的に抑えつつ、こうした類の漏洩が発生しえないことを保証できるのです。
4. **最適化がより容易になります。** コンパイラーが生成するJavaScriptコードは、リリースを追うごとに大きく変化しています。例えば[バージョン0.19](https://elm-lang.org/news/small-assets-without-the-headache)では、(1)JavaScriptのコードサイズを低減するツールの利用を念頭に置いたコード生成、(2)ユーザーが選択した最適化レベルによってカスタム型の実行時表現を変更する、という2つの最適化によって、アセットサイズを劇的に小さくすることができました。今後も、JavaScriptコードの分割生成や、カリー化された関数のさらに高速な呼び出し規約など、新しい最適化手法が見つかれば、再びコード生成に手を加えることがあるでしょう。さらに、Elmコンパイラーは生成されるコードが純粋であると仮定することによって、他のコンパイラーより積極的にコードを移動させることができます。現時点では、コンパイラーが特定の関数呼び出し規約を強制されると、こういった最適化を不可能にしてしまうおそれがあるのです。

<!--
This is definitely a longer and harder path, but languages live for 30+ years. They have to support teams and companies for decades, and when I think about what Elm will look like in 20 or 30 years, I think the trade-offs that come with ports look really promising! My talk [What is Success?](https://youtu.be/uGlzRt-FYto) starts a little slow, but it gets into this a bit more!
-->

これが長く険しい道のりになることは間違いありませんが、プログラミング言語は30年以上も使われ続けるものです。数十年にわたってチームや企業をサポートする必要があるので、20年から30年先に Elm がどうなっているのかを見据えて考えたとき、このポートによるトレードオフはとても期待できるのではないかと思っています！　私の講演、[What is Success?](https://youtu.be/uGlzRt-FYto)はちょっとスロースタートですが、この事についてより深く踏み込んでいます。

<!--
And again, this path is not for everyone! There are many alternative languages that have a traditional FFI instead, and I encourage you to look into those languages if you think that path might be better. Is the package ecosystem as cohesive? Do you get runtime exceptions more often? Maybe, but maybe the extra flexibility is worth it for you. So I encourage you to take a look at [these interop examples](https://github.com/elm-community/js-integration-examples) to decide if flags, ports, and custom elements will cover everything you need. This is especially important if you are considering Elm for commercial use!
-->

繰り返しになりますが、このやり方はすべての人のためのものではありません。Elmの他にも伝統的なFFIを採用している数多くの言語があるので、あなたにとってより良いと思えるものを試してみるべきです。それらの言語では、パッケージやエコシステムがまとまっていないかもしれません。実行時例外に出くわすことが頻繁にあるかもしれません。それでもなお、柔軟性が重要になる場合があります。Elmの備えるフラグ、ポート、そしてカスタムエレメンツというやり方だけで、あなたのやりたいことが実現できるかどうか、[JavaScriptと実際に相互運用しているこれらの例](https://github.com/elm-community/js-integration-examples)で確かめてみてください。もしあなたがElmを仕事で使うことを考えているなら、この判断は特に重要です！