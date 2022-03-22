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

export function getDrawer(drawerKey) {
  if (typeof drawerKey !== 'string') return drawerKey;
  return document.querySelector(
    `[data-${this.settings.dataDrawer}="${drawerKey}"]`
  );
}

export function drawerNotFound(key) {
  return Promise.reject(
    new Error(`Did not find drawer with key: "${key}"`)
  );
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
