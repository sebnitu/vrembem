import { FocusableArray } from "./";

export class FocusTrap {
  el: Element | null;
  focusable: FocusableArray;
  handleFocusTrap: (event: KeyboardEvent) => void;

  constructor(el: Element | null = null) {
    this.el = el;
    this.focusable = new FocusableArray();
    this.handleFocusTrap = handleFocusTrap.bind(this);
  }

  on(el: Element | null = this.el): void {
    // Get the focusable elements
    this.focusable.set(el);

    // Either focus trap or lock depending on focusable length
    this.focusable.length
      ? document.addEventListener("keydown", this.handleFocusTrap)
      : document.addEventListener("keydown", handleFocusLock);
  }

  off(): void {
    // Clear the focusable elements
    this.focusable.clear();

    // Remove event listeners
    document.removeEventListener("keydown", this.handleFocusTrap);
    document.removeEventListener("keydown", handleFocusLock);
  }
}

function handleFocusLock(event: KeyboardEvent): void {
  // Ignore the tab key by preventing default
  if (event.key === "Tab" || event.keyCode === 9) event.preventDefault();
}

function handleFocusTrap(this: FocusTrap, event: KeyboardEvent): void {
  // Check if the key was a tab and return if not
  if (event.key !== "Tab" && event.keyCode !== 9) return;

  // Destructure variables for brevity
  const { activeElement } = document;
  const { el, focusable } = this;

  // Set variables of conditionals
  const isShiftTab = event.shiftKey;
  const isFirstOrRoot =
    activeElement === focusable.first || activeElement === el;
  const isLastOrRoot = activeElement === focusable.last || activeElement === el;

  if ((isShiftTab && isFirstOrRoot) || (!isShiftTab && isLastOrRoot)) {
    event.preventDefault();
    // Loop to next tab focus based on direction (shift)
    const target = isShiftTab ? focusable.last : focusable.first;
    if (target && typeof (target as HTMLElement).focus === "function") {
      (target as HTMLElement).focus();
    }
  }
}
