export function applyInitialState(entry) {
  if (entry.store === "opened") {
    entry.open(false, false);
  } else if (entry.store === "closed") {
    entry.close(false, false);
  } else if (entry.store === "indeterminate") {
    entry.state = "indeterminate";
  } else {
    if (entry.el.classList.contains(entry.getSetting("stateOpened"))) {
      entry.open(false, false);
    } else if (entry.el.classList.contains(entry.getSetting("stateClosed"))) {
      entry.close(false, false);
    } else {
      entry.state = "indeterminate";
    }
  }
}
