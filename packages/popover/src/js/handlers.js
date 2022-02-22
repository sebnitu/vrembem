import { close, closeAll, closeCheck } from './close';
import { open } from './open';

export function handlerClick(popover) {
  if (popover.target.classList.contains(this.settings.stateActive)) {
    close.call(this, popover);
  } else {
    this.memory.trigger = popover.trigger;
    open.call(this, popover);
    documentClick.call(this, popover);
  }
}

export function handlerKeydown(event) {
  switch (event.key) {
    case 'Escape':
      if (this.memory.trigger) {
        this.memory.trigger.focus();
      }
      closeAll.call(this);
      return;

    case 'Tab':
      this.collection.forEach((popover) => {
        closeCheck.call(this, popover);
      });
      return;

    default:
      return;
  }
}

export function documentClick(popover) {
  const root = this;
  document.addEventListener('click', function _f(event) {
    // Check if a popover was clicked
    const result = event.target.closest(
      `[data-${root.settings.dataPopover}], [data-${root.settings.dataTrigger}]`
    );
    // Check if clicked popover match the current popover
    const match = result === popover.target || result === popover.trigger;
    if (!match) {
      // If it doesn't match and popover is open, close it and remove event listener
      if (popover.target && popover.target.classList.contains(root.settings.stateActive)) {
        close.call(root, popover);
      }
      this.removeEventListener('click', _f);
    } else {
      // If it does match and popover isn't currently active, remove event listener
      if (popover.target && !popover.target.classList.contains(root.settings.stateActive)) {
        this.removeEventListener('click', _f);
      }
    }
  });
}
