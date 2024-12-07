export function updateFocusState() {
  // Check if there's an active modal
  if (this.active) {
    (
      this.active.dialog.querySelector(this.settings.selectorFocus) ||
      this.active.dialog
    ).focus();
  } else {
    // Set focus to root trigger and unmount the focus trap
    if (this.trigger) {
      this.trigger.focus();
      this.trigger = null;
    }
  }
}
