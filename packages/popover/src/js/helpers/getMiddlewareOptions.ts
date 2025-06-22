import { getPadding, PaddingObject } from "./getPadding";
import type { PopoverEntry } from "../PopoverEntry";

type getMiddlewareOptions = {
  offset: number;
  flip: {
    padding: PaddingObject | number | undefined;
  };
  shift: {
    padding: PaddingObject | number | undefined;
  };
  arrow: {
    selector: string;
    element: HTMLElement | null;
    padding: PaddingObject | number | undefined;
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
      selector: popover.getSetting("selectorArrow"),
      element: null,
      padding: getPadding(popover.getSetting("arrow-padding"))
    }
  };
}
