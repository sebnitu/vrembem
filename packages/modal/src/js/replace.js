import { open } from './open';
import { closeAll } from './closeAll';
import { getModal, updateGlobalState } from './helpers';

export async function replace(query, transition) {
  // Get the modal from collection.
  const modal = getModal.call(this, query);

  // Setup results for return.
  let resultOpened, resultClosed;

  if (modal.state === 'opened') {
    // If modal is open, close all modals except for replacement.
    resultOpened = modal;
    resultClosed = await closeAll.call(this, modal.id, transition);
  } else {
    // If modal is closed, close all and open replacement at the same time.
    resultOpened = open.call(this, modal, transition, true);
    resultClosed = closeAll.call(this, false, transition);
    await Promise.all([resultOpened, resultClosed]);
  }

  // Update the global state.
  updateGlobalState.call(this, resultOpened.trigger);

  // Return the modals there were opened and closed.
  return { opened: resultOpened, closed: resultClosed };
}
