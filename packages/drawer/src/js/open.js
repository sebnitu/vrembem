import { transition, setGlobalState } from "@vrembem/core";
import { getDrawer } from "./helpers/getDrawer";
import { updateFocusState } from "./helpers/updateFocusState";

export async function open(query, transitionOverride, focus = true) {
  // Get the drawer from collection.
  const entry = getDrawer.call(this, query);

  // If drawer is closed or indeterminate.
  if (entry.state === "closed" || entry.state === "indeterminate" || entry.state === null) {
    // Update drawer state.
    entry.setState("opening");

    // Run the open transition.
    if ((transitionOverride != undefined) ? transitionOverride : entry.getSetting("transition")) {
      await transition(
        entry.el, 
        entry.getSetting("stateClosed"),
        entry.getSetting("stateOpening"),
        entry.getSetting("stateOpened"),
        entry.getSetting("transitionDuration")
      );
    } else {
      entry.el.classList.add(entry.getSetting("stateOpened"));
      entry.el.classList.remove(entry.getSetting("stateClosed"));
    }

    // Update drawer state.
    entry.setState("opened");

    // Update the global state if mode is modal.
    if (entry.mode === "modal") setGlobalState(true, entry.getSetting("selectorInert"), entry.getSetting("selectorOverflow"));

    // Set focus to the drawer element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, entry);
    }

    // Dispatch custom opened event.
    entry.el.dispatchEvent(new CustomEvent(entry.getSetting("customEventPrefix") + "opened", {
      detail: this,
      bubbles: true
    }));

    // Emit the opened event.
    await entry.parent.emit("opened", entry);
  }

  // Return the drawer.
  return entry;
}
