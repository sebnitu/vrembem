import { getConfig, teleport, toCamel } from "@vrembem/core";

import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { replace } from "./replace";

export async function register(el, config = {}) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, el, false);

  // Save root this for use inside methods API.
  const root = this;

  // Setup the modal object.
  const entry = {
    id: el.id,
    state: "closed",
    el: el,
    dialog: null,
    get required() {
      return this.dialog.matches(this.getSetting("selectorRequired"));
    },
    returnRef: null,
    settings: config,
    dataConfig: {},
    open(transition, focus) {
      return open.call(root, this, transition, focus);
    },
    close(transition, focus) {
      return close.call(root, this, transition, focus);
    },
    replace(transition, focus) {
      return replace.call(root, this, transition, focus);
    },
    deregister() {
      return deregister.call(root, this);
    },
    teleport(ref = this.getSetting("teleport"), method = this.getSetting("teleportMethod")) {
      if (!this.returnRef) {
        this.returnRef = teleport(this.el, ref, method);
        return this.el;
      } else {
        console.error("Element has already been teleported:", this.el);
        return false;
      }
    },
    teleportReturn() {
      if (this.returnRef) {
        this.returnRef = teleport(this.el, this.returnRef);
        return this.el;
      } else {
        console.error("No return reference found:", this.el);
        return false;
      }
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

  // Set the dialog element. If none is found, use the root element.
  const dialog = el.querySelector(entry.getSetting("selectorDialog"));
  entry.dialog = (dialog) ? dialog : el;

  // Set aria-modal attribute to true.
  entry.dialog.setAttribute("aria-modal", "true");

  // If a role attribute is not set, set it to "dialog" as the default.
  if (!entry.dialog.hasAttribute("role")) {
    entry.dialog.setAttribute("role", "dialog");
  }

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (entry.getSetting("setTabindex")) {
    entry.dialog.setAttribute("tabindex", "-1");
  }

  // Teleport modal if a reference has been set.
  if (entry.getSetting("teleport")) {
    entry.teleport();
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Setup initial state.
  if (entry.el.classList.contains(entry.getSetting("stateOpened"))) {
    // Open entry with transitions disabled.
    await entry.open(false);
  } else {
    // Remove transition state classes.
    entry.el.classList.remove(entry.getSetting("stateOpening"));
    entry.el.classList.remove(entry.getSetting("stateClosing"));
    // Add closed state class.
    entry.el.classList.add(entry.getSetting("stateClosed"));
  }

  // Return the registered entry.
  return entry;
}
