import type { CollectionConfig } from "@vrembem/core";
import presets from "./presets";

export const config = {
  // An object containing pre-configuration options for plugins. Object should
  // contain the name of the plugin to configure as the key and the config
  // object for that plugin as the value.
  // @type object
  presets,

  // The data attribute to use for triggering the open method
  // @type string
  attrOpen: "drawer-open",

  // The data attribute to use for triggering the close method
  // @type string
  attrClose: "drawer-close",

  // The data attribute to use for triggering the toggle method
  // @type string
  attrToggle: "drawer-toggle",

  // A valid CSS selector used to query the document for elements to include as
  // entries in the drawer collection.
  // @type string
  selector: ".drawer",

  // A valid CSS selector for the drawer dialog element
  // @type string
  selectorDialog: ".drawer__dialog",

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

  // A CSS class used to toggle the modal styles of a drawer
  // @type string
  classModal: "drawer_modal",

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

export type DrawerConfig = CollectionConfig & typeof config;
