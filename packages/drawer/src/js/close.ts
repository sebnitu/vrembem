import { transition, setGlobalState } from "@vrembem/core";
import { updateFocusState } from "./helpers/updateFocusState";
import type { DrawerEntry } from "./DrawerEntry";

export async function close(
  entry: DrawerEntry,
  transitionOverride?: boolean,
  focus: boolean = true
): Promise<DrawerEntry> {
  // If drawer is opened or indeterminate
  if (
    entry.state === "opened" ||
    entry.state === "indeterminate" ||
    entry.state === null
  ) {
    // Update drawer state
    entry.setState("closing");

    // Remove focus from active element
    if (
      document.activeElement &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }

    // Run the close transition
    if (
      transitionOverride != undefined
        ? transitionOverride
        : entry.config.get("transition")
    ) {
      await transition(
        entry.el,
        entry.config.get("stateOpened"),
        entry.config.get("stateClosing"),
        entry.config.get("stateClosed"),
        entry.config.get("transitionDuration")
      );
    } else {
      entry.el.classList.add(entry.config.get("stateClosed"));
      entry.el.classList.remove(entry.config.get("stateOpened"));
    }

    // Update drawer state
    entry.setState("closed");

    // Update the global state if mode is modal
    if (entry.mode === "modal")
      setGlobalState(
        false,
        entry.config.get("selectorInert"),
        entry.config.get("selectorOverflow")
      );

    // Set focus to the trigger element if the focus param is true
    if (focus) {
      updateFocusState(entry);
    }

    // Dispatch custom closed event
    entry.el.dispatchEvent(
      new CustomEvent(entry.config.get("customEventPrefix") + "closed", {
        detail: entry.parent,
        bubbles: true
      })
    );

    // Emit the closed event
    await entry.parent.emit("closed", entry);
  }

  // Return the drawer
  return entry;
}
