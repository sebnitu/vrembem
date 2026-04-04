import { _ } from "@vrembem/core";
import type { PopoverEntry } from "../PopoverEntry";

export function setHovered(
  entry: PopoverEntry,
  event: MouseEvent | FocusEvent
) {
  // Guard in case the event type is not "mouseenter" or "mouseleave"
  if (event.type !== "mouseenter" && event.type !== "mouseleave") return;

  // Set the boolean state
  const state = event.type == "mouseenter";

  // Store the hover state if the event target matches the el or trigger
  switch (event.target) {
    case entry.el:
      _(entry).hovered.el = state;
      break;
    case entry.trigger:
      _(entry).hovered.trigger = state;
      break;
  }
}
