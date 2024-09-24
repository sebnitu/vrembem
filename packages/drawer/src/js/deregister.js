export async function deregister(entry, close = true) {
  // If entry is in the opened state, close it.
  if (close && entry.state === "opened") {
    await entry.close(false);
  }

  // Remove entry from local store.
  this.store.set(entry.id);

  // Unmount the MatchMedia functionality.
  entry.unmountBreakpoint();
}
