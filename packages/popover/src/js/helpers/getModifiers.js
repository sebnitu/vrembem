import { getPadding } from "./getPadding";

export function getModifiers(options) {
  return [{
    name: "offset",
    options: {
      offset: [0, parseInt(options["offset"], 10)]
    }
  }, {
    name: "preventOverflow",
    options: {
      padding: getPadding(options["overflow-padding"])
    }
  }, {
    name: "flip",
    options: {
      padding: getPadding(options["flip-padding"])
    }
  }, {
    name: "arrow",
    options: {
      element: options["arrow-element"],
      padding: getPadding(options["arrow-padding"])
    }
  }];
}
