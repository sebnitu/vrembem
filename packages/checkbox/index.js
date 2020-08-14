export default class Checkbox {
  constructor(options) {
    this.defaults = {
      autoInit: false,
      stateAttr: 'aria-checked',
      stateValue: 'mixed'
    };
    this.settings = { ...this.defaults, ...options };
    this.settings.selector =
      `[${this.settings.stateAttr}="${this.settings.stateValue}"]`;
    this.handlerClick = this.handlerClick.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init() {
    let mixed = document.querySelectorAll(this.settings.selector);
    this.setIndeterminate(mixed);
    document.addEventListener('click', this.handlerClick, false);
  }

  destroy() {
    document.removeEventListener('click', this.handlerClick, false);
  }

  handlerClick(event) {
    let el = event.target.closest(this.settings.selector);
    if (el) {
      this.removeAriaState(el);
      this.setIndeterminate(el);
    }
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
