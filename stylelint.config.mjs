export default {
  extends: ["stylelint-config-standard-scss", "stylelint-config-clean-order"],
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
