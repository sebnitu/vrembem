import { getConfig, teleport } from "@vrembem/core";
import { handleClick, handleTooltipClick, handleMouseEnter, handleMouseLeave, handleDocumentClick } from "./handlers";
import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { getCustomProps } from "./helpers";

function toCamel(value) {
  return value
    .split("-")
    .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function toKebab(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

export async function register(el, trigger, config = {}) {
  // Deregister entry incase it has already been registered.
  deregister.call(this, el);
  
  // Save root this for use inside methods API.
  const root = this;

  // Setup a private object for keeping track of the hover state.
  const _isHovered = {
    el: false,
    trigger: false
  };

  // Setup the popover object.
  const entry = {
    id: el.id,
    state: "closed",
    el: el,
    trigger: trigger,
    toggleDelayId: null,
    returnRef: null,
    settings: config,
    dataConfig: {},
    customProps: {},
    set isHovered(event) {
      // The state can either be true, false or undefined based on event type.
      const state = (event.type == "mouseenter") ? true : (event.type == "mouseleave") ? false : undefined;
      // Guard in case the event type is not "mouseenter" or "mouseleave".
      if (state == undefined) return;
      // Store the hover state if the event target matches the el or trigger.
      switch (event.target) {
        case this.el:
          _isHovered.el = state;
          break;
        case this.trigger:
          _isHovered.trigger = state;
          break;
      }
    },
    get isHovered() {
      return _isHovered.el || _isHovered.trigger;
    },
    get isTooltip() {
      return !!el.closest(root.settings.selectorTooltip) || el.getAttribute("role") == "tooltip";
    },
    cleanup: () => {},
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
    refreshDataConfig() {
      this.dataConfig = getConfig(el, this.getSetting("dataConfig"));
      return this.dataConfig;
    },
    refreshCustomProps() {
      this.customProps = getCustomProps(el);
      return this.customProps;
    },
    getSetting(key) {
      // Store our key in both camel and kebab naming conventions.
      const camel = toCamel(key);
      const kebab = toKebab(key);

      // Check the data config object.
      if (camel in this.dataConfig) {
        return this.dataConfig[camel];
      }

      // Check the custom properties object.
      if (kebab in this.customProps) {
        return this.customProps[kebab];
      }

      // Check the entry settings.
      if (camel in this.settings) {
        return this.settings[camel];
      }

      // Check the root settings.
      if (camel in root.settings) {
        return root.settings[camel];
      }

      // Throw error if setting does not exist.
      throw(new Error(`Popover setting does not exist: ${key}`));
    }
  };

  // Build the configuration objects.
  entry.refreshDataConfig();
  entry.refreshCustomProps();

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

  // Teleport popover if a reference has been set.
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

  // Return the registered entry.
  return entry;
}

export function registerEventListeners(entry) {
  // If event listeners aren't already setup.
  if (!entry.__eventListeners) {
    // Add event listeners based on event type.
    const eventType = entry.getSetting("event");

    // If the event type is hover.
    if (eventType === "hover") {
      // Setup event listeners object for hover.
      entry.__eventListeners = [{
        el: ["el", "trigger"],
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
