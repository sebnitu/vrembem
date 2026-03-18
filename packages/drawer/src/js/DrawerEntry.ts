import { CollectionEntry, _ } from "@vrembem/core";
import { switchMode } from "./switchMode";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";
import { validate } from "./helpers/validate";
import type { Drawer } from "./Drawer";

export class DrawerEntry extends CollectionEntry {
  dialog: HTMLElement;
  trigger: HTMLElement | null;

  constructor(parent: Drawer, query: string | HTMLElement) {
    super(parent, query);

    // Setup initial states of private variables
    _(this, {
      mode: "indeterminate",
      state: "indeterminate",
      inlineState: "indeterminate"
    });

    // Set the dialog element. If none is found, use the root element
    this.dialog =
      this.el.querySelector(this.config.get("selectorDialog")) || this.el;

    // Set the initial state of the trigger element
    this.trigger = null;
  }

  get mode(): string {
    return _(this).mode;
  }

  set mode(value: string) {
    if (_(this).mode === value) return;
    validate("mode", value);
    _(this).mode = value;
    switchMode(this);
  }

  get state(): string {
    return _(this).state;
  }

  set state(value: string) {
    if (_(this).state === value) return;
    validate("state", value);
    _(this).state = value;

    // If mode is inline and not in a transitioning state...
    if (this.mode === "inline" && !["opening", "closing"].includes(value)) {
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

  get inlineState(): string {
    return _(this).inlineState;
  }

  set inlineState(value: string) {
    if (_(this).inlineState === value) return;
    validate("inlineState", value);
    _(this).inlineState = value;

    // Return if the current mode is set to "modal"
    if (this.mode === "modal") return;

    // Apply the inline state
    if (this.inlineState === "opened") {
      this.open(false, false);
    } else if (this.inlineState === "closed") {
      this.close(false, false);
    } else {
      this.state = "indeterminate";
    }
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

  async onCreateEntry() {
    // Set tabindex="-1" so dialog is focusable via JS or click
    if (this.config.get("setTabindex") && this.dialog) {
      this.dialog.setAttribute("tabindex", "-1");
    }

    // Infer the initial state based on state classes
    if (this.el.classList.contains(this.config.get("stateOpened"))) {
      await this.open(false, false);
    } else if (this.el.classList.contains(this.config.get("stateClosed"))) {
      await this.close(false, false);
    } else {
      this.state = "indeterminate";
    }

    // Sync up the inline state with the current state
    this.inlineState = this.state;

    // Set the initial mode based on the modal class
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
