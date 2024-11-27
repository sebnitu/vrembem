import { focusableSelectors } from "../utilities";

export class FocusableArray extends Array {
  constructor(el = null) {
    super();
    this.el = el;
    if (this.el) this.set();
  }

  get first() {
    return this[0];
  }

  get last() {
    return this[this.length - 1];
  }

  set(el = this.el) {
    this.length = 0;
    this.push(...el.querySelectorAll(focusableSelectors.join(",")));
  }

  clear() {
    this.length = 0;
  }
}
