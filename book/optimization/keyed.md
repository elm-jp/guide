# `Html.Keyed`

<!--
On the previous page, we learned how Virtual DOM works and how we can use `Html.Lazy` to avoid a bunch of work. Now we are going to introduce  [`Html.Keyed`](https://package.elm-lang.org/packages/elm/html/latest/Html-Keyed/) to skip even more work.
-->

前のページでは、仮想DOMがどのように動くのかと、`Html.Lazy`モジュールを使って多くの処理を減らすことができるのを学びました。次は[`Html.Keyed`](https://package.elm-lang.org/packages/elm/html/latest/Html-Keyed/)を導入し、さらに多くの処理を省く方法を紹介していきます。

<!--
This optimization is particularly helpful for lists of data in your interface that must support **insertion**, **removal**, and **reordering**.
-->

データのリストに対して**挿入**や**削除**、**並び替え**といった操作が可能なアプリケーションであるとき、この最適化は特に役に立ちます。

<!--
## The Problem
-->

## 問題

<!--
Say we have a list of all the Presidents of the United States. And maybe it lets us sort by name, [by education](https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States_by_education), [by net worth](https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States_by_net_worth), and [by birthplace](https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States_by_home_state).
-->

アメリカ合衆国のすべての大統領の一覧があるとしましょう。また、それを名前順、[学歴順](https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States_by_education)、[資産額の順](https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States_by_net_worth)、[出身地順](https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States_by_home_state)に基いて並び替えができるようにします。

<!--
When the diffing algorithm (described on the previous page) gets to a long list of items, it just goes through pairwise:
-->

(前のページで説明したような)差分アルゴリズムが長いリストにとりかかると、次のように現在のリストと次のリストから同じ位置の要素を組にして処理を行っていきます。

<!--
- Diff the current 1st element with the next 1st element.
- Diff the current 2nd element with the next 2nd element.
- ...
-->

- 現在のリストのひとつめの要素と、次のリストのひとつめの要素の差分をとる
- 現在のリストのふたつめの要素と、次のリストのふたつめの要素の差分をとる
- ...


<!--
But when you change the sort order, all of these are going to be different! So you end up doing a lot of work on the DOM when you could have just shuffled some nodes around.
-->

しかし、並び替えの順序を変更したときは、これらの組のほとんどが違っていてそれぞれ差分処理が必要になるでしょう！　そして、ノードをシャッフルしたときなどでは、DOMに対して大量の操作を行うはめになります。

<!--
This issue exists with insertion and removal as well. Say you remove the 1st of 100 items. Everything is going to be off-by-one and look different. So you get 99 diffs and one removal at the end. No good!
-->

項目の挿入や削除についても同じような問題があります。100項目あるうちの最初の項目を削除するとしましょう。すべてひとつずつずれていくことになるので、差分を比較する組はいずれも違うものになります。そのため99回の差分を処理し、最後のひとつが削除されることになります。これは良くありません！

<!--
## The Solution
-->

## 解決策

<!--
The fix for all of this is [`Html.Keyed.node`](https://package.elm-lang.org/packages/elm/html/latest/Html-Keyed#node), which makes it possible to pair each entry with a “key” that easily distinguishes it from all the others.
-->

これらすべての問題から救ってくれるのが、[`Html.Keyed.node`](https://package.elm-lang.org/packages/elm/html/latest/Html-Keyed#node)です。これは、『キー』(Key)に従って組を作るようにして、それぞれの要素を他のものと簡単に区別できるようにしてくれるのです。

<!--
So in our presidents example, we could write our code like this:
-->

大統領のサンプルでいうと、コードを次のように書くことができます。

```elm
import Html exposing (..)
import Html.Keyed as Keyed
import Html.Lazy exposing (lazy)

viewPresidents : List President -> Html msg
viewPresidents presidents =
  Keyed.node "ul" [] (List.map viewKeyedPresident presidents)

viewKeyedPresident : President -> (String, Html msg)
viewKeyedPresident president =
  ( president.name, lazy viewPresident president )

viewPresident : President -> Html msg
viewPresident president =
  li [] [ ... ]
```

<!--
Each child node is associated with a key. So instead of doing a pairwise diff, we can diff based on matching keys!
-->

どの子のノードもキーに関連付けられています。要素の順序に基いた組で差分をとる代わりに、キーによる照合に基いた組で比較することができるのです！

<!--
Now the Virtual DOM implementation can recognize when the list is resorted. It first matches all the presidents up by key. Then it diffs those. We used `lazy` for each entry, so we can skip all that work. Nice! It then figures out how to shuffle the DOM nodes to show things in the order you want. So the keyed version does a lot less work in the end.
-->

これでElmの仮想DOM実装は、リストが並び替えられたことを認識できるようになります。まずElmは、大統領をキーに基づいて照合します。それから、それらの組の差分を処理します。ここではそれぞれの項目に`lazy`を使っていますので、それらのすべての処理を省くことができます。素晴らしいでしょう！　それからElmは、指定した順序で表示するにはDOMノードをどのように入れ替えればいいかを見つけ出します。結果として、キーを付けたときの処理量はキーを使わなかったときよりも遥かに少なくなるのです。

<!--
Resorting helps show how it works, but it is not the most common case that really needs this optimization. **Keyed nodes are extremely important for insertion and removal.** When you remove the 1st of 100 elements, using keyed nodes allows the Virtual DOM implementation to recognize that immediately. So you get a single removal instead of 99 diffs.
-->

並び替えでキーが役に立つのはわかりましたが、この最適化が本当に必要になる最もよくある場面というのは他にあります。**キーが付けられたノードは、項目の挿入や削除においてなにより重要です。**100要素の最初の要素を削除するとき、キー付きのノードを使えばElmの仮想DOM実装がそれを直ちに認識できるようになるのでした。そのため、99回も差分を処理することなく、ひとつの要素を削除するだけで済むのです。


<!--
## Summary
-->

## まとめ

<!--
Touching the DOM is extraordinarily slow compared to the sort of computations that happen in a normal application. **Always reach for `Html.Lazy` and `Html.Keyed` first.** I recommend verifying this with profiling as much as possible. Some browsers provide a timeline view of your program, [like this](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference). It gives you a summary of how much time is spent in loading, scripting, rendering, painting, etc. If you see that 10% of the time is spent scripting, you could make your Elm code twice as fast and not make any noticable difference. Whereas simple additions of lazy and keyed nodes could start taking big chunks out of that other 90% by touching the DOM less!
-->

通常のアプリケーションで起こる様々な計算と比較すると、DOMを操作するのはとてつもなく遅いです。**まずは常に`Html.Lazy`と`Html.keyed`を使うようにしましょう。**可能な限りプロファイルをとってみることもお勧めします。[このように](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)、プログラムのタイムラインビューを見ることができるブラウザもあります。ページの読み込み、スクリプトの実行、ページのレンダリング、ページの描画などのうち、いったいどこにどれくらい時間を費やしているのかを大まかに教えてくれます。もし時間の10%しかスクリプトの実行に費やされていないのなら、Elmコードそのものが2倍の早さになったとしても、あまり目立った効果は得られないでしょう。単に`lazy`やキー付きのノードを追加するだけでDOMの操作が減り、残りの90%の時間という大きな部分から処理を減らすことができるかもしれないのです。
