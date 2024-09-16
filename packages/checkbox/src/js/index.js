import defaults from "./defaults";

export default class Checkbox {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.__handlerClick = this.handlerClick.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };
    const selector = `[${this.settings.stateAttr}="${this.settings.stateValue}"]`;
    const mixed = document.querySelectorAll(selector);
    this.setIndeterminate(mixed);
    document.addEventListener("click", this.__handlerClick, false);
  }

  destroy() {
    document.removeEventListener("click", this.__handlerClick, false);
  }

  handlerClick(event) {
    const selector = `[${this.settings.stateAttr}="${this.settings.stateValue}"]`;
    const el = event.target.closest(selector);
    if (!el) return;
    this.removeAriaState(el);
    this.setIndeterminate(el);
  }

  setAriaState(el, value = this.settings.stateValue) {
    el = (el.forEach) ? el : [el];
    el.forEach((el) => {
      el.setAttribute(this.settings.stateAttr, value);
    });
  }

  removeAriaState(el) {
    el = (el.forEach) ? el : [el];
    el.forEach((el) => {
      el.removeAttribute(this.settings.stateAttr);
    });
  }

  setIndeterminate(el) {
    el = (el.forEach) ? el : [el];
    el.forEach((el) => {
      if (el.hasAttribute(this.settings.stateAttr)) {
        el.indeterminate = true;
      } else {
        el.indeterminate = false;
      }
    });
  }
}
