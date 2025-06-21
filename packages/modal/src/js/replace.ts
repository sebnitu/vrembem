import { open } from "./open";
import { updateFocusState } from "./helpers/updateFocusState";
import type { ModalEntry } from "./ModalEntry";

export async function replace(
  entry: ModalEntry,
  transition?: boolean,
  focus: boolean = true
): Promise<{ opened: ModalEntry; closed: ModalEntry[] }> {
  // Setup results for return
  let resultOpened: ModalEntry, resultClosed: ModalEntry[];

  if (entry.state === "opened") {
    // If modal is open, close all modals except for replacement
    resultOpened = entry;
    resultClosed = await entry.parent.closeAll(entry.id, transition);
  } else {
    // If modal is closed, close all and open replacement at the same time
    // Await both promises and destructure the results
    [resultOpened, resultClosed] = await Promise.all([
      open(entry, transition, false),
      entry.parent.closeAll(false, transition)
    ]);
  }

  // Update focus if the focus param is true
  if (focus) {
    updateFocusState(entry.parent);
  }

  // Return the modals there were opened and closed
  return { opened: resultOpened, closed: resultClosed };
}
