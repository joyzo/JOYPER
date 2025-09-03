# JOYPER デプロイ設定ガイド

## 概要

このドキュメントでは、JOYPERプロジェクトをGitHub Actionsを使用してkintone環境に自動デプロイする方法について説明します。

## 環境設定

### 1. 環境変数ファイルの設定

`services/kintone-ai-customizer/plugin/env.example`を参考に、`.env`ファイルを作成してください：

```bash
# Kintone環境設定
KINTONE_DOMAIN=your-domain.cybozu.com
KINTONE_USERNAME=your-username
KINTONE_PASSWORD=your-password

# デプロイ設定
DEPLOY_ENVIRONMENT=staging
PLUGIN_ID=your-plugin-id
```

### 2. GitHub Secretsの設定

GitHubリポジトリの設定で以下のSecretsを設定してください：

#### ステージング環境
- `KINTONE_DOMAIN`: ステージング用kintoneドメイン
- `KINTONE_USERNAME`: kintoneユーザー名
- `KINTONE_PASSWORD`: kintoneパスワード
- `PLUGIN_ID`: プラグインID（既存プラグインを更新する場合）

#### プロダクション環境
- `KINTONE_DOMAIN_PROD`: プロダクション用kintoneドメイン
- `KINTONE_USERNAME_PROD`: プロダクション用kintoneユーザー名
- `KINTONE_PASSWORD_PROD`: プロダクション用kintoneパスワード
- `PLUGIN_ID_PROD`: プロダクション用プラグインID

## デプロイフロー

### 自動デプロイ

1. **mainブランチへのプッシュ**: 自動的にステージング環境にデプロイ
2. **プロダクション環境へのデプロイ**: コミットメッセージに`[deploy:prod]`を含める

### 手動デプロイ

ローカル環境でのデプロイ：

```bash
# ステージング環境
pnpm run deploy:staging

# プロダクション環境
pnpm run deploy:production
```

## セキュリティ考慮事項

- パスワードはGitHub Secretsで管理
- 環境ごとに異なる認証情報を使用
- プロダクション環境へのデプロイは明示的なコミットメッセージが必要

## トラブルシューティング

### よくある問題

1. **認証エラー**: GitHub Secretsの設定を確認
2. **ZIP作成エラー**: `dist`ディレクトリが存在することを確認
3. **アップロードエラー**: kintone APIの権限を確認

### ログの確認

GitHub Actionsのログで詳細なエラー情報を確認できます。

## 開発者向け情報

### 依存関係

- `archiver`: ZIPファイル作成
- `tsx`: TypeScript実行
- `node-fetch`: HTTPリクエスト（Node.js 18+では標準）

### カスタマイズ

デプロイスクリプトは`scripts/deploy.ts`で管理されています。
必要に応じてカスタマイズしてください。
