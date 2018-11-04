<!-- # Asset Size -->

# アセットサイズの縮小

<!-- The only thing that is slower than touching the DOM is talking to servers. Especially for folks on mobile phones with slow internet. So you can optimize your code all day with `Html.Lazy` and `Html.Keyed`, but your application will still feel slow if it loads slowly! -->

DOMを操作するよりも更に遅い処理があるとしたら、それはサーバからのデータの取得だけでしょう。遅いネットワーク回線にあるモバイル端末においては更に深刻です。`Html.Lazy`や`Html.Keyed`による最適化が常に有効なのは確かですが、もし読み込みが遅いのならアプリケーションは遅いままだと感じられるはずです！

<!-- A great way to improve is to send fewer bits. For example, if a 122kb asset can become a 9kb asset, it will load faster! We get results like that by using the following techniques: -->

これを改善する良い方法は、送信するデータをもっと少なくすることです。たとえば、122キロバイトのアセット（サーバからブラウザに送られるファイル）を9キロバイトにすることができれば、読み込みはずっと早くなります！　次のような手法を使うことで、そのような結果を得ることができます。

<!--
- **Compilation.** The Elm compiler can perform optimizations like dead code elimination and record field renaming. So it can cut unused code and shorten record field names like `userStatus` in the generated code.
- **Minification.** In the JavaScript world, there are tools called “minifiers” that do a bunch of transformations. They shorten variables. They inline. They convert `if` statements to ternary operators. They turn `'\u0041'` to `'A'`. Anything to save a few bits!
- **Compression.** Once you have gotten the code as small as possible, you can use a compression algorithm like gzip to shrink it even further. It does particularly well with keywords like `function` and `return` that you just cannot get rid of in the code itself.
-->

- **コンパイル。**　Elmコンパイラは、デッドコード除去やレコードフィールドの名前変更のような、パフォーマンス最適化を実施することができます。つまり、生成されたコードの使われていないコードを取り除いたり、`userStatus`のようなレコードフィールド名を短くしたりすることができます。
- **ミニファイ。** JavaScriptの世界には、いろいろな変換を行う『ミニファイア』(minifiers)と呼ばれるツールがあります。これは、変数名を短くしたり、インライン化をしたり、`if`文を3項演算子へと置き換えたり、`'\u0041'` を `'A'` に置き換えたりします。いずれもデータ量を削減するためです！
- **圧縮。**　デッドコード除去やミニファイによってコードを可能な限り小さくしたら、そのあとgzipのようなアルゴリズムを使うことでコードを更に圧縮することができます。それ自身を単純に取り除くことが難しい`function`や`return`のような予約語に対して特に有効です。

<!-- Elm makes it pretty easy to get all this set up for your project. No need for some complex build system. It is just two terminal commands! -->

Elmではこれらの最適化をプロジェクトに対してとても簡単に設定することができます。複雑なビルドシステムは必要ありません。たったふたつのターミナルコマンドだけでできるのです！


<!-- ## Instructions -->

## 最適化のやりかた

<!-- Step one is to compile with the `--optimize` flag. This does things like shortening record field names. -->

最初のステップは、`--optimize` フラグを付けてコンパイルすることです。これはレコードフィールドの名前を短くするようなことを行います。

<!-- Step two is to minify the resulting JavaScript code. I use a minifier called `uglifyjs`, but you can use a different one if you want. The neat thing about `uglifyjs` is all its special flags. These flags unlock optimizations that are unreliable in normal JS code, but thanks to the design of Elm, they are totally safe for us! -->

次のステップは、出力されたJavaScriptコードをミニファイすることです。私は`uglifyjs`というミニファイアを使っていますが、別のあなたが好きなものを使っても構いません。`uglifyjs`のいいところは、その特別なフラグにあります。そのようなフラグを付けると、通常のJSコードに対して実施しても正しく動くかわからない高度な最適化が有効になりますが、Elmのデザインのお陰でこれらの最適化はまったく安全です！

<!-- Putting those together, we can optimize `src/Main.elm` with two terminal commands: -->

これらを合わせると、`src/Main.elm`を次のようなふたつのターミナルコマンドで最適化することができます。

```bash
elm make src/Main.elm --optimize --output=elm.js
uglifyjs elm.js --compress 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9",pure_getters,keep_fargs=false,unsafe_comps,unsafe' | uglifyjs --mangle --output=elm.min.js
```

<!-- After this you will have an `elm.js` and a smaller `elm.min.js` file! -->

コマンドの実行が完了すると、`elm.js`とそれがもっと小さくなった`elm.min.js`ファイルのふたつが生成されるでしょう！

