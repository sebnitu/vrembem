import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  limitShift,
  offset,
  arrow
} from "@floating-ui/dom";
import { applyPositionStyle, getMiddlewareOptions } from "./helpers";
import { handleDocumentClick } from "./handlers";

export async function open(entry) {
  // Update inert state and state class
  entry.el.inert = false;
  entry.el.classList.add(entry.parent.settings.stateActive);

  // Update accessibility attribute(s)
  if (!entry.isTooltip) {
    entry.trigger.setAttribute("aria-expanded", "true");
  }

  // Get the custom property data before opening the popover
  entry.buildCustomProps();

  // Get the middleware options for floating ui
  const middlewareOptions = getMiddlewareOptions(entry);

  // Get the arrow element
  const arrowEl = entry.el.querySelector(middlewareOptions.arrow.element);
  middlewareOptions.arrow.element = arrowEl ? arrowEl : undefined;

  // Setup the autoUpdate of popover positioning and store the cleanup function
  entry.floatingCleanup = autoUpdate(entry.trigger, entry.el, () => {
    computePosition(entry.trigger, entry.el, {
      placement: entry.getSetting("placement"),
      middleware: [
        flip(middlewareOptions.flip),
        shift({ ...middlewareOptions.shift, limiter: limitShift() }),
        offset(middlewareOptions.offset),
        arrow(middlewareOptions.arrow)
      ]
    }).then(({ x, y, placement, middlewareData }) => {
      // Guard in case there is no popover element
      if (!entry.el) {
        return;
      }

      // Apply popover left and top position
      applyPositionStyle(entry.el, x, y);

      // Maybe apply arrow left or top position
      if (middlewareOptions.arrow.element && middlewareData.arrow) {
        const { x, y } = middlewareData.arrow;
        applyPositionStyle(middlewareOptions.arrow.element, x, y);
      }

      // Apply the current placement as a data attribute. This is used in our
      // CSS to determine the vertical position of arrows.
      entry.el.setAttribute("data-floating-placement", placement);
    });
  });

  // Update popover state
  entry.state = "opened";

  // Apply document click handler
  if (entry.getSetting("event") === "click") {
    handleDocumentClick.call(entry.parent, entry);
  }

  // Dispatch custom opened event
  entry.el.dispatchEvent(
    new CustomEvent(entry.getSetting("customEventPrefix") + "opened", {
      detail: entry.parent,
      bubbles: true
    })
  );

  // Emit the opened event
  await entry.parent.emit("opened", entry);

  // Return the popover
  return entry;
}
