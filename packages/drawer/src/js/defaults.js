export default {
  autoInit: false,

  // Data attributes
  dataOpen: 'drawer-open',
  dataClose: 'drawer-close',
  dataToggle: 'drawer-toggle',
  dataBreakpoint: 'drawer-breakpoint',

  // Selectors
  selectorDrawer: '.drawer',
  selectorDialog: '.drawer__dialog',
  selectorFocus: '[data-focus]',
  selectorInert: null,
  selectorOverflow: null,

  // State classes
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',

  // Classes
  classModal: 'drawer_modal',

  // Feature toggles
  breakpoints: null,
  customEventPrefix: 'drawer:',
  eventListeners: true,
  store: true,
  storeKey: 'DrawerState',
  setTabindex: true,
  transition: true
};