<!--
> **Note 1:** `uglifyjs` is called twice there. First to `--compress` and second to `--mangle`. This is necessary! Otherwise `uglifyjs` will ignore our `pure_funcs` flag.
>
> **Note 2:** If the `uglifyjs` command is not available in your terminal, you can run the command `npm install uglify-js --global` to download it. If you do not have `npm` either, you can get it with [nodejs](https://nodejs.org/).
-->

> **Note 1:** `uglifyjs` は、最初の`--compress`とふたつめの`--mangle`の2回呼び出されます。これは必要なことです！　さもなければ、`uglifyjs`は`pure_funcs`フラグを無視してしまいます。
>
> **Note 2:** もし`uglifyjs`コマンドがターミナルで使えない場合は、`npm install uglify-js --global`を実行して`uglifyjs`をダウンロードしてください。もし`npm`もないようであれば、[nodejs](https://nodejs.org/)から入手してください。

<!-- ## Scripts -->

## スクリプト

<!-- It is hard to remember all those flags for `uglifyjs`, so it is probably better to write a script that does this. -->

あのような`uglifyjs`のフラグをみんな覚えるのは大変ですので、おそらくそれを実行するスクリプトを書いたほうがいいでしょう。

<!-- Say we want a bash script that produces `elm.js` and `elm.min.js` files. On Mac or Linux, we can define `optimize.sh` like this: -->

`elm.js`と`elm.min.js`ファイルを生成するbashスクリプトが欲しい場合もあると思います。MacかLinuxなら、`optimize.sh`を次のように定義すればいいでしょう。

```bash
#!/bin/sh

set -e

js="elm.js"
min="elm.min.js"

elm make --optimize --output=$js $@

uglifyjs $js --compress 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9",pure_getters,keep_fargs=false,unsafe_comps,unsafe' | uglifyjs --mangle --output=$min

echo "Compiled size:$(cat $js | wc -c) bytes  ($js)"
echo "Minified size:$(cat $min | wc -c) bytes  ($min)"
echo "Gzipped size: $(cat $min | gzip -c | wc -c) bytes"
```

<!-- Now if I run `./optimize.sh src/Main.elm` on my [TodoMVC](https://github.com/evancz/elm-todomvc) code, I see something like this in the terminal: -->

これで、もし[TodoMVC](https://github.com/evancz/elm-todomvc)のプロジェクト上で`./optimize.sh src/Main.elm`を実行すれば、次のようなものがターミナルに出力されるのを見ることができるでしょう。

```
Compiled size:  122297 bytes  (elm.js)
Minified size:   24123 bytes  (elm.min.js)
Gzipped size:     9148 bytes
```

<!-- Pretty neat! We only need to send about 9kb to get this program to people! -->

なかなかいいですね！　このプログラムをユーザに渡すときは、たった9キロバイトほどを送るだけでいいのです！

<!-- The important commands here are `elm` and `uglifyjs` which work on any platform, so it should not be too tough to do something similar on Windows. -->

この`elm`と`uglifyjs`はどのプラットフォームでも動く重要なコマンドですので、同じようなことをWindowsで行うのはとても大変というほどでもありません。

<!-- ## Advice -->

## アドバイス

<!-- I recommend writing a `Browser.application` and compiling to a single JavaScript file as we have seen here. It will get downloaded (and cached) when people first visit. Elm creates quite small files compared to the popular competitors, as you can see [here](https://elm-lang.org/blog/small-assets-without-the-headache), so this strategy can take you quite far. -->

これまで見てきたように、`Browser.application`を使い、単一のJavaScriptファイルへとコンパイルするのを書くのをお勧めします。そのJavaScriptファイルは、ユーザがページを最初に訪れたときにダウンロード(とキャッシュ)されるでしょう。JavaScriptを生成する他の有名なプログラミング言語と比較しても、Elmはずっと小さなファイルを作成しますので、[ここ](https://elm-lang.org/blog/small-assets-without-the-headache)で見ていただいたように、この戦略に従えばよりいっそう良い結果を得られるでしょう。

<!-- >> **Note:** In theory, it is possible to get even smaller assets with Elm. It is not possible right now, but if you are working on 50k lines of Elm or more, we would like to learn about your situation as part of a user study. More details [here](https://gist.github.com/evancz/fc6ff4995395a1643155593a182e2de7)! -->

>> **Note:** 理論的には、Elmでこれよりもさらに小さなアセットにすることも可能です。これは現段階では不可能なのですが、もしあなたがElmで5万行以上のコードを書いているなら、ユーザの使用状況の調査のひとつとして、あなたの状況を教えていただけたらと思います。くわしくは[こちら](https://gist.github.com/evancz/fc6ff4995395a1643155593a182e2de7)をご覧ください！
