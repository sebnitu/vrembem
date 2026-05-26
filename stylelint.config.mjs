import { propertyGroups } from "stylelint-config-clean-order";

const propertiesOrder = propertyGroups.map((properties) => {
  const insetIdx = properties.indexOf("inset");
  const topIdx = properties.indexOf("top");
  if (insetIdx > -1 && topIdx > -1 && insetIdx > topIdx) {
    const patched = properties.filter((p) => p !== "inset");
    patched.splice(topIdx, 0, "inset");
    return {
      noEmptyLineBetween: true,
      emptyLineBefore: "never",
      properties: patched
    };
  }
  return { noEmptyLineBetween: true, emptyLineBefore: "never", properties };
});

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
