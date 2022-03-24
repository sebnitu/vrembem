import { focusTarget, focusTrigger, setInert, setOverflowHidden } from '@vrembem/core/index';

export function updateGlobalState(param) {
  // Set inert state based on if a modal is active.
  setInert(!!param, this.settings.selectorInert);

  // Set overflow state based on if a modal is active.
  setOverflowHidden(!!param, this.settings.selectorOverflow);
}

export function updateFocusState(entry) {
  // Check if there's an active modal
  if (entry.state === 'opened') {
    // Set focus and init focus trap on active modal.
    focusTarget(entry.target, this.settings);
    this.focusTrap.init(entry.target);
  } else {
    // Set focus to root trigger and destroy focus trap.
    focusTrigger(this);
    this.focusTrap.destroy();
  }
}

export function getBreakpoint(drawer) {
  const prefix = getVariablePrefix();
  const bp = drawer.getAttribute(`data-${this.settings.dataBreakpoint}`);
  if (this.settings.breakpoints && this.settings.breakpoints[bp]) {
    return this.settings.breakpoints[bp];
  } else if (getComputedStyle(document.body).getPropertyValue(prefix + bp)) {
    return getComputedStyle(document.body).getPropertyValue(prefix + bp);
  } else {
    return bp;
  }
}

export function getVariablePrefix() {
  let prefix = '--';
  prefix += getComputedStyle(document.body).getPropertyValue('--vrembem-variable-prefix');
  prefix += 'breakpoint-';
  return prefix;
}

export function getDrawer(query) {
  // Get the entry from collection.
  const entry = (typeof query === 'string') ? this.get(query) : this.get(query.id);

  // Return entry if it was resolved, otherwise throw error.
  if (entry) {
    return entry;
  } else {
    throw new Error(`Drawer not found in collection with id of "${query}".`);
  }
}

export function getDrawerID(obj) {
  // If it's a string, return the string.
  if (typeof obj === 'string') {
    return obj;
  }

  // If it's an HTML element.
  else if (typeof obj.hasAttribute === 'function') {
    // If it's a drawer open trigger, return data value.
    if (obj.hasAttribute(`data-${this.settings.dataOpen}`)) {
      return obj.getAttribute(`data-${this.settings.dataOpen}`);
    }

    // If it's a drawer close trigger, return data value or false.
    else if (obj.hasAttribute(`data-${this.settings.dataClose}`)) {
      return obj.getAttribute(`data-${this.settings.dataClose}`) || false;
    }

    // If it's a drawer toggle trigger, return data value.
    else if (obj.hasAttribute(`data-${this.settings.dataToggle}`)) {
      return obj.getAttribute(`data-${this.settings.dataToggle}`);
    }

    // If it's a drawer target, return the id.
    else if (obj.closest(this.settings.selectorDrawer)) {
      obj = obj.closest(this.settings.selectorDrawer);
      return obj.id || false;
    }

    // Return false if no id was found.
    else return false;
  }

  // If it has an id property, return its value.
  else if (obj.id) {
    return obj.id;
  }

  // Return false if no id was found.
  else return false;
}

export function getDrawerElements(query) {
  const id = getDrawerID.call(this, query);
  if (id) {
    const target = document.querySelector(`#${id}`);
    const dialog = target ? target.querySelector(this.settings.selectorDialog) : null;

    if (!target && !dialog) {
      return { error: new Error(`No drawer elements found using the ID: "${id}".`) };
    } else if (!dialog) {
      return { error: new Error('Drawer is missing dialog element.') };
    } else {
      return { target, dialog };
    }
  } else {
    return { error: new Error('Could not resolve the drawer ID.') };
  }
}
