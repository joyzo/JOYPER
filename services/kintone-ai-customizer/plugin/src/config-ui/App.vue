<template>
  <div class="config">
    <h1>AI カスタマイザー設定</h1>
    <form @submit.prevent="handleSubmit">
      <label>kintoneDomain<input v-model="form.kintoneDomain" /></label>
      <label>appId<input v-model="form.appId" /></label>
      <label>apiToken<input type="password" v-model="form.apiToken" /></label>
      <label>applyScope<select v-model="form.applyScope" multiple>
        <option value="index">一覧</option>
        <option value="detail">詳細</option>
        <option value="create">新規</option>
        <option value="edit">編集</option>
      </select></label>
      <label>injectPosition<select v-model="form.injectPosition">
        <option value="header">ヘッダ</option>
        <option value="footer">フッタ</option>
        <option value="button">ボタン</option>
      </select></label>
      <label>rollbackRetention<input type="number" v-model.number="form.rollbackRetention" /></label>
      <label>safeMode<input type="checkbox" v-model="form.safeMode" /></label>
      <label>要件<textarea v-model="form.requirements" /></label>
      <button type="submit">Dry Run</button>
    </form>
    <pre v-if="diff">{{ diff }}</pre>
    <pre v-if="error" class="error">{{ error }}</pre>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useConfigStore } from './store';
import { configSchema } from '../core/schema';
import { DummyAiProvider } from '../providers/ai/DummyAiProvider';
import { DummyKintoneDeployer } from '../providers/kintone/DummyKintoneDeployer';

const store = useConfigStore();
const form = reactive({ ...store.config });
const diff = ref('');
const error = ref('');

const handleSubmit = async () => {
  error.value = '';
  diff.value = '';
  const parse = configSchema.safeParse(form);
  if (!parse.success) {
    error.value = JSON.stringify(parse.error.format(), null, 2);
    return;
  }
  store.setConfig(parse.data);
  const ai = new DummyAiProvider();
  const code = await ai.generate(parse.data);
  const deployer = new DummyKintoneDeployer();
  const plan = await deployer.dryRun(parse.data, code);
  diff.value = JSON.stringify(plan, null, 2);
};
</script>

<style scoped>
.config {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
}
.error { color: red; }
</style>
