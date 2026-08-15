import { resolve } from "path";
import { createViteConfig } from "../../vite.config.shared.js";
import data from "./package.json" with { type: "json" };

export default createViteConfig(data, resolve(import.meta.dirname, "index.ts"));
