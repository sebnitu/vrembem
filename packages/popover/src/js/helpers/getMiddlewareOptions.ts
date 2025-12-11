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
    offset: Number(popover.config.get("offset")),
    flip: {
      padding: getPadding(popover.config.get("flip-padding"))
    },
    shift: {
      padding: getPadding(popover.config.get("shift-padding"))
    },
    arrow: {
      selector: popover.config.get("selectorArrow"),
      element: null,
      padding: getPadding(popover.config.get("arrow-padding"))
    }
  };
}
