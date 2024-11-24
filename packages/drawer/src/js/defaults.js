import presets from "./presets";

export default {
  // Plugin presets
  presets,

  // Data attributes
  dataOpen: "drawer-open",
  dataClose: "drawer-close",
  dataToggle: "drawer-toggle",

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
  setTabindex: true,
  transition: true,
  transitionDuration: 300
};
