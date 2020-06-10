export const StickyScroll = (options) => {

  let api = {};
  const defaults = {
    autoInit: false,
    selector: '[data-sticky-scroll]',
    selectorActive: '',
    selectorActiveParent: '',
    selectorElementPadding: '',
    saveKey: 'StickyScroll',
    throttleDelay: 500,
    padding: 30
  };

  api.settings = { ...defaults, ...options };

  api.lastPosition = 0;
  api.ticking = false;
  api.element = false;

  api.init = () => {
    api.element = document.querySelector(api.settings.selector);
    if (api.element) {
      setScrollPosition();
      if (api.settings.selectorActive) {
        setActiveVisible();
      }
      api.element.addEventListener('scroll', throttle, false);
    }
  };

  api.destroy = () => {
    if (api.element) {
      api.element.removeEventListener('scroll', throttle, false);
    }
  };

  const throttle = (event) => {
    api.lastPosition = event.target.scrollTop;
    if (!api.ticking) {
      setTimeout(run, api.settings.throttleDelay);
      api.ticking = true;
    }
  };

  const run = () => {
    saveScrollPosition();
    api.ticking = false;
  };

  const saveScrollPosition = () => {
    localStorage.setItem(api.settings.saveKey, api.lastPosition);
  };

  const setScrollPosition = () => {
    let pos = localStorage.getItem(api.settings.saveKey);
    if (pos) {
      api.element.scrollTop = pos;
    }
  };

  const setActiveVisible = () => {
    let el = api.element.querySelector(api.settings.selectorActive);
    if (api.settings.selectorActiveParent) {
      el = el.closest(api.settings.selectorActiveParent);
    }

    if (el) {
      let adjust = 0;
      if (api.settings.selectorElementPadding) {
        adjust = api.element
          .querySelector(api.settings.selectorElementPadding)
          .getBoundingClientRect().height;
      }

      const bounding = el.getBoundingClientRect();
      const scrollBounding = api.element.getBoundingClientRect();
      const maxTop = scrollBounding.top + adjust;
      const maxBot = (window.innerHeight || document.documentElement.clientHeight);

      if (bounding.top < maxTop) {
        const pos = el.offsetTop - (adjust + api.settings.padding);
        api.element.scrollTop = pos;
      } else if (bounding.bottom > maxBot) {
        const pos = (el.offsetTop + el.getBoundingClientRect().height + api.settings.padding) - (scrollBounding.height);
        api.element.scrollTop = pos;
      }
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};
