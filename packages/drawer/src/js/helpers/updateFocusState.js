export function updateFocusState(entry) {
  // Check if there's an active modal
  if (entry.state === "opened") {
    (
      entry.dialog.querySelector(this.settings.selectorFocus) || entry.dialog
    ).focus();
  } else {
    // Set focus to root trigger and unmount the focus trap
    if (entry.trigger) {
      entry.trigger.focus();
      entry.trigger = null;
    }
  }
}
