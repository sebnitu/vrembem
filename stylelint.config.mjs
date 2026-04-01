export default {
  extends: ["stylelint-config-clean-order", "stylelint-config-standard-scss"],
  plugins: ["stylelint-prettier"],
  ignoreFiles: ["**/dev/**/*", "**/dist/**/*"],
  rules: {
    "prettier/prettier": true,
    "function-url-quotes": null,
    "selector-class-pattern": [
      "^[a-z0-9-_:]+$",
      {
        resolveNestedSelectors: true
      }
    ]
  }
};
