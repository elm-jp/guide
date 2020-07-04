<!--
# The Limits of Elm/JS Interop
-->
# 制限事項

<!-- 
Many languages have a Foreign Function Interface (FFI) that allows direct bindings functions in the host language. For example, Scala can call Java functions directly. Same with Clojure/Java, Python/C, Haskell/C, and many others.
-->

多くの言語は外部関数インターフェイス(Foreign Function Interface, FFI)の仕組みを備えており、母体となる言語の関数への直接のバインディングを可能にします。例えば、Scala は Java の関数を直接呼ぶことができます。Clojure/Java や Python/C、Haskell/C などの多くの言語が同様のアプローチをとっています。

<!-- 
**Elm does not have a traditional Foreign Function Interface with JavaScript.** It is not possible to call arbitrary JavaScript functions at any time. This has tradeoffs that some people really love, but it is not for everyone! If you are evaluating Elm for commercial use, I highly encourage you to look through [these interop examples](https://github.com/elm-community/js-integration-examples) to get a feeling for whether flags, ports, and custom elements can cover everything you need. -->

**ElmはJavaScriptに対する外部関数インターフェイスを提供していません。** 好きな時に好きなJavaScriptの関数を呼び出す方法は存在しないのです。このことは、一部の人には大変好ましい利点となりますが、すべての人が受け入れられるものではないでしょう。Elmを仕事で使うことを検討しているなら、フラグ、ポートとカスタムエレメンツを使ってあなたの要求を満たせるかどうか、[JavaScriptとの相互運用の例](https://github.com/elm-community/js-integration-examples)を見てみてください。

<!--
Why does Elm make a different choice than other languages on this?
-->

この点において、Elmが他の言語と異なる選択をしたのはなぜでしょうか？

<!--
## Tradeoffs
-->
## トレードオフ

<!--
Ports are somewhat of an outlier in the history of languages. There are two common interop strategies, and Elm did neither of them:
-->

言語の歴史の中でも、ポートは特別な存在です。言語間の相互作用については次のようなふたつの戦略がありましたが、Elmはこのどちらも選びませんでした。

<!--
1. **Full backwards compatibility.** For example, C++ is a superset of C, and TypeScript is a superset of JavaScript. This is the most permissive approach, and it has proven extremely effective. By definition, everyone is using your language already.
2. **Foreign function interface (FFI)** This allows direct bindings to functions in the host language. For example, Scala can call Java functions directly. Same with Clojure/Java, Python/C, Haskell/C, and many others. Again, this has proven quite effective.

These paths are attractive for faster adoption and greater flexibility, but they are not ideal for Elm for two main reasons:
-->

1. **完全な後方互換性。** 例えば C++ は C のスーパーセットであり、TypeScript は JavaScript のスーパーセットです。これはとても寛大なアプローチであり、極めて効果的な手法であることも実証されています。スーパーセットであるということは、誰もがその言語をすでに使っているということです。
2. **外部関数インターフェイス(Foreign Function Interface, FFI)。** これは母体となる言語の関数への直接のバインディングを可能にします。例えば、Scala は Java の関数を直接呼ぶことができます。Clojure/Java や Python/C、Haskell/C などの多くの言語が同様のアプローチをとっています。繰り返しになりますが、これもとても効果的であることが実証されています。

これらの方針は、言語に柔軟性を与え、より早く普及させるという点では魅力的ですが、主に次のふたつの理由により、Elm にとってはどちらも理想的とはいえませんでした。

<!--
1. **Losing Guarantees.** One of the best things about Elm is that there are entire categories of problems you just do not have to worry about. There are no surprise exceptions to catch, and functions cannot mutate data in surprising ways. I think this is the core value of Elm over alternative languages, but if we can call JS directly, all that goes away. Does this package produce runtime exceptions? When? Will it mutate the values I give to it? Do I need to detect that? Does the package have side-effects? Will it send messages to some 3rd party servers? Log passwords? A decent chunk of Elm users are drawn to the language specifically because they do not have to think like that anymore.
2. **Package Flooding.** There is quite high demand to directly copy JavaScript APIs into Elm. In the two years before `elm/html` existed, I am sure someone would have contributed jQuery bindings if it was possible. This has already happened in the typed functional languages that compile to JS, but have more traditional interop designs. As far as I know, package flooding is somewhat unique to compile-to-JS languages. The pressure is not nearly as high in Python for example, so I think that downside is a product of the unique culture and history of the JavaScript ecosystem.
-->
1. **安全性の保証の欠如。** Elmの最も良いところのひとつは、さまざまな問題についてそれをまるごと心配しなくていいということです。予期しない例外が送出されることもなければ、関数が意図せずデータに破壊的変更を加える方法もありません。しかし、もし JavaScript を直接呼び出すことができるとしたら、その安全性はすべて台無しになってしまいます。このパッケージは実行時エラーを起こすでしょうか？　それはどんなとき？　こちらが渡したデータをそのパッケージが変更することはあるのでしょうか？　その変更を検出する必要はあるのでしょうか？　そのパッケージは副作用を持つのでしょうか？　サードパーティのサーバへとメッセージを送信することはあるのでしょうか？　パスワードを記録することは？　多くのユーザが Elm に特に惹きつけられているのは、これ以上このようなことに頭を悩ませる必要がないからなのです。
2. **パッケージの氾濫。** JavaScript の API を Elm へ直接複製したいという要求は極めて強いです。`elm/html` が導入される前の２年のあいだ、もしそれが可能であれば、きっと誰かが jQuery のバインディングを作るだろうと確信していました。Elmと同じようにJavaScriptへコンパイルされる静的型付け関数型言語でも、より伝統的な相互作用の設計を採用している言語では、すでにパッケージの氾濫が起こっています。私が知る限り、パッケージの氾濫は JavaScript へとコンパイルする言語に特有の現象です。たとえば Python のような言語ではこのような圧力はそれほど高くないことから、私が思うに、この欠点を生み出しているのは JavaScript のその独自の文化やエコシステムの歴史ではないでしょうか。

<!--
Given these pitfalls, ports and custom elements are attractive because they let you get things done in JavaScript while preserving the best parts of Elm. Great! On the flip side, it means Elm cannot piggyback on the JS ecosystem to gain more libraries more quickly. If you take a longer-view, I think this is actually a key strength. As a result:
-->

これらの落とし穴を考えると、Elm の最も良い部分を維持しつつ、JavaScript でやってきたことも可能にするポートとカスタムエレメンツは、とても魅力的ではないかと思います。素晴らしいでしょう！　その一方で Elmは、JavaScript のエコシステムを取り込むことで、より迅速にライブラリを増やすというようなことはできません。長い目で見たとしたら、このことは Elm の強さの要になるのではないかと考えています。結果として次のことが言えます。

<!--
1. **Packages are designed for Elm.** As members of the Elm community get more experience and confidence, we are starting to see fresh approaches to layout and data visualization that work seamlessly with The Elm Architecture and the overall ecosystem. I expect this to keep happening with other sorts of problems!
2. **Code is portable.** If the compiler someday produces x86 or WebAssembly, the whole ecosystem just keeps working, but faster! Ports guarantee that all packages are written entirely in Elm, and Elm itself was designed such that other non-JS compiler targets are viable.
3. **Packages are more secure.** Languages like JavaScript have serious security concerns with packages. Reports of [stealing credentials](https://www.bleepingcomputer.com/news/security/compromised-javascript-package-caught-stealing-npm-credentials/) and [stealing API keys](https://winbuzzer.com/2020/01/14/microsoft-discovers-an-npm-package-thats-been-stealing-unix-user-data-xcxwbn/) are not uncommon, imposing a permanent auditing cost on all packages. Do they add a keylogger to `window`? Elm packages can guarantee that entire categories of exploits just cannot happen, reducing auditing cost and security risks overall.
4. **Optimization is easier.** The style of generated code has changed significantly from release to release in the past. For example, the [0.19 release](https://elm-lang.org/news/small-assets-without-the-headache) was able to dramatically reduce asset size by (1) generating code in a way that works better with JavaScript minifiers and (2) using different runtime representations of custom types depending on your optimization level. I expect it will change again for code slicing or if we find a faster calling convention for currying. Furthermore, the compiler can safely assume that all code is pure, which may allow it to move code around more aggressively than other compilers. Locking into a specific calling convention now is likely to make some of these optimizations impossible. -->
1. **パッケージは Elm のために設計されます。** Elm コミュニティのメンバーがより経験を積んで信頼できるようになったので、The Elm Architecture とエコシステム全体をシームレスに動作させる、レイアウトとデータ可視化への新しいアプローチが散見されるようになってきています。このほかの様々な種類の問題についても、このような革新が起こり続けるように期待しています！
2. **コードはポータブルです。** もしいつかコンパイラが x86 や WebAssembly を出力するようになったとしたら、エコシステム全体は引き続き動作し続けますが、実行速度は速くなります！　ポートの仕組みはすべてのパッケージが全体を Elm で書かれていることを保証しており、JavaScript 以外のコンパイラターゲットも実現可能であるように Elm は設計されているのです。
3. **パッケージは安全な仕組みです。** JavaScriptのような言語にはパッケージ管理そのものに重大なセキュリティ上の懸念があります。[資格情報、証明書](https://www.bleepingcomputer.com/news/security/compromised-javascript-package-caught-stealing-npm-credentials/)や[APIキー](https://winbuzzer.com/2020/01/14/microsoft-discovers-an-npm-package-thats-been-stealing-unix-user-data-xcxwbn/)が窃取された事例は決してめずらしくなく、JavaScriptのエコシステムはすべてのパッケージを認証するコストを強いられています。もし`window`オブジェクトにキーロガーが仕掛けられていたら？　Elmのパッケージシステムは、パッケージの認証にかかるコストと、セキュリティ上のリスクを全体的に抑えつつ、こうした類の漏洩が発生しえないことを保証できるのです。
4. **最適化がより容易になります。** コンパイラーが生成するJavaScriptコードは、リリースを追うごとに大きく変化しています。例えば[バージョン0.19](https://elm-lang.org/news/small-assets-without-the-headache)では、(1)JavaScriptのコードサイズを低減するツールの利用を念頭に置いたコード生成、(2)ユーザーが選択した最適化レベルによってカスタム型の実行時表現を変更する、という2つの最適化によって、アセットサイズを劇的に小さくすることができました。今後も、JavaScriptコードの分割生成や、カリー化された関数のさらに高速な呼び出し規約など、新しい最適化手法が見つかれば、再びコード生成に手を加えることがあるでしょう。さらに、Elmコンパイラーは生成されるコードが純粋であると仮定することによって、他のコンパイラーより積極的にコードを移動させることができます。現時点では、コンパイラーが特定の関数呼び出し規約を強制されると、こういった最適化を不可能にしてしまうおそれがあるのです。

<!--
This is definitely a longer and harder path, but languages live for 30+ years. They have to support teams and companies for decades, and when I think about what Elm will look like in 20 or 30 years, I think the trade-offs that come with ports look really promising! My talk [What is Success?](https://youtu.be/uGlzRt-FYto) starts a little slow, but it gets into this a bit more!
-->

これが長く険しい道のりになることは間違いありませんが、プログラミング言語は30年以上に渡って使われ続けるものです。数十年のあいだチームや企業をサポートする必要があるので、20年から30年先に Elm がどうなっているのかを見据えて考えたとき、このポートによるトレードオフはとても期待できるのではないかと思っています！　私の講演、[What is Success?](https://youtu.be/uGlzRt-FYto)はちょっとスロースタートですが、この事についてより深く踏み込んでいます。

<!--
And again, this path is not for everyone! There are many alternative languages that have a traditional FFI instead, and I encourage you to look into those languages if you think that path might be better. Is the package ecosystem as cohesive? Do you get runtime exceptions more often? Maybe, but maybe the extra flexibility is worth it for you. So I encourage you to take a look at [these interop examples](https://github.com/elm-community/js-integration-examples) to decide if flags, ports, and custom elements will cover everything you need. This is especially important if you are considering Elm for commercial use!
-->

繰り返しになりますが、このやり方はすべての人のためのものではありません。Elmの他にも伝統的なFFIを採用している数多くの言語があり、あなたにとってより良いと思えるものを試してみるべきです。それらの言語では、パッケージやエコシステムはよくまとまっているでしょうか？　実行時例外に出くわすことが頻繁にあるでしょうか？　それでもなお、柔軟性が重要になる場合があります。Elmの備えるフラグ、ポート、そしてカスタムエレメンツというやり方だけで、あなたのやりたいことが実現できるかどうか、[JavaScriptと実際に相互運用しているこれらの例](https://github.com/elm-community/js-integration-examples)で確かめてみてください。もしあなたがElmを仕事で使うことを考えているなら、この判断は特に重要です！