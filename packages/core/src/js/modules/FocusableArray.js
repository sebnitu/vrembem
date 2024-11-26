import { focusableSelectors } from "../utilities";

export class FocusableArray extends Array {
  constructor(el) {
    super(...Array.from(el.querySelectorAll(focusableSelectors.join(","))));
  }

  get first() {
    return this[0];
  }

  get last() {
    return this[this.length - 1];
  }
}
