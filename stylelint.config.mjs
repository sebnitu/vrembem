export default {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-prettier", "stylelint-order"],
  ignoreFiles: ["**/dev/**/*", "**/dist/**/*"],
  rules: {
    "prettier/prettier": true,
    "order/properties-alphabetical-order": true
  }
};
