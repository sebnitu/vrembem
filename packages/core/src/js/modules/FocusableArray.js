import { focusableSelectors } from "../utilities";

export class FocusableArray extends Array {
  constructor(el = null) {
    super();
    if (el) this.set(el);
  }

  get first() {
    return this[0];
  }

  get last() {
    return this[this.length - 1];
  }

  set(el) {
    this.length = 0;
    this.push(...el.querySelectorAll(focusableSelectors.join(",")));
  }

  clear() {
    this.length = 0;
  }
}
