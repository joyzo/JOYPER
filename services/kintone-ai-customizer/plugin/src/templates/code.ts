import type { Config } from '../core/schema';
import { NAMESPACE } from '../core/constants';

/**
 * requirements 文字列を簡易的に解析し、対応する JS/CSS を生成します。
 * 今後本番の AI 連携に差し替えやすいよう、ここで分岐をまとめています。
 */
export const buildCode = (config: Config): { js: string; css: string } => {
  const req = config.requirements;
  let js = jsTemplate();
  let css = cssTemplate();

  if (req.includes('ボタン')) {
    js = `kintone.events.on('app.record.index.show', function () {\n  if (document.getElementById('${NAMESPACE}-btn')) return;\n  const b = document.createElement('button');\n  b.id = '${NAMESPACE}-btn';\n  b.innerText = 'Hello';\n  b.onclick = () => alert('clicked');\n  kintone.app.getHeaderMenuSpaceElement().appendChild(b);\n});`;
  }

  if (req.includes('背景') && req.includes('赤')) {
    css = 'body { background-color: red; }';
  }

  if (req.includes('アラート') && !req.includes('ボタン')) {
    js = `kintone.events.on('app.record.index.show', function () {\n  alert('hello');\n});`;
  }

  return { js, css };
};

export const jsTemplate = () => `export function init() {\n  console.log('${NAMESPACE}:init');\n}`;
export const cssTemplate = () => `.${NAMESPACE}-root {}`;
