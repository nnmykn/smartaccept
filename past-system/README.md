# SmartAccept Browser

![](public/assets/images/smartaccept-sidebar-logo.png)
<h2 style="text-align: center;">SmartAcceptのメインアプリケーション</h2>

# Development

## 環境
- ベース
  - nodejs - v16
  - yarn - v3(berry)
- フレームワーク
  - solidjs - 1.5
  - solid-start - 0.1.0

## 手順

1. 依存関係のインストール `yarn install`
2. 開発サーバーの起動 `yarn dev`
3. 変更を加えて、開発サーバーで機能するかどうかを確認
4. ひと段落したらフォーマットを実行 `yarn stylelint --fix && yarn eslint --fix && yarn format`
5. フォーマット後にもう一度動作確認、およびビルド可能かチェック `yarn build && yarn start`
6. 問題なければコミット (コミットメッセージには主な変更内容等を)
7. CloudflarePages でビルドが成功しているかチェック

## ブランチ

### main

プロダクトバージョン用のブランチ。直接 push 厳禁  
dev での開発がひと段落したら適応（？）

### dev

開発用ブランチ。ここに開発中の機能等の Pull Request を送る。

### feature/\*

実装する機能単位で`feature/*` ブランチを作成する。  
ex) PDF 編集を実装するためのブランチ `feature/pdf`

## その他
開発についての情報は`docs/development`に置く
