import { resolve } from "path";
import { createViteConfig } from "../../vite.config.shared.mjs";
import data from "./package.json" with { type: "json" };

export default createViteConfig(data, {
  index: resolve(import.meta.dirname, "./src/index.ts"),
  define: resolve(import.meta.dirname, "./src/define.ts")
});
