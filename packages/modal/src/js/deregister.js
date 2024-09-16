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

    // If entry is in the opened state, close it.
    if (close && entry.state === "opened") {
      await entry.close(false);
    } else {
      // Remove modal from stack.
      this.stack.remove(entry);
    }

    // Return teleported modal if a reference has been set.
    if (entry.getSetting("teleport")) {
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
