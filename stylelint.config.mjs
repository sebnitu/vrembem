import { propertyGroups } from "stylelint-config-clean-order";

const propertiesOrder = propertyGroups.map((properties) => ({
  noEmptyLineBetween: true,
  emptyLineBefore: "never",
  properties
}));

export default {
  extends: ["stylelint-config-clean-order", "stylelint-config-standard-scss"],
  plugins: ["stylelint-prettier"],
  ignoreFiles: ["**/dev/**/*", "**/dist/**/*"],
  rules: {
    "prettier/prettier": true,
    "order/properties-order": [
      propertiesOrder,
      {
        severity: "warning",
        unspecified: "bottomAlphabetical"
      }
    ],
    "function-url-quotes": null,
    "selector-class-pattern": [
      "^[a-z0-9-_:]+$",
      {
        resolveNestedSelectors: true
      }
    ]
  }
};
