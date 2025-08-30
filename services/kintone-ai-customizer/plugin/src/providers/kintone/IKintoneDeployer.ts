import type { Config } from '../../core/schema';

export interface IKintoneDeployer {
  dryRun(config: Config, artifacts: { js: string; css: string }): Promise<{ diff: string }>;
}
