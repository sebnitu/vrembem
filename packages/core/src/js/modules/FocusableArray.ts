import { focusableSelectors } from "../utilities";

export class FocusableArray extends Array<Element> {
  el: Element | null;

  constructor(el: Element | null = null) {
    super();
    this.el = el;
    if (this.el) this.set();
  }

  get first(): Element | undefined {
    return this[0];
  }

  get last(): Element | undefined {
    return this[this.length - 1];
  }

  set(el: Element | null = this.el): void {
    this.length = 0;
    if (el) {
      this.push(...el.querySelectorAll(focusableSelectors.join(",")));
    }
  }

  clear(): void {
    this.length = 0;
  }
}
