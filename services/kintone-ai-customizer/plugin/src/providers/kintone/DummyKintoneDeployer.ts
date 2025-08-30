import type { IKintoneDeployer } from './IKintoneDeployer';
import type { Config } from '../../core/schema';

export class DummyKintoneDeployer implements IKintoneDeployer {
  async dryRun(config: Config, artifacts: { js: string; css: string }): Promise<{ diff: string }> {
    const diff = `Would deploy JS(${artifacts.js.length} chars) and CSS(${artifacts.css.length} chars) to app ${config.appId}`;
    return { diff };
  }
}
