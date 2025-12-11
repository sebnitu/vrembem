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
        : entry.config.get("transition")
    ) {
      await transition(
        entry.el,
        entry.config.get("stateClosed"),
        entry.config.get("stateOpening"),
        entry.config.get("stateOpened"),
        entry.config.get("transitionDuration")
      );
    } else {
      entry.el.classList.add(entry.config.get("stateOpened"));
      entry.el.classList.remove(entry.config.get("stateClosed"));
    }

    // Update drawer state
    entry.setState("opened");

    // Update the global state if mode is modal
    if (entry.mode === "modal")
      setGlobalState(
        true,
        entry.config.get("selectorInert"),
        entry.config.get("selectorOverflow")
      );

    // Set focus to the drawer element if the focus param is true
    if (focus) {
      updateFocusState(entry);
    }

    // Dispatch custom opened event
    entry.el.dispatchEvent(
      new CustomEvent(entry.config.get("customEventPrefix") + "opened", {
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
