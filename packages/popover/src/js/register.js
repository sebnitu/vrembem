import {
  handleClick,
  handleTooltipClick,
  handleMouseEnter,
  handleMouseLeave,
  handleDocumentClick
} from "./handlers";

export async function register(entry, config = {}) {
  // Save root this for use inside methods API.
  const root = this;

  // Get the trigger element.
  const trigger = document.querySelector(
    `[aria-controls="${entry.id}"], [aria-describedby="${entry.id}"]`
  );

  // Setup a private object for keeping track of the hover state.
  const _isHovered = {
    el: false,
    trigger: false
  };

  // Apply custom property keys.
  entry.customPropKeys = [
    "placement",
    "event",
    "offset",
    "flip-padding",
    "shift-padding",
    "arrow-padding",
    "toggle-delay",
  ];

  // Build on the entry object.
  Object.assign(entry, {
    state: "closed",
    trigger: trigger,
    toggleDelayId: null,
    cleanup: () => {},
    open() {
      return root.open(this);
    },
    close() {
      return root.close(this);
    },
    deregister() {
      return root.deregister(this.id);
    }
  });

  // Create getters and setters.
  Object.defineProperties(entry, Object.getOwnPropertyDescriptors({
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
      return !!entry.el.closest(root.settings.selectorTooltip) || entry.el.getAttribute("role") == "tooltip";
    }
  }));

  // If it's a tooltip set the event to hover.
  if (entry.isTooltip) {
    entry.settings.event = "hover";
  }

  // Build the setting objects.
  entry.applySettings(config);
  entry.getDataConfig();
  entry.getCustomProps();

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
  if (!entry._eventListeners) {
    // Add event listeners based on event type.
    const eventType = entry.getSetting("event");

    // If the event type is hover.
    if (eventType === "hover") {
      // Setup event listeners object for hover.
      entry._eventListeners = [{
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
      entry._eventListeners.forEach((evObj) => {
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
      entry._eventListeners = [{
        el: ["trigger"],
        type: ["click"],
        listener: handleClick.bind(this, entry)
      }];

      // Loop through listeners and apply to the appropriate elements.
      entry._eventListeners.forEach((evObj) => {
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
