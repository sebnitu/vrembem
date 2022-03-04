import { open } from './open';
import { updateStackIndex } from './helpers';

export async function replace(modal, transition) {
  // Save if modal is currently open.
  const isOpened = (modal.state === 'opened');

  // Cache the current root trigger.
  const cacheTrigger = this.memory.trigger;

  // Setup results for return.
  let resultOpened, resultClosed;

  if (isOpened) {
    // If modal is open, close all modals except for replacement.
    resultOpened = modal;
    resultClosed = await this.closeAll(modal.id, transition);
  } else {
    // If modal is closed, close all and open replacement at the same time.
    resultOpened = open.call(this, modal, transition);
    resultClosed = this.closeAll(false, transition);
    await Promise.all([resultOpened, resultClosed]);
  }

  // Restore the cached root trigger.
  this.memory.trigger = cacheTrigger;

  // Update the z-index since they may be out of sync.
  updateStackIndex(this.stack);

  // Return the modals there were opened and closed.
  return { opened: resultOpened, closed: resultClosed };
}
