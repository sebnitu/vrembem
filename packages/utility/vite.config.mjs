import { createViteConfig } from "../../vite.config.shared.mjs";
import data from "./package.json" with { type: "json" };

export default createViteConfig(data);
