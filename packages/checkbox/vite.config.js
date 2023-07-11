import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'vrembem.Checkbox',
      fileName: 'index',
    },
    emptyOutDir: false,
    sourcemap: true
  },
  plugins: [ eslint() ]
});
