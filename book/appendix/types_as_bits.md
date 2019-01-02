<!--
# Types as Bits
-->

# 型のビット表現

<!--
There are all sorts of types in Elm:
-->

Elmにはさまざまな種類の型があります。

- `Bool`
- `Int`
- `String`
- `(Int, Int)`
- `Maybe Int`
- ...

<!--
We have a conceptual understanding of them by now, but how are they understood by a computer? How is `Maybe Int` stored on a hard disk?
-->

すでに私たちはこれらの型を概念としては理解していますが、コンピュータはこれをどのように理解しているのでしょうか？　`Maybe Int`はハードディスクにどのように格納されているのでしょうか？



<!--
## Bits
-->

## ビット列

<!--
A **bit** is little box that has two states. Zero or a one. On or off. Computer memory is one super long sequence of bits.
-->

**ビット**とは、0または1のどちらかの状態をとる、小さな箱のようなものです。コンピュータのメモリは、このビットがとてつもなく長く連なったものです。

<!--
Okay, so all we have is a bunch of bits. Now we need to represent _everything_ with that!
-->

コンピューターのメモリはビットで表現されているのだから、ビットだけを使って**ありとあらゆる値**を表現しなければなりません！

<!--
## `Bool`
-->

## `Bool`型

<!--
A `Bool` value can be either `True` or `False`. This corresponds exactly to a bit!
-->

`Bool`は`True`または`False`のどちらかであるような値のことです。これはちょうどビットにそのまま対応していますね！

<!--
## `Int`
-->

## `Int`型

<!--
An `Int` value is some whole number like `0`, `1`, `2`, etc. You cannot fit that in a single bit, so the only other option is to use multiple bits. So normally, an `Int` would be a sequence of bits, like these:
-->

`Int`型の値とは、`0`や`1`、`2`などの数のことです。単一のビットでこれを表すことはできませんから、複数個のビットを使う以外に選択肢はありません。通常は、`Int`は次のようなビットの列になっています。


```
00000000
00000001
00000010
00000011
...
```

<!--
We can arbitrarily assign meaning to each of these sequences. So maybe `00000000` is zero and `00000001` is one. Great! We can just start assigning numbers to bit sequences in ascending order. But eventually we will run out of bits...
-->

これらのビット列について、自由に数を割り当てることができます。たとえば`00000000`は0、`00000001` は1というようにです。素晴らしいですね！　あとは数をビット列に昇順に割り当てていくだけですが、そのうちこれらのビット列では足りなくなってしまうでしょう……。

<!--
By some quick math, eight bits only allow (2^8 = 256) numbers. What about perfectly reasonable numbers like 9000 and 8004?
-->

単純計算では、8ビットでは (2^8 = 256) までの数しか表すことができません。9000や8004のような数ももちろん数に違いないですが、これらを表現するにはどうすればいいのでしょうか？

<!--
The answer is to just add more bits. For a long time, people used 32 bits. That allowed for (2^32 = 4,294,967,296) numbers which covers the kinds of numbers humans typically think about. Computers these days support 64-bit integers, allowing for (2^64 = 18,446,744,073,709,551,616) numbers. That is a lot!
-->

その答えとは、さらにビットを足すだけです。長年、人々は 32ビット数を使ってきました。32ビット数は人間が通常扱うような (2^32 = 4,294,967,296) までの数を表現することができますが、今日のコンピュータは (2^64 = 18,446,744,073,709,551,616) までの数を表現できる64ビット整数をサポートしています。これはまたずいぶんと多いですね！

