import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      "**/dev/**/*",
      "**/dist/**/*"
    ]
  }, {
    name: "vb/src",
    files: ["**/src/**/*"],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
  }, {
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
    },
  }, {
    name: "vb/config",
    files: ["**/*.config.js"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
  }
];
