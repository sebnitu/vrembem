import { closeAll, closeCheck } from './close';

export function handlerClick(popover) {
  if (popover.state === 'opened') {
    popover.close();
  } else {
    this.memory.trigger = popover.trigger;
    popover.open();
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
    // Check if a popover was clicked.
    const result = event.target.closest(`#${popover.id}, [aria-controls="${popover.id}"]`);
    if (!result) {
      // If it doesn't match and popover is open, close it and remove event listener.
      if (popover.el && popover.el.classList.contains(root.settings.stateActive)) {
        popover.close();
      }
      this.removeEventListener('click', _f);
    } else {
      // If it does match and popover isn't currently active, remove event listener.
      if (popover.el && !popover.el.classList.contains(root.settings.stateActive)) {
        this.removeEventListener('click', _f);
      }
    }
  });
}
