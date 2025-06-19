import { setGlobalState } from "@vrembem/core";
import type { DrawerEntry } from "./DrawerEntry";

export function switchMode(entry: DrawerEntry): Promise<DrawerEntry> {
  switch (entry.mode) {
    case "inline":
      return toInline(entry);
    case "modal":
      return toModal(entry);
    default:
      throw new Error(`"${entry.mode}" is not a valid drawer mode.`);
  }
}

async function toInline(entry: DrawerEntry): Promise<DrawerEntry> {
  // Remove the modal class
  entry.el.classList.remove(entry.getSetting("classModal"));

  // Remove the aria-modal attribute
  entry.dialog.removeAttribute("aria-modal");

  // Update the global state
  setGlobalState(
    false,
    entry.getSetting("selectorInert"),
    entry.getSetting("selectorOverflow")
  );

  // Apply the inline state
  entry.applyState();

  // Dispatch custom switch event
  entry.el.dispatchEvent(
    new CustomEvent(entry.getSetting("customEventPrefix") + "switchMode", {
      detail: entry.parent,
      bubbles: true
    })
  );

  // Emit the switchMode event
  await entry.parent.emit("switchMode", entry);

  // Return the entry
  return entry;
}

async function toModal(entry: DrawerEntry): Promise<DrawerEntry> {
  // Add the modal class
  entry.el.classList.add(entry.getSetting("classModal"));

  // Set aria-modal attribute to true
  entry.dialog.setAttribute("aria-modal", "true");

  // Modal drawer defaults to closed state
  await entry.close(false, false);

  // Dispatch custom switch event
  entry.el.dispatchEvent(
    new CustomEvent(entry.getSetting("customEventPrefix") + "switchMode", {
      detail: entry.parent,
      bubbles: true
    })
  );

  // Emit the switchMode event
  await entry.parent.emit("switchMode", entry);

  // Return the entry
  return entry;
}
