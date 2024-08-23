export class FocusTrap {
  #focusable;
  #handleFocusTrap;
  #handleFocusLock;

  constructor(el = null, selectorFocus = "[data-focus]") {
    this.el = el;
    this.selectorFocus = selectorFocus;
    this.#handleFocusTrap = handleFocusTrap.bind(this);
    this.#handleFocusLock = handleFocusLock.bind(this);
  }

  get focusable() {
    return this.#focusable;
  }

  set focusable(value) {
    // Update the focusable value.
    this.#focusable = value;

    // Apply event listeners based on new focusable array length.
    if (this.#focusable.length) {
      document.removeEventListener("keydown", this.#handleFocusLock);
      document.addEventListener("keydown", this.#handleFocusTrap);
    } else {
      document.removeEventListener("keydown", this.#handleFocusTrap);
      document.addEventListener("keydown", this.#handleFocusLock);
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
    document.removeEventListener("keydown", this.#handleFocusLock);
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

    // Query al the focusable elements.
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

// This has been copied over from focusable-selectors package and modified.
// https://github.com/KittyGiraudel/focusable-selectors
const notInert = ':not([inert])'; // Previously `:not([inert]):not([inert] *)`
const notNegTabIndex = ':not([tabindex^="-"])';
const notDisabled = ':not(:disabled)';
const focusableSelectors = [
  `a[href]${notInert}${notNegTabIndex}`,
  `area[href]${notInert}${notNegTabIndex}`,
  `input:not([type="hidden"]):not([type="radio"])${notInert}${notNegTabIndex}${notDisabled}`,
  `input[type="radio"]${notInert}${notNegTabIndex}${notDisabled}`,
  `select${notInert}${notNegTabIndex}${notDisabled}`,
  `textarea${notInert}${notNegTabIndex}${notDisabled}`,
  `button${notInert}${notNegTabIndex}${notDisabled}`,
  `details${notInert} > summary:first-of-type${notNegTabIndex}`,
  `iframe${notInert}${notNegTabIndex}`,
  `audio[controls]${notInert}${notNegTabIndex}`,
  `video[controls]${notInert}${notNegTabIndex}`,
  `[contenteditable]${notInert}${notNegTabIndex}`,
  `[tabindex]${notInert}${notNegTabIndex}`,
];

function handleFocusTrap(event) {
  // Check if the click was a tab and return if not.
  const isTab = (event.key === "Tab" || event.keyCode === 9);
  if (!isTab) return;

  // If the shift key is pressed.
  if (event.shiftKey) {
    // If the active element is either the root el or first focusable.
    if (
      document.activeElement === this.focusableFirst ||
      document.activeElement === this.el
    ) {
      // Prevent default and focus the last focusable element instead.
      event.preventDefault();
      this.focusableLast.focus();
    }
  } else {
    // If the active element is either the root el or last focusable.
    if (
      document.activeElement === this.focusableLast ||
      document.activeElement === this.el
    ) {
      // Prevent default and focus the first focusable element instead.
      event.preventDefault();
      this.focusableFirst.focus();
    }
  }
}

function handleFocusLock(event) {
  // Ignore the tab key by preventing default.
  const isTab = (event.key === "Tab" || event.keyCode === 9);
  if (isTab) event.preventDefault();
}
