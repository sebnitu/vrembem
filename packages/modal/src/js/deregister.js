export async function deregister(entry, close = true) {
  // If entry is in the opened state, close it.
  if (close && entry.state === "opened") {
    await entry.close(false);
  } else {
    // Remove modal from stack.
    this.stack.remove(entry);
  }
}
