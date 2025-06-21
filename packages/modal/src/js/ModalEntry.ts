import { CollectionEntry } from "@vrembem/core";
import { open } from "./open";
import { close } from "./close";
import { replace } from "./replace";
import type { Modal } from "./Modal";

export class ModalEntry extends CollectionEntry<Modal> {
  state: string;
  dialog: HTMLElement;

  constructor(
    parent: Modal,
    query: string | HTMLElement,
    options: Record<string, any> = {}
  ) {
    super(parent, query, options);
    this.state = "closed";

    // Set the dialog element. If none is found, use the root element
    this.dialog =
      this.el.querySelector(this.getSetting("selectorDialog")) || this.el;
  }

  get isRequired() {
    return this.dialog.matches(this.getSetting("selectorRequired"));
  }

  async open(transition?: boolean, focus?: boolean): Promise<ModalEntry> {
    return open(this, transition, focus);
  }

  async close(transition?: boolean, focus?: boolean): Promise<ModalEntry> {
    return close(this, transition, focus);
  }

  async replace(
    transition?: boolean,
    focus?: boolean
  ): Promise<{ opened: ModalEntry; closed: ModalEntry[] }> {
    return replace(this, transition, focus);
  }

  async deregister() {
    return this.parent.deregister(this.id);
  }

  async onCreateEntry() {
    // Set aria-modal attribute to true
    this.dialog.setAttribute("aria-modal", "true");

    // If a role attribute is not set, set it to "dialog" as the default
    if (!this.dialog.hasAttribute("role")) {
      this.dialog.setAttribute("role", "dialog");
    }

    // Set tabindex="-1" so dialog is focusable via JS or click
    if (this.getSetting("setTabindex")) {
      this.dialog.setAttribute("tabindex", "-1");
    }
  }

  async onRegisterEntry() {
    // Setup initial state
    if (this.el.classList.contains(this.getSetting("stateOpened"))) {
      // Open entry with transitions disabled
      await this.open(false);
    } else {
      // Remove transition state classes
      this.el.classList.remove(this.getSetting("stateOpening"));
      this.el.classList.remove(this.getSetting("stateClosing"));
      // Add closed state class
      this.el.classList.add(this.getSetting("stateClosed"));
    }
  }

  async onDestroyEntry() {
    // If entry is in the opened state, close it
    if (this.state === "opened") {
      await this.close(false);
    }
  }
}
