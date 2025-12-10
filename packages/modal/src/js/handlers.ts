import type { Modal } from "./Modal";
import type { ModalEntry } from "./ModalEntry";

export async function handleClick(
  this: Modal,
  event: MouseEvent
): Promise<
  | ModalEntry
  | ModalEntry[]
  | { opened: ModalEntry; closed: ModalEntry[] }
  | null
  | void
> {
  // Guard if event target property is null
  const target = event.target as HTMLElement | null;
  if (target) {
    // If an open, close or replace button was clicked, handle the click event
    const trigger = target.closest(`
      [data-${this.config.dataOpen}],
      [data-${this.config.dataReplace}],
      [data-${this.config.dataClose}]
    `) as HTMLElement | null;

    if (trigger) {
      // Prevent the default behavior of the trigger
      event.preventDefault();

      // If it's a open trigger...
      if (trigger.matches(`[data-${this.config.dataOpen}]`)) {
        const selector = trigger
          .getAttribute(`data-${this.config.dataOpen}`)
          ?.trim();
        // Get the entry from collection using the attribute value
        const entry = this.getOrThrow(selector);
        // Store the trigger on the entry if it's not from inside a modal
        const fromModal = target.closest(this.config.selector);
        if (!fromModal) this.trigger = trigger;
        // Toggle the drawer
        return entry.open();
      }

      // If it's a replace trigger...
      if (trigger.matches(`[data-${this.config.dataReplace}]`)) {
        const selector = trigger
          .getAttribute(`data-${this.config.dataReplace}`)
          ?.trim();
        // Get the entry from collection using the attribute value
        const entry = this.getOrThrow(selector);
        // Store the trigger on the entry if it's not from inside a modal
        const fromModal = target.closest(this.config.selector);
        if (!fromModal) this.trigger = trigger;
        // Toggle the drawer
        return entry.replace();
      }

      if (trigger.matches(`[data-${this.config.dataClose}]`)) {
        const selector = trigger
          .getAttribute(`data-${this.config.dataClose}`)
          ?.trim();
        return selector === "*" ? this.closeAll() : this.close(selector || "");
      }
    }

    // If there is an active modal and the screen was clicked...
    if (
      this.active &&
      target.matches(this.config.selectorScreen) &&
      !this.active.isRequired
    ) {
      // Close the modal
      return this.close();
    }
  }
}

export function handleKeydown(
  this: Modal,
  event: KeyboardEvent
): Promise<ModalEntry | null> | void {
  // If escape key was pressed
  if (event.key === "Escape") {
    // If a modal is opened and not required, close the modal
    if (
      this.active &&
      !this.active.dialog.matches(this.config.selectorRequired)
    ) {
      return this.close();
    }
  }
}
