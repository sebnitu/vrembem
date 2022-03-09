import { moveElement } from '@vrembem/core/index';

export function getModalConfig(modal) {
  const json = modal.getAttribute('data-modal-config');
  if (json) {
    const config = JSON.parse(json);
    return { ...this.settings, ...config };
  } else {
    return this.settings;
  }
}

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
