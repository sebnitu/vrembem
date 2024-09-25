import { Entry } from "@vrembem/core";

import {
  handleClick,
  handleTooltipClick,
  handleMouseEnter,
  handleMouseLeave,
  handleDocumentClick
} from "./handlers";

export class PopoverEntry extends Entry {
  #eventListeners;
  #isHovered;

  constructor(context, query) {
    super(context, query);
    this.floatingCleanup = () => {};
    this.state = "closed";
    this.toggleDelayId = null;
    this.trigger = document.querySelector(
      `[aria-controls="${this.id}"], [aria-describedby="${this.id}"]`
    );
    this.#eventListeners = null;
    this.#isHovered = {
      el: false,
      trigger: false
    };
  }
  
  get isTooltip() {
    return !!this.el.closest(this.getSetting("selectorTooltip")) || this.el.getAttribute("role") == "tooltip";
  }

  set isHovered(event) {
    // The state can either be true, false or undefined based on event type.
    const state = (event.type == "mouseenter") ? true : (event.type == "mouseleave") ? false : undefined;
    // Guard in case the event type is not "mouseenter" or "mouseleave".
    if (state == undefined) return;
    // Store the hover state if the event target matches the el or trigger.
    switch (event.target) {
      case this.el:
        this.#isHovered.el = state;
        break;
      case this.trigger:
        this.#isHovered.trigger = state;
        break;
    }
  }

  get isHovered() {
    return this.#isHovered.el || this.#isHovered.trigger;
  }

  async beforeMount() {
    // If it's a tooltip...
    if (this.isTooltip) {
      // Set the event to hover role="tooltip" attribute.
      this.settings.event = "hover";
      this.el.setAttribute("role", "tooltip");
    } else {
      // Set aria-expanded to false if trigger has aria-controls attribute.
      this.trigger.setAttribute("aria-expanded", "false");
    }
    // Setup event listeners.
    this.registerEventListeners();
    // Set initial state based on the presence of the active class.
    if (this.el.classList.contains(this.settings.stateActive)) {
      this.open();
      handleDocumentClick.call(this, this);
    } else {
      this.el.inert = true;
    }
  }

  async beforeUnmount() {
    // If entry is in the opened state, close it.
    if (this.state === "opened") {
      this.close();
    }
    // Clean up the floating UI instance.
    this.floatingCleanup();
    // Remove event listeners.
    this.deregisterEventListeners();
  }
  
  async open() {
    return this.context.open(this);
  }

  async close() {
    return this.context.close(this);
  }
  
  async deregister() {
    return this.context.deregister(this.id);
  }

  registerEventListeners() {
    // If event listeners aren't already setup.
    if (!this.#eventListeners) {
      // Add event listeners based on event type.
      const eventType = this.getSetting("event");
  
      // If the event type is hover.
      if (eventType === "hover") {
        // Setup event listeners object for hover.
        this.#eventListeners = [{
          el: ["el", "trigger"],
          type: ["mouseenter", "focus"],
          listener: handleMouseEnter.bind(this.context, this)
        }, {
          el: ["el", "trigger"],
          type: ["mouseleave", "focusout"],
          listener: handleMouseLeave.bind(this.context, this)
        }, {
          el: ["trigger"],
          type: ["click"],
          listener: handleTooltipClick.bind(this.context, this)
        }];
  
        // Loop through listeners and apply to the appropriate elements.
        this.#eventListeners.forEach((evObj) => {
          evObj.el.forEach((el) => {
            evObj.type.forEach((type) => {
              this[el].addEventListener(type, evObj.listener, false);
            });
          });
        });
      }
  
      // Else the event type is click.
      else {
        // Setup event listeners object for click.
        this.#eventListeners = [{
          el: ["trigger"],
          type: ["click"],
          listener: handleClick.bind(this.context, this)
        }];
  
        // Loop through listeners and apply to the appropriate elements.
        this.#eventListeners.forEach((evObj) => {
          evObj.el.forEach((el) => {
            evObj.type.forEach((type) => {
              this[el].addEventListener(type, evObj.listener, false);
            });
          });
        });
      }
    }
  }
  
  deregisterEventListeners() {
    // If event listeners have been setup.
    if (this.#eventListeners) {
      // Loop through listeners and remove from the appropriate elements.
      this.#eventListeners.forEach((evObj) => {
        evObj.el.forEach((el) => {
          evObj.type.forEach((type) => {
            this[el].removeEventListener(type, evObj.listener, false);
          });
        });
      });
  
      // Remove eventListeners object from collection.
      this.#eventListeners = null;
    }
  }
}
