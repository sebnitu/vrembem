import { setGlobalState } from "@vrembem/core";
import type { DrawerEntry } from "./DrawerEntry";

export async function switchMode(entry: DrawerEntry): Promise<DrawerEntry> {
  switch (entry.mode) {
    case "inline":
      return toInline(entry);
    case "modal":
      return toModal(entry);
    default:
      return entry;
  }
}

async function toInline(entry: DrawerEntry): Promise<DrawerEntry> {
  // Remove the modal class
  entry.el.classList.remove(entry.config.get("classModal"));

  // Remove the aria-modal attribute
  entry.dialog.removeAttribute("aria-modal");

  // Update the global state
  setGlobalState(
    false,
    entry.config.get("selectorInert"),
    entry.config.get("selectorOverflow")
  );

  // Restore the inline state
  if (entry.inlineState === "opened") {
    await entry.open(false, false);
  } else if (entry.inlineState === "closed") {
    await entry.close(false, false);
  } else {
    entry.state = entry.inlineState;
  }

  // Emit the switchMode event
  await entry.parent.emit("switchMode", entry);

  // Return the entry
  return entry;
}

async function toModal(entry: DrawerEntry): Promise<DrawerEntry> {
  // Add the modal class
  entry.el.classList.add(entry.config.get("classModal"));

  // Set aria-modal attribute to true
  entry.dialog.setAttribute("aria-modal", "true");

  // Modal drawer defaults to closed state
  await entry.close(false, false);

  // Emit the switchMode event
  await entry.parent.emit("switchMode", entry);

  // Return the entry
  return entry;
}
