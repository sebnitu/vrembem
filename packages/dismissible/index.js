import { camelCase } from '@vrembem/core';

export const Dismissible = (options) => {

  let api = {};
  const defaults = {
    autoInit: false,
    dataTrigger: 'dismiss',
    dataTarget: 'dismissible',
    classHide: 'display_none',
    method: 'hide'
  };

  api.settings = { ...defaults, ...options };

  api.init = () => {
    document.addEventListener('click', run, false);
  };

  api.destroy = () => {
    document.removeEventListener('click', run, false);
  };

  const run = (event) => {
    const trigger = event.target.closest(`[data-${api.settings.dataTrigger}]`);
    if (trigger) {
      const target = trigger.closest(
        `[data-${api.settings.dataTarget}]`
      );
      if (target) {
        const method = target.dataset[camelCase(api.settings.dataTarget)];
        const defaultMethod = api.settings.method;
        if (method == 'remove' || (!method && defaultMethod == 'remove')) {
          target.remove();
        } else if (method == 'hide' || (!method && defaultMethod == 'hide')) {
          target.classList.add(api.settings.classHide);
        }
        event.preventDefault();
      }
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};
