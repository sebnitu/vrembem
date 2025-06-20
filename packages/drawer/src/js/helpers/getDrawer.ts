import type { DrawerEntry } from "../DrawerEntry";

export function getDrawer(id: string): DrawerEntry {
  // Get the entry from collection
  const entry = this.get(id);

  // Return entry if it was resolved, otherwise throw error
  if (entry) {
    return entry;
  } else {
    throw new Error(`Drawer not found in collection with id of "${id}"`);
  }
}
