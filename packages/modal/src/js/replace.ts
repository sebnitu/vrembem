import { open } from "./open";
import type { ModalEntry } from "./ModalEntry";

export async function replace(
  entry: ModalEntry,
  transition?: boolean
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
    [resultClosed, resultOpened] = await Promise.all([
      entry.parent.closeAll("", transition),
      open(entry, transition)
    ]);
  }

  // Return the modals there were opened and closed
  return { opened: resultOpened, closed: resultClosed };
}
