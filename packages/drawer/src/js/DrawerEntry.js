import { CollectionEntry, Breakpoint } from "@vrembem/core";
import { switchMode } from "./switchMode";
import { applyInitialState } from "./helpers";
import { getBreakpoint } from "./helpers";

export class DrawerEntry extends CollectionEntry {
  #mode;
  #state;
  #breakpoint;

  constructor(context, query, options = {}) {
    super(context, query, options);
    this.dialog = null;
    this.trigger = null;
    // Create an instance of the Breakpoint class.
    this.#breakpoint = new Breakpoint();
    // Set indeterminate values of mode, state and inlineState.
    this.#mode, this.#state, this.inlineState = "indeterminate";
  }

  get breakpoint() {
    return getBreakpoint.call(this.context, this.el);
  }

  get store() {
    return this.context.store.get(this.id);
  }

  get mode() {
    return this.#mode;
  }

  set mode(value) {
    this.#mode = value;
    switchMode.call(this.context, this);
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
        this.context.store.set(this.id, value);
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
    return this.context.open(this, transition, focus);
  }

  async close(transition, focus) {
    return this.context.close(this, transition, focus);
  }

  async toggle(transition, focus) {
    return this.context.toggle(this, transition, focus);
  }

  async deregister() {
    return this.context.deregister(this.id);
  }

  mountBreakpoint() {
    const value = this.breakpoint;
    const handler = this.handleBreakpoint.bind(this);
    this.#breakpoint.mount(value, handler);
  }

  unmountBreakpoint() {
    this.#breakpoint.unmount();
  }

  handleBreakpoint(event) {
    const bpMode = (event.matches) ? "inline" : "modal";
    if (this.mode != bpMode) {
      this.mode = bpMode;
    }
  }

  async beforeMount() {
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

    if (this.breakpoint) {
      this.mountBreakpoint();
    }
  }

  async beforeUnmount(close = true) {
    // If entry is in the opened state, close it.
    if (close && this.state === "opened") {
      await this.close(false);
    }

    // Remove entry from local store.
    this.store.set(this.id);

    // Unmount the MatchMedia functionality.
    this.unmountBreakpoint();
  }
}
