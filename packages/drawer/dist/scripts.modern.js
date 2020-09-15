import { breakpoints, hasClass, addClass, removeClass, setInert, setOverflowHidden, FocusTrap, setTabindex, openTransition, focusTarget, closeTransition, focusTrigger } from '@vrembem/core/index';

var defaults = {
  autoInit: false,
  // Data attributes
  dataDrawer: 'drawer',
  dataDialog: 'drawer-dialog',
  dataToggle: 'drawer-toggle',
  dataOpen: 'drawer-open',
  dataClose: 'drawer-close',
  dataBreakpoint: 'drawer-breakpoint',
  dataFocus: 'drawer-focus',
  // State classes
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',
  // Classes
  classModal: 'drawer_modal',
  // Selectors
  selectorInert: null,
  selectorOverflow: null,
  // Feature toggles
  breakpoints: breakpoints,
  customEventPrefix: 'drawer:',
  stateSave: true,
  stateKey: 'DrawerState',
  setTabindex: true,
  transition: true
};

async function switchToModal(drawerKey, obj) {
  // Initial guards
  const drawer = obj.getDrawer(drawerKey);
  if (!drawer) return obj.drawerNotFound(drawerKey);
  if (hasClass(drawer, obj.settings.classModal)) return; // Enable modal state

  addClass(drawer, obj.settings.classModal);
  addClass(drawer, obj.settings.stateClosed);
  removeClass(drawer, obj.settings.stateOpened); // Dispatch custom event

  drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toModal', {
    bubbles: true
  }));
  return drawer;
}
async function switchToDefault(drawerKey, obj) {
  // Initial guards
  const drawer = obj.getDrawer(drawerKey);
  if (!drawer) return obj.drawerNotFound(drawerKey);
  if (!hasClass(drawer, obj.settings.classModal)) return; // Tear down modal state

  setInert(false, obj.settings.selectorInert);
  setOverflowHidden(false, obj.settings.selectorOverflow);
  removeClass(drawer, obj.settings.classModal);
  obj.focusTrap.destroy(); // Restore drawers saved state

  drawerKey = drawer.getAttribute(`data-${obj.settings.dataDrawer}`);
  const drawerState = obj.state[drawerKey];

  if (drawerState == obj.settings.stateOpened) {
    addClass(drawer, obj.settings.stateOpened);
    removeClass(drawer, obj.settings.stateClosed);
  } // Dispatch custom event


  drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toDefault', {
    bubbles: true
  }));
  return drawer;
}

class Breakpoint {
  constructor(parent) {
    this.mediaQueryLists = [];
    this.parent = parent;
    this.__check = this.check.bind(this);
  }

  init() {
    const drawers = document.querySelectorAll(`[data-${this.parent.settings.dataBreakpoint}]`);
    drawers.forEach(drawer => {
      const id = drawer.getAttribute(`data-${this.parent.settings.dataDrawer}`);
      const key = drawer.getAttribute(`data-${this.parent.settings.dataBreakpoint}`);
      const bp = this.parent.settings.breakpoints[key] ? this.parent.settings.breakpoints[key] : key;
      const mql = window.matchMedia('(min-width:' + bp + ')');
      this.match(mql, drawer);
      mql.addListener(this.__check);
      this.mediaQueryLists.push({
        'mql': mql,
        'drawer': id
      });
    });
  }

  destroy() {
    if (this.mediaQueryLists && this.mediaQueryLists.length) {
      this.mediaQueryLists.forEach(item => {
        item.mql.removeListener(this.__check);
      });
    }

    this.mediaQueryLists = null;
  }

  check(event = null) {
    if (this.mediaQueryLists && this.mediaQueryLists.length) {
      this.mediaQueryLists.forEach(item => {
        // If an event is passed, filter out drawers that don't match the query
        // If event is null, run all drawers through match
        let filter = event ? event.media == item.mql.media : true;
        if (!filter) return;
        const drawer = document.querySelector(`[data-${this.parent.settings.dataDrawer}="${item.drawer}"]`);
        if (drawer) this.match(item.mql, drawer);
      });
      document.dispatchEvent(new CustomEvent(this.parent.settings.customEventPrefix + 'breakpoint', {
        bubbles: true
      }));
    }
  }

  match(mql, drawer) {
    if (mql.matches) {
      switchToDefault(drawer, this.parent);
    } else {
      switchToModal(drawer, this.parent);
    }
  }

}

function handlerClick(event) {
  // Working catch
  if (this.working) return; // Toggle data trigger

  let trigger = event.target.closest(`[data-${this.settings.dataToggle}]`);

  if (trigger) {
    const selector = trigger.getAttribute(`data-${this.settings.dataToggle}`);
    this.memory.trigger = trigger;
    this.toggle(selector);
    event.preventDefault();
    return;
  } // Open data trigger


  trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);

  if (trigger) {
    const selector = trigger.getAttribute(`data-${this.settings.dataOpen}`);
    this.memory.trigger = trigger;
    this.open(selector);
    event.preventDefault();
    return;
  } // Close data trigger


  trigger = event.target.closest(`[data-${this.settings.dataClose}]`);

  if (trigger) {
    const selector = trigger.getAttribute(`data-${this.settings.dataClose}`);

    if (selector) {
      this.memory.trigger = trigger;
      this.close(selector);
    } else {
      const target = event.target.closest(`[data-${this.settings.dataDrawer}]`);
      if (target) this.close(target);
    }

    event.preventDefault();
    return;
  } // Screen modal trigger


  if (event.target.hasAttribute(`data-${this.settings.dataDrawer}`)) {
    this.close(event.target);
    return;
  }
}
function handlerKeyup(event) {
  // Working catch
  if (this.working) return;

  if (event.keyCode == 27) {
    const target = document.querySelector(`.${this.settings.classModal}.${this.settings.stateOpened}`);

    if (target) {
      this.close(target);
    }
  }
}

