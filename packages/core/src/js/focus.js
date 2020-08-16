export const focusTarget = (target, settings) => {
  const innerFocus = target.querySelector(
    `[data-${settings.dataFocus}]`
  );
  if (innerFocus) {
    innerFocus.focus();
  } else {
    const innerElement = target.querySelector('[tabindex="-1"]');
    if (innerElement) innerElement.focus();
  }
};

export const focusTrigger = (obj = null) => {
  if (!obj || !obj.memory || !obj.memory.trigger) return;
  obj.memory.trigger.focus();
  obj.memory.trigger = null;
};

export class FocusTrap {
  constructor() {
    this.target = null;
    this.__handlerFocusTrap = this.handlerFocusTrap.bind(this);
  }

  init(target) {
    this.target = target;
    this.focusable = this.getFocusable();
    if (this.focusable.length) {
      this.focusableFirst = this.focusable[0];
      this.focusableLast = this.focusable[this.focusable.length - 1];
      this.target.addEventListener('keydown', this.__handlerFocusTrap);
    } else {
      this.target.addEventListener('keydown', this.handlerFocusLock);
    }
  }

  destroy() {
    if (!this.target) return;
    this.focusable = null;
    this.focusableFirst = null;
    this.focusableLast = null;
    this.target.removeEventListener('keydown', this.__handlerFocusTrap);
    this.target.removeEventListener('keydown', this.handlerFocusLock);
    this.target = null;
  }

  handlerFocusTrap(event) {
    const isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (!isTab) return;
    const innerElement = this.target.querySelector('[tabindex="-1"]');
    if (event.shiftKey) {
      if (
        document.activeElement === this.focusableFirst ||
        document.activeElement === innerElement
      ) {
        this.focusableLast.focus();
        event.preventDefault();
      }
    } else {
      if (
        document.activeElement === this.focusableLast ||
        document.activeElement === innerElement
      ) {
        this.focusableFirst.focus();
        event.preventDefault();
      }
    }
  }

  handlerFocusLock(event) {
    const isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (isTab) event.preventDefault();
  }

  getFocusable() {
    const focusable = [];
    const initFocus = document.activeElement;
    const initScrollTop = this.target.scrollTop;
    this.target.querySelectorAll(`
      a[href]:not([disabled]),
      button:not([disabled]),
      textarea:not([disabled]),
      input[type="text"]:not([disabled]),
      input[type="radio"]:not([disabled]),
      input[type="checkbox"]:not([disabled]),
      select:not([disabled]),
      [tabindex]:not([tabindex="-1"])
    `).forEach((el) => {
      el.focus();
      if (el === document.activeElement) {
        focusable.push(el);
      }
    });
    this.target.scrollTop = initScrollTop;
    initFocus.focus();
    return focusable;
  }
}
