import type { CollectionConfig } from "@vrembem/core";

export interface ModalConfig extends CollectionConfig {
  attrOpen: string;
  attrClose: string;
  attrReplace: string;
  selector: string;
  selectorDialog: string;
  selectorScreen: string;
  selectorRequired: string;
  selectorFocus: string;
  selectorInert: string | null;
  selectorOverflow: string;
  stateOpened: string;
  stateOpening: string;
  stateClosing: string;
  stateClosed: string;
  customEventPrefix: string;
  setTabindex: boolean;
  transition: boolean;
  transitionDuration: number;
}

export const config: ModalConfig = {
  // Data attributes
  attrOpen: "modal-open",
  attrClose: "modal-close",
  attrReplace: "modal-replace",

  // Selectors
  selector: ".modal",
  selectorDialog: ".modal__dialog",
  selectorScreen: ".modal",
  selectorRequired: '[role="alertdialog"]',
  selectorFocus: "[data-focus]",
  selectorInert: null,
  selectorOverflow: "body",

  // State classes
  stateOpened: "is-opened",
  stateOpening: "is-opening",
  stateClosing: "is-closing",
  stateClosed: "is-closed",

  // Feature configurations
  customEventPrefix: "modal:",
  setTabindex: true,
  transition: true,
  transitionDuration: 300
};
