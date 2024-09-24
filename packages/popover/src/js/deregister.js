export async function deregister(entry) {
  // If entry is in the opened state, close it.
  if (entry.state === "opened") {
    entry.close();
  }

  // Clean up the floating UI instance.
  entry.cleanup();

  // Remove event listeners.
  deregisterEventListeners(entry);

  // Return teleported modal if a reference has been set.
  if (entry.getSetting("teleport")) {
    entry.teleportReturn();
  }

  // Return the modified collection.
  return entry;
}

export function deregisterEventListeners(entry) {
  // If event listeners have been setup.
  if (entry._eventListeners) {
    // Loop through listeners and remove from the appropriate elements.
    entry._eventListeners.forEach((evObj) => {
      evObj.el.forEach((el) => {
        evObj.type.forEach((type) => {
          entry[el].removeEventListener(type, evObj.listener, false);
        });
      });
    });

    // Remove eventListeners object from collection.
    delete entry._eventListeners;
  }

  // Return the entry object.
  return entry;
}
