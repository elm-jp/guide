<!--
# Navigation
-->

# ナビゲーション

<!--
We just saw how to serve one page, but say we are making a website like `package.elm-lang.org`. It has a bunch of pages (e.g. [search](https://package.elm-lang.org/), [README](https://package.elm-lang.org/packages/elm/core/latest/), [docs](https://package.elm-lang.org/packages/elm/core/latest/Maybe)) that all work differently. How does it do that?
-->

さきほどは単一のページをどのようにサーバから送信するのかを見てきましたが、そういえばここでは`package.elm-lang.org`のようなウェブサイトを作っているのでした。そのようなウェブサイトにはたくさんのページがあり(たとえば[検索](https://package.elm-lang.org/)や[README](https://package.elm-lang.org/packages/elm/core/latest/)、[ドキュメント](https://package.elm-lang.org/packages/elm/core/latest/Maybe))、それぞれ異なる動作をしています。このような URL の異なる複数のページを持つようなサイトを Elm で作るには、どのようにすればいいのでしょうか？

<!--
## Multiple Pages
-->

## 複数のページ

<!--
The simple way would be to serve a bunch of different HTML files. Going to the home page? Load new HTML. Going to `elm/core` docs? Load new HTML. Going to `elm/json` docs? Load new HTML.
-->

簡単な方法としては、ページごとにそれぞれ異なる HTML ファイルをサーバから送信するというものがあるでしょう。サイトのホームページに行きますか？それでは新しい HTML を読み込みましょう。今度は`elm/core`ドキュメントへ行きますか？では新しい HTML を読み込みましょう。次は`elm/json`へ行くのですか？では新しい HTML を読み込みます、というようにです。

<!--
Until Elm 0.19, that is exactly what the package website did! It works. It is simple. But it has some weaknesses:
-->

Elm 0.19 まで、このパッケージウェブサイトがしていたことが、まさにそれでした！　これはうまく動きますし、シンプルです。でもいくつか弱点もあります。

<!--
1. **Blank Screens.** The screen goes white everytime you load new HTML. Can we do a nice transition instead?
2. **Redundant Requests.** Each package has a single `docs.json` file, but it gets loaded each time you visit a module like [`String`](https://package.elm-lang.org/packages/elm/core/latest/String) or [`Maybe`](https://package.elm-lang.org/packages/elm/core/latest/Maybe). Can we share the data between pages somehow?
3. **Redundant Code.** The home page and the docs share a lot of functions, like `Html.text` and `Html.div`. Can this code be shared between pages?
-->

1. **空白の画面。**新しい HTML が読み込まれるたびに、画面は真っ白になります。代わりに滑らかな遷移をすることはできるでしょうか？
2. **冗長なリクエスト。** どのパッケージもそのパッケージに含まれるすべてのモジュールのドキュメント情報をひとつにまとめて格納した`docs.json`ファイルを持っていますが、[`String`](https://package.elm-lang.org/packages/elm/core/latest/String)や[`Maybe`](https://package.elm-lang.org/packages/elm/core/latest/Maybe)のような各モジュールのページを移動するたびに毎回新しい HTML を読み込むと、この`docs.json`も繰り返し読み込まれます。どうにかしてこのデータを各ページで共有することはできないものでしょうか？
3. **冗長なコード。**『サイトのホームページ』と『ドキュメント』は`Html.text`や`Html.div`といった多くの関数を共有しています。ページ間でこのコードを共有することはできるでしょうか？

<!--
We can improve all three cases! The basic idea is to only load HTML once, and then be a bit tricky to handle URL changes.
-->

これらすべての点を改良することができます！根本のアイデアは、HTML は一度だけ読み込み、URL の変更をちょっと巧妙に操るというものです。

<!--
## Single Page
-->

## 単一のページ

<!--
Instead of creating our program with `Browser.element` or `Browser.document`, we can create a [`Browser.application`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#application) to avoid loading new HTML when the URL changes:
-->

URL が変わるたびに新たな HTML を読み込むのを避けるため、`Browser.element`や`Browser.document`を使ったプログラムを作成する代わりに、[`Browser.application`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#application)を使うといいでしょう。

```elm
application :
  { init : flags -> Url -> Key -> ( model, Cmd msg )
  , view : model -> Document msg
  , update : msg -> model -> ( model, Cmd msg )
  , subscriptions : model -> Sub msg
  , onUrlRequest : UrlRequest -> msg
  , onUrlChange : Url -> msg
  }
  -> Program flags model msg
```

<!--
It extends the functionality of `Browser.document` in three important scenarios.
-->

これは、次の３つの重要な状況において、`Browser.document`の機能を拡張するものです。

<!--
**When the application starts**, `init` gets the current [`Url`][u] from the browsers navigation bar. This allows you to show different things depending on the `Url`.
-->

**アプリケーションが開始したとき**、`init`はブラウザのナビゲーションバーから現在の[`Url`][u]を取得します。これで、`Url`の内容に沿ってそれぞれ異なる表示をするということが可能になります。

<!--
**When someone clicks a link**, like `<a href="/home">Home</a>`, it is intercepted as a [`UrlRequest`][ur]. So instead of loading new HTML with all the downsides, `onUrlRequest` creates a message for your `update` where you can decide exactly what to do next. You can save scroll position, persist data, change the URL yourself, etc.
-->

`<a href="/home">Home</a>`のような**リンクをクリックしたとき**、それを[`UrlRequest`][ur]として傍受します。いろいろな欠点がある HTML の再読み込みをするのではなく、`onUrlRequest`は`update`へメッセージを送り、次に何をするのかを細かく決定することができるようにします。スクロール位置を保存したり、データを永続化したり、URL を自分自身で変更したりなどです。

<!--
**When the URL changes**, the new `Url` is sent to `onUrlChange`.
The resulting message goes to `update` where you can decide how to show the new page.
-->

**URL が変更されたとき、**新しい`Url`が`onUrlChange`へと送信されます。このメッセージは`update`へ送信され、そこで新しいページをどのように表示するのかを決定することができます。

<!--
So rather than loading new HTML, these three additions give you full control over URL changes. Let’s see it in action!
-->

これら３つの仕組みによって、新しい HTML を読み込むのではなく、URL の変更について完全な制御ができるようになります。それでは実際のコードを見て行きましょう！

[u]: https://package.elm-lang.org/packages/elm/url/latest/Url#Url
[ur]: https://package.elm-lang.org/packages/elm/browser/latest/Browser#UrlRequest
[bn]: https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation
[bnp]: https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation#pushUrl
[bnl]: https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation#load

<!--
## Example
-->

## 例

<!--
We will start with the baseline `Browser.application` program. It just keeps track of the current URL. Skim through the code now! Pretty much all of the new and interesting stuff happens in the `update` function, and we will get into those details after the code:
-->

次のような`Browser.application`の基本的なプログラムをもとにしてはじめましょう。これは現在の URL を追跡していくだけのものです。コードを流し読みしてみましょう！`update`関数ではいろいろな新しいことや面白いことがたくさん起こっていますので、このコードを見たあとでそれらの詳細に踏み込んでいきましょう。

```elm
import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Url



-- MAIN


main : Program () Model Msg
main =
  Browser.application
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    , onUrlChange = UrlChanged
    , onUrlRequest = LinkClicked
    }



-- MODEL


type alias Model =
  { key : Nav.Key
  , url : Url.Url
  }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
  ( Model key url, Cmd.none )



-- UPDATE


type Msg
  = LinkClicked Browser.UrlRequest
  | UrlChanged Url.Url


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    LinkClicked urlRequest ->
      case urlRequest of
        Browser.Internal url ->
          ( model, Nav.pushUrl model.key (Url.toString url) )

        Browser.External href ->
          ( model, Nav.load href )

    UrlChanged url ->
      ( { model | url = url }
      , Cmd.none
      )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
  { title = "URL Interceptor"
  , body =
      [ text "The current URL is: "
      , b [] [ text (Url.toString model.url) ]
      , ul []
          [ viewLink "/home"
          , viewLink "/profile"
          , viewLink "/reviews/the-century-of-the-self"
          , viewLink "/reviews/public-opinion"
          , viewLink "/reviews/shah-of-shahs"
          ]
      ]
  }


viewLink : String -> Html msg
viewLink path =
  li [] [ a [ href path ] [ text path ] ]
```

<!--
The `update` function can handle either `LinkClicked` or `UrlChanged` messages. There is a lot of new stuff in the `LinkClicked` branch, so we will focus on that first!
-->

この`update`関数では`LinkClicked`か`UrlChanged`のどちらかを扱うことができます。`LinkClicked`の分岐のほうには新しい要素がたくさんありますので、まずはそちらに注目していくことにしましょう！

## `UrlRequest`

<!--
Whenever someone clicks a link like `<a href="/home">/home</a>`, it produces a `UrlRequest` value:
-->

`<a href="/home">/home</a>`のようなリンクがクリックされると、`UrlRequest`の値が生成されます。

```elm
type UrlRequest
  = Internal Url.Url
  | External String
```

<!--
The `Internal` variant is for any link that stays on the same domain. So if you are browsing `https://example.com`, internal links include things like `settings#privacy`, `/home`, `https://example.com/home`, and `//example.com/home`.
-->

`Internal`バリアントは同じドメイン内に留まるリンクがクリックされたときを表しています。たとえばもし`https://example.com`を閲覧しているなら、`settings#privacy`や`/home`、`https://example.com/home`、`//example.com/home`は内部リンクとなります。

<!--
The `External` variant is for any link that goes to a different domain. Links like `https://elm-lang.org/examples`, `https://static.example.com`, and `http://example.com/home` all go to a different domain. Notice that changing the protocol from `https` to `http` is considered a different domain!
-->

`External`バリアントは異なるドメインへのリンクを表しています。`https://elm-lang.org/examples`や`https://static.example.com`、`http://example.com/home`などはすべて、異なるドメインへのリンクです。プロトコルが`https`から`http`へと変わるリンクは異なるドメインであると見なされることに注意してください！

<!--
Whichever link someone presses, our example program is going to create a `LinkClicked` message and send it to the `update` function. That is where we see most of the interesting new code!
-->

誰かがリンクを押すと、このサンプルプログラムは`LinkClicked`メッセージを生成し、それを`update`関数へと送信するでしょう。これでこの新しいコードの全体を確認できました！

### `LinkClicked`

<!--
Most of our `update` logic is deciding what to do with these `UrlRequest` values:
-->

この`update`関数の大部分では、これらの`UrlRequest`の値によって何を行うかが決定されます。

```elm
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    LinkClicked urlRequest ->
      case urlRequest of
        Browser.Internal url ->
          ( model, Nav.pushUrl model.key (Url.toString url) )

        Browser.External href ->
          ( model, Nav.load href )

    UrlChanged url ->
      ( { model | url = url }
      , Cmd.none
      )
```

<!--
The particularly interesting functions are `Nav.load` and `Nav.pushUrl`. These are both from the [`Browser.Navigation`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation) module which is all about changing the URL in different ways. We are using the two most common functions from that module:
-->

特に興味深い関数は`Nav.load`と`Nav.pushUrl`です。これらはどちらも[`Browser.Navigation`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation)モジュールで定義されているものですが、それぞれ異なる方法で URL を変更します。このモジュールで最もよく使われるふたつの関数です。

<!--
- [`load`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation#load) loads all new HTML. It is equivalent to typing the URL into the URL bar and pressing enter. So whatever is happening in your `Model` will be thrown out, and a whole new page is loaded.
- [`pushUrl`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation#pushUrl) changes the URL, but does not load new HTML. Instead it triggers a `UrlChanged` message that we handle ourselves! It also adds an entry to the “browser history” so things work normal when people press the `BACK` or `FORWARD` buttons.
-->

- [`load`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation#load)は新たな HTML を読み込みます。これは URL バーに URL を入力してエンターキーを押したのと同じです。`Model`に何が起こっていようがすべて投げ捨てて、新たなページ全体が読み込まれます。
- [`pushUrl`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation#pushUrl)は URL を変更しますが、新たに HTML を読み込むことはしません。その代わり、`UrlChanged`メッセージを引き金にして、独自に動作を制御できます！これは『ブラウザ履歴』に URL を追加しますので、『進む』あるいは『戻る』ボタンを押したときもちゃんと動作します。

<!--
So looking back at the `update` function, we can understand how it all fits together a bit better now. When the user clicks a `https://elm-lang.org` link, we get an `External` message and use `load` to load new HTML from those servers. But when the user clicks a `/home` link, we get an `Internal` message and use `pushUrl` to change the URL _without_ loading new HTML!
-->

これで`update`関数を見に戻ってみると、これらを総合してどのように改良されたのかがわかるようになったと思います。ユーザが`https://elm-lang.org`へのリンクをクリックしたときは、`External`メッセージを受け取り、`load`関数を使って新しい HTML をサーバから読み込みます。それに対して、ユーザが`/home`へのリンクをクリックしたときは、`Internal`メッセージを受け取り、`pushUrl`関数を使って**新たな HTML を読み込むことなく**URL が変更されます。

<!--
> **Note 1:** Both `Internal` and `External` links are producing commands immediately in our example, but that is not required! When someone clicks an `External` link, maybe you want to save textbox content to your database before navigating away. Or when someone clicks an `Internal` link, maybe you want to use [`getViewport`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Dom#getViewport) to save the scroll position in case they navigate `BACK` later. That is all possible! It is a normal `update` function, and you can delay the navigation and do whatever you want.
>
> **Note 2:** If you want to restore “what they were looking at” when they come `BACK`, scroll position is not perfect. If they resize their browser or reorient their device, it could be off by quite a lot! So it is probably better to save “what they were looking at” instead. Maybe that means using [`getViewportOf`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Dom#getViewportOf) to figure out exactly what is on screen at the moment. The particulars depend on how your application works exactly, so I cannot give exact advice!
-->

> **Note 1:** このサンプルでは`Internal`リンクと`External`リンクのどちらもコマンドを直ちに生成していますが、これは必須ではありません！`External`リンクがクリックされたとき、別のページに遷移する前にテキストボックスの内容をデータベースに保存したいというような場合もあるでしょう。`Internal`リンクがクリックされたときは、あとで『戻る』で戻ってきたときのために[`getViewport`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Dom#getViewport)を使ってスクロール位置を保存しておきたくなるかもしれません。これらはどちらも可能です！　これは`update`関数では普通のことで、ナビゲーションを先送りにし、やりたいことをなんでもすることができます。
>
> **Note 2:** もし『戻る』で戻ってきたときに、以前見ていた状態をそのまま再現したいなら、スクロール位置を保存するだけでは完璧とは言えません。もしブラウザの大きさを変えたりデバイスの向きを変えたりすれば、ぜんぜん違ったものになってしまうかもしれません！そうではなく『以前見えていた状態』を保存するのがいいでしょう。もしかしたらそれは、[`getViewportOf`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Dom#getViewportOf)を使って、その瞬間に画面に見えているものが何なのかを調べるということかもしれません。詳細はそれぞれのアプリケーションの動作しだいですので、これ以上アドバイスすることはできません！

## `UrlChanged`

<!--
There are a couple ways to get `UrlChanged` messages. We just saw that `pushUrl` produces them, but pressing the browser `BACK` and `FORWARD` buttons produce them as well. And like I was saying in the notes a second ago, when you get a `LinkClicked` message, the `pushUrl` command may not be given immediately.
-->

`UrlChanged`メッセージを受け取る方法はいくつかあります。`pushUrl`がこれを生成することはこれまで見てきましたが、ブラウザの『戻る』や『進む』ボタンでも同じようにこのメッセージを生成します。そして先ほどの Note 1 で述べたように、`LinkClicked`メッセージを受け取ったからといって、`pushUrl`コマンドをすぐに実行するようなコードにはなっていないこともあります。

<!--
So the nice thing about having a separate `UrlChanged` message is that it does not matter how or when the URL changed. All you need to know is that it did!
-->

`UrlChanged` メッセージを `LinkClicked` やブラウザバックの動作などとは独立したメッセージにしておくことで、いつどのように URL が変更されたのかについては気にしないで常に「ページの遷移が実際に起こった後に何をするか」だけを考えればよくなります。

<!--
We are just storing the new URL in our example here, but in a real web app, you need to parse the URL to figure out what content to show. That is what the next page is all about!
-->

このサンプルでは新しい URL を保持しているだけですが、実際の Web アプリケーションでは、URL を構文解析してどんな内容を表示するのかをわかるようにする必要があります。これについては次のページで見ていきましょう！

<!--
> **Note:** I skipped talking about [`Nav.Key`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation#Key) to try to focus on more important concepts. But I will explain here for those who are interested!
>
> A navigation `Key` is needed to create navigation commands (like `pushUrl`) that change the URL. You only get access to a `Key` when you create your program with `Browser.application`, guaranteeing that your program is equipped to detect these URL changes. If `Key` values were available in other kinds of programs, unsuspecting programmers would be sure to run into some [annoying bugs][bugs] and learn a bunch of techniques the hard way!
>
> As a result of all that, we have a line in our `Model` for our `Key`. A relatively low price to pay to help everyone avoid an extremely subtle category of problems!
-->

> **Note:** より重要な概念に注目するため、[`Nav.Key`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Navigation#Key)についての説明は飛ばしました。でも、興味がある人のために、ここで説明しておきます。
>
> ナビゲーション『キー』(`Key`)は、URL を変更する(`pushUrl`のような)ナビゲーションコマンドを生成するのに必要です。`Browser.application`でプログラムを作成したときだけ`Key`を取得することができ、プログラムが URL の変更を検出する用意があることを保証します。もし`Key`の値がほかのプログラムから利用可能だとすると、不注意な開発者が[やっかいなバグ][bugs]を引き起こし、いろんな技巧を苦労して学ぶはめになるのはまず間違いないでしょう。
> このような理由により、この`Key`と`Model`を結びつけています。とてもややこしい問題を避けるようにする方法としては、比較的安価な代償だと言えるでしょう。

[bugs]: https://github.com/elm/browser/blob/1.0.0/notes/navigation-in-elements.md
