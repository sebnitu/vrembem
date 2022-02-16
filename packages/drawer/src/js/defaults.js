export default {
  autoInit: false,

  // Data attributes
  dataDrawer: 'drawer',
  dataDialog: 'drawer-dialog',
  dataToggle: 'drawer-toggle',
  dataOpen: 'drawer-open',
  dataClose: 'drawer-close',
  dataBreakpoint: 'drawer-breakpoint',
  dataFocus: 'drawer-focus',

  // State classes
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',

  // Classes
  classModal: 'drawer_modal',

  // Selectors
  selectorInert: null,
  selectorOverflow: null,

  // Feature toggles
  breakpoints: null,
  customEventPrefix: 'drawer:',
  eventListeners: true,
  stateSave: true,
  stateKey: 'DrawerState',
  setTabindex: true,
  transition: true
};
