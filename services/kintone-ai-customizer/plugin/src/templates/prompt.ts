import type { Config } from '../core/schema';
import { NAMESPACE } from '../core/constants';

export const buildPrompt = (config: Config): string => {
  return `あなたはkintone向けフロントエンド実装AIです。\n` +
    `目的: 入力要件に基づき、安全なJS/CSSカスタマイズを生成する。\n` +
    `名前空間は ${NAMESPACE} のみを使用。\n` +
    `要件: ${config.requirements}\n` +
    `適用範囲: ${config.applyScope.join(',')}\n` +
    `挿入位置: ${config.injectPosition}\n`; 
};
