export function getDrawer(query) {
  // Get the entry from collection.
  const entry = (typeof query === "string") ? this.get(query) : query;

  // Return entry if it was resolved, otherwise throw error.
  if (entry) {
    return entry;
  } else {
    throw new Error(`Drawer not found in collection with id of "${query.id || query}".`);
  }
}
