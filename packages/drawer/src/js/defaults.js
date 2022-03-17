export default {
  autoInit: false,

  // Data attributes
  dataDrawer: 'drawer',
  dataDialog: 'drawer-dialog',
  dataToggle: 'drawer-toggle',
  dataOpen: 'drawer-open',
  dataClose: 'drawer-close',
  dataBreakpoint: 'drawer-breakpoint',

  // Selectors
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
  stateSave: true,
  stateKey: 'DrawerState',
  setTabindex: true,
  transition: true
};
