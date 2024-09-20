import { transition, updateGlobalState } from "@vrembem/core";
import { updateFocusState, getDrawer } from "./helpers";

export async function open(query, transitionOverride, focus = true) {
  // Get the drawer from collection.
  const entry = getDrawer.call(this, query);

  // If drawer is closed or indeterminate.
  if (entry.state === "closed" || entry.state === "indeterminate") {
    // Update drawer state.
    entry.state = "opening";

    // Run the open transition.
    if ((transitionOverride != undefined) ? transitionOverride : entry.getSetting("transition")) {
      await transition(entry.el, {
        start: entry.getSetting("stateClosing"),
        finish: entry.getSetting("stateClosed")
      }, {
        start: entry.getSetting("stateOpening"),
        finish: entry.getSetting("stateOpened")
      }, entry.getSetting("transitionDuration"));
    } else {
      entry.el.classList.add(entry.getSetting("stateOpened"));
      entry.el.classList.remove(entry.getSetting("stateClosed"));
    }

    // Update drawer state.
    entry.state = "opened";

    // Update the global state if mode is modal.
    if (entry.mode === "modal") updateGlobalState(true, entry.getSetting("selectorInert"), entry.getSetting("selectorOverflow"));

    // Set focus to the drawer element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, entry);
    }

    // Dispatch custom opened event.
    entry.el.dispatchEvent(new CustomEvent(entry.getSetting("customEventPrefix") + "opened", {
      detail: this,
      bubbles: true
    }));
  }

  // Return the drawer.
  return entry;
}
