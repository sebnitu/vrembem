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
    this.target.querySelectorAll(`
      a[href]:not([disabled]),
      button:not([disabled]),
      textarea:not([disabled]),
      input[type="text"]:not([disabled]),
      input[type="radio"]:not([disabled]),
      input[type="checkbox"]:not([disabled]),
      select:not([disabled]),
      [tabindex]:not([tabindex="-1"])
    `).forEach(el => {
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

var defaults = {
  autoInit: false,
  // Data attributes
  dataModal: 'modal',
  dataDialog: 'modal-dialog',
  dataOpen: 'modal-open',
  dataClose: 'modal-close',
  dataFocus: 'modal-focus',
  dataRequired: 'modal-required',
  // State classes
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',
  // Selector
  selectorInert: null,
  selectorOverflow: 'body',
  // Feature toggles
  customEventPrefix: 'modal:',
  moveModals: {
    ref: null,
    type: null
  },
  setTabindex: true,
  transition: true
};

async function handlerClick(event) {
  // Working catch
  if (this.working) return; // Trigger click

  const trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);

  if (trigger) {
    event.preventDefault();
    const modalKey = trigger.getAttribute(`data-${this.settings.dataOpen}`);
    const fromModal = event.target.closest(`[data-${this.settings.dataModal}]`);
    if (!fromModal) this.memory.trigger = trigger;
    await this.close(!fromModal);
    this.open(modalKey);
    return;
  } // Close click


  if (event.target.closest(`[data-${this.settings.dataClose}]`)) {
    event.preventDefault();
    this.close();
    return;
  } // Root click


  if (event.target.hasAttribute(`data-${this.settings.dataModal}`) && !event.target.hasAttribute(`data-${this.settings.dataRequired}`)) {
    this.close();
    return;
  }
}
function handlerKeyup(event) {
  // Working catch
  if (this.working) return;

  if (event.key === 'Escape' || event.keyCode === 27) {
    const target = document.querySelector(`[data-${this.settings.dataModal}].${this.settings.stateOpened}`);

    if (target && !target.hasAttribute(`data-${this.settings.dataRequired}`)) {
      this.close();
    }
  }
}

function setInitialState(obj) {
  const modals = document.querySelectorAll(`[data-${obj.settings.dataModal}]`);
  modals.forEach(el => {
    if (el.classList.contains(obj.settings.stateOpened)) {
      setInert(false, obj.settings.selectorInert);
      setOverflowHidden(false, obj.settings.selectorOverflow);
      focusTrigger(obj);
      obj.focusTrap.destroy();
    }

    removeClass(el, obj.settings.stateOpened, obj.settings.stateOpening, obj.settings.stateClosing);
    addClass(el, obj.settings.stateClosed);
  });
}

class Modal {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults,
      ...options
    };
    this.working = false;
    this.memory = {};
    this.focusTrap = new FocusTrap();
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings,
      ...options
    };
    this.moveModals();
    this.setTabindex(this.settings.setTabindex);
    this.setInitialState();
    document.addEventListener('click', this.__handlerClick, false);
    document.addEventListener('touchend', this.__handlerClick, false);
    document.addEventListener('keyup', this.__handlerKeyup, false);
  }

  destroy() {
    this.memory = {};
    document.removeEventListener('click', this.__handlerClick, false);
    document.removeEventListener('touchend', this.__handlerClick, false);
    document.removeEventListener('keyup', this.__handlerKeyup, false);
  }
  /**
   * Helpers
   */


  getModal(modalKey) {
    if (typeof modalKey !== 'string') return modalKey;
    return document.querySelector(`[data-${this.settings.dataModal}="${modalKey}"]`);
  }

  modalNotFound(key) {
    return Promise.reject(new Error(`Did not find modal with key: "${key}"`));
  }

  setTabindex(state = true) {
    const selectorTabindex = `
      [data-${this.settings.dataModal}]
      [data-${this.settings.dataDialog}]
    `;
    setTabindex(state, selectorTabindex);
  }

  setInitialState() {
    setInitialState(this);
  }

  moveModals(type = this.settings.moveModals.type, ref = this.settings.moveModals.ref) {
    const modals = document.querySelectorAll(`[data-${this.settings.dataModal}]`);
    if (modals.length) moveElement(modals, type, ref);
  }
  /**
   * Change state functionality
   */


  async open(modalKey) {
    const modal = this.getModal(modalKey);
    if (!modal) return this.modalNotFound(modalKey);

    if (hasClass(modal, this.settings.stateClosed)) {
      this.working = true;
      setOverflowHidden(true, this.settings.selectorOverflow);
      await openTransition(modal, this.settings);
      this.focusTrap.init(modal);
      focusTarget(modal, this.settings);
      setInert(true, this.settings.selectorInert);
      modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
      this.working = false;
      return modal;
    } else {
      return modal;
    }
  }

  async close(returnFocus = true) {
    const modal = document.querySelector(`[data-${this.settings.dataModal}].${this.settings.stateOpened}`);

    if (modal) {
      this.working = true;
      setInert(false, this.settings.selectorInert);
      setOverflowHidden(false, this.settings.selectorOverflow);
      await closeTransition(modal, this.settings);
      if (returnFocus) focusTrigger(this);
      this.focusTrap.destroy();
      modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
        bubbles: true
      }));
      this.working = false;
      return modal;
    } else {
      return modal;
    }
  }

}

export default Modal;
//# sourceMappingURL=scripts.modern.js.map
