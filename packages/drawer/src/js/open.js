import { transition, updateGlobalState } from "@vrembem/core";
import { updateFocusState, getDrawer } from "./helpers";

export async function open(query, enableTransition, focus = true) {
  // Get the drawer from collection.
  const entry = getDrawer.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...entry.settings };

  // Add transition parameter to configuration.
  if (enableTransition !== undefined) config.transition = enableTransition;

  // If drawer is closed or indeterminate.
  if (entry.state === "closed" || entry.state === "indeterminate") {
    // Update drawer state.
    entry.state = "opening";

    // Run the open transition.
    if (config.transition) {
      await transition(entry.el, {
        start: config.stateClosing,
        finish: config.stateClosed
      }, {
        start: config.stateOpening,
        finish: config.stateOpened
      }, config.transitionDuration);
    } else {
      entry.el.classList.add(config.stateOpened);
      entry.el.classList.remove(config.stateClosed);
    }

    // Update drawer state.
    entry.state = "opened";

    // Update the global state if mode is modal.
    if (entry.mode === "modal") updateGlobalState(true, config);

    // Set focus to the drawer element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, entry);
    }

    // Dispatch custom opened event.
    entry.el.dispatchEvent(new CustomEvent(config.customEventPrefix + "opened", {
      detail: this,
      bubbles: true
    }));
  }

  // Return the drawer.
  return entry;
}
