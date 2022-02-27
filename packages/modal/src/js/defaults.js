export default {
  autoInit: false,

  // Data attributes
  dataOpen: 'modal-open',
  dataClose: 'modal-close',
  dataFocus: 'modal-focus',
  dataRequired: 'modal-required',

  // Selectors
  selectorModal: '.modal',
  selectorDialog: '.modal__dialog',
  selectorInert: null,
  selectorOverflow: 'body',

  // State classes
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',

  // Feature settings
  customEventPrefix: 'modal:',
  eventListeners: true,
  teleport: null,
  teleportMethod: 'append',
  setTabindex: true,
  transition: true
};
