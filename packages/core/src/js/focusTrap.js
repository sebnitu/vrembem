export default class FocusTrap {
  constructor() {
    this.target = null;
    this.handlerFocusTrapRef = this.handlerFocusTrap.bind(this);
  }

  init(target) {
    this.target = target;
    this.focusable = this.getFocusable();
    if (this.focusable.length) {
      this.focusableFirst = this.focusable[0];
      this.focusableLast = this.focusable[this.focusable.length - 1];
      this.target.addEventListener('keydown', this.handlerFocusTrapRef);
    } else {
      this.target.addEventListener('keydown', this.handlerFocusLock);
    }
  }

  destroy() {
    if (this.target) {
      this.focusable = null;
      this.focusableFirst = null;
      this.focusableLast = null;
      this.target.removeEventListener('keydown', this.handlerFocusTrapRef);
      this.target.removeEventListener('keydown', this.handlerFocusLock);
    }
  }

  handlerFocusTrap(event) {
    const isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (!isTab) return;

    if (event.shiftKey) {
      const innerElement = this.target.querySelector('[tabindex="-1"]');
      if (
        document.activeElement === this.focusableFirst ||
        document.activeElement === innerElement
      ) {
        this.focusableLast.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === this.focusableLast) {
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
    const scrollPos = this.target.scrollTop;
    const items = this.target.querySelectorAll(`
      a[href]:not([disabled]),
      button:not([disabled]),
      textarea:not([disabled]),
      input[type="text"]:not([disabled]),
      input[type="radio"]:not([disabled]),
      input[type="checkbox"]:not([disabled]),
      select:not([disabled]),
      [tabindex]:not([tabindex="-1"])
    `);
    items.forEach((el) => {
      el.focus();
      if (el === document.activeElement) {
        focusable.push(el);
      }
    });
    this.target.scrollTop = scrollPos;
    return focusable;
  }
}
