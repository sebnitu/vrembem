import globals from "globals";
import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["**/dev/**/*", "**/dist/**/*"]
  },
  {
    name: "vb/src",
    files: ["**/src/**/*"],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    name: "vb/tests",
    files: ["**/tests/**/*"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
        global: "readonly"
      }
    }
  },
  {
    name: "vb/config",
    files: ["**/*.config.js", "**/*.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];
