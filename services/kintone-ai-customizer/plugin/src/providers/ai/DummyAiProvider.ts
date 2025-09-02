import type { IAiProvider } from './IAiProvider';
import type { Config } from '../../core/schema';
import { buildCode } from '../../templates/code';

export class DummyAiProvider implements IAiProvider {
  async generate(config: Config): Promise<{ js: string; css: string }> {
    // 簡易ルールベース実装。将来的に本物のAI呼び出しに置き換え可能。
    return buildCode(config);
  }
}
