import { Collection, FocusTrap } from "@vrembem/core";

import defaults from "./defaults";
import { handleClick, handleKeydown } from "./handlers";
import { register } from "./register";
import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { closeAll } from "./closeAll";
import { replace } from "./replace";
import { stack } from "./stack";
import { updateFocusState } from "./helpers";

export default class Modal extends Collection {
  #handleClick;
  #handleKeydown;

  constructor(options) {
    super({ ...defaults, ...options});
    this.trigger = null;
    this.focusTrap = new FocusTrap();

    // Setup stack module.
    this.stack = stack(this.settings);

    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get active() {
    return this.stack.top;
  }

  async mount(options = {}) {
    // Update settings with passed options.
    super.applySettings(options);

    // Get all the modals.
    const modals = document.querySelectorAll(this.settings.selectorModal);

    // Register the collections array with modal instances.
    await this.registerCollection(modals);

    document.addEventListener("click", this.#handleClick, false);
    document.addEventListener("keydown", this.#handleKeydown, false);

    return this;
  }

  async unmount() {
    // Clear stored trigger.
    this.trigger = null;

    // Remove all entries from the collection.
    await this.deregisterCollection();

    document.removeEventListener("click", this.#handleClick, false);
    document.removeEventListener("keydown", this.#handleKeydown, false);

    return this;
  }

  register(query, config = {}) {
    let el = (typeof query == "string") ?
      document.getElementById(query) : query;
    return (el) ?
      register.call(this, el, config) :
      Promise.reject(new Error(`Failed to register; modal not found with ID of: "${query.id || query}".`));
  }

  deregister(query) {
    return deregister.call(this, query);
  }

  open(id, transition, focus) {
    return open.call(this, id, transition, focus);
  }

  close(id, transition, focus) {
    return close.call(this, id, transition, focus);
  }

  replace(id, transition, focus) {
    return replace.call(this, id, transition, focus);
  }

  async closeAll(exclude = false, transition, focus = true) {
    const result = await closeAll.call(this, exclude, transition);
    // Update focus if the focus param is true.
    if (focus) {
      updateFocusState.call(this);
    }
    return result;
  }
}
