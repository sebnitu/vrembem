import { getModalID } from './helpers';

export async function handlerClick(event) {
  // Check if modal is busy.
  if (this.busy) return;

  // If a open button was clicked, open the modal.
  let trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);
  if (trigger) {
    event.preventDefault();
    const fromModal = event.target.closest(this.settings.selectorModal);
    if (!fromModal) this.memory.trigger = trigger;
    await this.close(null, this.settings.transition, !fromModal);
    this.open(getModalID(trigger));
    return;
  }

  // If a close button was clicked, close the modal.
  trigger = event.target.closest(`[data-${this.settings.dataClose}]`);
  if (trigger) {
    event.preventDefault();
    this.close(getModalID(trigger));
    return;
  }

  // If the modal screen was clicked, close the modal.
  if (
    event.target.matches(this.settings.selectorModal) &&
    !event.target.matches(this.settings.selectorRequired)
  ) {
    this.close();
    return;
  }
}

export function handlerKeydown(event) {
  // Check if modal is busy.
  if (this.busy) return;

  // If escape key was pressed.
  if (event.key === 'Escape') {
    // Query for an open modal.
    const modal = this.get('opened', 'state');

    // If a modal is opened and not required, close the modal.
    if (modal && !modal.target.matches(this.settings.selectorRequired)) {
      this.close();
    }
  }
}
