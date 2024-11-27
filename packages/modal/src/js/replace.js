import { open } from "./open";
import { closeAll } from "./closeAll";
import { getModal } from "./helpers/getModal";
import { updateFocusState } from "./helpers/updateFocusState";

export async function replace(query, transition, focus = true) {
  // Get the modal from collection.
  const entry = getModal.call(this, query);

  // Setup results for return.
  let resultOpened, resultClosed;

  if (entry.state === "opened") {
    // If modal is open, close all modals except for replacement.
    resultOpened = entry;
    resultClosed = await closeAll.call(this, entry.id, transition);
  } else {
    // If modal is closed, close all and open replacement at the same time.
    resultClosed = closeAll.call(this, false, transition);
    resultOpened = open.call(this, entry, transition, false);
    await Promise.all([resultOpened, resultClosed]);
  }

  // Update focus if the focus param is true.
  if (focus) {
    updateFocusState.call(this);
  }

  // Return the modals there were opened and closed.
  return { opened: resultOpened, closed: resultClosed };
}
