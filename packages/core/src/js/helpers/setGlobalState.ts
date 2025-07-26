/**
 * Sets the `overflow` style to `hidden` or removes it based on the state.
 *
 * @param {boolean} state - Whether to set or remove `overflow: hidden`.
 * @param {string} selector - A CSS selector to query the elements.
 */
function setOverflowHidden(state: boolean, selector: string): void {
  if (selector) {
    const els = document.querySelectorAll<HTMLElement>(selector);
    els.forEach((el) => {
      if (state) {
        el.style.overflow = "hidden";
      } else {
        el.style.removeProperty("overflow");
      }
    });
  }
}

/**
 * Sets the `inert` attributes on elements based on the state.
 *
 * @param {boolean} state - Whether to set or remove `inert`.
 * @param {string} selector - A CSS selector to query the elements.
 */
function setInert(state: boolean, selector: string): void {
  if (selector) {
    const els = document.querySelectorAll<HTMLElement>(selector);
    els.forEach((el) => {
      (el as HTMLElement & { inert?: boolean }).inert = state;
    });
  }
}

/**
 * Updates the global state by setting `inert` and `overflow` styles on
 * specified elements.
 *
 * @param {boolean} state - The global state to toggle.
 * @param {string} selectorInert - The CSS selector for elements to toggle
 *   `inert` attribute.
 * @param {string} selectorOverflow - The CSS selector for elements to toggle
 *   `overflow: hidden` styles.
 */
export function setGlobalState(
  state: boolean,
  selectorInert: string,
  selectorOverflow: string
): void {
  setInert(!!state, selectorInert);
  setOverflowHidden(!!state, selectorOverflow);
}
