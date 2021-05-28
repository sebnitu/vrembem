export default {
  autoInit: false,

  // Data attributes
  dataModal: 'modal',
  dataDialog: 'modal-dialog',
  dataOpen: 'modal-open',
  dataClose: 'modal-close',
  dataFocus: 'modal-focus',
  dataRequired: 'modal-required',

  // State classes
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',

  // Selector
  selectorInert: null,
  selectorOverflow: 'body',

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
