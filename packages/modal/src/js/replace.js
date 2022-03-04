import { closeAll } from './closeAll';
import { updateFocus, updateStackIndex } from './helpers';

export async function replace(modal, transition) {
  // Setup results for return.
  let resultOpened, resultClosed;

  if (modal.state === 'opened') {
    // If modal is open, close all modals except for replacement.
    resultOpened = modal;
    resultClosed = await closeAll.call(this, modal.id, transition);
  } else {
    // If modal is closed, close all and open replacement at the same time.
    resultOpened = modal.open(transition);
    resultClosed = closeAll.call(this, false, transition);
    await Promise.all([resultOpened, resultClosed]);
  }

  // Update the z-index since they may be out of sync.
  updateStackIndex(this.stack);

  // Update focus.
  updateFocus.call(this, resultOpened.trigger);

  // Return the modals there were opened and closed.
  return { opened: resultOpened, closed: resultClosed };
}
