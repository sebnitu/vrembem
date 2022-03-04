import { getModalID } from './helpers';

export async function handlerClick(event) {
  // Check if modal is busy.
  if (this.busy) return;

  // If a open button was clicked, open the modal.
  let trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);
  if (trigger) {
    event.preventDefault();
    // Save the root trigger
    const fromModal = event.target.closest(this.settings.selectorModal);
    if (!fromModal) this.memory.trigger = trigger;
    // Get the modal, store trigger and open
    const modal = this.get(getModalID.call(this, trigger));
    modal.trigger = trigger;
    return modal.open();
  }

  // If a close button was clicked, close the modal.
  trigger = event.target.closest(`[data-${this.settings.dataClose}]`);
  if (trigger) {
    event.preventDefault();
    const value = trigger.getAttribute(`data-${this.settings.dataClose}`);
    if (value === '*') {
      return this.closeAll();
    } else {
      return this.close(value);
    }
  }

  // If a replace button was clicked, close all and open modal.
  trigger = event.target.closest(`[data-${this.settings.dataReplace}]`);
  if (trigger) {
    event.preventDefault();
    // Save the root trigger
    const fromModal = event.target.closest(this.settings.selectorModal);
    if (!fromModal) this.memory.trigger = trigger;
    // Get the modal, store trigger and open
    const modal = this.get(getModalID.call(this, trigger));
    modal.trigger = trigger;
    return modal.replace();
  }

  // If the modal screen was clicked, close the modal.
  if (
    event.target.matches(this.settings.selectorModal) &&
    !event.target.querySelector(this.settings.selectorRequired)
  ) {
    return this.close(getModalID.call(this, event.target));
  }
}

export function handlerKeydown(event) {
  // Check if modal is busy.
  if (this.busy) return;

  // If escape key was pressed.
  if (event.key === 'Escape') {
    // Query for an open modal.
    const modal = this.stack[this.stack.length - 1];

    // If a modal is opened and not required, close the modal.
    if (modal && !modal.dialog.matches(this.settings.selectorRequired)) {
      return this.close();
    }
  }
}
