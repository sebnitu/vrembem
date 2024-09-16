import { getModalID } from "./helpers";

export async function handleClick(event) {
  // If an open or replace button was clicked, open or replace the modal.
  let trigger = event.target.closest(
    `[data-${this.settings.dataOpen}], [data-${this.settings.dataReplace}]`
  );
  if (trigger) {
    event.preventDefault();
    // Save the trigger if it's not coming from inside a modal.
    const fromModal = event.target.closest(this.settings.selectorModal);
    if (!fromModal) this.trigger = trigger;
    // Get the modal.
    const modal = this.get(getModalID.call(this, trigger));
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
    return (value === "*") ? this.closeAll() : this.close(value);
  }

  // If the modal screen was clicked, close the modal.
  if (
    event.target.matches(this.settings.selectorModal) &&
    !event.target.querySelector(this.settings.selectorRequired)
  ) {
    return this.close(getModalID.call(this, event.target));
  }
}

export function handleKeydown(event) {
  // If escape key was pressed.
  if (event.key === "Escape") {
    // If a modal is opened and not required, close the modal.
    if (this.active && !this.active.dialog.matches(this.settings.selectorRequired)) {
      return this.close();
    }
  }
}
