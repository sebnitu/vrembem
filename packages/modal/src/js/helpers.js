export function updateStackIndex(stack) {
  stack.forEach((entry, index) => {
    entry.target.style.zIndex = null;
    const value = getComputedStyle(entry.target)['z-index'];
    entry.target.style.zIndex = parseInt(value) + index + 1;
  });
}

export function getModalID(obj) {
  // If it's a string, return the string.
  if (typeof obj === 'string') {
    return obj;
  }

  // If it's an HTML element.
  else if (typeof obj.hasAttribute === 'function') {
    // If it's a modal open trigger, return data value.
    if (obj.closest(`[data-${this.settings.dataOpen}]`)) {
      return obj.getAttribute(`data-${this.settings.dataOpen}`);
    }

    // If it's a modal close trigger, return data value or false.
    else if (obj.closest(`[data-${this.settings.dataClose}]`)) {
      return obj.getAttribute(`data-${this.settings.dataClose}`) || false;
    }

    // If it's a modal target, return the id.
    else if (obj.closest(this.settings.selectorModal)) {
      return obj.id;
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
    const dialog = target.querySelector(this.settings.selectorDialog);

    if (!target && !dialog) {
      console.error('No modal elements found using the provided ID:', id);
    } else if (!target) {
      console.error('No modal associated with the provided modal ID:', id);
    } else if (!dialog) {
      console.error('No modal dialog associated with the provided modal:', target);
    }

    if (!target || !dialog) {
      return false;
    } else {
      return { target, dialog };
    }

  } else {
    console.error('Could not resolve the modal ID:', query);
    return false;
  }
}
