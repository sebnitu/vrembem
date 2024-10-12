import { getDrawer } from "./helpers/getDrawer";

export async function handleClick(event) {
  // If an open, close or toggle button was clicked, handle the click event.
  const trigger = event.target.closest(`
    [data-${this.settings.dataOpen}],
    [data-${this.settings.dataToggle}],
    [data-${this.settings.dataClose}]
  `);

  if (trigger) {
    // Prevent the default behavior of the trigger.
    event.preventDefault();

    // If it's a toggle trigger...
    if (trigger.matches(`[data-${this.settings.dataToggle}]`)) {
      const selectors = trigger.getAttribute(`data-${this.settings.dataToggle}`).trim().split(" ");
      selectors.forEach((selector) => {
        // Get the entry from collection using the attribute value.
        const entry = getDrawer.call(this, selector);
        // Store the trigger on the entry.
        entry.trigger = trigger;
        // Toggle the drawer
        return entry.toggle();
      });
    }

    // If it's a open trigger...
    if (trigger.matches(`[data-${this.settings.dataOpen}]`)) {
      const selectors = trigger.getAttribute(`data-${this.settings.dataOpen}`).trim().split(" ");
      selectors.forEach((selector) => {
        // Get the entry from collection using the attribute value.
        const entry = getDrawer.call(this, selector);
        // Store the trigger on the entry.
        entry.trigger = trigger;
        // Open the drawer.
        return entry.open();
      });
    }

    // If it's a close trigger...
    if (trigger.matches(`[data-${this.settings.dataClose}]`)) {
      const selectors = trigger.getAttribute(`data-${this.settings.dataClose}`).trim().split(" ");
      selectors.forEach((selector) => {
        if (selector) {
          // Get the entry from collection using the attribute value.
          const entry = getDrawer.call(this, selector);
          // Store the trigger on the entry.
          entry.trigger = trigger;
          // Close the drawer.
          return entry.close();
        } else {
          // If no value is set on close trigger, get the parent drawer.
          const parent = event.target.closest(this.settings.selector);
          // If a parent drawer was found, close it.
          if (parent) return this.close(parent.id);
        }
      });
    }

    return;
  }

  // If there is an active modal drawer and the screen was clicked...
  if (this.activeModal && event.target.matches(this.settings.selectorScreen)) {
    // Close the modal drawer.
    return this.close(this.activeModal.id);
  }
}

export function handleKeydown(event) {
  // If escape key was pressed.
  if (event.key === "Escape") {
    // If a modal is opened, close the modal.
    if (this.activeModal) return this.close(this.activeModal.id);
  }
}
