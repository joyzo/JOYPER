# JOYPER

AI Concierge JOYPER は複数の AI サービスをまとめて管理するためのモノレポです。

## ディレクトリ構成

```
JOYPER/
├── README.md
└── services/
    └── kintone-ai-customizer/
        └── plugin/  # kintone 向け AI カスタマイズプラグイン雛形
```

各サービスの詳細はそれぞれの README を参照してください。現在は kintone アプリに対して
AI 生成コードをデプロイするプラグインの雛形を提供しています。

## CI/CD

このリポジトリでは GitHub Actions による CI/CD を整備しています。

- プルリクエストやプッシュ時に `pnpm lint`・`pnpm test`・`pnpm build` を自動実行
- `main` ブランチへのプッシュ時にはビルド成果物をアーティファクトとして保存
- `KINTONE_DOMAIN` 環境変数が設定されている場合のみデプロイジョブが実行
- ワークフロー定義は `.github/workflows/kintone-ai-customizer.yml` を参照

## 開発の始め方

各サービスのディレクトリに移動し、以下のコマンドで開発を開始できます。

```bash
pnpm install
pnpm dev
```

詳細なビルド手順や Dry-run については `services/kintone-ai-customizer/plugin/README.md` を
参照してください。
