export function getDrawer(query) {
  // Get the entry from collection.
  const entry = (typeof query === 'string') ? this.get(query) : this.get(query.id);

  // Return entry if it was resolved, otherwise throw error.
  if (entry) {
    return entry;
  } else {
    throw new Error(`Drawer not found in collection with id of "${query.id || query}".`);
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

    // If it's a drawer element, return the id.
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
    const drawer = document.querySelector(`#${id}`);
    const dialog = drawer ? drawer.querySelector(this.settings.selectorDialog) : null;

    if (!drawer && !dialog) {
      return { error: new Error(`No drawer elements found using the ID: "${id}".`) };
    } else if (!dialog) {
      return { error: new Error('Drawer is missing dialog element.') };
    } else {
      return { drawer, dialog };
    }
  } else {
    return { error: new Error('Could not resolve the drawer ID.') };
  }
}
