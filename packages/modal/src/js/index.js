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
    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);

    // Setup stack module.
    this.stack = stack(this.settings);
  }

  get active() {
    return this.stack.top;
  }

  async open(id, transition, focus) {
    return open.call(this, id, transition, focus);
  }

  async close(id, transition, focus) {
    return close.call(this, id, transition, focus);
  }

  async replace(id, transition, focus) {
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

  async beforeRegister(entry, config) {
    return register.call(this, entry, config);
  }

  async beforeDeregister(entry) {
    return deregister.call(this, entry);
  }

  async afterMount() {
    document.addEventListener("click", this.#handleClick, false);
    document.addEventListener("keydown", this.#handleKeydown, false);
  }

  async beforeUnmount() {
    this.trigger = null;
  }

  async afterUnmount() {
    document.removeEventListener("click", this.#handleClick, false);
    document.removeEventListener("keydown", this.#handleKeydown, false);
  }
}
