# kintone AI カスタマイズ マニュアル

このプラグインは、設定画面で入力した要件(requirements)から JavaScript/CSS を生成し、kintone へデプロイするための雛形です。ここでは簡単なプロンプト例と出力例を紹介します。

## 使い方概要
1. 設定画面で kintone ドメインやアプリIDなどの基本項目を入力します。
2. **要件**欄に実現したい挙動を自然文で記述します。
3. Dry Run で差分を確認し、問題なければ Deploy を実行します。

## プロンプト例
### 例1: 一覧画面にボタンを追加してアラート
- 要件: `一覧画面にボタンを追加`
- 生成されるJS:
  ```ts
  kintone.events.on('app.record.index.show', function () {
    if (document.getElementById('joyper-ai-btn')) return;
    const b = document.createElement('button');
    b.id = 'joyper-ai-btn';
    b.innerText = 'Hello';
    b.onclick = () => alert('clicked');
    kintone.app.getHeaderMenuSpaceElement().appendChild(b);
  });
  ```
- Dry Run 出力例:
  `Would deploy JS(183 chars) and CSS(0 chars) to app 1`
- Deploy 実行例: `https://example.com/k/1/` に反映されたと想定します。

### 例2: 詳細画面の背景を赤にする
- 要件: `背景を赤にする`
- 生成されるCSS:
  ```css
  body { background-color: red; }
  ```
- Dry Run 出力例:
  `Would deploy JS(52 chars) and CSS(32 chars) to app 1`

## プロンプト作成ガイド
- どの画面(一覧・詳細など)で何をしたいかを明確に書きます。
- ボタン追加や色変更など具体的な要素・色を指定します。
- 複数要件を書く場合は文章を分けて記述すると精度が上がります。

このマニュアルとプラグインのコードはシンプルな実装です。開発者は `templates/code.ts` でルールを追加したり、`DummyAiProvider` を本物のAIサービスに置き換えて機能を拡張できます。
