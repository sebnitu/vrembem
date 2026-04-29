import { resolve } from "path";
import { createViteConfig } from "../../vite.config.shared.js";
import data from "./package.json";

export default createViteConfig(data, resolve(import.meta.dirname, "index.js"));
