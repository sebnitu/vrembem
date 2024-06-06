export default {
  autoInit: false,

  // Data attributes
  dataOpen: "drawer-open",
  dataClose: "drawer-close",
  dataToggle: "drawer-toggle",
  dataBreakpoint: "drawer-breakpoint",
  dataConfig: "drawer-config",

  // Selectors
  selectorDrawer: ".drawer",
  selectorDialog: ".drawer__dialog",
  selectorScreen: ".drawer",
  selectorFocus: "[data-focus]",
  selectorInert: null,
  selectorOverflow: "body",

  // State classes
  stateOpened: "is-opened",
  stateOpening: "is-opening",
  stateClosing: "is-closing",
  stateClosed: "is-closed",

  // Classes
  classModal: "drawer_modal",

  // Feature toggles
  breakpoints: null,
  customEventPrefix: "drawer:",
  eventListeners: true,
  store: true,
  storeKey: "VB:DrawerState",
  setTabindex: true,
  transition: true,
  transitionDuration: "drawer-transition-duration"
};
