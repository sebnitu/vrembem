import type { CollectionConfig } from "@vrembem/core";

export const config = {
  // The data attribute to use for triggering the open method
  // @type string
  attrOpen: "modal-open",

  // The data attribute to use for triggering the close method
  // @type string
  attrClose: "modal-close",

  // The data attribute to use for triggering the replace method
  // @type string
  attrReplace: "modal-replace",

  // A valid CSS selector used to query the document for elements to include as
  // entries in the modal collection.
  // @type string
  selector: ".modal",

  // A valid CSS selector for the modal dialog element
  // @type string
  selectorDialog: ".modal__dialog",

  // A valid CSS selector for the element that should be treated as the modal
  // backdrop. Clicking the backdrop closes the modal.
  // @type string
  selectorBackdrop: ".modal",

  // A valid CSS selector for a required modal dialog. A required modal dialog
  // requires user confirmation before it can be dismissed.
  // @type string
  selectorRequired: '[role="alertdialog"]',

  // A valid CSS selector for setting the focus element of a drawer when opened
  // @type string
  selectorFocus: "[data-focus]",

  // A valid CSS selector for an element or group of elements that should be set
  // to `inert` when a modal drawer is opened.
  // @type string
  selectorInert: "",

  // A valid CSS selector for an element or group of elements that should have
  // overflow style set to "hidden" when a modal drawer is opened.
  // @type string
  selectorOverflow: "body",

  // A CSS class applied as the opened state of a drawer
  // @type string
  stateOpened: "is-opened",

  // A CSS class applied as the opening state of a drawer
  // @type string
  stateOpening: "is-opening",

  // A CSS class applied as the closing state of a drawer
  // @type string
  stateClosing: "is-closing",

  // A CSS class applied as the closed state of a drawer
  // @type string
  stateClosed: "is-closed",

  // TODO: Deprecate this option
  // @type string
  customEventPrefix: "modal:",

  // Whether or not to set the tabindex attribute of the drawer dialog
  // @type boolean
  setTabindex: true,

  // Whether or not to enable drawer transition states and animations
  // @type boolean
  transition: true,

  // The duration of transition animations
  // @type number (milliseconds)
  transitionDuration: 300
};

export type ModalConfig = CollectionConfig & typeof config;