<!--
> **Note:** If you are curious how addition works, learn about [two’s complement](https://en.wikipedia.org/wiki/Two%27s_complement). It reveals that numbers are not assigned to bit sequences arbitrarily. For the sake of making addition as fast as possible, this particular way of assigning numbers works really well.
-->

**Note:** もし更に詳しく知りたいのなら、[2の補数](https://ja.wikipedia.org/wiki/2%E3%81%AE%E8%A3%9C%E6%95%B0)について学んでみてください。決して気まぐれに数にビット列を割り当てているわけではないことがわかると思います。加算をなるべく高速に実行するために、ある規則に従って巧妙に数を割り当てているのです。


<!--
## `String`
-->

## `String`型

<!--
The string `"abc"` is the sequence of characters `a` `b` `c`, so we will start by trying to represent characters as bits.
-->

文字列`"abc"`は`a` `b` `c`という文字が順番に並んだものですから、まずは文字をビット列で表現することから始めましょう。

<!--
One of the early ways of encoding characters is called [ASCII](https://en.wikipedia.org/wiki/ASCII). Just like with integers, they decided to list out a bunch of bit sequences and start assigning values arbitrarily:
-->

文字を符号化する方法としてもっとも初期からあるものに、[ASCII](https://ja.wikipedia.org/wiki/ASCII)と呼ばれるものがあります。ちょうど数と同じように、大量のビット列を並べて、その先頭から値を自由に割り当てていきます。


```
00000000
00000001
00000010
00000011
...
```

<!--
So every character needed to fit in eight bits, meaning only 256 characters could be represented! But if you only care about English, this actually works out pretty well. You need to cover 26 lower-case letters, 26 upper-case letters, and 10 numbers. That is 62. There is a bunch of room left for symbols and other weird stuff. You can see what they ended up with [here](https://ascii.cl/).
-->

ここでどの文字も８ビットに収まるようにする必要がありますが、それはつまり256文字までしか表現できないということです！　英語だけを考慮するなら、これはなかなかうまくいきます。26個の小文字と26文字の大文字、10個の数だけをカバーできればいいのですから、ぜんぶで62文字になります。残りの空いている部分は、記号や他のいろんな変なものに割り当てられます。結局どのようになっているのかは、[ここ](https://ascii.cl/)で詳しく見ることができます。

<!--
We have an idea for characters now, but how will the computer know where the `String` ends and the next piece of data begins? It is all just bits. Characters look just like `Int` values really! So we need some way to mark the end.
-->

これで文字をどのように表現すればいいのかはわかってきましたが、`String`の終端と次のデータの開始がどこにあるのかはどのようにすればわかるのでしょうか？　すべてはただのビット列なのです。実際には文字も`Int`値とまったく同じようにしか見えないのです！　そのため、どこが終端なのかを見分ける何らかの方法が必要です。

<!--
These days, languages tend to do this by storing the **length** of the string. So a string like `"hello"` might look something like `5` `h` `e` `l` `l` `o` in memory. So you know a `String` always starts with 32-bits representing the length. And whether the length is 0 or 9000, you know exactly where the characters end.
-->

最近では、文字列の**長さ**を格納するようにする言語が多いです。`"hello"`のような文字列は、メモリ内では`5` `h` `e` `l` `l` `o`のように見えるでしょう。`String`は常に長さの32ビット表現で始まるということがわかると思います。そして、文字列の長さが0であろうと9000であろうと、文字列の終端がどこにあるのかを正確に知ることができます。

<!--
> **Note:** At some point, folks wanted to cover languages besides English. This effort eventually resulted in the [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding. It is quite brilliant really, and I encourage you to learn about it. It turns out that “get the 5th character” is harder than it sounds!
-->

**Note:** 中には、英語以外の言語をカバーしたいという人もいるでしょう。これは[UTF-8](https://ja.wikipedia.org/wiki/UTF-8)という符号化に従うことで実現することができます。これは本当に素晴らしいものですので、ぜひ学んでみることをお勧めします。この符号化では、たとえばある文字列の「5番目の文字」を見つけるようなことは思ったより難しいということがわかると思います！

<!--
## `(Int, Int)`
-->

## `(Int, Int)`型

<!--
What about tuples? Well, `(Int, Int)` is two `Int` values, and each one is a sequence of bits. Let’s just put those two sequences next to each other in memory and call it a day!
-->


タプルについてはどうでしょうか？　`(Int, Int)`はふたつの`Int`値で、そのそれぞれがビット列になるのでした。メモリ内でふたつのビット列を並べて配置すれば、それで出来上がりですね！

<!--
## Custom Types
-->

## カスタム型

<!--
A custom type is all about combining different types. Those different types may have all sorts of different shapes. We will start with the `Color` type:
-->

カスタム型とはつまり、異なる型どうしを組み合わせです。異なる型はそれぞれ異なった構造をしているでしょう。まずは次のような`Color`型について考えてみます。



```elm
type Color = Red | Yellow | Green
```

<!--
We can assign each case a number: `Red = 0`, `Yellow = 1`, and `Green = 2`. Now we can use the `Int` representation. Here we only need two bits to cover all the possible cases, so `00` is red, `01` is yellow, `10` is green, and `11` is unused.
-->

`Red = 0`、`Yellow = 1`、`Green = 2`というように、それぞれの場合について数を割り当てることができます。ここで`Int`の表現をそのまま使うことができます。ここですべての場合を網羅するには2ビットあれば十分で、`00`は赤、`01`は黄色、`10`は緑、`11`は未使用とすればいいでしょう。

<!--
But what about custom types that hold additional data? Like `Maybe Int`? The typical approach is to set aside some bits to “tag” the data, so we can decide that `Nothing = 0` and `Just = 1`. Here are some examples:
-->

しかし、`Maybe Int`のような、追加のデータを持つカスタム型についてはどうでしょうか？　典型的な方法としては、それぞれのビット列に「タグ」を付けるというものがあります。たとえば、`Nothing = 0`や`Just = 1`というように取り決めることができ、例を挙げると次のようになります。

- `Nothing` = `0`
- `Just 12` = `1` `00001100`
- `Just 16` = `1` `00010000`

<!--
A `case` expression always looks at that “tag” before deciding what to do next. If it sees a `0` it knows there is no more data. If it sees a `1` it knows it is followed by a sequence of bits representing the data.
-->

`case`式ではこの「タグ」を見ることで、次に何をするかを決めています。もしタグが`0`なら、それ以上データはないことがわかります。もしタグが`1`なら、データを表すビット列がその後ろに続くことがわかります。

<!--
This “tag” idea is similar to putting the length at the beginning of `String` values. The values may be different sizes, but the code can always figure out where they start and end.
-->

この「タグ」のアイデアは、`String`の値の最初にその文字列の長さを置くのと似ています。サイズは値によってそれぞれ異なっているかもしれませんが、どこから始まりどこで終わるのかはコードからいつでも把握することができるのです。

<!--
## Summary
-->

## まとめ

<!--
Eventually, all values need to be represented in bits. This page gives a rough overview of how that actually works.
-->

これで、あらゆる値をビット列で表現する方法がわかりました。このページでは、データ型が内部ではどのように表現されているのかを大まかに説明してみました。

<!--
Normally there is no real reason to think about this, but I found it to be helpful in deepening my understanding of custom types and `case` expressions. I hope it is helpful to you as well!
-->

通常は型のビット表現について考えなくてもいいのですが、カスタム型や`case`式についての自分の理解を深めていくのに便利なのです。この知識が何かの役に立つことを願っています！

<!--
> **Note:** If you think this is interesting, it may be fun to learn more about garbage collection. I have found [The Garbage Collection Handbook](http://gchandbook.org/) to be an excellent resource on the topic!
> 
-->

> **Note:** もしこれに興味を持ったのなら、ガーベージコレクションについても学んでみると面白いかもしれません。この話題については[The Garbage Collection Handbook](http://gchandbook.org/)が優れた資料だと思います！
> 