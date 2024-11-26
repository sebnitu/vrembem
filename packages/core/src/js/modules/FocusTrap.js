import { FocusableArray } from "./";

export class FocusTrap {
  constructor(el = null, selectorFocus = "[data-focus]") {
    this.el = el;
    this.selectorFocus = selectorFocus;
    this.handleFocusTrap = handleFocusTrap.bind(this);
  }

  mount(el = this.el, selectorFocus = this.selectorFocus) {
    // Get the focusable elements.
    this.focusable = new FocusableArray(el);

    // Either focus trap or lock depending on focusable length.
    (this.focusable.length) ?
      document.addEventListener("keydown", this.handleFocusTrap):
      document.addEventListener("keydown", handleFocusLock);

    // Set focus on the initial element.
    (el.querySelector(selectorFocus) || el).focus();
  }

  unmount() {
    // Set element to null.
    this.el = null;

    // Apply empty array to focusable.
    this.focusable = [];

    // Remove event listeners
    document.removeEventListener("keydown", this.handleFocusTrap);
    document.removeEventListener("keydown", handleFocusLock);
  }
}

function handleFocusLock(event) {
  // Ignore the tab key by preventing default.
  if (event.key === "Tab" || event.keyCode === 9) event.preventDefault();
}

function handleFocusTrap(event) {  
  // Check if the click was a tab and return if not.
  if (event.key !== "Tab" && event.keyCode !== 9) return;

  // Destructure variables for brevity.
  const { activeElement } = document;
  const { el, focusable } = this;

  // Set variables of conditionals.
  const isShiftTab = event.shiftKey;
  const isFirstOrRoot = activeElement === focusable.first || activeElement === el;
  const isLastOrRoot = activeElement === focusable.last || activeElement === el;

  if ((isShiftTab && isFirstOrRoot) || (!isShiftTab && isLastOrRoot)) {
    event.preventDefault();
    // Loop next tab focus based on direction (shift).
    (isShiftTab ? focusable.last : focusable.first).focus();
  }
}
