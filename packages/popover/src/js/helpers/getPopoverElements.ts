import { getPopoverID } from "./getPopoverID";
import type { Popover } from "../Popover";

export function getPopoverElements(
  this: Popover,
  query: string | HTMLElement
): {
  popover: HTMLElement;
  trigger: HTMLElement;
} {
  const id = getPopoverID.call(this, query);
  if (id) {
    const popover = document.querySelector(`#${id}`) as HTMLElement;
    const trigger =
      (document.querySelector(`[aria-controls="${id}"]`) as HTMLElement) ||
      (document.querySelector(`[aria-describedby="${id}"]`) as HTMLElement);

    if (!trigger && !popover) {
      throw new Error(`No popover elements found using the ID: "${id}".`);
    } else if (!trigger) {
      throw new Error(
        `No popover trigger associated with the provided popover: "${id}".`
      );
    } else if (!popover) {
      throw new Error(
        `No popover associated with the provided popover trigger: "${id}".`
      );
    } else {
      return { popover, trigger };
    }
  } else {
    throw new Error("Could not resolve the popover ID.");
  }
}
