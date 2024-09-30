export default {
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
  placement: "bottom",
  event: "click",
  offset: 0,
  flipPadding: 0,
  shiftPadding: 0,
  arrowPadding: 0,
  toggleDelay: 0,

  // Feature settings
  teleport: null,
  teleportMethod: "append",
};
