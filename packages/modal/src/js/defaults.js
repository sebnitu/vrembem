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

  // Feature toggles
  customEventPrefix: 'modal:',
  eventListeners: true,
  moveModals: {
    ref: null,
    type: null
  },
  setTabindex: true,
  transition: true
};
