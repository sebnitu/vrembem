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

// TODO: This needs to be updated
export function updateGlobalState(state, selectorInert, selectorOverflow) {
  setInert(!!state, selectorInert);
  setOverflowHidden(!!state, selectorOverflow);
}
