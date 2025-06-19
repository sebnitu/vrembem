import { open } from "./open";
import { updateFocusState } from "./helpers/updateFocusState";

export async function replace(entry, transition, focus = true) {
  // Setup results for return
  let resultOpened, resultClosed;

  if (entry.state === "opened") {
    // If modal is open, close all modals except for replacement
    resultOpened = entry;
    resultClosed = await entry.parent.closeAll(entry.id, transition);
  } else {
    // If modal is closed, close all and open replacement at the same time
    resultClosed = entry.parent.closeAll(false, transition);
    resultOpened = open(entry, transition, false);
    await Promise.all([resultOpened, resultClosed]);
  }

  // Update focus if the focus param is true
  if (focus) {
    updateFocusState(entry.parent);
  }

  // Return the modals there were opened and closed
  return { opened: resultOpened, closed: resultClosed };
}
