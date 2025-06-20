import type { ModalEntry } from "../ModalEntry";

export function getModal(id: string): ModalEntry {
  // Get the entry from collection
  const entry = this.get(id);

  // Return entry if it was resolved, otherwise throw error
  if (entry) {
    return entry;
  } else {
    throw new Error(`Modal not found in collection with id of "${id}".`);
  }
}
