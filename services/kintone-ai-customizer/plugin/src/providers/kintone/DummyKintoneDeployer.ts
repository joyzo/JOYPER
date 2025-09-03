import type { IKintoneDeployer } from './IKintoneDeployer';
import type { Config } from '../../core/schema';

export class DummyKintoneDeployer implements IKintoneDeployer {
  async dryRun(config: Config, artifacts: { js: string; css: string }): Promise<{ diff: string }> {
    const diff = `Would deploy JS(${artifacts.js.length} chars) and CSS(${artifacts.css.length} chars) to app ${config.appId}`;
    return { diff };
  }

  async deploy(config: Config, _artifacts: { js: string; css: string }): Promise<{ url: string }> {
    // 実際のデプロイは行わず URL を返すのみ。開発者はここを置き換えて利用する。
    const url = `${config.kintoneDomain}/k/${config.appId}/`;
    return { url };
  }
}
