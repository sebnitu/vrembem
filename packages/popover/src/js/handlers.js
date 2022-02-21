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
  const obj = this;
  document.addEventListener('click', function _f(event) {
    const result = event.target.closest(
      `[data-${obj.settings.dataPopover}], [data-${obj.settings.dataTrigger}]`
    );
    const match = result === popover.target || result === popover.trigger;
    if (!match) {
      if (popover.target.classList.contains(obj.settings.stateActive)) {
        close.call(obj, popover);
      }
      this.removeEventListener('click', _f);
    } else {
      if (!popover.target.classList.contains(obj.settings.stateActive)) {
        this.removeEventListener('click', _f);
      }
    }
  });
}
