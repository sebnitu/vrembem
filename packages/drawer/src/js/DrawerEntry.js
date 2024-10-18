import { CollectionEntry } from "@vrembem/core";
import { switchMode } from "./switchMode";

export class DrawerEntry extends CollectionEntry {
  #mode;

  constructor(parent, query, options = {}) {
    super(parent, query, options);
    this.dialog = null;
    this.trigger = null;
    this.state = null;
    this.inlineState = null;
    this.#mode = "indeterminate";
  }

  get mode() {
    return this.#mode;
  }

  set mode(value) {
    if (this.#mode === value) return;
    this.#mode = value;
    switchMode.call(this.parent, this);
  }

  setState(value) {
    this.state = value;

    // If mode is inline and not in a transitioning state...
    const ignoreStates = ["opening", "closing"];
    if (this.mode === "inline" && !ignoreStates.includes(value)) {
      // Save the inline state.
      this.inlineState = value;
    }

    // If state is indeterminate, remove all state classes.
    if (value === "indeterminate") {
      this.el.classList.remove(this.getSetting("stateOpened"));
      this.el.classList.remove(this.getSetting("stateOpening"));
      this.el.classList.remove(this.getSetting("stateClosed"));
      this.el.classList.remove(this.getSetting("stateClosing"));
    }
  }

  async applyState() {
    // Only apply state if mode is not set to "modal".
    if (this.mode === "modal") return;

    // Check the state stored in inline state.
    if (this.inlineState === "opened") {
      return await this.open(false, false);
    }
    if (this.inlineState === "closed") {
      return await this.close(false, false);
    }

    // Determine the state based on the presence of a state class.
    // Handles initial state, the only time this.state should be `null`.
    if (this.state === null) {
      if (this.el.classList.contains(this.getSetting("stateOpened"))) {
        return await this.open(false, false);
      } 
      if (this.el.classList.contains(this.getSetting("stateClosed"))) {
        return await this.close(false, false);
      }
    }

    // If state cannot be determined, set it to indeterminate.
    return this.setState("indeterminate");
  }

  async open(transition, focus) {
    return this.parent.open(this, transition, focus);
  }

  async close(transition, focus) {
    return this.parent.close(this, transition, focus);
  }

  async toggle(transition, focus) {
    return this.parent.toggle(this, transition, focus);
  }

  async deregister() {
    return this.parent.deregister(this.id);
  }

  async onMount() {
    // Set the dialog element. If none is found, use the root element.
    const dialog = this.el.querySelector(this.getSetting("selectorDialog"));
    this.dialog = (dialog) ? dialog : this.el;

    // Set tabindex="-1" so dialog is focusable via JS or click.
    if (this.getSetting("setTabindex")) {
      this.dialog.setAttribute("tabindex", "-1");
    }

    // Apply the initial state.
    await this.applyState();

    // Set the inline state.
    this.inlineState = this.state;

    // Set the initial mode.
    this.mode = (this.el.classList.contains(this.getSetting("classModal"))) ? "modal" : "inline";
  }

  async onUnmount(_, reMount) {
    // If entry is in the opened state, close it.
    if (!reMount && this.state === "opened") {
      await this.close(false);
    }
  }
}
