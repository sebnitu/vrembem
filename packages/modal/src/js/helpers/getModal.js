export function getModal(query) {
  // Get the entry from collection.
  const entry =
    typeof query === "string" ? this.get(query) : this.get(query.id);

  // Return entry if it was resolved, otherwise throw error.
  if (entry) {
    return entry;
  } else {
    throw new Error(
      `Modal not found in collection with id of "${query.id || query}".`
    );
  }
}
