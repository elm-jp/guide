<!--
# Optimization
-->

# 最適化

<!--
There are two major types of optimization in Elm. Optimizing performance and optimizing asset size:
-->

Elmの最適化は、大きくふたつのタイプにわかれます。パフォーマンスについての最適化と、アセットサイズについての最適化です。

<!--
- **Performance** &mdash; The slowest thing in browsers is the DOM. By a huge margin. I have done a lot of profiling to speed up Elm applications, and most things have no noticable impact. Using better data structures? Negligible. Caching the results of computations in my model? Negligible _and_ my code is worse now. The only thing that makes a big difference is using `Html.Lazy` and `Html.Keyed` to do fewer DOM operations.
-->

**パフォーマンス** &mdash; ブラウザで一番遅いのはDOMです。ここには大きな最適化の余地があります。私はElmアプリケーションを高速化するためにプロファイリングをたくさんしてきましたが、ほとんどはあまり目に見える効果がありませんでした。もっと良いデータ型を使うのはどうでしょうか？モデルに応じて、計算の結果をキャッシュするのは？ほとんど効果はなく、コードが悪化するだけでした。唯一大きな違いがあったのは、`Html.Lazy`と`Html.Keyed`を使ってDOM操作を減らすことだけでした。

<!--
- **Asset Size** &mdash; Running in browsers means we have to care about download times. The smaller we can get our assets, the faster they load on mobile devices and slow internet connections. This is probably more important than any of the performance optimizations you will do! Fortunately, the Elm compiler does a really good job of making your code as small as possible, so you do not need to do a bunch of work making your code confusing to get decent outcomes here.
-->

**アセットサイズ** &mdash; ブラウザで実行する以上、ダウンロード時間についても注意しなくてはなりません。アセットを小さくすることができれば、モバイルデバイスや遅いインターネット接続でも素早く読み込むことができます。これはおそらくどんなパフォーマンスの最適化よりも重要だといえるでしょう！幸運なことに、Elmコンパイラは本当に良い仕事をしてくれて、コードを可能な限り小さくすることができます。ちゃんとした結果を得ようとコードをめちゃくちゃにする必要はないのです。

<!--
Both are important though, so this chapter will go through how this all works!
-->

どちらも重要ですが、この章ではこれらがどのような仕組みなのかを見て行きましょう！

