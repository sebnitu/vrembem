import { transition, updateGlobalState } from "@vrembem/core";
import { updateFocusState, getDrawer } from "./helpers";

export async function close(query, transitionOverride, focus = true) {
  // Get the drawer from collection.
  const entry = getDrawer.call(this, query);

  // If drawer is opened or indeterminate.
  if (entry.state === "opened" || entry.state === "indeterminate") {
    // Update drawer state.
    entry.state = "closing";

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    if ((transitionOverride != undefined) ? transitionOverride : entry.getSetting("transition")) {
      await transition(
        entry.el, 
        entry.getSetting("stateOpened"),
        entry.getSetting("stateClosing"),
        entry.getSetting("stateClosed"),
        entry.getSetting("transitionDuration")
      );
    } else {
      entry.el.classList.add(entry.getSetting("stateClosed"));
      entry.el.classList.remove(entry.getSetting("stateOpened"));
    }

    // Update drawer state.
    entry.state = "closed";

    // Update the global state if mode is modal.
    if (entry.mode === "modal") updateGlobalState(false, entry.getSetting("selectorInert"), entry.getSetting("selectorOverflow"));

    // Set focus to the trigger element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, entry);
    }

    // Dispatch custom closed event.
    entry.el.dispatchEvent(new CustomEvent(entry.getSetting("customEventPrefix") + "closed", {
      detail: this,
      bubbles: true
    }));
  }

  // Return the drawer.
  return entry;
}
