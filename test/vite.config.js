import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"
      }
    }
  }
});
