export class Breakpoint {
  #handler;

  constructor(value, handler) {
    this.value = value;
    this.#handler = handler;
    this.mql = null;
  }

  get handler() {
    return this.#handler;
  }

  // Unmount existing handler before setting a new one.
  set handler(func) {
    if (this.mql) {
      this.mql.removeEventListener("change", this.#handler);
    }
    this.#handler = func;
  }

  mount(value, handler) {
    // Update passed params.
    if (value) this.value = value;
    if (handler) this.#handler = handler;

    // Guard if no breakpoint was set.
    if (!this.value) return this;

    // Setup and store the MediaQueryList instance.
    this.mql = window.matchMedia(`(min-width: ${this.value})`);

    // Add event listener.
    this.mql.addEventListener("change", this.#handler);

    // Run the handler.
    this.#handler(this.mql);

    return this;
  }

  unmount() {
    // Guard if no MediaQueryList instance exists.
    if (!this.mql) return this;

    // Add event listener.
    this.mql.removeEventListener("change", this.#handler);

    // Set value, handler and MediaQueryList to null.
    this.value = null;
    this.#handler = null;
    this.mql = null;

    return this;
  }
}
