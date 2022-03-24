import { open } from './open';
import { closeAll } from './closeAll';
import { updateFocusState, getModal } from './helpers';

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
    resultOpened = open.call(this, modal, transition, false);
    resultClosed = closeAll.call(this, false, transition);
    await Promise.all([resultOpened, resultClosed]);
  }

  // Update the focus state.
  updateFocusState.call(this);

  // Return the modals there were opened and closed.
  return { opened: resultOpened, closed: resultClosed };
}
