# kintone-ai-customizer plugin

設定画面から要件と最小設定を入力し、AI経由でJS/CSSカスタマイズを生成してkintoneへ適用するためのプラグイン雛形です。
詳細なプロンプト例や出力例は [MANUAL.md](./MANUAL.md) を参照してください。

## ディレクトリ構成
```
plugin/
  src/
    config-ui/    # 設定画面(Vue3 + Pinia)
    core/         # スキーマ・定数
    providers/    # AI / kintone プロバイダ
    templates/    # プロンプト・コード雛形
    utils/        # 共通
  tests/          # vitest
```

## アイコンとスクリーンショット
このリポジトリにはプラグインのアイコンやスクリーンショット画像を含めていません。`icon.png` や `screenshot.png` を `plugin/` 直下に配置してからビルドしてください。

## コマンド
依存インストール:
```
pnpm install
```
開発サーバー:
```
pnpm dev
```
ビルド:
```
pnpm build
```
Lint:
```
pnpm lint
```
テスト:
```
pnpm test
```

## CI/CD
GitHub Actions により、プッシュやプルリクエスト時に `pnpm lint`・`pnpm test`・`pnpm build` が自動実行されます。`main` ブランチへプッシュされた際はビルド成果物がアーティファクトとして保存されます。`KINTONE_DOMAIN` 環境変数が設定されている場合のみデプロイジョブが実行されます。ワークフロー定義は `.github/workflows/kintone-ai-customizer.yml` を参照してください。

## Dry-run 手順
1. `pnpm dev` で設定画面を起動
2. 各項目と要件を入力し **Dry Run** をクリック
3. ダミーAIとデプロイヤが差分JSONを表示

## 将来拡張
- `providers/ai` に `IAiProvider` 実装を追加することで別AIプロバイダに対応
- `templates/prompt.ts` を差し替えてプロンプト拡張
- `providers/kintone` に本番デプロイロジックを実装
