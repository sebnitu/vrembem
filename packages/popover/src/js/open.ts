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
import type { PopoverEntry } from "./PopoverEntry";

export async function open(entry: PopoverEntry): Promise<PopoverEntry> {
  // Update inert state and state class
  entry.el.inert = false;
  entry.el.classList.add(entry.config.get("stateActive"));

  // Update accessibility attribute(s)
  if (!entry.isTooltip) {
    entry.trigger?.setAttribute("aria-expanded", "true");
  }

  // If the cssConfig plugin has been added, get the custom property data
  // before opening the popover.
  const plugin = entry.parent.plugins.get("cssConfig");
  if (plugin) {
    await entry.parent.emit(plugin.config.updateEvent, entry);
  }

  // If a trigger exists
  if (entry.trigger) {
    // Get the middleware options for floating ui
    const middlewareOptions = getMiddlewareOptions(entry);

    // Get the arrow element
    const arrowEl = entry.el.querySelector(
      middlewareOptions.arrow.selector
    ) as HTMLElement;
    middlewareOptions.arrow.element = arrowEl;

    // Setup the middleware array, this is needed by floating-ui
    const middleware = [
      flip(middlewareOptions.flip),
      shift({ ...middlewareOptions.shift, limiter: limitShift() }),
      offset(middlewareOptions.offset)
    ];

    // Add arrow middleware if an element exists
    if (middlewareOptions.arrow.element) {
      middleware.push(
        arrow({
          ...middlewareOptions.arrow,
          element: middlewareOptions.arrow.element
        })
      );
    }

    // Check if this is a virtual trigger
    const isVirtual = entry.config.get("virtual");

    // Enable virtual element tracking on parent collection
    if (isVirtual) entry.parent.virtual = true;

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // console.log("Race condition?");

    // Define the update position function
    function updatePosition() {
      // Remove the mousemove event listener if popover is no longer opened
      if (isVirtual && entry.state !== "opened") {
        document.removeEventListener("mousemove", updatePosition);
        document.removeEventListener("scroll", updatePosition);
      }

      // Get either the virtual element or the entry trigger
      const refEl = isVirtual ? entry.parent.virtualElement : entry.trigger;

      // Setup the compute position API
      computePosition(refEl, entry.el, {
        placement: entry.config.get("placement"),
        middleware
      }).then(({ x, y, placement, middlewareData }) => {
        // Guard in case there is no popover element
        if (!entry.el) return;

        // Apply popover left and top position
        applyPositionStyle(entry.el, x, y);

        // Maybe apply arrow left or top position
        if (middlewareOptions.arrow.element && middlewareData.arrow) {
          const { x, y }: Record<string, number> = middlewareData.arrow;
          applyPositionStyle(middlewareOptions.arrow.element, x, y);
        }

        // Apply the current placement as a data attribute. This is used in our
        // CSS to determine the vertical position of arrows.
        entry.el.setAttribute("data-floating-placement", placement);
      });
    }

    // If this is a virtual trigger, update the position on mouse move
    if (isVirtual) {
      updatePosition();
      document.addEventListener("mousemove", updatePosition);
      document.addEventListener("scroll", updatePosition);
    } else {
      // Setup the autoUpdate of popover positioning and store the cleanup function
      entry.floatingCleanup = autoUpdate(
        entry.trigger,
        entry.el,
        updatePosition
      );
    }
  }

  // Update popover state
  entry.state = "opened";

  // Apply document click handler
  if (entry.config.get("event") === "click") {
    handleDocumentClick.call(entry.parent, entry);
  }

  // Dispatch custom opened event
  entry.el.dispatchEvent(
    new CustomEvent(entry.config.get("customEventPrefix") + "opened", {
      detail: entry.parent,
      bubbles: true
    })
  );

  // Emit the opened event
  await entry.parent.emit("opened", entry);

  // Return the popover
  return entry;
}
