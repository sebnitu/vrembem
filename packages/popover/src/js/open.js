import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  limitShift,
  offset,
  arrow
} from "@floating-ui/dom";
import { getPopoverConfig, getMiddlewareOptions, getPopover } from "./helpers";

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

  // Update popover settings object.
  popover.settings = getPopoverConfig(popover.el, this.settings);

  // Get the middleware options for floating ui.
  const middlewareOptions = getMiddlewareOptions(popover.settings);

  // Get the arrow element.
  const arrowEl = popover.el.querySelector(middlewareOptions.arrow.element);
  middlewareOptions.arrow.element = arrowEl ? arrowEl : undefined;

  // Setup the autoUpdate of popover positioning and store the cleanup function.
  popover.cleanup = autoUpdate(popover.trigger, popover.el, () => {
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
      Object.assign(popover.el.style, {
        left: `${x}px`,
        top: `${y}px`
      });

      // Maybe apply arrow left or top position.
      if (middlewareOptions.arrow.element && middlewareData.arrow) {
        const { x, y } = middlewareData.arrow;

        Object.assign(middlewareOptions.arrow.element.style, {
          left: x != null ? `${x}px` : "",
          top: y != null ? `${y}px` : ""
        });
      }

      // Apply the current placement as a data attribute.
      // This is used in our CSS to determine the vertical position of arrows.
      popover.el.setAttribute("data-floating-placement", placement);
    });
  });

  // Update popover state.
  popover.state = "opened";

  // Return the popover.
  return popover;
}
