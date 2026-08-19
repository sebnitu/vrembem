import { resolve } from "path";
import { createViteConfig } from "../../vite.config.shared.mjs";
import data from "./package.json" with { type: "json" };

export default createViteConfig(data, {
  index: resolve(import.meta.dirname, "./index.ts"),
  define: resolve(import.meta.dirname, "./define.ts")
});
