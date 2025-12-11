import { CollectionEntry } from "@vrembem/core";
import { open } from "./open";
import { close } from "./close";
import {
  handleClick,
  handleTooltipClick,
  handleMouseEnter,
  handleMouseLeave
} from "./handlers";
import type { Popover } from "./Popover";

type EventObject = {
  el: string[];
  type: string[];
  listener: (event: Event) => void;
};

export class PopoverEntry extends CollectionEntry<Popover> {
  #eventListeners: EventObject[] | null;
  #isHovered: {
    el: boolean;
    trigger: boolean;
  };
  state: string;
  trigger: HTMLElement | null;
  toggleDelayId: NodeJS.Timeout | null;
  floatingCleanup: () => void;

  constructor(
    parent: Popover,
    query: string | HTMLElement,
    options: Record<string, any> = {}
  ) {
    super(parent, query, options);
    this.state = "closed";
    this.toggleDelayId = null;
    this.trigger = null;
    this.#eventListeners = null;
    this.#isHovered = {
      el: false,
      trigger: false
    };
    this.floatingCleanup = () => {};
  }

  get isTooltip(): boolean {
    return (
      !!this.el.closest(this.config.get("selectorTooltip")) ||
      this.el.getAttribute("role") == "tooltip"
    );
  }

  get isHovered(): boolean {
    return this.#isHovered.el || this.#isHovered.trigger;
  }

  set isHovered(event: MouseEvent | FocusEvent) {
    // The state can either be true, false or undefined based on event type
    const state =
      event.type == "mouseenter"
        ? true
        : event.type == "mouseleave"
          ? false
          : undefined;
    // Guard in case the event type is not "mouseenter" or "mouseleave"
    if (state == undefined) return;
    // Store the hover state if the event target matches the el or trigger
    switch (event.target) {
      case this.el:
        this.#isHovered.el = state;
        break;
      case this.trigger:
        this.#isHovered.trigger = state;
        break;
    }
  }

  async open(): Promise<PopoverEntry> {
    return open(this);
  }

  async close(): Promise<PopoverEntry> {
    return close(this);
  }

  async deregister() {
    return this.parent.deregister(this.id);
  }

  registerEventListeners() {
    // If event listeners aren't already setup
    if (!this.#eventListeners) {
      // Add event listeners based on event type
      const eventType = this.config.get("event");

      // If the event type is hover
      if (eventType === "hover") {
        // Setup event listeners object for hover
        this.#eventListeners = [
          {
            el: ["el", "trigger"],
            type: ["mouseenter", "focus"],
            listener: handleMouseEnter.bind(this.parent, this)
          },
          {
            el: ["el", "trigger"],
            type: ["mouseleave", "focusout"],
            listener: handleMouseLeave.bind(this.parent, this)
          },
          {
            el: ["trigger"],
            type: ["click"],
            listener: handleTooltipClick.bind(this.parent, this)
          }
        ];

        // Loop through listeners and apply to the appropriate elements
        this.#eventListeners.forEach((evObj) => {
          evObj.el.forEach((el) => {
            evObj.type.forEach((type) => {
              this[el].addEventListener(type, evObj.listener, false);
            });
          });
        });
      }

      // Else the event type is click
      else {
        // Setup event listeners object for click
        this.#eventListeners = [
          {
            el: ["trigger"],
            type: ["click"],
            listener: handleClick.bind(this.parent, this)
          }
        ];

        // Loop through listeners and apply to the appropriate elements
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
    // If event listeners have been setup
    if (this.#eventListeners) {
      // Loop through listeners and remove from the appropriate elements
      this.#eventListeners.forEach((evObj) => {
        evObj.el.forEach((el) => {
          evObj.type.forEach((type) => {
            this[el].removeEventListener(type, evObj.listener, false);
          });
        });
      });

      // Remove eventListeners object from collection
      this.#eventListeners = null;
    }
  }

  async onCreateEntry() {
    // Get the trigger element
    this.trigger = document.querySelector(
      `[aria-controls="${this.id}"], [aria-describedby="${this.id}"]`
    );

    // If it's a tooltip...
    if (this.isTooltip) {
      // Set the event to hover role="tooltip" attribute
      this.config.apply({ event: "hover" });
      this.el.setAttribute("role", "tooltip");
    } else {
      // Check that trigger isn't null and is an HTMLElement
      if (this.trigger && this.trigger instanceof HTMLElement) {
        // Set aria-expanded to false if trigger has aria-controls attribute
        this.trigger.setAttribute("aria-expanded", "false");
      }
    }
  }

  async onRegisterEntry() {
    // Setup event listeners
    this.registerEventListeners();

    // Set initial state based on the presence of the active class
    if (this.el.classList.contains(this.config.get("stateActive"))) {
      await this.open();
    } else {
      this.el.inert = true;
    }
  }

  async onDestroyEntry() {
    // If entry is in the opened state, close it
    if (this.state === "opened") {
      await this.close();
    }

    // Clean up the floating UI instance
    this.floatingCleanup();

    // Remove event listeners
    this.deregisterEventListeners();
  }
}
