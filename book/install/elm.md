<!--
# Install Elm
-->
# Elmをインストールする

<!--
The previous page described how to install a code editor for Elm, so the next step is to obtain an executable file named `elm`. Here are the **install** links:
-->
前のページでは、Elm用のコードエディターをインストールする方法を説明しました。次は`elm` という実行可能ファイルを取得してみましょう。こちらが**インストール**用のリンクです。

<!--
- **Mac** - [installer](https://github.com/elm/compiler/releases/download/0.19.1/installer-for-mac.pkg)
- **Linux** - <a href="https://github.com/elm/compiler/blob/master/installers/linux/README.md" target="_blank">instructions</a>
- **Windows** - [installer](https://github.com/elm/compiler/releases/download/0.19.1/installer-for-windows.exe)
-->
- **Mac** - [インストーラー](https://github.com/elm/compiler/releases/download/0.19.1/installer-for-mac.pkg)
- **Linux** - <a href="https://github.com/elm/compiler/blob/master/installers/linux/README.md" target="_blank">インストール手順</a>
- **Windows** - [インストーラー](https://github.com/elm/compiler/releases/download/0.19.1/installer-for-windows.exe)

<!--
After installation is complete, open up the terminal on your computer. It may be called `cmd.exe` or `Command Prompt` on Windows.
-->
インストールが終わったら、コンピューターのターミナルを開いてください。Windowsでは、`cmd.exe`または`コマンドプロンプト`と呼ばれることもあります。

<!--
![terminal](images/terminal.png)
-->
![ターミナル](images/terminal.png)

<!--
Start by navigating to your desktop in the terminal:
-->
まずはターミナルでデスクトップに移動しましょう。

<!--
```bash
# Mac and Linux
cd ~/Desktop

# Windows (but with <username> filled in with your user name)
cd C:\Users\<username>\Desktop
```
-->
```bash
# Mac、Linux
cd ~/Desktop

# Windows (<username> にはあなたのユーザー名が入ります)
cd C:\Users\<username>\Desktop
```

<!--
The next step is to get familiar with `elm` command. I personally had a really hard time learning terminal commands, so I worked hard to make the `elm` command nice to use. Let's go through a couple common scenarios.
-->
次のステップは`elm`コマンドに慣れることです。私自身はターミナルのコマンドを覚えるのに本当に苦労したので、`elm`コマンドは使いやすいように頑張って作りました。よく使うコマンドをいくつか見ていきましょう。

<br>

## <span style="font-family:Consolas,'Liberation Mono',Menlo,Courier,monospace;">elm init</span>

<!--
You can start an Elm project by running:
-->
以下のコマンドを実行すると、Elmのアプリケーションやライブラリを作成するために必要なファイルが自動的に生成されます。

```bash
elm init
```

<!--
Try running this command to create an `elm.json` file and a `src/` directory:
-->
このコマンドを実行してみましょう。`elm.json`というファイルと、`src/`というディレクトリが作成されるはずです。

<!--
- [`elm.json`](https://github.com/elm/compiler/blob/master/docs/elm.json/application.md) describes your project.
- `src/` holds all of your Elm files.
-->
- [`elm.json`](https://github.com/elm/compiler/blob/master/docs/elm.json/application.md)には、プロジェクトの情報が書かれています。
- `src/`にはすべてのElmファイルが入っています。

<!--
Now try creating a file called `src/Main.elm` in your editor, and copying in the code from [the buttons example](https://elm-lang.org/examples/buttons).
-->
それでは、エディターで`src/Main.elm`というファイルを作って、[ボタンのサンプル](https://elm-lang.org/examples/buttons)からコードをコピーしてみましょう。


<br>

## <span style="font-family:Consolas,'Liberation Mono',Menlo,Courier,monospace;">elm reactor</span>

<!--
`elm reactor` helps you build Elm projects without messing with the terminal too much. You just run it at the root of your project, like this:
-->
`elm reactor`を使うと、ターミナルで毎度ごちゃごちゃ頑張らなくてもElmプロジェクトをビルドできます。次のように、プロジェクトのルートディレクトリで以下のコマンドを入力してみてください。

```bash
elm reactor
```

<!--
This starts a server at [`http://localhost:8000`](http://localhost:8000). You can navigate to any Elm file and see what it looks like. Run `elm reactor`, follow the localhost link, and try to check out your `src/Main.elm` file!
-->
サーバーが[`http://localhost:8000`](http://localhost:8000)で起動します。このサイトではどのElmファイルにも移動できて、どんな感じになるか見ることができます。`elm reactor`を実行して、localhostへのリンクを開き、`src/Main.elm`ファイルを確認してみてください！


<br>

## <span style="font-family:Consolas,'Liberation Mono',Menlo,Courier,monospace;">elm make</span>

<!--
You can compile Elm code to HTML or JavaScript with commands like this:
-->
次のようなコマンドを使うと、ElmのコードをHTMLやJavaScriptにコンパイルできます。

<!--
```bash
# Create an index.html file that you can open in your browser.
elm make src/Main.elm

# Create an optimized JS file to embed in a custom HTML document.
elm make src/Main.elm --optimize --output=elm.js
```
-->
```bash
# ブラウザで開くことができるindex.htmlファイルを作成します。
elm make src/Main.elm

# 自前のHTMLドキュメントに埋め込むための最適化されたJSファイルを作成します。
elm make src/Main.elm --optimize --output=elm.js
```

<!--
Try running these commands on your `src/Main.elm` file.
-->
これらのコマンドをローカルにある`src/Main.elm`ファイルに対して実行してみてください。

<!--
This is the most general way to compile Elm code. It is extremely useful once your project becomes too advanced for `elm reactor`.
-->
`elm make`はElmのコードをコンパイルする最も一般的な方法です。プロジェクトが`elm reactor`でコンパイルするには高度過ぎるようになったら極めて有用です。

<!--
This command produces the same messages you have been seeing in the online editor and with `elm reactor`. Years of work has gone into them so far, but please report any unhelpful messages [here](https://github.com/elm/error-message-catalog/issues). I am sure there are ways to improve!
-->
このコマンドを実行すると、オンラインエディターや`elm reactor`で表示されたものと同じメッセージが表示されます。これまでに年単位の時間をメッセージの改善に費やしてきましたがわかりにくいメッセージがありましたら[こちら](https://github.com/elm/error-message-catalog/issues)に報告してください。きっと改善できると思います！


<br>

## <span style="font-family:Consolas,'Liberation Mono',Menlo,Courier,monospace;">elm install</span>

<!--
Elm packages all live at [`package.elm-lang.org`](https://package.elm-lang.org/).
-->
Elmのパッケージは全て[`package.elm-lang.org`](https://package.elm-lang.org/)に置かれています。

<!--
Say you look around and decide you need [`elm/http`][http] and [`elm/json`][json] to make some HTTP requests. You can get them set up in your project with the following commands:
-->
例えばHTTPリクエストを組み立てるためにパッケージを探して[`elm/http`][http]パッケージと[`elm/json`][json]パッケージをプロジェクトに追加したいと思ったら、以下のコマンドでインストールすることができます。

```bash
elm install elm/http
elm install elm/json
```

<!--
This adds these dependencies into your `elm.json` file, making these packages available in your project. That will let you say `import Http` and use functions like `Http.get` in your programs.
-->
このコマンドは`elm.json`に依存関係を追記して、プロジェクトで利用できるようにします。これにより、プログラムで`import Http`できるようになり、`Http.get`のような関数を使うことができます。

[http]: https://package.elm-lang.org/packages/elm/http/latest
[json]: https://package.elm-lang.org/packages/elm/json/latest

<br>

<!--
## Tips and Tricks
-->
## ヒントとコツ

<!--
**First**, do not worry about remembering all this stuff!
-->
**その1**、全てを覚えようとする必要はありません！

<!--
You can always run `elm --help` to get a full outline of what `elm` is capable of.
-->
`elm --help`を使うことで、いつでも`elm`コマンドでできる全てのことについて、概要を確認できます。

<!--
You can also run commands like `elm make --help` and `elm repl --help` to get hints about a specific command. This is great if you want to check which flags are available and what they do.
-->
また、`elm make --help`や`elm repl --help`のようにコマンドを実行して、各コマンドに関するヒントを得ることもできます。これはどのフラグが利用可能か、何をするコマンドなのかを確認したいときに便利です。

<!--
**Second**, do not worry if it takes some time to get comfortable with the terminal in general.
-->
**その2**、もしターミナルの操作全般に慣れるまでに時間がかかっても心配ありません。

<!--
I have been using it for over a decade now, and I still cannot remember how to compress files, find all Elm files in a directory, etc. I still look a lot of things up!
-->
私はもう10年以上ターミナルを使っていますが、ファイルを圧縮する方法や、ディレクトリ内のすべてのElmファイルを見つける方法などをいまだに覚えられません。今でもたくさんのことを調べています！

* * *

<!--
Now that we have our editor set up and `elm` available in the terminal, let's get back to learning Elm!
-->
これでエディターの設定が完了し、ターミナルで`elm`コマンドを使えるようになりましたので、Elmの学習に戻りましょう！
