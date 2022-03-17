export async function deregister(obj) {
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
    if (entry.state === 'opened') {
      entry.close();
    }

    // Clean up the popper instance.
    entry.popper.destroy();

    // Remove event listeners.
    deregisterEventListeners(entry);

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

export function deregisterEventListeners(entry) {
  // If event listeners have been setup.
  if (entry.__eventListeners) {
    // Loop through listeners and remove from the appropriate elements.
    entry.__eventListeners.forEach((evObj) => {
      evObj.el.forEach((el) => {
        evObj.type.forEach((type) => {
          entry[el].removeEventListener(type, evObj.listener, false);
        });
      });
    });

    // Remove eventListeners object from collection.
    delete entry.__eventListeners;
  }

  // Return the entry object.
  return entry;
}
