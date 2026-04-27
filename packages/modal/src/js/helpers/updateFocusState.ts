import type { ModalCollection } from "../ModalCollection";

export function updateFocusState(parent: ModalCollection): void {
  // Check if there's an active modal
  if (parent.active) {
    const el =
      parent.active.dialog.querySelector(parent.config.selectorFocus) ||
      parent.active.dialog;

    if ("focus" in el && typeof el.focus === "function") {
      el.focus();
    }
  } else {
    // Set focus to root trigger and unmount the focus trap
    if (parent.trigger) {
      parent.trigger.focus();
      parent.trigger = null;
    }
  }
}
