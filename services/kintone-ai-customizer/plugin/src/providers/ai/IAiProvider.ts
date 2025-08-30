import type { Config } from '../../core/schema';

export interface IAiProvider {
  generate(config: Config): Promise<{ js: string; css: string }>;
}
