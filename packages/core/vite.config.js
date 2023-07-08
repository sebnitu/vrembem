import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8'
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'vrembem.core',
      fileName: 'index',
    },
    emptyOutDir: false,
    sourcemap: true
  }
});
