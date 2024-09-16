import { openTransition, updateGlobalState } from "@vrembem/core/index";
import { updateFocusState, getDrawer } from "./helpers";

export async function open(query, transition, focus = true) {
  // Get the drawer from collection.
  const drawer = getDrawer.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...drawer.settings };

  // Add transition parameter to configuration.
  if (transition !== undefined) config.transition = transition;

  // If drawer is closed.
  if (drawer.state === "closed") {
    // Update drawer state.
    drawer.state = "opening";

    // Run the open transition.
    await openTransition(drawer.el, config);

    // Update the global state if mode is modal.
    if (drawer.mode === "modal") updateGlobalState(true, config);

    // Update drawer state.
    drawer.state = "opened";
  }

  // Set focus to the drawer element if the focus param is true.
  if (focus) {
    updateFocusState.call(this, drawer);
  }

  // Dispatch custom opened event.
  drawer.el.dispatchEvent(new CustomEvent(config.customEventPrefix + "opened", {
    detail: this,
    bubbles: true
  }));

  // Return the drawer.
  return drawer;
}
