export function updateFocusState(entry) {
  // Check if there's an active modal
  if (entry.state === "opened") {
    (entry.dialog.querySelector(this.settings.selectorFocus) || entry.dialog).focus();
    // Mount the focus trap on the opened drawer.
    if (entry.mode === "modal") {
      this.focusTrap.mount(entry.dialog);
    }
  } else {
    // Set focus to root trigger and unmount the focus trap.
    if (entry.trigger) {
      entry.trigger.focus();
      entry.trigger = null;
    }
    this.focusTrap.unmount();
  }
}
