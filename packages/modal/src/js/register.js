import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { replace } from "./replace";

export async function register(el, config = {}) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, el, false);

  // Save root this for use inside methods API.
  const root = this;

  // Create the entry object.
  const entry = this.createEntry(el);

  // Build on the entry object.
  Object.assign(entry, {
    state: "closed",
    dialog: null,
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
    }
  });

  // Create getters and setters.
  Object.defineProperties(entry, Object.getOwnPropertyDescriptors({
    get isRequired() {
      return this.dialog.matches(this.getSetting("selectorRequired"));
    },
  }));

  // Build the setting objects.
  entry.applySettings(config);
  entry.getDataConfig();

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
