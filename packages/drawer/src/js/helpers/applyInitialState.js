// TODO: This needs to be refactored.
export async function applyInitialState(entry) {
  // console.log("applyInitialState()", entry.id);
  if (entry.store === "opened") {
    await entry.open(false, false);
  } else if (entry.store === "closed") {
    await entry.close(false, false);
  } else if (entry.store === "indeterminate") {
    entry.setState("indeterminate");
  } else {
    if (entry.el.classList.contains(entry.getSetting("stateOpened"))) {
      await entry.open(false, false);
    } else if (entry.el.classList.contains(entry.getSetting("stateClosed"))) {
      await entry.close(false, false);
    } else {
      entry.setState("indeterminate");
    }
  }
}
