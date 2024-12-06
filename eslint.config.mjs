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
        global: "readonly",
        vi: "readonly",
        it: "readonly",
        expect: "readonly",
        test: "readonly",
        describe: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
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
