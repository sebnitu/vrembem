import { teleport } from "@vrembem/core";
import { createPopper } from "@popperjs/core/dist/esm";

import { handleClick, handleTooltipClick, handleMouseEnter, handleMouseLeave, handleDocumentClick } from "./handlers";
import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { getPopoverConfig } from "./helpers";

export async function register(el, trigger) {
  // Deregister entry incase it has already been registered.
  deregister.call(this, el);

  // Save root this for use inside methods API.
  const root = this;

  // Setup the popover object.
  const entry = {
    id: el.id,
    state: "closed",
    el: el,
    trigger: trigger,
    toggleDelayId: null,
    popper: createPopper(trigger, el),
    returnRef: null,
    settings: getPopoverConfig(el, this.settings),
    get isTooltip() {
      return !!el.closest(root.settings.selectorTooltip) || el.getAttribute("role") == "tooltip";
    },
    open() {
      return open.call(root, this);
    },
    close() {
      return close.call(root, this);
    },
    deregister() {
      return deregister.call(root, this);
    },
    teleport(ref = this.getSetting("teleport"), method = this.getSetting("teleportMethod")) {
      if (!this.returnRef) {
        this.returnRef = teleport(this.el, ref, method);
        return this.el;
      } else {
        console.error("Element has already been teleported:", this.el);
        return false;
      }
    },
    teleportReturn() {
      if (this.returnRef) {
        this.returnRef = teleport(this.el, this.returnRef);
        return this.el;
      } else {
        console.error("No return reference found:", this.el);
        return false;
      }
    },
    getSetting(key) {
      return (key in this.settings) ? this.settings[key] : root.settings[key];
    }
  };

  // Set role="tooltip" attribute if the popover is a tooltip.
  if (entry.isTooltip) {
    entry.el.setAttribute("role", "tooltip");
  }

  // Set aria-expanded to false if trigger has aria-controls attribute.
  if (!entry.isTooltip) {
    entry.trigger.setAttribute("aria-expanded", "false");
  }

  // Setup event listeners.
  registerEventListeners.call(this, entry);

  // Teleport modal if a reference has been set.
  if (entry.getSetting("teleport")) {
    entry.teleport();
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Set initial state.
  if (entry.el.classList.contains(this.settings.stateActive)) {
    await entry.open();
    handleDocumentClick.call(this, entry);
  } else {
    entry.el.inert = true;
  }

  // Set the popper placement property.
  entry.popper.setOptions({
    placement: entry.settings["placement"]
  });

  // Return the registered entry.
  return entry;
}

export function registerEventListeners(entry) {
  // If event listeners aren't already setup.
  if (!entry.__eventListeners) {
    // Add event listeners based on event type.
    const eventType = (entry.isTooltip) ? "hover" : entry.settings["event"];

    // If the event type is hover.
    if (eventType === "hover") {
      // Setup event listeners object for hover.
      entry.__eventListeners = [{
        el: ["trigger"],
        type: ["mouseenter", "focus"],
        listener: handleMouseEnter.bind(this, entry)
      }, {
        el: ["el", "trigger"],
        type: ["mouseleave", "focusout"],
        listener: handleMouseLeave.bind(this, entry)
      }, {
        el: ["trigger"],
        type: ["click"],
        listener: handleTooltipClick.bind(this, entry)
      }];

      // Loop through listeners and apply to the appropriate elements.
      entry.__eventListeners.forEach((evObj) => {
        evObj.el.forEach((el) => {
          evObj.type.forEach((type) => {
            entry[el].addEventListener(type, evObj.listener, false);
          });
        });
      });
    }

    // Else the event type is click.
    else {
      // Setup event listeners object for click.
      entry.__eventListeners = [{
        el: ["trigger"],
        type: ["click"],
        listener: handleClick.bind(this, entry)
      }];

      // Loop through listeners and apply to the appropriate elements.
      entry.__eventListeners.forEach((evObj) => {
        evObj.el.forEach((el) => {
          evObj.type.forEach((type) => {
            entry[el].addEventListener(type, evObj.listener, false);
          });
        });
      });
    }
  }

  // Return the entry object.
  return entry;
}
