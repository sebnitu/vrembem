import { getPadding } from "./getPadding";
import type { PopoverEntry } from "../PopoverEntry";
import type { Padding } from "@floating-ui/dom";

type getMiddlewareOptions = {
  offset: number;
  flip: {
    padding: Padding | number | undefined;
  };
  shift: {
    padding: Padding | number | undefined;
  };
  arrow: {
    selector: string;
    element: HTMLElement | null;
    padding: Padding | number | undefined;
  };
};

export function getMiddlewareOptions(
  popover: PopoverEntry
): getMiddlewareOptions {
  return {
    offset: Number(popover.config.get("offset")),
    flip: {
      padding: getPadding(popover.config.get("flipPadding"))
    },
    shift: {
      padding: getPadding(popover.config.get("shiftPadding"))
    },
    arrow: {
      selector: popover.config.get("selectorArrow"),
      element: null,
      padding: getPadding(popover.config.get("arrowPadding"))
    }
  };
}
