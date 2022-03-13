import { getModalID } from './helpers';

export async function handlerClick(event) {
  // If a open or replace button were clicked, open or replace the modal.
  let trigger = event.target.closest(
    `[data-${this.settings.dataOpen}], [data-${this.settings.dataReplace}]`
  );
  if (trigger) {
    event.preventDefault();
    // Save the root trigger.
    const fromModal = event.target.closest(this.settings.selectorModal);
    if (!fromModal) this.memory.trigger = trigger;
    // Get the modal and save the trigger.
    const modal = this.get(getModalID.call(this, trigger));
    modal.trigger = trigger;
    // Depending on the button type, either open or replace the modal.
    return (trigger.matches(`[data-${this.settings.dataOpen}]`)) ? modal.open() : modal.replace();
  }

  // If a close button was clicked, close the modal.
  trigger = event.target.closest(`[data-${this.settings.dataClose}]`);
  if (trigger) {
    event.preventDefault();
    // Get the value of the data attribute.
    const value = trigger.getAttribute(`data-${this.settings.dataClose}`);
    // Close all if * wildcard is passed, otherwise close a single modal.
    return (value === '*') ? this.closeAll() : this.close(value);
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
