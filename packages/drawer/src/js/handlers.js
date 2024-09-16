export function handleClick(event) {
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
        const entry = this.get(selector);
        // Store the trigger on the entry.
        entry.trigger = trigger;
        // Toggle the drawer
        entry.toggle();
      });
    }

    // If it's a open trigger...
    if (trigger.matches(`[data-${this.settings.dataOpen}]`)) {
      const selectors = trigger.getAttribute(`data-${this.settings.dataOpen}`).trim().split(" ");
      selectors.forEach((selector) => {
        // Get the entry from collection using the attribute value.
        const entry = this.get(selector);
        // Store the trigger on the entry.
        entry.trigger = trigger;
        // Open the drawer.
        entry.open();
      });
    }

    // If it's a close trigger...
    if (trigger.matches(`[data-${this.settings.dataClose}]`)) {
      const selectors = trigger.getAttribute(`data-${this.settings.dataClose}`).trim().split(" ");
      selectors.forEach((selector) => {
        if (selector) {
          // Get the entry from collection using the attribute value.
          const entry = this.get(selector);
          // Store the trigger on the entry.
          entry.trigger = trigger;
          // Close the drawer.
          entry.close();
        } else {
          // If no value is set on close trigger, get the parent drawer.
          const parent = event.target.closest(this.settings.selectorDrawer);
          // If a parent drawer was found, close it.
          if (parent) this.close(parent);
        }
      });
    }

    return;
  }

  // If the modal drawer screen was clicked...
  if (event.target.matches(this.settings.selectorDrawer)) {
    // Close the modal drawer.
    this.close(event.target.id);
  }
}

export function handleKeydown(event) {
  if (event.key === "Escape") {
    const modal = this.activeModal;
    if (modal) this.close(modal);
  }
}
