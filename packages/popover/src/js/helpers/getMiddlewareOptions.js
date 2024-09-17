import { getPadding } from "./getPadding";

export function getMiddlewareOptions(options) {
  return {
    offset: parseInt(options["offset"], 10),
    flip: {
      padding: getPadding(options["flip-padding"])
    },
    shift: {
      padding: getPadding(options["shift-padding"])
    },
    arrow: {
      element: options["arrow-element"],
      padding: getPadding(options["arrow-padding"])
    }
  };
}
