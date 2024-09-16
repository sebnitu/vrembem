import globals from "globals";
import js from "@eslint/js";

const formattingRules = {
  rules: {
    "indent": ["error", 2, {"SwitchCase": 1}],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
  }
};

export default [
  js.configs.recommended,
  formattingRules,
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
        jest: "readonly",
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
