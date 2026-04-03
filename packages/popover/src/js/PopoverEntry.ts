import { CollectionEntry, _ } from "@vrembem/core";
import { open } from "./open";
import { close } from "./close";
import {
  registerEventListeners,
  deregisterEventListeners
} from "./eventListeners";
import type { Popover } from "./Popover";

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
    registerEventListeners(this);

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
    deregisterEventListeners(this);
  }
}
