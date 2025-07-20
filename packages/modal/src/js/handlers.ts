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
      [data-${this.settings.dataOpen}],
      [data-${this.settings.dataReplace}],
      [data-${this.settings.dataClose}]
    `) as HTMLElement | null;

    if (trigger) {
      // Prevent the default behavior of the trigger
      event.preventDefault();

      // If it's a open trigger...
      if (trigger.matches(`[data-${this.settings.dataOpen}]`)) {
        const selector = trigger
          .getAttribute(`data-${this.settings.dataOpen}`)
          ?.trim();
        // Get the entry from collection using the attribute value
        const entry = this.getOrThrow(selector);
        // Store the trigger on the entry if it's not from inside a modal
        const fromModal = target.closest(this.settings.selector);
        if (!fromModal) this.trigger = trigger;
        // Toggle the drawer
        return entry.open();
      }

      // If it's a replace trigger...
      if (trigger.matches(`[data-${this.settings.dataReplace}]`)) {
        const selector = trigger
          .getAttribute(`data-${this.settings.dataReplace}`)
          ?.trim();
        // Get the entry from collection using the attribute value
        const entry = this.getOrThrow(selector);
        // Store the trigger on the entry if it's not from inside a modal
        const fromModal = target.closest(this.settings.selector);
        if (!fromModal) this.trigger = trigger;
        // Toggle the drawer
        return entry.replace();
      }

      if (trigger.matches(`[data-${this.settings.dataClose}]`)) {
        const selector = trigger
          .getAttribute(`data-${this.settings.dataClose}`)
          ?.trim();
        return selector === "*" ? this.closeAll() : this.close(selector || "");
      }
    }

    // If there is an active modal and the screen was clicked...
    if (
      this.active &&
      target.matches(this.settings.selectorScreen) &&
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
      !this.active.dialog.matches(this.settings.selectorRequired)
    ) {
      return this.close();
    }
  }
}
