import { Entry, Breakpoint } from "@vrembem/core";
import { switchMode } from "./switchMode";
import { applyInitialState } from "./helpers";
import { getBreakpoint } from "./helpers";

export async function register(el, config = {}) {
  // Deregister entry incase it has already been registered.
  await this.deregister(el, false);

  // Save root this for use inside methods API.
  const root = this;

  // Create an instance of the Breakpoint class.
  const breakpoint = new Breakpoint();

  // Setup private variables and their default values if any.
  let _mode, _state = "indeterminate";

  // Create the entry object.
  const entry = new Entry(this, el);

  // Build on the entry object.
  Object.assign(entry, {
    dialog: null,
    trigger: null,
    inlineState: "indeterminate",
    open(transition, focus) {
      return root.open(this, transition, focus);
    },
    close(transition, focus) {
      return root.close(this, transition, focus);
    },
    toggle(transition, focus) {
      return root.toggle(this, transition, focus);
    },
    deregister() {
      return root.deregister(this);
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
    }
  });

  // Create getters and setters.
  Object.defineProperties(entry, Object.getOwnPropertyDescriptors({
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
  }));

  // Build the setting objects.
  entry.applySettings(config);
  entry.getDataConfig();

  // Teleport drawer if a reference has been set.
  if (entry.getSetting("teleport")) {
    entry.teleport();
  }

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
  applyInitialState(entry);

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
