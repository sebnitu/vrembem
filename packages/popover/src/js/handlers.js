import { close, closeAll, closeCheck } from './close';
import { open } from './open';

export function handlerClick(popover) {
  if (popover.target.classList.contains(this.settings.stateActive)) {
    close(popover, this);
  } else {
    this.memory.trigger = popover.trigger;
    open(popover, this);
    documentClick(popover, this);
  }
}

export function handlerKeydown(event) {
  switch (event.key) {
    case 'Escape':
      if (this.memory.trigger) {
        this.memory.trigger.focus();
      }
      closeAll(this);
      return;

    case 'Tab':
      this.collection.forEach((popover) => {
        closeCheck(popover, this);
      });
      return;

    default:
      return;
  }
}

export function documentClick(popover, obj) {
  document.addEventListener('click', function _f(event) {
    const result = event.target.closest(
      `[data-${obj.settings.dataPopover}], [data-${obj.settings.dataTrigger}]`
    );
    const match = result === popover.target || result === popover.trigger;
    if (!match) {
      if (popover.target.classList.contains(obj.settings.stateActive)) {
        close(popover, obj);
      }
      this.removeEventListener('click', _f);
    } else {
      if (!popover.target.classList.contains(obj.settings.stateActive)) {
        this.removeEventListener('click', _f);
      }
    }
  });
}
