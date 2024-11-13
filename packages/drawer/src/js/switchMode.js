import { setGlobalState } from "@vrembem/core";

export function switchMode(entry) {
  switch (entry.mode) {
    case "inline":
      return toInline.call(this, entry);
    case "modal":
      return toModal.call(this, entry);
    default:
      throw new Error(`"${entry.mode}" is not a valid drawer mode.`);
  }
}

async function toInline(entry) {
  // Remove the modal class.
  entry.el.classList.remove(entry.getSetting("classModal"));

  // Remove the aria-modal attribute.
  entry.dialog.removeAttribute("aria-modal");

  // Update the global state.
  setGlobalState(false, entry.getSetting("selectorInert"), entry.getSetting("selectorOverflow"));

  // Remove any focus traps.
  this.focusTrap.unmount();

  // Apply the inline state.
  entry.applyState();

  // Dispatch custom switch event.
  entry.el.dispatchEvent(new CustomEvent(entry.getSetting("customEventPrefix") + "switchMode", {
    detail: this,
    bubbles: true
  }));

  // Emit the switchMode event.
  await entry.parent.emit("switchMode", entry);

  // Return the entry.
  return entry;
}

async function toModal(entry) {
  // Add the modal class.
  entry.el.classList.add(entry.getSetting("classModal"));

  // Set aria-modal attribute to true.
  entry.dialog.setAttribute("aria-modal", "true");

  // Modal drawer defaults to closed state.
  await entry.close(false, false);

  // Dispatch custom switch event.
  entry.el.dispatchEvent(new CustomEvent(entry.getSetting("customEventPrefix") + "switchMode", {
    detail: this,
    bubbles: true
  }));

  // Emit the switchMode event.
  await entry.parent.emit("switchMode", entry);

  // Return the entry.
  return entry;
}
