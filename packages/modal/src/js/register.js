export async function register(entry, config = {}) {
  // Save root this for use inside methods API.
  const root = this;

  // Build on the entry object.
  Object.assign(entry, {
    state: "closed",
    dialog: null,
    open(transition, focus) {
      return root.open(this, transition, focus);
    },
    close(transition, focus) {
      return root.close(this, transition, focus);
    },
    replace(transition, focus) {
      return root.replace(this, transition, focus);
    },
    deregister() {
      return root.deregister(this);
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
  const dialog = entry.el.querySelector(entry.getSetting("selectorDialog"));
  entry.dialog = (dialog) ? dialog : entry.el;

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
