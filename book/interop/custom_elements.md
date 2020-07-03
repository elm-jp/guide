<!--
# Custom Elements
-->
# カスタムエレメンツ

<!--
On the last few pages, we have seen (1) how to start Elm programs from JavaScript, (2) how to pass data in as flags on initialization, and (3) how to send messages between Elm and JS with ports. But guess what people? There is another way to do interop!
-->
ここまで、（1）JavaScript から Elm のプログラムを起動する方法を、（2）初期化の際にデータを フラグ として渡す方法を、（3）ポート を使用して Elm と JavaScript の間でメッセージを送り合う方法を見てきました。けれど、知っていますか？他にも連携を行う方法があります！

<!--
Browsers seem to be supporting [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) more and more, and that turns out to be quite helpful for embedding JS into Elm programs.
-->
ブラウザは [カスタムエレメンツ](https://developer.mozilla.org/ja/docs/Web/Web_Components/Custom_Elements) のサポートを進めており、これは JavaScript と Elm の連携にとても役立ちます。

<!--
Here is a [minimal example](https://github.com/elm-community/js-integration-examples/tree/master/internationalization) of how to use custom elements to do some localization and internationalization.
-->

Webページのローカライズと国際化を題材に、カスタムエレメンツを使う[最小限の例](https://github.com/elm-community/js-integration-examples/tree/master/internationalization)を見てみましょう。

<!--
## Creating Custom Elements
-->

## Custom Elementsの作成

<!--
Say we want to localize dates, but that is not accessible in Elm core packages yet. Maybe you want to write a function that localizes dates:
-->

日付データを地域ごとの固有の表記にローカライズしたいとき、残念ながらまだElmの主要なパッケージにはそのAPIがありません。そこで、こんな関数を作ったとしましょう。

```javascript
//
//   localizeDate('sr-RS', 12, 5) === "петак, 1. јун 2012."
//   localizeDate('en-GB', 12, 5) === "Friday, 1 June 2012"
//   localizeDate('en-US', 12, 5) === "Friday, June 1, 2012"
//
function localizeDate(lang, year, month)
{
	const dateTimeFormat = new Intl.DateTimeFormat(lang, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return dateTimeFormat.format(new Date(year, month));
}
```

<!--
But how do we use that in Elm?! Newer browsers allow you to create new types of DOM nodes like this:
-->

Elmからこれを使うにはどうすればいいのでしょうか？ 最近のブラウザを使うと、こんなふうにして新しい種類のDOMノードを作ることができます。

```javascript
//
//   <intl-date lang="sr-RS" year="2012" month="5">
//   <intl-date lang="en-GB" year="2012" month="5">
//   <intl-date lang="en-US" year="2012" month="5">
//
customElements.define('intl-date',
	class extends HTMLElement {
		// カスタムエレメンツを使うために必要な定義です
		constructor() { super(); }
		connectedCallback() { this.setTextContent(); }
		attributeChangedCallback() { this.setTextContent(); }
		static get observedAttributes() { return ['lang','year','month']; }

		// 属性の値を使って`textContent`を更新します
		setTextContent()
		{
			const lang = this.getAttribute('lang');
			const year = this.getAttribute('year');
			const month = this.getAttribute('month');
			this.textContent = localizeDate(lang, year, month);
		}
	}
);
```

<!--
The most important parts here are `attributeChangedCallback` and `observedAttributes`. You need some logic like that to detect changes to the attributes you care about.
-->

何より重要なところは`attributeChangedCallback`と`observedAttributes`です。これは、特定の属性に注目し、その値が変更されたときに検知するための仕組みです。

<!--
Load that before you initialize your Elm code, and you will be able to write code like this in Elm:
-->

Elmを初期化するよりも前にこのコードを読み込んでおくと、Elmからこんなふうに利用できます。

```elm
import Html exposing (Html, node)
import Html.Attributes (attribute)

viewDate : String -> Int -> Int -> Html msg
viewDate lang year month =
  node "intl-date"
    [ attribute "lang" lang
    , attribute "year" (String.fromInt year)
    , attribute "month" (String.fromInt month)
    ]
    []
```

<!--
Now you can call `viewDate` when you want access to that kind of localized information in your `view`.
-->

`view`の中でローカライズした日付を表示したいときは、`viewDate`を呼ぶだけでよくなりました。

<!--
You can check out the full version of this example [here](https://github.com/elm-community/js-integration-examples/tree/master/internationalization).
-->

この例の完全版は[ここ](https://github.com/elm-community/js-integration-examples/tree/master/internationalization)から確認できます。


<!--
## More Info
-->

## 追加情報

<!--
Luke has a lot more experience with custom elements, and I think his Elm Europe talk is an excellent introduction!
-->

Luke Westbyはカスタムエレメンツの経験が豊富です。彼のElm Europeでの発表は、カスタムエレメンツを紹介する最高の資料です！

{% youtube %} https://www.youtube.com/watch?v=tyFe9Pw6TVE {% endyoutube %}

<!--
Docs on custom elements can be kind of confusing, but I hope this is enough for people to get started embedding simple logic for `Intl` or even large React widgets if that seems like the right choice for your project.
-->

カスタムエレメンツのドキュメントにはわかりづらいところもありますが、`Intl`のような小さな機能をElmに組み込むのに必要な知識はこれだけです。そして、もしあなたの作りたいものに必要だと思うなら、同じ方法で大きなReactのウィジェットを組み込むこともできるのです。
