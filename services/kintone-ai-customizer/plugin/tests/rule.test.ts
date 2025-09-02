import { describe, it, expect } from 'vitest';
import { DummyAiProvider } from '../src/providers/ai/DummyAiProvider';
import { DummyKintoneDeployer } from '../src/providers/kintone/DummyKintoneDeployer';
import { configSchema } from '../src/core/schema';

const base = {
  kintoneDomain: 'https://example.com',
  appId: '1',
  apiToken: 'token',
  applyScope: ['index'],
  injectPosition: 'header',
  rollbackRetention: 5,
  safeMode: true,
};

describe('DummyAiProvider', () => {
  it('generates button code for ボタン requirement', async () => {
    const cfg = configSchema.parse({ ...base, requirements: '一覧画面にボタンを追加' });
    const ai = new DummyAiProvider();
    const code = await ai.generate(cfg);
    expect(code.js).toContain('appendChild');
  });

  it('generates red background css when 背景 and 赤 are included', async () => {
    const cfg = configSchema.parse({ ...base, requirements: '背景を赤にする' });
    const ai = new DummyAiProvider();
    const code = await ai.generate(cfg);
    expect(code.css).toContain('red');
  });
});

describe('DummyKintoneDeployer', () => {
  it('returns url on deploy', async () => {
    const cfg = configSchema.parse({ ...base, requirements: 'n/a' });
    const deployer = new DummyKintoneDeployer();
    const result = await deployer.deploy(cfg, { js: '', css: '' });
    expect(result.url).toContain(cfg.appId);
  });
});
