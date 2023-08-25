import { getConfig } from '@vrembem/core';

function scrollSpy(options = {}) {
  const settings = {
    dataConfig: 'scroll-config',
    value: 0,
    toggle: 'is-active',
    ...options
  };

  const collection = [];

  function mount() {
    const els = document.querySelectorAll(`[data-${settings.dataConfig}]`);
    els.forEach((el) => {
      register(el);
    });

    checkScroll();
    document.addEventListener('scroll', () => {
      checkScroll();
    });
  }

  function register(el) {
    const config = getConfig(el, settings.dataConfig);
    const entry = {
      el: el,
      ...{ ...settings, ...config }
    }
    collection.push(entry);
  }

  function checkScroll() {
    const top = document.documentElement.scrollTop;
    collection.forEach((entry) => {
      entry.el.classList.toggle(entry.toggle, (entry.value >= document.documentElement.scrollTop));
    });
  }

  return {
    settings,
    collection,
    mount,
    register
  };
}

export { scrollSpy };