function stateSet(settings) {
  // If save state is disabled
  if (!settings.stateSave) return stateClear(settings); // If there isn't an existing state to set

  if (!localStorage.getItem(settings.stateKey)) return stateSave(null, settings); // Set the existing state

  const state = JSON.parse(localStorage.getItem(settings.stateKey));
  Object.keys(state).forEach(key => {
    const item = document.querySelector(`[data-${settings.dataDrawer}="${key}"]`);
    if (!item) return;
    state[key] == settings.stateOpened ? addClass(item, settings.stateOpened) : removeClass(item, settings.stateOpened);
  });
  return state;
}
function stateSave(target, settings) {
  // If save state is disabled
  if (!settings.stateSave) return stateClear(settings); // Get the currently saved object if it exists

  const state = localStorage.getItem(settings.stateKey) ? JSON.parse(localStorage.getItem(settings.stateKey)) : {}; // Are we saving a single target or the entire suite?

  const drawers = target ? [target] : document.querySelectorAll(`[data-${settings.dataDrawer}]`); // Loop through drawers and save their states

  drawers.forEach(el => {
    if (hasClass(el, settings.classModal)) return;
    const drawerKey = el.getAttribute(`data-${settings.dataDrawer}`);
    state[drawerKey] = hasClass(el, settings.stateOpened) ? settings.stateOpened : settings.stateClosed;
  }); // Save to localStorage and return the state

  localStorage.setItem(settings.stateKey, JSON.stringify(state));
  return state;
}
function stateClear(settings) {
  if (localStorage.getItem(settings.stateKey)) {
    localStorage.removeItem(settings.stateKey);
  }

  return {};
}

class Drawer {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults,
      ...options
    };
    this.working = false;
    this.memory = {};
    this.state = {};
    this.focusTrap = new FocusTrap();
    this.breakpoint = new Breakpoint(this);
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings,
      ...options
    };
    this.stateSet();
    this.setTabindex(this.settings.setTabindex);
    this.breakpoint.init();
    document.addEventListener('click', this.__handlerClick, false);
    document.addEventListener('touchend', this.__handlerClick, false);
    document.addEventListener('keyup', this.__handlerKeyup, false);
  }

  destroy() {
    this.breakpoint.destroy();
    this.memory = {};
    this.state = {};
    localStorage.removeItem(this.settings.stateKey);
    document.removeEventListener('click', this.__handlerClick, false);
    document.removeEventListener('touchend', this.__handlerClick, false);
    document.removeEventListener('keyup', this.__handlerKeyup, false);
  }
  /**
   * Helpers
   */


  getDrawer(drawerKey) {
    if (typeof drawerKey !== 'string') return drawerKey;
    return document.querySelector(`[data-${this.settings.dataDrawer}="${drawerKey}"]`);
  }

  drawerNotFound(key) {
    return Promise.reject(new Error(`Did not find drawer with key: "${key}"`));
  }

  setTabindex(state = true) {
    const selectorTabindex = `
      [data-${this.settings.dataDrawer}]
      [data-${this.settings.dataDialog}]
    `;
    setTabindex(state, selectorTabindex);
  }
  /**
   * Save state functionality
   */


  stateSet() {
    this.state = stateSet(this.settings);
  }

  stateSave(target = null) {
    this.state = stateSave(target, this.settings);
  }

  stateClear() {
    this.state = stateClear(this.settings);
  }
  /**
   * SwitchTo functionality
   */


  switchToDefault(drawerKey) {
    return switchToDefault(drawerKey, this);
  }

  switchToModal(drawerKey) {
    return switchToModal(drawerKey, this);
  }
  /**
   * Change state functionality
   */


  async toggle(drawerKey) {
    const drawer = this.getDrawer(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    const isOpen = hasClass(drawer, this.settings.stateOpened);

    if (!isOpen) {
      return this.open(drawer);
    } else {
      return this.close(drawer);
    }
  }

  async open(drawerKey) {
    const drawer = this.getDrawer(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);

    if (!hasClass(drawer, this.settings.stateOpened)) {
      this.working = true;
      const isModal = hasClass(drawer, this.settings.classModal);

      if (isModal) {
        setOverflowHidden(true, this.settings.selectorOverflow);
      }

      await openTransition(drawer, this.settings);
      this.stateSave(drawer);

      if (isModal) {
        this.focusTrap.init(drawer);
        setInert(true, this.settings.selectorInert);
      }

      focusTarget(drawer, this.settings);
      drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
      this.working = false;
      return drawer;
    } else {
      focusTarget(drawer, this.settings);
      return drawer;
    }
  }

  async close(drawerKey) {
    const drawer = this.getDrawer(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);

    if (hasClass(drawer, this.settings.stateOpened)) {
      this.working = true;

      if (hasClass(drawer, this.settings.classModal)) {
        setInert(false, this.settings.selectorInert);
        setOverflowHidden(false, this.settings.selectorOverflow);
      }

      await closeTransition(drawer, this.settings);
      this.stateSave(drawer);
      focusTrigger(this);
      this.focusTrap.destroy();
      drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
        bubbles: true
      }));
      this.working = false;
      return drawer;
    } else {
      return drawer;
    }
  }

}

export default Drawer;
//# sourceMappingURL=scripts.modern.js.map
