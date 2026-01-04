import type { CollectionConfig } from "@vrembem/core";

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

export interface PopoverConfig extends CollectionConfig {
  selector: string;
  selectorTooltip: string;
  selectorArrow: string;
  stateActive: string;
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

  // Events prefix
  customEventPrefix: "popover:",

  // Custom properties and their defaults
  placement: "bottom",
  event: "click",
  offset: 0,
  flipPadding: 0,
  shiftPadding: 0,
  arrowPadding: 0,
  toggleDelay: 0
};
