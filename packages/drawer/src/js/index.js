import { Collection, FocusTrap, localStore } from "@vrembem/core";

import defaults from "./defaults";
import { handleClick, handleKeydown } from "./handlers";
import { register } from "./register";
import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";

export default class Drawer extends Collection {
  #handleClick;
  #handleKeydown;

  constructor(options) {
    super({ ...defaults, ...options});
    this.focusTrap = new FocusTrap();

    // Setup local store for inline drawer state management.
    this.store = localStore(this.settings.storeKey, this.settings.store);

    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get activeModal() {
    return this.collection.find((entry) => {
      return entry.state === "opened" && entry.mode === "modal";
    });
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

  register(query, config = {}) {
    let el = (typeof query == "string") ?
      document.getElementById(query) : query;
    return (el) ?
      register.call(this, el, config) :
      Promise.reject(new Error(`Failed to register; drawer not found with ID of: "${query.id || query}".`));
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

  toggle(id, transition, focus) {
    return toggle.call(this, id, transition, focus);
  }
}
