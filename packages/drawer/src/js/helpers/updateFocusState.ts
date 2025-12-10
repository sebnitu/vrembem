import type { DrawerEntry } from "../DrawerEntry";

export function updateFocusState(entry: DrawerEntry): void {
  // Check if there's an active drawer
  if (entry.dialog && entry.state === "opened") {
    (
      entry.dialog.querySelector(entry.getConfig("selectorFocus")) ||
      entry.dialog
    ).focus();
  } else {
    // Set focus to root trigger and unmount the focus trap
    if (entry.trigger) {
      entry.trigger.focus();
      entry.trigger = null;
    }
  }
}
