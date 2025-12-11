import { CollectionEntry } from "@vrembem/core";
import { switchMode } from "./switchMode";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";
import type { Drawer } from "./Drawer";

export class DrawerEntry extends CollectionEntry<Drawer> {
  #mode: string;
  dialog: HTMLElement;
  trigger: HTMLElement | null;
  state: string | null;
  inlineState: string | null;

  constructor(
    parent: Drawer,
    query: string | HTMLElement,
    options: Record<string, any> = {}
  ) {
    super(parent, query, options);
    this.#mode = "indeterminate";

    // Set the dialog element. If none is found, use the root element
    this.dialog =
      this.el.querySelector(this.config.get("selectorDialog")) || this.el;

    this.trigger = null;
    this.state = null;
    this.inlineState = null;
  }

  get mode(): string {
    return this.#mode;
  }

  set mode(value: string) {
    if (this.#mode === value) return;
    this.#mode = value;
    switchMode(this);
  }

  setState(value: string): void {
    this.state = value;
    // If mode is inline and not in a transitioning state...
    const ignoreStates = ["opening", "closing"];

    if (this.mode === "inline" && !ignoreStates.includes(value)) {
      // Save the inline state
      this.inlineState = value;
    }

    // If state is indeterminate, remove all state classes
    if (value === "indeterminate") {
      this.el.classList.remove(this.config.get("stateOpened"));
      this.el.classList.remove(this.config.get("stateOpening"));
      this.el.classList.remove(this.config.get("stateClosed"));
      this.el.classList.remove(this.config.get("stateClosing"));
    }
  }

  async applyState(): Promise<DrawerEntry> {
    // Only apply state if mode is not set to "modal"
    if (this.mode === "modal") return this;

    // Check the state stored in inline state
    if (this.inlineState === "opened") {
      return await this.open(false, false);
    }

    if (this.inlineState === "closed") {
      return await this.close(false, false);
    }

    // Determine the state based on the presence of a state class. This handles
    // the initial state which is the only time `this.state` should be `null`.
    if (this.state === null) {
      if (this.el.classList.contains(this.config.get("stateOpened"))) {
        return await this.open(false, false);
      }
      if (this.el.classList.contains(this.config.get("stateClosed"))) {
        return await this.close(false, false);
      }
    }

    // If state cannot be determined, set it to indeterminate
    this.setState("indeterminate");

    // Return the entry for chaining
    return this;
  }

  async open(transition?: boolean, focus?: boolean): Promise<DrawerEntry> {
    return open(this, transition, focus);
  }

  async close(transition?: boolean, focus?: boolean): Promise<DrawerEntry> {
    return close(this, transition, focus);
  }

  async toggle(transition?: boolean, focus?: boolean): Promise<DrawerEntry> {
    return toggle(this, transition, focus);
  }

  async deregister() {
    return this.parent.deregister(this.id);
  }

  async onCreateEntry() {
    // Set tabindex="-1" so dialog is focusable via JS or click
    if (this.config.get("setTabindex") && this.dialog) {
      this.dialog.setAttribute("tabindex", "-1");
    }

    // Apply the initial state
    await this.applyState();

    // Set the inline state
    this.inlineState = this.state;

    // Set the initial mode
    this.mode =
      this.el && this.el.classList.contains(this.config.get("classModal"))
        ? "modal"
        : "inline";
  }

  async onDestroyEntry() {
    // If entry is a modal and in the opened state, close it
    if (this.mode === "modal" && this.state === "opened") {
      await this.close(false);
    }
  }
}
