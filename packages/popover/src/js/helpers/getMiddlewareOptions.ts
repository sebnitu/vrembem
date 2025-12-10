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
    offset: Number(popover.getConfig("offset")),
    flip: {
      padding: getPadding(popover.getConfig("flip-padding"))
    },
    shift: {
      padding: getPadding(popover.getConfig("shift-padding"))
    },
    arrow: {
      selector: popover.getConfig("selectorArrow"),
      element: null,
      padding: getPadding(popover.getConfig("arrow-padding"))
    }
  };
}
