import type { CollectionConfig } from "@vrembem/core";
import type { Placement } from "@floating-ui/dom";

export const config = {
  // A valid CSS selector used to query the document for elements to include as
  // entries in the popover collection.
  // @type string
  selector: ".popover",

  // A valid CSS selector that should match a popover as a tooltip type
  // @type string
  selectorTooltip: ".popover_tooltip",

  // A valid CSS selector for the arrow or carrot element of a popover
  // @type string
  selectorArrow: ".popover__arrow",

  // A CSS class applied as the active state of a popover
  // @type string
  stateActive: "is-active",

  // The preferred placement location of a popover if there is enough space
  // @type string as Placement
  placement: "bottom" as Placement,

  // The event that should trigger the popover
  // @type string as "click" | "hover"
  event: "click" as "click" | "hover",

  // A number represents the distance (gutter or margin) between the floating
  // element and the reference element.
  // @type number
  offset: 8,

  // A number representing the distance from the viewport edge before the
  // popover is flipped to the opposite position.
  // @type number
  flipPadding: 10,

  // A number representing the distance from the viewport edge before the
  // popover is shifted to remain visible.
  // @type number
  shiftPadding: 10,

  // This describes the padding between the arrow and the edges of the floating
  // element. If your floating element has border-radius, this will prevent it
  // from overflowing the corners.
  // @type number
  arrowPadding: 10,

  // The number in milliseconds that a popover should delay before opening and
  // closing. Open and close delays can be different by providing two values.
  // Example: [200, 600], "200, 600", "200 600"
  // @type number | string | (number | string)[]
  toggleDelay: 0,

  // Whether or not the popover should be positioned to follow the cursor.
  // @type boolean
  virtual: false
};

export type PopoverConfig = CollectionConfig & typeof config;
