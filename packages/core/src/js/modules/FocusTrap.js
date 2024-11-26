import { focusableSelectors } from "../utilities";

export class FocusTrap {
  #focusable;
  #handleFocusTrap;

  constructor(el = null, selectorFocus = "[data-focus]") {
    this.el = el;
    this.selectorFocus = selectorFocus;
    this.#handleFocusTrap = handleFocusTrap.bind(this);
  }

  get focusable() {
    return this.#focusable;
  }

  set focusable(value) {
    // Update the focusable value.
    this.#focusable = value;

    // Apply event listeners based on new focusable array length.
    if (this.#focusable.length) {
      document.removeEventListener("keydown", handleFocusLock);
      document.addEventListener("keydown", this.#handleFocusTrap);
    } else {
      document.removeEventListener("keydown", this.#handleFocusTrap);
      document.addEventListener("keydown", handleFocusLock);
    }
  }

  get focusableFirst() {
    return this.focusable[0];
  }

  get focusableLast() {
    return this.focusable[this.focusable.length - 1];
  }

  mount(el, selectorFocus) {
    // Update passed params.
    if (el) this.el = el;
    if (selectorFocus) this.selectorFocus = selectorFocus;

    // Get the focusable elements.
    this.focusable = this.getFocusable();

    // Set the focus on the element.
    this.focus();
  }

  unmount() {
    // Set element to null.
    this.el = null;

    // Apply empty array to focusable.
    this.focusable = [];

    // Remove event listeners
    document.removeEventListener("keydown", this.#handleFocusTrap);
    document.removeEventListener("keydown", handleFocusLock);
  }

  focus(el = this.el, selectorFocus = this.selectorFocus) {
    // Query for the focus selector, otherwise return this element.
    const result = el.querySelector(selectorFocus) || el;
    // Give the returned element focus.
    result.focus();
  }

  getFocusable(el = this.el) {
    // Create the focusable array.
    const focusable = [];

    // Store the initial focus and scroll position.
    const initFocus = document.activeElement;
    const initScrollTop = el.scrollTop;

    // Query for all the focusable elements.
    const selector = focusableSelectors.join(",");
    const els = el.querySelectorAll(selector);

    // Loop through all focusable elements.
    els.forEach((el) => {
      // Set them to focus and check 
      el.focus();
      // Test that the element took focus.
      if (document.activeElement === el) {
        // Add element to the focusable array.
        focusable.push(el);
      }
    });

    // Restore the initial scroll position and focus.
    el.scrollTop = initScrollTop;
    initFocus.focus();

    // Return the focusable array.
    return focusable;
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
  const { el, focusableFirst, focusableLast } = this;

  // Set variables of conditionals.
  const isShiftTab = event.shiftKey;
  const isFirstOrRoot = activeElement === focusableFirst || activeElement === el;
  const isLastOrRoot = activeElement === focusableLast || activeElement === el;

  if ((isShiftTab && isFirstOrRoot) || (!isShiftTab && isLastOrRoot)) {
    event.preventDefault();
    // Loop next tab focus based on direction (shift).
    (isShiftTab ? focusableLast : focusableFirst).focus();
  }
}
