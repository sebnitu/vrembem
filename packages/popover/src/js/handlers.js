import { closeCheck } from './close';

export function handlerClick(popover) {
  if (popover.target.classList.contains(this.settings.stateActive)) {
    this.close(popover);
  } else {
    this.memory.trigger = popover.trigger;
    this.open(popover);
    documentClick.call(this, popover);
  }
}

export function handlerKeydown(event) {
  switch (event.key) {
    case 'Escape':
      if (this.memory.trigger) {
        this.memory.trigger.focus();
      }
      this.closeAll();
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
        obj.close(popover);
      }
      this.removeEventListener('click', _f);
    } else {
      if (!popover.target.classList.contains(obj.settings.stateActive)) {
        this.removeEventListener('click', _f);
      }
    }
  });
}
