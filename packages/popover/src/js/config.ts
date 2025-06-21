type PlacementOptions =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface PopoverConfig {
  selector: string;
  selectorTooltip: string;
  selectorArrow: string;
  stateActive: string;
  customProps: string[];
  customEventPrefix: string;
  placement: PlacementOptions;
  event: "click" | "hover";
  offset: number;
  flipPadding: number;
  shiftPadding: number;
  arrowPadding: number;
  toggleDelay: number;
}

export const config: PopoverConfig = {
  // Selectors
  selector: ".popover",
  selectorTooltip: ".popover_tooltip",
  selectorArrow: ".popover__arrow",

  // State classes
  stateActive: "is-active",

  // Custom properties and their defaults
  customProps: [
    "placement",
    "event",
    "offset",
    "flip-padding",
    "shift-padding",
    "arrow-padding",
    "toggle-delay"
  ],
  customEventPrefix: "popover:",
  placement: "bottom",
  event: "click",
  offset: 0,
  flipPadding: 0,
  shiftPadding: 0,
  arrowPadding: 0,
  toggleDelay: 0
};
