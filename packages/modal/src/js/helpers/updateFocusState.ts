import type { Modal } from "../Modal";

export function updateFocusState(parent: Modal): void {
  // Check if there's an active modal
  if (parent.active) {
    (
      parent.active.dialog.querySelector(parent.config.selectorFocus) ||
      parent.active.dialog
    ).focus();
  } else {
    // Set focus to root trigger and unmount the focus trap
    if (parent.trigger) {
      parent.trigger.focus();
      parent.trigger = null;
    }
  }
}
