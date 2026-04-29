import { createViteConfig } from "../../vite.config.shared.js";
import data from "./package.json";

export default createViteConfig(import.meta.dirname, data);
