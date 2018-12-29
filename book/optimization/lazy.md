# `Html.Lazy`

<!--
In the [`elm/html`](https://package.elm-lang.org/packages/elm/html/latest/) package is used to show things on screen. To understand how to optimize it, we need to learn how it works in the first place!
-->

[`elm/html`](https://package.elm-lang.org/packages/elm/html/latest/)パッケージは、画面に何かを表示するのに使われます。これをどのように最適化するのか理解するには、まず最初にブラウザで何が起きているのかについて知っておく必要があります！

<!--
## What is the DOM?
-->

## DOMとは？

<!--
If you are creating an HTML file, you would write HTML directly like this:
-->

HTMLファイルを作ろうとするときは、次のようにHTMLを直接書くと思います。

```html
<div>
  <p>Chair alternatives include:</p>
  <ul>
    <li>seiza</li>
    <li>chabudai</li>
  </ul>
</div>
```

<!--
You can think of this as producing some DOM data structure behind the scenes:
-->

ここで裏で生成されているDOMデータ構造は、次のようなものだと考えることができます。

![](diagrams/dom.svg)

<!--
The black boxes represent heavy-weight DOM objects with hundreds of attributes. And when any of them change, it can trigger expensive renders and reflows of page content.
-->

この黒い箱は、大量の属性を持った重量DOMオブジェクトを表しています。これに何らかの変更を加えたときは、高価なレンダリングとページ内容のリフローが実行されることがあります。


<!--
## What is Virtual DOM?
-->

## 仮想DOMとは？

<!--
If you are creating an Elm file, you would use `elm/html` to write something like this:
-->

Elmファイルを作っているなら、何かを表示するのに`elm/html`を使っていると思います。

```elm
viewChairAlts : List String -> Html msg
viewChairAlts chairAlts =
  div []
    [ p [] [ text "Chair alternatives include:" ]
    , ul [] (List.map viewAlt chairAlts)
    ]

viewAlt : String -> Html msg
viewAlt chairAlt =
  li [] [ text chairAlt ]
```

<!--
You can think of `viewChairAlts ["seiza","chabudai"]` as producing some “Virtual DOM” data structure behind the scenes:
-->

`viewChairAlts ["seiza","chabudai"]`は、裏では次のような『仮想DOM』データ構造を生成していると考えることができます。

![](diagrams/vdom.svg)

<!--
The white boxes represent light-weight JavaScript objects. They only have the attributes you specify. Their creation can never cause renders or reflows. Point is, compared to DOM nodes, these are much cheaper to allocate!
-->

この白い箱は軽量JavaScriptオブジェクトを表しています。属性は指定されたものだけを保持しています。この軽量オブジェクトを作っても、レンダリングやリフローが起きることは決してありません。ポイントは、レンダリングやリフローが起きうるDOMノードに比べて、軽量オブジェクトを作るのははるかに軽い処理だということです。


<!--
## Render
-->

## レンダリング

<!--
If we are always working with these virtual nodes in Elm, how does it get converted to the DOM we see on screen? When an Elm program starts, it goes like this:
-->

もしElmが常にこのような仮想DOMを使って動作しているとすると、我々が見ている画面のDOMへはどのように変換されているのでしょうか？　Elmプログラムが開始したとき、次のようなことが起こっています。

<!--
- Call `init` to get the initial `Model`.
- Call `view` to get the initial virtual nodes.
-->

- `init`を呼び出して、最初の`Model`を取得する
- `view`を呼び出して、最初の仮想DOMノードを取得する

<!--
Now that we have virtual nodes, we make an exact replica in the real DOM:
-->

これで仮想DOMができましたから、実際のDOMにこれを正確に複製します。

![](diagrams/render.svg)

<!--
Great! But what about when things change? Redoing the whole DOM on every frame does not work, so what do we do instead?
-->

素晴らしい！　でも、これが変更されたときはどうなるのでしょうか？　毎フレームDOM全体に対してこれを繰り返すのではうまく行きませんが、それでは代わりにどうしているというのでしょうか？


<!--
## Diffing
-->

## 差分

<!--
Once we have the initial DOM, we switch to working primarily with virtual nodes instead. Whenever the `Model` changes, we run `view` again. From there, we “diff” the resulting virtual nodes to figure out how to touch the DOM as little as possible.
-->


一度DOMを初期化すると、代わりに仮想DOMが優先的に操作されるように切り替わります。`Model`が変更されるときはいつも、`view`が再び実行されます。ここで、可能な限り少なくDOMを操作するにはどうすればいいのか調べるために、仮想DOMの結果の『差分』をとるのです。

<!--
So imagine our `Model` gets a new chair alternative, and we want to add a new `li` node for it. Behind the scenes, Elm diffs the **current** virtual nodes and the **next** virtual nodes to detect any changes:
-->

いま `Model` には「椅子の代わり」となるものとして `"seiza"` (正座)と `"chabudai"` (ちゃぶ台)のふたつが含まれていますが、また新たな「椅子の代わり」を手に入れ、新しい`li`ノードを追加したいと想像してみてください。そして。裏では変更を検出するために、Elmは**現在の**仮想ノードと**次の**仮想ノードの差分をとります。

![](diagrams/diff.svg)

<!--
It noticed that a third `li` was added. I marked it in green. Elm now knows exactly how to modify the real DOM to make it match. Just insert that new `li`:
-->

Elmは３つめの`li`が追加されたのがわかります。緑色で示しておきました。いまElmは、実際のDOMをどのように変更して合わせるのかを正確に知っています。単に新しい`li`を挿入するだけです。

![](diagrams/patch.svg)

<!--
This diffing process makes it possible to touch the DOM as little as possible. And if no differences are found, we do not need to touch the DOM at all! So this process helps minimize the renders and reflows that need to happen.
-->

このような差分処理によって、可能な限りDOMの操作を減らすようにしています。そして、もし違いが見つからなかったなら、DOMにはまったく触れる必要はありません！　つまりこの差分処理は、レンダリングとリフローを可能な限り減らすることを助けてくれるのです。

<!--
But can we do even less work?
-->

しかし、これを更に減らすことなどできるのでしょうか？


## `Html.Lazy`

<!--
The [`Html.Lazy`](https://package.elm-lang.org/packages/elm/html/latest/Html-Lazy/) module makes it possible to not even build the virtual nodes! The core idea is the `lazy` function:
-->

[`Html.Lazy`](https://package.elm-lang.org/packages/elm/html/latest/Html-Lazy/)モジュールは、仮想DOMの構築すら減らすことができるのです！　中心となるアイデアは、次のような`lazy`関数です。

```elm
lazy : (a -> Html msg) -> a -> Html msg
```

<!--
Going back to our chair example, we called `viewChairAlts ["seiza","chabudai"]`, but we could just as easily have called `lazy viewChairAlts ["seiza","chabudai"]` instead. The lazy version allocates a single “lazy” node like this:
-->

椅子のサンプルに戻って見てみると、`viewChairAlts ["seiza","chabudai"]`というような呼び出しがあります。でもその代わりに、`lazy viewChairAlts ["seiza","chabudai"]`というように呼ぶこともできるのです。これは遅延バージョンで、次のようにひとつの『遅延』ノードを作成します。

![](diagrams/lazy.svg)

<!--
The node just keeps a reference to the function and arguments. Elm can put the function and arguments together to generate the whole structure if needed, but it is not always needed!
-->

このノードは、その関数と引数への参照を保持しているだけです。Elmは必要があれば引数に関数を適用して構造全体を生成することができますが、これはいつも必要だというわけではありません！

<!--
One of the cool things about Elm is the “same input, same output” guarantee for functions. So whenever we run into two “lazy” nodes while diffing virtual nodes, we ask is the function the same? Are the arguments the same? If they are all the same, we know the resulting virtual nodes are the same as well! **So we can skip building the virtual nodes entirely!** If any of them have changed, we can build the virtual nodes and do a normal diff.
-->

Elmの最もクールなところのひとつは、関数は「同じ入力からは同じ出力がある」ということが保証されていることです。そのため、仮想DOMを比較しているときに『遅延』ノードにいつ遭遇しても、関数は同じなのか？引数は同じなのか？と調べ、もしそれらが同じであれば、結果の仮想DOMがまったく同じであるとわかります！　**そのため、仮想DOMの構築をまるごと飛ばすことができるのです！**　もしこれらのいずれかが変更されていれば、仮想DOMノードを構築し、いつものように差分を取ります。

<!--
> **Note:** When are two values “the same” though? To optimize for performance, we use JavaScript’s `===` operator behind the scenes:
>
> - Structural equality is used for `Int`, `Float`, `String`, `Char`, and `Bool`.
> - Reference equality is used for records, lists, custom types, dictionaries, etc.
>
> Structural equality means that `4` is the same as `4` no matter how you produced those values. Reference equality means the actual pointer in memory has to be the same. Using reference equality is always cheap `O(1)`, even when the data structure has thousands or millions of entries. So this is mostly about making sure that using `lazy` will never slow your code down a bunch by accident. All the checks are super cheap!
-->

> **Note:** しかし、ふたつの値が『同一』であるというのはどういうときなのでしょうか？　パフォーマンスの最適化のため、裏ではJavaScriptの `===`演算子を使っています。
> 
> - 構造的等値性は、`Int`と`Float`、`String`、`Char`、`Bool`に使われます。
> - 参照的等値性は、レコードやリスト、カスタム型、辞書などに使われます。
> 
> 構造的等値性とは、それがどのように生成されたものであるかにかかわらず`4`は`4`と同じだということです。参照的等値性とは、実際のメモリ上のポインタが同じであることを意味しています。参照的等値性を使っていれば、それがもし何十万や何百万もの要素を持つデータ構造であっても、計算量がつねに`O(1)`と安価です。そのため、`lazy`を使っても決してコードが遅くなったりはしないということです。すべての検査はとても安価です！

<!--
## Usage
-->

## 使いかた

<!--
The ideal place to put a lazy node is at the root of your application. Many applications are set up to have distinct visual regions like headers, sidebars, search results, etc. And when people are messing with one, they are very rarely messing with the others. This creates really natural lines for `lazy` calls!
-->

遅延ノードを置く理想的な場所は、アプリケーションのもっとも根元の部分です。多くのアプリケーションでは、ヘッダやサイドバー、検索結果など、異なる視覚的領域を持つようにセットアップされますが、ユーザがそのひとつをいじったとしても、その他のものまで影響を受けるということは稀です。これは`lazy`を呼び出すかどうかの判断にちょうどいいです！

<!--
For example, in [my TodoMVC implementation](https://github.com/evancz/elm-todomvc/), the `view` is defined like this:
-->

例えば、[私のTodoMVCの実装](https://github.com/evancz/elm-todomvc/)では、`view`は次のように定義されています。

```elm
view : Model -> Html Msg
view model =
  div
    [ class "todomvc-wrapper"
    , style "visibility" "hidden"
    ]
    [ section
        [ class "todoapp" ]
        [ lazy viewInput model.field
        , lazy2 viewEntries model.visibility model.entries
        , lazy2 viewControls model.visibility model.entries
        ]
    , infoFooter
    ]
```

<!--
Notice that the text input, entries, and controls are all in separate lazy nodes. So I can type however many characters I want in the input without ever building virtual nodes for the entries or controls. They are not changing! So the first tip is **try to use lazy nodes at the root of your application.**
-->

テキスト入力、エントリ、コントロールは、それぞれ別々の遅延ノードの中にあることに注目してください。どのように文字を入力しても、エントリやコントロールに対しては仮想DOMノードを構築することなく、入力したい文字を自由に入力することができます。これらは変更されていないからです！　つまり、最初のアドバイスとしては、**アプリケーションの根本に遅延ノードを使ってみましょう**。

<!--
It can also be useful to use lazy in long lists of items. In the TodoMVC app, it is all about adding entries to your todo list. You could conceivable have hundreds of entries, but they change very infrequently. This is a great candidate for laziness! By switching `viewEntry entry` to `lazy viewEntry entry` we can skip a bunch of allocation that is very rarely useful. So the second tip is **try to use lazy nodes on repeated structures where each individual item change infrequently.**
-->

アイテムの長いリストでも遅延ノードは有効かもしれません。TodoMVCアプリケーションでやっていることは、TODOリストへ項目を追加することだけです。数百もの項目を持つことが考えられますが、それらが変更されることはめったにありません。これは遅延性を使うちょうどいい候補となります！　`viewEntry entry`を`lazy viewEntry entry`へと変えることで、めったに役に立たないたくさんの処理をスキップすることができます。つまり、ふたつめのアドバイスは、**個々の要素がめったに変更されないような、繰り返しの構造に対して遅延ノードを使ってみてください。**

<!--
## Summary
-->

## まとめ

<!--
Touching the DOM is way more expensive than anything that happens in a normal user interface. Based on my benchmarking, you can do whatever you want with fancy data structures, but in the end it only matters how much you successfully use `lazy`.
-->

普通のユーザインターフェイスでは、DOMを操作することはほかのどんなことよりも高価となります。私のベンチマークによれば、手の込んだデータ構造でも使ってあなたは何をしてもいいのですが、でも結局は`lazy`をどれだけうまく使えるかどうかだけが問題でした。

<!--
On the next page, we will learn a technique to use `lazy` even more!
-->

次のページでは、`lazy`をさらに使いこなすためのテクニックを学んでいきましょう！
