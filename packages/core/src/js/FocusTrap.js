import focusableSelectors from 'focusable-selectors';

export const focusTarget = (target, settings) => {
  const innerFocus = target.querySelector(settings.selectorFocus);
  if (innerFocus) {
    innerFocus.focus();
  } else {
    const innerElement = target.querySelector('[tabindex="-1"]');
    if (innerElement) innerElement.focus();
  }
};

export class FocusTrap {
  constructor() {
    this.target = null;
    this.__handlerFocusTrap = this.handlerFocusTrap.bind(this);
  }

  init(target) {
    this.destroy();
    this.target = target;
    this.inner = this.target.querySelector('[tabindex="-1"]');
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
    this.inner = null;
    this.focusable = null;
    this.focusableFirst = null;
    this.focusableLast = null;
    this.target.removeEventListener('keydown', this.__handlerFocusTrap);
    this.target.removeEventListener('keydown', this.handlerFocusLock);
    this.target = null;
  }

  refresh() {
    // Check if a target has been set
    if (!this.target) return;

    // Remove existing  events
    this.target.removeEventListener('keydown', this.__handlerFocusTrap);
    this.target.removeEventListener('keydown', this.handlerFocusLock);

    // Get the focusable elements
    this.focusable = this.getFocusable();

    // Setup the focus handlers based on focusable length
    if (this.focusable.length) {
      // If there are focusable elements, setup focus trap
      this.focusableFirst = this.focusable[0];
      this.focusableLast = this.focusable[this.focusable.length - 1];
      this.target.addEventListener('keydown', this.__handlerFocusTrap);
    } else {
      // If there are no focusable elements, setup focus lock
      this.focusableFirst = null;
      this.focusableLast = null;
      this.target.addEventListener('keydown', this.handlerFocusLock);
    }
  }

  handlerFocusTrap(event) {
    const isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (!isTab) return;
    if (event.shiftKey) {
      if (
        document.activeElement === this.focusableFirst ||
        document.activeElement === this.inner
      ) {
        this.focusableLast.focus();
        event.preventDefault();
      }
    } else {
      if (
        document.activeElement === this.focusableLast ||
        document.activeElement === this.inner
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
    const initScrollTop = (this.inner) ? this.inner.scrollTop : 0;

    this.target
      .querySelectorAll(focusableSelectors.join(','))
      .forEach((el) => {
        el.focus();
        if (el === document.activeElement) {
          focusable.push(el);
        }
      });

    if (this.inner) this.inner.scrollTop = initScrollTop;
    initFocus.focus();
    return focusable;
  }
}
