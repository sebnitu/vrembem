import type { Drawer } from "./Drawer";
import type { DrawerEntry } from "./DrawerEntry";

export async function handleClick(
  this: Drawer,
  event: MouseEvent
): Promise<DrawerEntry | void> {
  // Guard if event target property is null
  const target = event.target as HTMLElement | null;
  if (target) {
    // If an open, close or toggle button was clicked, handle the click event
    const trigger = target.closest(`
      [data-${this.config.attrOpen}],
      [data-${this.config.attrToggle}],
      [data-${this.config.attrClose}]
    `) as HTMLElement | null;

    if (trigger) {
      // Prevent the default behavior of the trigger
      event.preventDefault();

      // If it's a toggle trigger...
      if (trigger.matches(`[data-${this.config.attrToggle}]`)) {
        const selectors = trigger
          .getAttribute(`data-${this.config.attrToggle}`)
          ?.trim()
          .split(" ");
        selectors?.forEach((selector: string) => {
          // Get the entry from collection using the attribute value
          const entry = this.getOrThrow(selector);
          // Store the trigger on the entry
          entry.trigger = trigger;
          // Toggle the drawer
          return entry.toggle();
        });
      }

      // If it's a open trigger...
      if (trigger.matches(`[data-${this.config.attrOpen}]`)) {
        const selectors = trigger
          .getAttribute(`data-${this.config.attrOpen}`)
          ?.trim()
          .split(" ");
        selectors?.forEach((selector: string) => {
          // Get the entry from collection using the attribute value
          const entry = this.getOrThrow(selector);
          // Store the trigger on the entry
          entry.trigger = trigger;
          // Open the drawer
          return entry.open();
        });
      }

      // If it's a close trigger...
      if (trigger.matches(`[data-${this.config.attrClose}]`)) {
        const selectors = trigger
          .getAttribute(`data-${this.config.attrClose}`)
          ?.trim()
          .split(" ");
        selectors?.forEach((selector: string) => {
          if (selector) {
            // Get the entry from collection using the attribute value
            const entry = this.getOrThrow(selector);
            // Store the trigger on the entry
            entry.trigger = trigger;
            // Close the drawer
            return entry.close();
          } else {
            // If no value is set on close trigger, get the parent drawer
            const parent = target.closest(this.config.selector);
            // If a parent drawer was found, close it
            if (parent) return this.close(parent.id);
          }
        });
      }

      return;
    }

    // If there is an active modal drawer and the screen was clicked...
    if (this.activeModal && target.matches(this.config.selectorScreen)) {
      // Close the modal drawer
      return this.close(this.activeModal.id);
    }
  }
}

export function handleKeydown(
  this: Drawer,
  event: KeyboardEvent
): Promise<DrawerEntry> | void {
  // If escape key was pressed
  if (event.key === "Escape") {
    // If a modal is opened, close the modal
    if (this.activeModal) return this.close(this.activeModal.id);
  }
}
