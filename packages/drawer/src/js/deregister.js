export async function deregister(obj, close = true) {
  // Return collection if nothing was passed.
  if (!obj) return this.collection;

  // Check if entry has been registered in the collection.
  const index = this.collection.findIndex((entry) => {
    return (entry.id === obj.id);
  });

  if (index >= 0) {
    // Get the collection entry.
    const entry = this.collection[index];

    // If entry is in the opened state.
    if (close && entry.state === "opened") {
      // Close the drawer.
      await entry.close(false);
    }

    // Remove entry from local store.
    this.store.set(entry.id);

    // Unmount the MatchMedia functionality.
    entry.unmountBreakpoint();

    // Delete properties from collection entry.
    Object.getOwnPropertyNames(entry).forEach((prop) => {
      delete entry[prop];
    });

    // Remove entry from collection.
    this.collection.splice(index, 1);
  }

  // Return the modified collection.
  return this.collection;
}
