import { getDrawerID } from './helpers';

export function handleClick(event) {
  // If an open or toggle button was clicked, open or toggle the drawer.
  let trigger = event.target.closest(
    `[data-${this.settings.dataOpen}], [data-${this.settings.dataToggle}]`
  );
  if (trigger) {
    event.preventDefault();
    // TODO: move trigger memory into collection entries
    this.memory.trigger = trigger;
    // Get the entry from collection using the trigger.
    const entry = this.get(getDrawerID.call(this, trigger));
    // Depending on the button type, either open or toggle the drawer.
    return (trigger.matches(`[data-${this.settings.dataOpen}]`)) ? entry.open() : entry.toggle();
  }

  // If a close button was clicked, close the drawer.
  trigger = event.target.closest(`[data-${this.settings.dataClose}]`);
  if (trigger) {
    event.preventDefault();
    const selector = trigger.getAttribute(`data-${this.settings.dataClose}`);
    if (selector) {
      // Get the entry from collection using the trigger.
      const entry = this.get(getDrawerID.call(this, trigger));
      // TODO: move trigger memory into collection entries
      this.memory.trigger = trigger;
      // Close the drawer.
      entry.close();
    } else {
      // If no value exists in close trigger, get the parent drawer.
      const target = event.target.closest(`[data-${this.settings.dataDrawer}]`);
      // If a parent drawer was found, close it.
      if (target) this.close(target);
    }
    return;
  }

  // If the modal screen was clicked, close the drawer modal.
  if (event.target.matches(this.settings.selectorDrawer)) {
    return this.close(getDrawerID.call(this, event.target));
  }
}

export function handleKeydown(event) {
  if (event.key === 'Escape') {
    const target = this.activeModal;
    if (target) {
      this.close(target);
    }
  }
}
