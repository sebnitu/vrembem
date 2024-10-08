import { CollectionEntry } from "@vrembem/core";
import { switchMode } from "./switchMode";
import { applyInitialState } from "./helpers";
import { getBreakpoint } from "./helpers";

export class DrawerEntry extends CollectionEntry {
  #mode;
  #state;

  constructor(parent, query, options = {}) {
    super(parent, query, options);
    this.dialog = null;
    this.trigger = null;
    this.#mode = "indeterminate";
    this.#state = "indeterminate";
    this.inlineState = "indeterminate";
  }

  get breakpoint() {
    return getBreakpoint.call(this.parent, this.el);
  }

  get store() {
    return this.parent.store.get(this.id);
  }

  get mode() {
    return this.#mode;
  }

  set mode(value) {
    if (this.#mode === value) return;
    this.#mode = value;
    switchMode.call(this.parent, this);
  }

  get state() {
    return this.#state;
  }

  set state(value) {
    this.#state = value;

    // If mode is inline and not in a transitioning state...
    if (this.mode === "inline" && value != "opening" && value != "closing") {
      // Save the inline state.
      this.inlineState = value;

      // Save the store state if enabled.
      if (this.getSetting("store")) {
        this.parent.store.set(this.id, value);
      }
    }

    // If state is indeterminate, remove the state classes.
    if (value === "indeterminate") {
      this.el.classList.remove(this.getSetting("stateOpened"));
      this.el.classList.remove(this.getSetting("stateOpening"));
      this.el.classList.remove(this.getSetting("stateClosed"));
      this.el.classList.remove(this.getSetting("stateClosing"));
    }
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

    // Set both the initial state and inline state.
    applyInitialState(this);

    // Set the inline state.
    this.inlineState = this.state;

    // Set the initial mode.
    this.mode = (this.el.classList.contains(this.getSetting("classModal"))) ? "modal" : "inline";
  }

  async onUnmount(reMount) {
    // If entry is in the opened state, close it.
    if (!reMount && this.state === "opened") {
      await this.close(false);
    }

    // Remove entry from local store.
    this.parent.store.set(this.id);
  }
}
