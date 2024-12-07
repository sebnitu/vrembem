import { defineConfig } from "vite";
import data from "./package.json";

const parts = data.name.replace("@", "").split("/");

export default defineConfig({
  build: {
    emptyOutDir: false,
    sourcemap: true
  },
  define: {
    "import.meta.env.VITE_ROOT": JSON.stringify(parts[0]),
    "import.meta.env.VITE_PACKAGE": JSON.stringify(parts[1]),
    "import.meta.env.VITE_NAME": JSON.stringify(data.name),
    "import.meta.env.VITE_DESCRIPTION": JSON.stringify(data.description)
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"
      }
    }
  }
});
