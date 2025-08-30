import { defineStore } from 'pinia';
import type { Config } from '../core/schema';

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: {
      kintoneDomain: '',
      appId: '',
      apiToken: '',
      applyScope: ['index'],
      injectPosition: 'header',
      rollbackRetention: 5,
      safeMode: true,
      requirements: '',
    } as Config,
  }),
  actions: {
    setConfig(cfg: Config) {
      this.config = cfg;
    },
  },
});
