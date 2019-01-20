# 翻訳について

この翻訳はElmの[公式ガイド](https://guide.elm-lang.org/)の内容を元に、[elm-jpコミュニティ](https://elm-lang.jp)のメンバーによって翻訳されたものです。

入門コンテンツという性質上、この翻訳は原文に厳密なことよりも「日本語として自然で理解しやすい文章であること」を心がけています。
そのため、一部大きく意訳されているところもありますが、elm-jpコミュニティによるレビューを経ているためElmの実態と大きく異なることはないはずです。

ただ、やはり原著者でありElm自体の作者であるEvanの「肉声」を知りたいのであれば原著をお読みいただくことをお勧めします。

## 原文のバージョン

この翻訳はできる限り英語版の更新に追従するように努めていますが、ボランティアで運営されているため更新が追いつかないこともあります。
[翻訳がベースとしているバージョンと英語版の最新バージョンとの差分](https://github.com/evancz/guide.elm-lang.org/compare/bbc2192b87b50fdb62f014cf16f24d00682afff9...master)をご確認ください。

"There isn’t anything to compare." と表示されていれば翻訳が最新の英語版に対応していることを意味します。

## 翻訳に貢献するには

Elm guide の翻訳に貢献してくださる方を募集しています。
がっつりした翻訳作業だけでなく、この日本語版を読んでいる中で「ここの日本語の意味がわからない」と思った部分をご報告いただくだけでもとてもありがたいです。
Elm guide は初学者の方にも分かることを重視したドキュメントなので、「自分のElmに関する知識が足りないからだ」と思わずに、「自分がわからないということは他の初学者もわからないに違いない」と圧倒的他責精神で [githubリポジトリのissue](https://github.com/elm-jp/guide/issues) としてどんどんご報告ください。

翻訳への貢献に関するより詳しい話は[githubリポジトリ](https://github.com/elm-jp/guide/#readme)をご参照ください。

## カタカナ語の採用基準について

英単語をそのままカタカナにしたいわゆる「カタカナ語」は、以下の基準で採用しています。

* 日本語訳が浸透している用語はカタカナ語にしない
* 日本語訳よりもカタカナ語が十分に浸透していてグーグラビリティなども高い場合は無理に日本語訳をせずにカタカナ表記にする
* カタカナ語としても日本語としてもあまり浸透しておらず、パッと見で意味が分かる日本語訳もない場合はカタカナ語を推奨する

## 訳語対応表

この翻訳プロジェクトで使う訳語と元の英単語の対応を表に表しました。
学習にお役立てください。

<!-- !!!!NOTES FOR TRANSLATERS!!!!
対訳表のうち、コメントアウトした行はウェブ上には表示されません `pretranslate` コマンドには読み込まれます。
翻訳者の間で共有したほうが良いが、あえて読者に見せる必要はないような対訳を記載しておくと便利です。

また、名詞はできるだけ単数形で記載してください。
複数形が "s" や "es" をつけるだけの名詞の場合は単数形でそのまま単純に原文を検索すれば複数形もマッチするため、
`pretranslate` コマンドがうまく原文から単語を見つけることができます。

"industry" <-> "industries"
"leaf" <-> "leaves"
"kitchen knife" <-> "kitchen knives"
のように特殊な活用をする単語の場合はコメントとして付記するといいでしょう。
-->

<!-- | <Translated> | <Original> | DO NOT REMOVE OR CHANGE THIS LINE -->
| 訳語              | 原文            |
|:-----------------:|:---------------:|
| 型の別名          | type alias      |
| オブジェクト指向  | object oriented |
| テキストフィールド| text field      |
| カスタム型        | custom type     |
| パターンマッチ    | pattern match   |
| 相互運用          | interop         |
| カスタムエレメンツ| custom element  |
| パース            | parsing         |
| パースする        | parse           |
| バリアント    | variant       |
| パターンマッチ | pattern matching |
| 補助関数       | helper function  |
| アセット | asset |
| ミニファイ | minify |
| コマンド | Command |
| サブスクリプション | Subscription |
| 型注釈 | type annotation |
| タプル | tuple |
| レコード | record |
| 無名関数 | anonymous function |
| 予約語 | keyword |
| 構造的部分型 | structural typing |
| 制約付き型変数 | constrained type variable |
<!-- | ソースコード自身がその意味するところを雄弁に語るようになります | self-documenting | -->
<!-- | ソースコード自身がその意味するところを雄弁に語るようになります | self-documented | -->
<!-- | 章 | chapter | -->
<!-- | 節 | section | -->
<!-- | ウェブアプリケーション | webapp          | -->
<!-- | The Elm Architecture | The Elm Architecture | -->
