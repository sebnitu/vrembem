export default {
  // Data attributes
  dataOpen: "drawer-open",
  dataClose: "drawer-close",
  dataToggle: "drawer-toggle",
  dataBreakpoint: "drawer-breakpoint",

  // Selectors
  selector: ".drawer",
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
  customProps: [
    "transition-duration"
  ],
  breakpoints: null,
  customEventPrefix: "drawer:",
  store: true,
  storeKey: "VB:DrawerState",
  setTabindex: true,
  transition: true,
  transitionDuration: 300
};
