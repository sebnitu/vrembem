export const StickyScroll = (options) => {

  let api = {};
  const defaults = {
    autoInit: false,
  };

  api.settings = { ...defaults, ...options };

  api.init = () => {
    console.log('StickyScroll has loaded!');
  };

  if (api.settings.autoInit) api.init();
  return api;
};
