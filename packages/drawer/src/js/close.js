import { transition, updateGlobalState } from "@vrembem/core";
import { updateFocusState, getDrawer } from "./helpers";

export async function close(query, enableTransition, focus = true) {
  // Get the drawer from collection.
  const entry = getDrawer.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...entry.settings };

  // Add transition parameter to configuration.
  if (enableTransition !== undefined) config.transition = enableTransition;

  // If drawer is opened or indeterminate.
  if (entry.state === "opened" || entry.state === "indeterminate") {
    // Update drawer state.
    entry.state = "closing";

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    if (config.transition) {
      await transition(entry.el, {
        start: config.stateOpening,
        finish: config.stateOpened
      }, {
        start: config.stateClosing,
        finish: config.stateClosed
      }, config.transitionDuration);
    } else {
      entry.el.classList.add(config.stateClosed);
      entry.el.classList.remove(config.stateOpened);
    }

    // Update drawer state.
    entry.state = "closed";

    // Update the global state if mode is modal.
    if (entry.mode === "modal") updateGlobalState(false, config);

    // Set focus to the trigger element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, entry);
    }

    // Dispatch custom closed event.
    entry.el.dispatchEvent(new CustomEvent(config.customEventPrefix + "closed", {
      detail: this,
      bubbles: true
    }));
  }

  // Return the drawer.
  return entry;
}
