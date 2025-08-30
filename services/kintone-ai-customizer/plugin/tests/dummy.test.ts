import { describe, it, expect } from 'vitest';
import { DummyAiProvider } from '../src/providers/ai/DummyAiProvider';
import { configSchema } from '../src/core/schema';

const sample = configSchema.parse({
  kintoneDomain: 'https://example.com',
  appId: '1',
  apiToken: 'token',
  applyScope: ['index'],
  injectPosition: 'header',
  rollbackRetention: 5,
  safeMode: true,
  requirements: '一覧でボタンを追加',
});

describe('DummyAiProvider', () => {
  it('returns js and css', async () => {
    const ai = new DummyAiProvider();
    const code = await ai.generate(sample);
    expect(code.js).toContain('ai:hello');
  });
});
