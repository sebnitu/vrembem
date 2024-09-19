import { getPadding } from "./getPadding";

export function getMiddlewareOptions(popover) {  
  return {
    offset: Number(popover.getSetting("offset")),
    flip: {
      padding: getPadding(popover.getSetting("flip-padding"))
    },
    shift: {
      padding: getPadding(popover.getSetting("shift-padding"))
    },
    arrow: {
      element: popover.getSetting("selectorArrow"),
      padding: getPadding(popover.getSetting("arrow-padding"))
    }
  };
}
