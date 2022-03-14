import { focusTarget, focusTrigger, setInert, setOverflowHidden } from '@vrembem/core/index';

export function updateGlobalState(trigger) {
  // Get the modal at the top of the stack.
  const next = this.stack[this.stack.length - 1];

  // Set inert state.
  setInert(!!next, this.settings.selectorInert);

  // Set overflow state.
  setOverflowHidden(!!next, this.settings.selectorOverflow);

  // Update the z-index of the stack.
  updateStackIndex(this.stack);

  // Update focus.
  updateFocus.call(this, trigger);

  // If nothing is open or opening, destroy any active focus trap.
  if (next) {
    // Initialize the focus trap.
    this.focusTrap.init(next.target);
  } else {
    this.focusTrap.destroy();
  }
}

export function updateFocus(trigger) {
  // Get the modal at the top of the stack.
  const next = this.stack[this.stack.length - 1];
  if (next) {
    // Get the parent modal of the modal trigger.
    const parent = (trigger) ? trigger.closest(this.settings.selectorModal) : null;
    const parentModal = this.get(parent, 'target');

    // Set focus to the trigger if parent is opened, otherwise focus target.
    if (trigger && parentModal && parentModal.state === 'opened') {
      trigger.focus();
    } else {
      focusTarget(next.target, this.settings);
    }
  } else {
    // If all modals are closed, return focus to root trigger.
    focusTrigger(this);
  }
}

export function updateStackIndex(stack) {
  stack.forEach((entry, index) => {
    entry.target.style.zIndex = null;
    const value = getComputedStyle(entry.target)['z-index'];
    entry.target.style.zIndex = parseInt(value) + index + 1;
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

    // If it's a modal target, return the id.
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
    const target = document.querySelector(`#${id}`);
    const dialog = target ? target.querySelector(this.settings.selectorDialog) : null;

    if (!target && !dialog) {
      return { error: new Error(`No modal elements found using the ID: "${id}".`) };
    } else if (!dialog) {
      return { error: new Error('Modal is missing dialog element.') };
    } else {
      return { target, dialog };
    }
  } else {
    return { error: new Error('Could not resolve the modal ID.') };
  }
}
