import { resolve } from "path";
import { defineConfig } from "vite";
import data from "./package.json";

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
    "import.meta.env.VITE_NAME": JSON.stringify(data.name),
    "import.meta.env.VITE_DESCRIPTION": JSON.stringify(data.description)
  }
});
