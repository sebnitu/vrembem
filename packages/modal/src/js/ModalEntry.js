import { CollectionEntry } from "@vrembem/core";

export class ModalEntry extends CollectionEntry {
  constructor(parent, query, options = {}) {
    super(parent, query, options);
    this.state = "closed";
    this.dialog = null;
  }

  get isRequired() {
    return this.dialog.matches(this.getSetting("selectorRequired"));
  }

  async open(transition, focus) {
    return this.parent.open(this, transition, focus);
  }

  async close(transition, focus) {
    return this.parent.close(this, transition, focus);
  }

  async replace(transition, focus) {
    return this.parent.replace(this, transition, focus);
  }

  async deregister() {
    return this.parent.deregister(this.id);
  }

  async onMount() {
    // Set the dialog element. If none is found, use the root element.
    const dialog = this.el.querySelector(this.getSetting("selectorDialog"));
    this.dialog = (dialog) ? dialog : this.el;

    // Set aria-modal attribute to true.
    this.dialog.setAttribute("aria-modal", "true");

    // If a role attribute is not set, set it to "dialog" as the default.
    if (!this.dialog.hasAttribute("role")) {
      this.dialog.setAttribute("role", "dialog");
    }

    // Set tabindex="-1" so dialog is focusable via JS or click.
    if (this.getSetting("setTabindex")) {
      this.dialog.setAttribute("tabindex", "-1");
    }
  }

  async onUnmount(reMount = false) {
    // If entry is in the opened state, close it.
    if (!reMount && this.state === "opened") {
      await this.close(false);
    } else {
      // Remove modal from stack.
      this.parent.stack.remove(this);
    }
  }

  async afterRegister() {
    // Setup initial state.
    if (this.el.classList.contains(this.getSetting("stateOpened"))) {
      // Open entry with transitions disabled.
      await this.open(false);
    } else {
      // Remove transition state classes.
      this.el.classList.remove(this.getSetting("stateOpening"));
      this.el.classList.remove(this.getSetting("stateClosing"));
      // Add closed state class.
      this.el.classList.add(this.getSetting("stateClosed"));
    }
  }
}
