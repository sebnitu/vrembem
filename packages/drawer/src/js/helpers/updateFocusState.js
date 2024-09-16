export function updateFocusState(entry) {
  // Check if there's an active modal
  if (entry.state === "opened") {
    // Mount the focus trap on the opened drawer.
    if (entry.mode === "modal") {
      this.focusTrap.mount(entry.dialog, this.settings.selectorFocus);
    } else {
      this.focusTrap.focus(entry.dialog, this.settings.selectorFocus);
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
