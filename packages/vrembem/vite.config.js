import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.js"),
      name: "vrembem",
      fileName: "index"
    },
    emptyOutDir: false,
    sourcemap: true
  },
  define: {
    "import.meta.env.VITE_PACKAGE": JSON.stringify("vrembem"),
  }
});
