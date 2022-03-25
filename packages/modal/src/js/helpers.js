import { setInert, setOverflowHidden } from '@vrembem/core/index';

export function updateGlobalState() {
  // Set inert state based on if a modal is active.
  setInert(!!this.active, this.settings.selectorInert);

  // Set overflow state based on if a modal is active.
  setOverflowHidden(!!this.active, this.settings.selectorOverflow);

  // Update the z-index of the stack.
  updateStackIndex(this.stack);
}

export function updateFocusState() {
  // Check if there's an active modal
  if (this.active) {
    // Mount the focus trap on the active modal.
    this.focusTrap.mount(this.active.dialog, this.settings.selectorFocus);
  } else {
    // Set focus to root trigger and unmount the focus trap.
    if (this.trigger) {
      this.trigger.focus();
      this.trigger = null;
    }
    this.focusTrap.unmount();
  }
}

export function updateStackIndex(stack) {
  stack.forEach((entry, index) => {
    entry.el.style.zIndex = null;
    const value = getComputedStyle(entry.el)['z-index'];
    entry.el.style.zIndex = parseInt(value) + index + 1;
  });
}

export function getConfig(el) {
  const string = el.getAttribute(`data-${this.settings.dataConfig}`) || '';
  const json = string.replace(/'/g, '"');
  return (json) ? JSON.parse(json) : {};
}

export function getModal(query) {
  // Get the entry from collection.
  const entry = (typeof query === 'string') ? this.get(query) : this.get(query.id);

  // Return entry if it was resolved, otherwise throw error.
  if (entry) {
    return entry;
  } else {
    throw new Error(`Modal not found in collection with id of "${query}".`);
  }
}

export function getModalID(obj) {
  // If it's a string, return the string.
  if (typeof obj === 'string') {
    return obj;
  }

  // If it's an HTML element.
  else if (typeof obj.hasAttribute === 'function') {
    // If it's a modal open trigger, return data value.
    if (obj.hasAttribute(`data-${this.settings.dataOpen}`)) {
      return obj.getAttribute(`data-${this.settings.dataOpen}`);
    }

    // If it's a modal close trigger, return data value or false.
    else if (obj.hasAttribute(`data-${this.settings.dataClose}`)) {
      return obj.getAttribute(`data-${this.settings.dataClose}`) || false;
    }

    // If it's a modal replace trigger, return data value.
    else if (obj.hasAttribute(`data-${this.settings.dataReplace}`)) {
      return obj.getAttribute(`data-${this.settings.dataReplace}`);
    }

    // If it's a modal element, return the id.
    else if (obj.closest(this.settings.selectorModal)) {
      obj = obj.closest(this.settings.selectorModal);
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

export function getModalElements(query) {
  const id = getModalID.call(this, query);
  if (id) {
    const modal = document.querySelector(`#${id}`);
    const dialog = modal ? modal.querySelector(this.settings.selectorDialog) : null;

    if (!modal && !dialog) {
      return { error: new Error(`No modal elements found using the ID: "${id}".`) };
    } else if (!dialog) {
      return { error: new Error('Modal is missing dialog element.') };
    } else {
      return { modal, dialog };
    }
  } else {
    return { error: new Error('Could not resolve the modal ID.') };
  }
}
