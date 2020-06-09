export const StickyScroll = (options) => {

  let api = {};
  const defaults = {
    autoInit: false,
  };

  api.settings = { ...defaults, ...options };

  api.init = () => {
    const el = document.querySelector('[data-drawer="drawer-menu"] .dialog');
    if (el) {
      console.log(el.scrollLeft, el.scrollTop);
      el.addEventListener('scroll', () => {
        console.log(el.scrollLeft, el.scrollTop);
      });
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};
