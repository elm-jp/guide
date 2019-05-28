<!--
# Parsing URLs
-->

# URLのパース

<!--
In a realistic web app, we want to show different content for different URLs:
-->

実際のウェブアプリケーションでは、異なるURLごとに異なる内容を表示したいでしょう。

- `/search`
- `/search?q=seiza`
- `/settings`

<!--
How do we do that? We use the [`elm/url`](https://package.elm-lang.org/packages/elm/url/latest/) to parse the raw strings into nice Elm data structures. This package makes the most sense when you just look at examples, so that is what we will do!
-->

これはどのようにすればいいのでしょうか？　ここでは[`elm/url`](https://package.elm-lang.org/packages/elm/url/latest/)を使って、生の文字列をElmの素敵なデータ構造へとパースしていきます。例を見ていくだけで、このパッケージが何より役に立つことがわかると思います。私たちがやろうとしていることが、まさにそれですから！

<!--
## Example 1
-->

## 例 1

<!--
Say we have an art website where the following addresses should be valid:
-->

美術のウェブサイトがあり、次のようなURLのページがあるとしましょう。

- `/topic/architecture`
- `/topic/painting`
- `/topic/sculpture`
- `/blog/42`
- `/blog/123`
- `/blog/451`
- `/user/tom`
- `/user/sue`
- `/user/sue/comment/11`
- `/user/sue/comment/51`

<!--
So we have topic pages, blog posts, user information, and a way to look up individual user comments. We would use the [`Url.Parser`](https://package.elm-lang.org/packages/elm/url/latest/Url-Parser) module to write a URL parser like this:
-->

トピックのページ、ブログの投稿、ユーザ情報のページがあり、それぞれのユーザのコメントを見ることもできます。[`Url.Parser`](https://package.elm-lang.org/packages/elm/url/latest/Url-Parser) モジュールを使って、次のようにURLパーサを書くといいでしょう。

```elm
import Url.Parser exposing (Parser, (</>), int, map, oneOf, s, string)

type Route
  = Topic String
  | Blog Int
  | User String
  | Comment String Int

routeParser : Parser (Route -> a) a
routeParser =
  oneOf
    [ map Topic   (s "topic" </> string)
    , map Blog    (s "blog" </> int)
    , map User    (s "user" </> string)
    , map Comment (s "user" </> string </> s "comment" </> int)
    ]

-- /topic/pottery        ==>  Just (Topic "pottery")
-- /topic/collage        ==>  Just (Topic "collage")
-- /topic/               ==>  Nothing

-- /blog/42              ==>  Just (Blog 42)
-- /blog/123             ==>  Just (Blog 123)
-- /blog/mosaic          ==>  Nothing

-- /user/tom/            ==>  Just (User "tom")
-- /user/sue/            ==>  Just (User "sue")
-- /user/bob/comment/42  ==>  Just (Comment "bob" 42)
-- /user/sam/comment/35  ==>  Just (Comment "sam" 35)
-- /user/sam/comment/    ==>  Nothing
-- /user/                ==>  Nothing
```

<!--
The `Url.Parser` module makes it quite concise to fully turn valid URLs into nice Elm data!
-->

この`URL.Parser`パーサモジュールを使えば、URLをElmの素敵なデータへと完全に変換するコードを、とても簡潔に書くことができます！


<!--
## Example 2
-->

## 例 2

<!--
Now say we have a personal blog where addresses like this are valid:
-->

個人用のプログで、次のようなURLのページがあるとしましょう。

- `/blog/12/the-history-of-chairs`
- `/blog/13/the-endless-september`
- `/blog/14/whale-facts`
- `/blog/`
- `/blog?q=whales`
- `/blog?q=seiza`

<!--
In this case we have individual blog posts and a blog overview with an optional query parameter. We need to add the [`Url.Parser.Query`](https://package.elm-lang.org/packages/elm/url/latest/Url-Parser-Query) module to write our URL parser this time:
-->

ここで、それぞれのブログ投稿のページがあり、またオプショナルなクエリパラメータとしてブログの概要を渡すこともできるものとします。このとき、URLパーサを書くために、[`Url.Parser.Query`](https://package.elm-lang.org/packages/elm/url/latest/Url-Parser-Query)モジュールを追加しておく必要があります。

```elm
import Url.Parser exposing (Parser, (</>), (<?>), int, map, oneOf, s, string)
import Url.Parser.Query as Query

type Route
  = BlogPost Int String
  | BlogQuery (Maybe String)

routeParser : Parser (Route -> a) a
routeParser =
  oneOf
    [ map BlogPost  (s "blog" </> int </> string)
    , map BlogQuery (s "blog" <?> Query.string "q")
    ]

-- /blog/14/whale-facts  ==>  Just (BlogPost 14 "whale-facts")
-- /blog/14              ==>  Nothing
-- /blog/whale-facts     ==>  Nothing
-- /blog/                ==>  Just (BlogQuery Nothing)
-- /blog                 ==>  Just (BlogQuery Nothing)
-- /blog?q=chabudai      ==>  Just (BlogQuery (Just "chabudai"))
-- /blog/?q=whales       ==>  Just (BlogQuery (Just "whales"))
-- /blog/?query=whales   ==>  Just (BlogQuery Nothing)
```

<!--
The `</>` and `<?>` operators let us to write parsers that look quite like the actual URLs we want to parse. And adding `Url.Parser.Query` allowed us to handle query parameters like `?q=seiza`.
-->

`</>`演算子や`<?>`演算子を使うと、パースしようとしている実際のURLによく似た形で、パーサを書くことができます。`Url.Parser.Query`を追加すると、`?q=seiza`というようなクエリパラメータを扱うことができるようになります。

<!--
## Example 3
-->

## 例 3

<!--
Okay, now we have a documentation website with addresses like this:
-->

今度は、次のようなURLのページを持つ、ドキュメンテーションのウェブサイトを考えてみましょう。

- `/Basics`
- `/Maybe`
- `/List`
- `/List#map`
- `/List#filter`
- `/List#foldl`

<!--
We can use the [`fragment`](https://package.elm-lang.org/packages/elm/url/latest/Url-Parser#fragment) parser from `Url.Parser` to handle these addresses like this:
-->

`Url.Parser`モジュールにある[`fragment`](https://package.elm-lang.org/packages/elm/url/latest/Url-Parser#fragment)パーサを使うと、これらのアドレスのパーサを次のように書くことができます。

```elm
type alias Docs =
  (String, Maybe String)

docsParser : Parser (Docs -> a) a
docsParser =
  map Tuple.pair (string </> fragment identity)

-- /Basics     ==>  Just ("Basics", Nothing)
-- /Maybe      ==>  Just ("Maybe", Nothing)
-- /List       ==>  Just ("List", Nothing)
-- /List#map   ==>  Just ("List", Just "map")
-- /List#      ==>  Just ("List", Just "")
-- /List/map   ==>  Nothing
-- /           ==>  Nothing
```

<!--
So now we can handle URL fragments as well!
-->

同じように、URLフラグメントも扱うことができているのがわかります。


<!--
## Synthesis
-->

## 統合

<!--
Now that we have seen a few parsers, we should look at how this fits into a `Browser.application` program. Rather than just saving the current URL like last time, can we parse it into useful data and show that instead?
-->

ここまでいくつかのパーサを見てきましたが、`Browser.application`プログラムにこれをどのように組み入れればいいのかを見ていく必要があります。先ほどのように現在のURLを単に保持するのではなく、URLを役に立つデータへとパースして、それを表示することができるでしょうか？

```elm
TODO
```

<!--
The major new things are:
-->

ここで重要な新しい要素は次の２点です。

<!--
1. Our `update` parses the URL when it gets a `UrlChanged` message.
2. Our `view` function shows different content for different addresses!
-->

1. `UrlChanged`メッセージを受け取ったときに、`update`はそのURLをパースします。
2. `view`関数は異なるアドレスそれぞれについて異なる内容を表示します！

<!--
It is really not too fancy. Nice!
-->

風変わりすぎるということはまったくありませんね。素晴らしいです！

<!--
But what happens when you have 10 or 20 or 100 different pages? Does it all go in this one `view` function? Surely it cannot be all in one file. How many files should it be in? What should be the directory structure? That is what we will discuss next!
-->

しかし、10や20、あるいは100も異なるページがあるときはどうなるのでしょうか。ひとつの`view`関数にすべてを詰め込むのでしょうか？確かに、ひとつのファイルにすべてを書くというのは不可能です。いくつのファイルにわければいいのでしょうか？　デイレクトリ構造はどうすべきでしょうか？　これについては次の章で議論します！

