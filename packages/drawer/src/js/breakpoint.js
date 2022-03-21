export class Breakpoint {
  constructor(parent) {
    this.mediaQueryLists = [];
    this.parent = parent;
    this.prefix = this.getVariablePrefix();
    this.__check = this.check.bind(this);
  }

  init() {
    const drawers = document.querySelectorAll(`[data-${this.parent.settings.dataBreakpoint}]`);
    drawers.forEach((drawer) => {
      // Setup mediaQueryList object
      const id = drawer.getAttribute(`data-${this.parent.settings.dataDrawer}`);
      const key = drawer.getAttribute(`data-${this.parent.settings.dataBreakpoint}`);
      const bp = this.getBreakpoint(key);
      const mql = window.matchMedia('(min-width:' + bp + ')');

      // Run match check
      this.match(mql, drawer);

      // Conditionally use addListner() for IE11 support
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', this.__check);
      } else {
        mql.addListener(this.__check);
      }

      // Push to mediaQueryLists array along with drawer ID
      this.mediaQueryLists.push({
        'mql': mql,
        'drawer': id
      });
    });
  }

  destroy() {
    this.mediaQueryLists.forEach((item) => {
      item.mql.removeListener(this.__check);
    });
    this.mediaQueryLists = [];
  }

  check(event = null) {
    this.mediaQueryLists.forEach((item) => {
      // If an event is passed, filter out drawers that don't match the query
      // If event is null, run all drawers through match
      let filter = (event) ? event.media == item.mql.media : true;
      if (!filter) return;
      const drawer = document.querySelector(
        `[data-${this.parent.settings.dataDrawer}="${item.drawer}"]`
      );
      if (drawer) this.match(item.mql, drawer);
    });
    document.dispatchEvent(new CustomEvent(this.parent.settings.customEventPrefix + 'breakpoint', {
      bubbles: true
    }));
  }

  match(mql, drawer) {
    if (mql.matches) {
      this.parent.switchToDefault(drawer);
    } else {
      this.parent.switchToModal(drawer);
    }
  }

  getBreakpoint(key) {
    let breakpoint = key;
    if (this.parent.settings.breakpoints && this.parent.settings.breakpoints[key]) {
      breakpoint = this.parent.settings.breakpoints[key];
    } else if (getComputedStyle(document.body).getPropertyValue(this.prefix + key)) {
      breakpoint = getComputedStyle(document.body).getPropertyValue(this.prefix + key);
    }
    return breakpoint;
  }

  getVariablePrefix() {
    let prefix = '--';
    prefix += getComputedStyle(document.body).getPropertyValue('--vrembem-variable-prefix');
    prefix += 'breakpoint-';
    return prefix;
  }
}
