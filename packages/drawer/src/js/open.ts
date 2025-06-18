import { transition, setGlobalState } from "@vrembem/core";
import { updateFocusState } from "./helpers/updateFocusState";
import type { DrawerEntry } from "./DrawerEntry";

export async function open(
  entry: DrawerEntry,
  transitionOverride?: boolean,
  focus: boolean = true
): Promise<DrawerEntry> {
  // If drawer is closed or indeterminate
  if (
    entry.state === "closed" ||
    entry.state === "indeterminate" ||
    entry.state === null
  ) {
    // Update drawer state
    entry.setState("opening");

    // Run the open transition
    if (
      transitionOverride != undefined
        ? transitionOverride
        : entry.getSetting("transition")
    ) {
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

    // Update drawer state
    entry.setState("opened");

    // Update the global state if mode is modal
    if (entry.mode === "modal")
      setGlobalState(
        true,
        entry.getSetting("selectorInert"),
        entry.getSetting("selectorOverflow")
      );

    // Set focus to the drawer element if the focus param is true
    if (focus) {
      updateFocusState(entry);
    }

    // Dispatch custom opened event
    entry.el.dispatchEvent(
      new CustomEvent(entry.getSetting("customEventPrefix") + "opened", {
        detail: entry.parent,
        bubbles: true
      })
    );

    // Emit the opened event
    await entry.parent.emit("opened", entry);
  }

  // Return the drawer
  return entry;
}
