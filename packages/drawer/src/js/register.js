import { Breakpoint, getConfig } from "@vrembem/core/index";

import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";
import { switchMode } from "./switchMode";
import { initialState } from "./helpers/initialState";
import { getBreakpoint } from "./helpers";

export async function register(el, dialog) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, el, false);

  // Save root this for use inside methods API.
  const root = this;

  // Create an instance of the Breakpoint class.
  const breakpoint = new Breakpoint();

  // Setup methods API.
  const methods = {
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
      this.mode = (event.matches) ? "inline" : "modal";
      return this;
    },
    getSetting(key) {
      return (key in this.settings) ? this.settings[key] : root.settings[key];
    }
  };

  // Setup the drawer object.
  const entry = {
    id: el.id,
    el: el,
    dialog: dialog,
    trigger: null,
    settings: getConfig(el, this.settings.dataConfig),
    get breakpoint() {
      return getBreakpoint.call(root, el);
    },
    get state() {
      return __state;
    },
    set state(value) {
      __state = value;
      // Save 'opened' and 'closed' states to store if mode is inline.
      if (value === "opened" || value === "closed") {
        if (this.mode === "inline") root.store.set(this.id, this.state);
      }
    },
    get mode() {
      return __mode;
    },
    set mode(value) {
      __mode = value;
      switchMode.call(root, this);
    },
    ...methods
  };

  // Create the state var with the initial state.
  let __state = (el.classList.contains(entry.getSetting("stateOpened"))) ? "opened" : "closed";

  // Create the mode var with the initial mode.
  let __mode = (el.classList.contains(entry.getSetting("classModal"))) ? "modal" : "inline";

  // Setup mode specific attributes.
  if (entry.mode === "modal") {
    // Set aria-modal attribute to true.
    entry.dialog.setAttribute("aria-modal", "true");
  } else {
    // Remove the aria-modal attribute.
    entry.dialog.removeAttribute("aria-modal");
  }

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (entry.getSetting("setTabindex")) {
    entry.dialog.setAttribute("tabindex", "-1");
  }

  // Add entry to collection.
  this.collection.push(entry);

  // If the entry has a breakpoint...
  if (entry.breakpoint) {
    // Mount media query breakpoint functionality.
    entry.mountBreakpoint();
  } else {
    // Else, Setup initial state.
    await initialState.call(this, entry);
  }

  // Return the registered entry.
  return entry;
}
