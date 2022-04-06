export function updateFocusState() {
  // Check if there's an active modal
  if (this.active) {
    // Mount the focus trap on the active modal.
    this.focusTrap.mount(this.active.dialog, this.settings.selectorFocus);
  } else {
    // Set focus to root trigger and unmount the focus trap.
    if (this.trigger) {
      this.trigger.focus();
      this.trigger = null;
    }
    this.focusTrap.unmount();
  }
}
