import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  root: 'src/config-ui',
  build: {
    outDir: '../../dist/config-ui',
    emptyOutDir: true,
  },
});
