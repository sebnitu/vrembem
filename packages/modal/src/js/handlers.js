import { getModal } from "./helpers/getModal";

export async function handleClick(event) {
  // If an open, close or replace button was clicked, handle the click event.
  const trigger = event.target.closest(`
    [data-${this.settings.dataOpen}],
    [data-${this.settings.dataReplace}],
    [data-${this.settings.dataClose}]
  `);

  if (trigger) {
    // Prevent the default behavior of the trigger.
    event.preventDefault();

    // If it's a open trigger...
    if (trigger.matches(`[data-${this.settings.dataOpen}]`)) {
      const selector = trigger
        .getAttribute(`data-${this.settings.dataOpen}`)
        .trim();
      // Get the entry from collection using the attribute value.
      const entry = getModal.call(this, selector);
      // Store the trigger on the entry if it's not from inside a modal.
      const fromModal = event.target.closest(this.settings.selector);
      if (!fromModal) this.trigger = trigger;
      // Toggle the drawer
      return entry.open();
    }

    // If it's a replace trigger...
    if (trigger.matches(`[data-${this.settings.dataReplace}]`)) {
      const selector = trigger
        .getAttribute(`data-${this.settings.dataReplace}`)
        .trim();
      // Get the entry from collection using the attribute value.
      const entry = getModal.call(this, selector);
      // Store the trigger on the entry if it's not from inside a modal.
      const fromModal = event.target.closest(this.settings.selector);
      if (!fromModal) this.trigger = trigger;
      // Toggle the drawer
      return entry.replace();
    }

    if (trigger.matches(`[data-${this.settings.dataClose}]`)) {
      const selector = trigger
        .getAttribute(`data-${this.settings.dataClose}`)
        .trim();
      return selector === "*" ? this.closeAll() : this.close(selector);
    }
  }

  // If there is an active modal and the screen was clicked...
  if (
    this.active &&
    event.target.matches(this.settings.selectorScreen) &&
    !this.active.isRequired
  ) {
    // Close the modal.
    return this.close(this.active.id);
  }
}

export function handleKeydown(event) {
  // If escape key was pressed.
  if (event.key === "Escape") {
    // If a modal is opened and not required, close the modal.
    if (
      this.active &&
      !this.active.dialog.matches(this.settings.selectorRequired)
    ) {
      return this.close();
    }
  }
}
