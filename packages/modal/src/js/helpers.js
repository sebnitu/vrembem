import { moveElement } from '@vrembem/core/index';

export function getModal(modalKey) {
  if (typeof modalKey !== 'string') return modalKey;
  return document.querySelector(
    `[data-${this.settings.dataModal}="${modalKey}"]`
  );
}

export function modalNotFound(key) {
  return Promise.reject(
    new Error(`Did not find modal with key: "${key}"`)
  );
}

export function moveModals(type = this.settings.moveModals.type, ref = this.settings.moveModals.ref) {
  const modals = document.querySelectorAll(`[data-${this.settings.dataModal}]`);
  if (modals.length) moveElement(modals, type, ref);
}

export function getModalID(obj) {
  // If it's a string
  if (typeof obj === 'string') {
    return obj;
  }

  // If it's an HTML element
  else if (typeof obj.hasAttribute === 'function') {
    // If it's a modal target
    if (obj.closest(`[data-${this.settings.dataModal}]`)) {
      return obj.getAttribute(`data-${this.settings.dataModal}`);
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
    const dialog = target.querySelector(`[data-${this.settings.dataDialog}]`);

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
