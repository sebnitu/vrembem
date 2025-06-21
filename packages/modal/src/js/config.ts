export interface ModalConfig {
  dataOpen: string;
  dataClose: string;
  dataReplace: string;
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
  customProps: string[];
  customEventPrefix: string;
  setTabindex: boolean;
  transition: boolean;
  transitionDuration: number;
}

export const config: ModalConfig = {
  // Data attributes
  dataOpen: "modal-open",
  dataClose: "modal-close",
  dataReplace: "modal-replace",

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

  // Feature settings
  customProps: ["transition-duration"],
  customEventPrefix: "modal:",
  setTabindex: true,
  transition: true,
  transitionDuration: 300
};
