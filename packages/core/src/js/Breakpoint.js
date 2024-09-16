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
      // Conditionally use removeListener() for IE11 support.
      if (typeof this.mql.removeEventListener === "function") {
        this.mql.removeEventListener("change", this.#handler);
      } else {
        this.mql.removeListener(this.#handler);
      }
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

    // Conditionally use addListener() for IE11 support.
    if (typeof this.mql.addEventListener === "function") {
      this.mql.addEventListener("change", this.#handler);
    } else {
      this.mql.addListener(this.#handler);
    }

    // Run the handler.
    this.#handler(this.mql);

    return this;
  }

  unmount() {
    // Guard if no MediaQueryList instance exists.
    if (!this.mql) return this;

    // Conditionally use removeListener() for IE11 support.
    if (typeof this.mql.removeEventListener === "function") {
      this.mql.removeEventListener("change", this.#handler);
    } else {
      this.mql.removeListener(this.#handler);
    }

    // Set value, handler and MediaQueryList to null.
    this.value = null;
    this.#handler = null;
    this.mql = null;

    return this;
  }
}
