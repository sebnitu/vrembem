export const setInert = (state, selector) => {
  if (selector) {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      if (state) {
        el.inert = true;
        el.setAttribute('aria-hidden', true);
      } else {
        el.inert = null;
        el.removeAttribute('aria-hidden');
      }
    });
  }
};

export const setOverflowHidden = (state, selector) => {
  if (selector) {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      if (state) {
        el.style.overflow = 'hidden';
      } else {
        el.style.removeProperty('overflow');
      }
    });
  }
};

export const setTabindex = (state, selector) => {
  if (selector) {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      if (state) {
        el.setAttribute('tabindex', '-1');
      } else {
        el.removeAttribute('tabindex');
      }
    });
  }
};
