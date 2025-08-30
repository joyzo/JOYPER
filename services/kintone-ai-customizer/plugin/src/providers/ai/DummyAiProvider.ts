import type { IAiProvider } from './IAiProvider';
import type { Config } from '../../core/schema';

export class DummyAiProvider implements IAiProvider {
  async generate(_: Config): Promise<{ js: string; css: string }> {
    return {
      js: `console.log('ai:hello from ${Date.now()}');`,
      css: ''
    };
  }
}
