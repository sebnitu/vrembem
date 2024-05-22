function setOverflowHidden(state, selector) {
  if (selector) {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      if (state) {
        el.style.overflow = "hidden";
      } else {
        el.style.removeProperty("overflow");
      }
    });
  }
}

function setInert(state, selector) {
  if (selector) {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      if (state) {
        el.inert = true;
        el.setAttribute("aria-hidden", true);
      } else {
        el.inert = null;
        el.removeAttribute("aria-hidden");
      }
    });
  }
}

export function updateGlobalState(param, config) {
  // Set inert state based on if a modal is active.
  setInert(!!param, config.selectorInert);

  // Set overflow state based on if a modal is active.
  setOverflowHidden(!!param, config.selectorOverflow);
}
