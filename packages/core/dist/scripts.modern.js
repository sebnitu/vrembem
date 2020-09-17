const setInert = (state, selector) => {
  if (selector) {
    const els = document.querySelectorAll(selector);
    els.forEach(el => {
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
const setOverflowHidden = (state, selector) => {
  if (selector) {
    const els = document.querySelectorAll(selector);
    els.forEach(el => {
      if (state) {
        el.style.overflow = 'hidden';
      } else {
        el.style.removeProperty('overflow');
      }
    });
  }
};
const setTabindex = (state, selector) => {
  if (selector) {
    const els = document.querySelectorAll(selector);
    els.forEach(el => {
      if (state) {
        el.setAttribute('tabindex', '-1');
      } else {
        el.removeAttribute('tabindex');
      }
    });
  }
};

/**
 * Adds a class or classes to an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to add class(es) to
 * @param {String || Array} cl - Class(es) to add
 */
const addClass = (el, ...cl) => {
  el = el.forEach ? el : [el];
  el.forEach(el => {
    el.classList.add(...cl);
  });
};

/**
 * Takes a hyphen cased string and converts it to camel case
 * ---
 * @param {String } str - the string to convert to camel case
 * @returns {Boolean} - returns a camel cased string
 */
const camelCase = str => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

const focusTarget = (target, settings) => {
  const innerFocus = target.querySelector(`[data-${settings.dataFocus}]`);

  if (innerFocus) {
    innerFocus.focus();
  } else {
    const innerElement = target.querySelector('[tabindex="-1"]');
    if (innerElement) innerElement.focus();
  }
};
const focusTrigger = (obj = null) => {
  if (!obj || !obj.memory || !obj.memory.trigger) return;
  obj.memory.trigger.focus();
  obj.memory.trigger = null;
};
class FocusTrap {
  constructor() {
    this.target = null;
    this.__handlerFocusTrap = this.handlerFocusTrap.bind(this);
  }

  init(target) {
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

  handlerFocusTrap(event) {
    const isTab = event.key === 'Tab' || event.keyCode === 9;
    if (!isTab) return;

    if (event.shiftKey) {
      if (document.activeElement === this.focusableFirst || document.activeElement === this.inner) {
        this.focusableLast.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === this.focusableLast || document.activeElement === this.inner) {
        this.focusableFirst.focus();
        event.preventDefault();
      }
    }
  }

  handlerFocusLock(event) {
    const isTab = event.key === 'Tab' || event.keyCode === 9;
    if (isTab) event.preventDefault();
  }

  getFocusable() {
    const focusable = [];
    const initFocus = document.activeElement;
    const initScrollTop = this.inner ? this.inner.scrollTop : 0;
    this.target.querySelectorAll('a[href]:not([disabled]),button:not([disabled]),textarea:not([disabled]),input[type="text"]:not([disabled]),input[type="radio"]:not([disabled]),input[type="checkbox"]:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])').forEach(el => {
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

/**
 * Get an element(s) from a selector or return value if not a string
 * ---
 * @param {String} selector - Selector to query
 * @param {Boolean} single - Whether to return a single or all matches
 */
const getElement = function (selector, single = 0) {
  if (typeof selector != 'string') return selector;
  return single ? document.querySelector(selector) : document.querySelectorAll(selector);
};

/**
 * Checks an element or NodeList whether they contain a class or classes
 * Ref: https://davidwalsh.name/nodelist-array
 * ---
 * @param {Node} el - Element(s) to check class(es) on
 * @param {String || Array} c - Class(es) to check
 * @returns {Boolean} - Returns true if class exists, otherwise false
 */
const hasClass = (el, ...cl) => {
  el = el.forEach ? el : [el];
  el = [].slice.call(el);
  return cl.some(cl => {
    return el.some(el => {
      if (el.classList.contains(cl)) return true;
    });
  });
};

/**
 * Takes a camel cased string and converts it to hyphen case
 * ---
 * @param {String } str - the string to convert to hyphen case
 * @returns {Boolean} - returns a hyphen cased string
 */
const hyphenCase = str => {
  return str.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + '-' + g[1].toLowerCase();
  });
};

/**
 * Moves element(s) in the DOM based on a reference and move type
 * ---
 * @param {String} target - The element(s) to move
 * @param {String} type - Move type can be 'after', 'before', 'append' or 'prepend'
 * @param {String} reference - The reference element the move is relative to
 */

function moveElement(target, type, reference = false) {
  if (reference) {
    const els = getElement(target);
    if (!els.length) throw new Error(`Move target element "${target}" not found!`);
    const ref = getElement(reference, 1);
    if (!ref) throw new Error(`Move reference element "${reference}" not found!`);
    els.forEach(el => {
      switch (type) {
        case 'after':
          ref.after(el);
          return {
            ref,
            el,
            type
          };

        case 'before':
          ref.before(el);
          return {
            ref,
            el,
            type
          };

        case 'append':
          ref.append(el);
          return {
            ref,
            el,
            type
          };

        case 'prepend':
          ref.prepend(el);
          return {
            ref,
            el,
            type
          };

        default:
          throw new Error(`Move type "${type}" does not exist!`);
      }
    });
  }
}

/**
 * Remove a class or classes from an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to remove class(es) from
 * @param {String || Array} cl - Class(es) to remove
 */
const removeClass = (el, ...cl) => {
  el = el.forEach ? el : [el];
  el.forEach(el => {
    el.classList.remove(...cl);
  });
};

/**
 * Toggle a class or classes on an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to toggle class(es) on
 * @param {String || Array} cl - Class(es) to toggle
 */
const toggleClass = (el, ...cl) => {
  el = el.forEach ? el : [el];
  el.forEach(el => {
    cl.forEach(cl => {
      el.classList.toggle(cl);
    });
  });
};

const openTransition = (el, settings) => {
  return new Promise(resolve => {
    if (settings.transition) {
      el.classList.remove(settings.stateClosed);
      el.classList.add(settings.stateOpening);
      el.addEventListener('transitionend', function _f() {
        el.classList.add(settings.stateOpened);
        el.classList.remove(settings.stateOpening);
        resolve(el);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      el.classList.add(settings.stateOpened);
      el.classList.remove(settings.stateClosed);
      resolve(el);
    }
  });
};
const closeTransition = (el, settings) => {
  return new Promise(resolve => {
    if (settings.transition) {
      el.classList.add(settings.stateClosing);
      el.classList.remove(settings.stateOpened);
      el.addEventListener('transitionend', function _f() {
        el.classList.remove(settings.stateClosing);
        el.classList.add(settings.stateClosed);
        resolve(el);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      el.classList.add(settings.stateClosed);
      el.classList.remove(settings.stateOpened);
      resolve(el);
    }
  });
};

const breakpoints = {
  xs: '480px',
  sm: '620px',
  md: '760px',
  lg: '990px',
  xl: '1380px'
};

export { FocusTrap, addClass, breakpoints, camelCase, closeTransition, focusTarget, focusTrigger, getElement, hasClass, hyphenCase, moveElement, openTransition, removeClass, setInert, setOverflowHidden, setTabindex, toggleClass };
//# sourceMappingURL=scripts.modern.js.map
