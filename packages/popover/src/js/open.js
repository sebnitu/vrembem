import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  limitShift,
  offset,
  arrow
} from "@floating-ui/dom";
import {
  applyPositionStyle,
  getMiddlewareOptions,
  getPopover
} from "./helpers";
import { handleDocumentClick } from "./handlers";

export async function open(query) {
  // Get the popover from collection.
  const popover = getPopover.call(this, query);

  // Update inert state and state class.
  popover.el.inert = false;
  popover.el.classList.add(this.settings.stateActive);

  // Update accessibility attribute(s).
  if (!popover.isTooltip) {
    popover.trigger.setAttribute("aria-expanded", "true");
  }

  // Get the custom property data before opening the popover.
  popover.buildCustomProps();

  // Get the middleware options for floating ui.
  const middlewareOptions = getMiddlewareOptions(popover);

  // Get the arrow element.
  const arrowEl = popover.el.querySelector(middlewareOptions.arrow.element);
  middlewareOptions.arrow.element = arrowEl ? arrowEl : undefined;

  // Setup the autoUpdate of popover positioning and store the cleanup function.
  popover.floatingCleanup = autoUpdate(popover.trigger, popover.el, () => {
    computePosition(popover.trigger, popover.el, {
      placement: popover.getSetting("placement"),
      middleware: [
        flip(middlewareOptions.flip),
        shift({ ...middlewareOptions.shift, limiter: limitShift() }),
        offset(middlewareOptions.offset),
        arrow(middlewareOptions.arrow)
      ]
    }).then(({ x, y, placement, middlewareData }) => {
      // Guard in case there is no popover element.
      if (!popover.el) { return; }

      // Apply popover left and top position.
      applyPositionStyle(popover.el, x, y);

      // Maybe apply arrow left or top position.
      if (middlewareOptions.arrow.element && middlewareData.arrow) {
        const { x, y } = middlewareData.arrow;
        applyPositionStyle(middlewareOptions.arrow.element, x, y);
      }

      // Apply the current placement as a data attribute.
      // This is used in our CSS to determine the vertical position of arrows.
      popover.el.setAttribute("data-floating-placement", placement);
    });
  });

  // Update popover state.
  popover.state = "opened";

  // Apply document click handler.
  if (popover.getSetting("event") === "click") {
    handleDocumentClick.call(this, popover);
  }

  // Return the popover.
  return popover;
}
