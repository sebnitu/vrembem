import { hide, hideAll } from './hide';
import { show } from './show';

export function handlerClick(popover) {
  if (popover.target.classList.contains(this.settings.stateActive)) {
    hide(popover, this);
  } else {
    show(popover, this);
    documentClick(popover, this);
  }
}

export function handlerKeydown(event) {
  if (event.key === 'Escape') {
    hideAll(this);
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
        hide(popover, obj);
      }
      this.removeEventListener('click', _f);
    } else {
      if (!popover.target.classList.contains(obj.settings.stateActive)) {
        this.removeEventListener('click', _f);
      }
    }
  });
}
