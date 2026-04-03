import { CollectionEntry, _ } from "@vrembem/core";
import { open } from "./open";
import { close } from "./close";
import {
  handleClick,
  handleTooltipClick,
  handleMouseEnter,
  handleMouseLeave
} from "./handlers";
import type { Popover } from "./Popover";

type EventBinding = {
  keys: ("el" | "trigger")[];
  events: string[];
  handler: (event: MouseEvent | Event) => void;
};

export class PopoverEntry extends CollectionEntry {
  state: "closed" | "opened" = "closed";
  trigger: HTMLElement | null = null;

  constructor(parent: Popover, query: string | HTMLElement) {
    super(parent, query);

    // Set the initial state of private store
    _(this, {
      events: [],
      hovered: {
        el: false,
        trigger: false
      },
      toggleDelayId: null,
      floatingCleanup: () => {}
    });
  }

  get isTooltip(): boolean {
    return (
      !!this.el.closest(this.config.get("selectorTooltip")) ||
      this.el.getAttribute("role") == "tooltip"
    );
  }

  get isHovered(): boolean {
    return _(this).hovered.el || _(this).hovered.trigger;
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
        _(this).hovered.el = state;
        break;
      case this.trigger:
        _(this).hovered.trigger = state;
        break;
    }
  }

  async open(): Promise<PopoverEntry> {
    return open(this);
  }

  async close(): Promise<PopoverEntry> {
    return close(this);
  }

  registerEventListeners() {
    // If event listeners aren't already setup
    if (!_(this).events.length) {
      // Add event listeners based on event type
      const eventType = this.config.get("event");

      // If the event type is hover
      if (eventType === "hover") {
        // Setup event listeners object for hover
        _(this).events = [
          {
            keys: ["el", "trigger"],
            events: ["mouseenter", "focus"],
            handler: handleMouseEnter.bind(this.parent, this)
          },
          {
            keys: ["el", "trigger"],
            events: ["mouseleave", "focusout"],
            handler: handleMouseLeave.bind(this.parent, this)
          },
          {
            keys: ["trigger"],
            events: ["click"],
            handler: handleTooltipClick.bind(null, this)
          }
        ];

        // Loop through listeners and apply to the appropriate elements
        _(this).events.forEach((eventObj: EventBinding) => {
          eventObj.keys.forEach((key) => {
            eventObj.events.forEach((event) => {
              const target = this[key] as HTMLElement;
              target.addEventListener(event, eventObj.handler);
            });
          });
        });
      }

      // Else the event type is click
      else {
        // Setup event listeners object for click
        _(this).events = [
          {
            keys: ["trigger"],
            events: ["click"],
            handler: handleClick.bind(this.parent, this)
          }
        ];

        // Loop through listeners and apply to the appropriate elements
        _(this).events.forEach((eventObj: EventBinding) => {
          eventObj.keys.forEach((key) => {
            eventObj.events.forEach((event) => {
              const target = this[key] as HTMLElement;
              target.addEventListener(event, eventObj.handler);
            });
          });
        });
      }
    }
  }

  deregisterEventListeners() {
    // If event listeners have been setup
    if (_(this).events) {
      // Loop through listeners and remove from the appropriate elements
      _(this).events.forEach((eventObj: EventBinding) => {
        eventObj.keys.forEach((key) => {
          eventObj.events.forEach((event) => {
            const target = this[key] as HTMLElement;
            target.removeEventListener(event, eventObj.handler);
          });
        });
      });

      // Remove eventListeners object from collection
      _(this).events = [];
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
      this.config.set({ event: "hover" });
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
    _(this).floatingCleanup();

    // Remove event listeners
    this.deregisterEventListeners();
  }
}
