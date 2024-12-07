export default {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-prettier", "stylelint-order"],
  ignoreFiles: ["**/dev/**/*", "**/dist/**/*"],
  rules: {
    "prettier/prettier": true,
    "order/properties-alphabetical-order": true,
    "selector-class-pattern": [
      "^[a-z0-9-_:]+$",
      {
        resolveNestedSelectors: true
      }
    ]
  }
};
