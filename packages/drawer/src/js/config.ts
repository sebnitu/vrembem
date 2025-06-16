import presets from "./presets";

export interface DrawerConfig {
  presets: typeof presets;
  dataOpen: string;
  dataClose: string;
  dataToggle: string;
  selector: string;
  selectorDialog: string;
  selectorScreen: string;
  selectorFocus: string;
  selectorInert: string | null;
  selectorOverflow: string;
  stateOpened: string;
  stateOpening: string;
  stateClosing: string;
  stateClosed: string;
  classModal: string;
  customProps: string[];
  breakpoints: Record<string, string> | null;
  customEventPrefix: string;
  setTabindex: boolean;
  transition: boolean;
  transitionDuration: number;
}

export const config: DrawerConfig = {
  presets,
  dataOpen: "drawer-open",
  dataClose: "drawer-close",
  dataToggle: "drawer-toggle",
  selector: ".drawer",
  selectorDialog: ".drawer__dialog",
  selectorScreen: ".drawer",
  selectorFocus: "[data-focus]",
  selectorInert: null,
  selectorOverflow: "body",
  stateOpened: "is-opened",
  stateOpening: "is-opening",
  stateClosing: "is-closing",
  stateClosed: "is-closed",
  classModal: "drawer_modal",
  customProps: ["transition-duration"],
  breakpoints: null,
  customEventPrefix: "drawer:",
  setTabindex: true,
  transition: true,
  transitionDuration: 300
};
