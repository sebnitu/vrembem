import { closeTransition, updateGlobalState } from "@vrembem/core/index";
import { updateFocusState, getDrawer } from "./helpers";

export async function close(query, transition, focus = true) {
  // Get the drawer from collection.
  const drawer = getDrawer.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...drawer.settings };

  // Add transition parameter to configuration.
  if (transition !== undefined) config.transition = transition;

  // If drawer is opened.
  if (drawer.state === "opened") {
    // Update drawer state.
    drawer.state = "closing";

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    await closeTransition(drawer.el, config);

    // Update the global state if mode is modal.
    if (drawer.mode === "modal") updateGlobalState(false, config);

    // Set focus to the trigger element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, drawer);
    }

    // Update drawer state.
    drawer.state = "closed";

    // Dispatch custom closed event.
    drawer.el.dispatchEvent(new CustomEvent(config.customEventPrefix + "closed", {
      detail: this,
      bubbles: true
    }));
  }

  // Return the drawer.
  return drawer;
}
