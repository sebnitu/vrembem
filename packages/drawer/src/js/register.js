import { Breakpoint, getConfig, toCamel } from "@vrembem/core";

import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";
import { switchMode } from "./switchMode";
import { applyInitialState } from "./helpers";
import { getBreakpoint } from "./helpers";

export async function register(el, config = {}) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, el, false);

  // Save root this for use inside methods API.
  const root = this;

  // Create an instance of the Breakpoint class.
  const breakpoint = new Breakpoint();

  // Setup private variables and their default values if any.
  let _mode, _state = "indeterminate";

  // Setup the drawer object.
  const entry = {
    id: el.id,
    el: el,
    dialog: null,
    trigger: null,
    settings: config,
    dataConfig: {},
    inlineState: "indeterminate",
    get breakpoint() {
      return getBreakpoint.call(root, el);
    },
    get store() {
      return root.store.get(this.id);
    },
    get mode() {
      return _mode;
    },
    set mode(value) {
      _mode = value;
      switchMode.call(root, this);
    },
    get state() {
      return _state;
    },
    set state(value) {
      _state = value;

      // If mode is inline and not in a transitioning state...
      if (this.mode === "inline" && value != "opening" && value != "closing") {
        // Save the inline state.
        this.inlineState = value;

        // Save the store state if enabled.
        if (this.getSetting("store")) {
          root.store.set(this.id, value);
        }
      }

      // If state is indeterminate, remove the state classes.
      if (value === "indeterminate") {
        this.el.classList.remove(this.getSetting("stateOpened"));
        this.el.classList.remove(this.getSetting("stateOpening"));
        this.el.classList.remove(this.getSetting("stateClosed"));
        this.el.classList.remove(this.getSetting("stateClosing"));
      }
    },
    open(transition, focus) {
      return open.call(root, this, transition, focus);
    },
    close(transition, focus) {
      return close.call(root, this, transition, focus);
    },
    toggle(transition, focus) {
      return toggle.call(root, this, transition, focus);
    },
    deregister() {
      return deregister.call(root, this);
    },
    mountBreakpoint() {
      const value = this.breakpoint;
      const handler = this.handleBreakpoint.bind(this);
      breakpoint.mount(value, handler);
      return this;
    },
    unmountBreakpoint() {
      breakpoint.unmount();
      return this;
    },
    handleBreakpoint(event) {
      const bpMode = (event.matches) ? "inline" : "modal";
      if (this.mode != bpMode) {
        this.mode = bpMode;
      }
      return this;
    },
    refreshDataConfig() {
      this.dataConfig = getConfig(el, this.getSetting("dataConfig"));
      return this.dataConfig;
    },
    getSetting(key) {
      // Store our key in both camel and kebab naming conventions.
      const camel = toCamel(key);

      // Check the data config object.
      if (camel in this.dataConfig) {
        return this.dataConfig[camel];
      }

      // Check the entry settings.
      if (camel in this.settings) {
        return this.settings[camel];
      }

      // Check the root settings.
      if (camel in root.settings) {
        return root.settings[camel];
      }

      // Throw error if setting does not exist.
      throw(new Error(`Modal setting does not exist: ${key}`));
    }
  };

  // Build the configuration objects.
  entry.refreshDataConfig();

  // Add entry to collection.
  this.collection.push(entry);

  // Set the dialog element. If none is found, use the root element.
  const dialog = el.querySelector(entry.getSetting("selectorDialog"));
  entry.dialog = (dialog) ? dialog : el;

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (entry.getSetting("setTabindex")) {
    entry.dialog.setAttribute("tabindex", "-1");
  }

  // Set both the initial state and inline state.
  await applyInitialState(entry);

  // Set the inline state.
  entry.inlineState = entry.state;

  // Set the initial mode.
  entry.mode = (el.classList.contains(entry.getSetting("classModal"))) ? "modal" : "inline";

  // If the entry has a breakpoint, get it mounted.
  if (entry.breakpoint) {
    entry.mountBreakpoint();
  }

  // Return the registered entry.
  return entry;
}
