export function getModalID(obj) {
  // If it's a string
  if (typeof obj === 'string') {
    return obj;
  }

  // If it's an HTML element
  else if (typeof obj.hasAttribute === 'function') {
    // If it's a modal target
    if (obj.closest(this.settings.selectorModal)) {
      return obj.id;
    }

    // If it's a modal open trigger
    else if (obj.closest(`[data-${this.settings.dataOpen}]`)) {
      return obj.getAttribute(`data-${this.settings.dataOpen}`);
    }

    // If it's a modal close trigger
    else if (obj.closest(`[data-${this.settings.dataClose}]`)) {
      return obj.getAttribute(`data-${this.settings.dataClose}`) || false;
    }

    // Return false if no id was found
    else return false;
  }

  // If it has an ID property
  else if (obj.id) {
    return obj.id;
  }

  // Return false if no id was found
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
