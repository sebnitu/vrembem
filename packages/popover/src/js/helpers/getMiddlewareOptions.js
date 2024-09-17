import { getPadding } from "./getPadding";

export function getMiddlewareOptions(options) {
  return {
    offset: parseInt(options["offset"], 10),
    shift: {
      padding: getPadding(options["shift-padding"])
    },
    flip: {
      padding: getPadding(options["flip-padding"])
    },
    arrow: {
      element: options["arrow-element"],
      padding: getPadding(options["arrow-padding"])
    }
  };
}
