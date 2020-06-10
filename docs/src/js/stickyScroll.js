export const StickyScroll = (options) => {

  let api = {};
  const defaults = {
    autoInit: false,
    throttleDelay: 500
  };

  api.settings = { ...defaults, ...options };

  api.last_known_scroll_position = 0;
  api.ticking = false;

  api.init = () => {
    const el = document.querySelector('[data-drawer="drawer-menu"] .dialog');
    if (el) {
      setScrollPosition(el);
      el.addEventListener('scroll', throttle, false);
    }
  };

  api.destroy = () => {
    const el = document.querySelector('[data-drawer="drawer-menu"] .dialog');
    if (el) {
      el.removeEventListener('scroll', throttle, false);
    }
  };

  const throttle = (event) => {
    api.last_known_scroll_position = event.target.scrollTop;
    if (!api.ticking) {
      setTimeout(saveScrollPosition, api.settings.throttleDelay);
      api.ticking = true;
    }
  };

  const saveScrollPosition = () => {
    localStorage.setItem('StickyScroll', api.last_known_scroll_position);
    api.ticking = false;
  };

  const setScrollPosition = (el) => {
    let pos = localStorage.getItem('StickyScroll');
    if (pos) {
      el.scrollTop = pos;
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};
