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
        : entry.getSetting("transition")
    ) {
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

    // Update drawer state
    entry.setState("closed");

    // Update the global state if mode is modal
    if (entry.mode === "modal")
      setGlobalState(
        false,
        entry.getSetting("selectorInert"),
        entry.getSetting("selectorOverflow")
      );

    // Set focus to the trigger element if the focus param is true
    if (focus) {
      updateFocusState(entry);
    }

    // Dispatch custom closed event
    entry.el.dispatchEvent(
      new CustomEvent(entry.getSetting("customEventPrefix") + "closed", {
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
