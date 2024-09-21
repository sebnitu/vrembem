export default {
  // Data attributes
  dataOpen: "modal-open",
  dataClose: "modal-close",
  dataReplace: "modal-replace",

  // Selectors
  selectorModal: ".modal",
  selectorDialog: ".modal__dialog",
  selectorScreen: ".modal",
  selectorRequired: "[role=\"alertdialog\"]",
  selectorFocus: "[data-focus]",
  selectorInert: null,
  selectorOverflow: "body",

  // State classes
  stateOpened: "is-opened",
  stateOpening: "is-opening",
  stateClosing: "is-closing",
  stateClosed: "is-closed",

  // Feature settings
  customEventPrefix: "modal:",
  eventListeners: true,
  setTabindex: true,
  teleport: null,
  teleportMethod: "append",
  transition: true,
  transitionDuration: "modal-transition-duration"
};
