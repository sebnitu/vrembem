import { Entry } from "@vrembem/core";

export class ModalEntry extends Entry {
  constructor(context, query) {
    super(context, query);
    this.state = "closed";
    this.dialog = null;
  }

  get isRequired() {
    return this.dialog.matches(this.getSetting("selectorRequired"));
  }

  async beforeMount() {
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

  async beforeUnmount(close = true) {
    // If entry is in the opened state, close it.
    if (close && this.state === "opened") {
      await this.close(false);
    } else {
      // Remove modal from stack.
      this.stack.remove(this);
    }
  }

  async open(transition, focus) {
    return this.context.open(this, transition, focus);
  }

  async close(transition, focus) {
    return this.context.close(this, transition, focus);
  }

  async replace(transition, focus) {
    return this.context.replace(this, transition, focus);
  }

  async deregister() {
    return this.context.deregister(this.id);
  }
}
