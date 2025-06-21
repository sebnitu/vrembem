import { getPadding, PaddingObject } from "./getPadding";
import type { PopoverEntry } from "../PopoverEntry";

type getMiddlewareOptions = {
  offset: number;
  flip: {
    padding: PaddingObject | number | false;
  };
  shift: {
    padding: PaddingObject | number | false;
  };
  arrow: {
    element: HTMLElement | null;
    padding: PaddingObject | number | false;
  };
};

export function getMiddlewareOptions(
  popover: PopoverEntry
): getMiddlewareOptions {
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
