export async function deregister(el) {
  // Check if this item has been registered in the collection.
  const index = this.collection.findIndex((entry) => {
    return (entry.id === el.id);
  });

  // If the entry exists in the collection.
  if (index >= 0) {
    // Get the collection entry.
    const entry = this.collection[index];

    // If entry is in the opened state.
    if (entry.state === 'opened') {
      // Close the entry with disabled transitions.
      await entry.close(false);
    }

    // Return teleported modal if a reference has been set.
    if (this.settings.teleport) {
      entry.teleportReturn();
    }

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
