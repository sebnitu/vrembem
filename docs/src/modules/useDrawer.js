import {
  DrawerCollection,
  attrConfig,
  cssConfig,
  focusTrap,
  mediaQuery,
  propStore
} from "vrembem";

/** @type {import("vrembem").Drawer} */
const drawers = new DrawerCollection({
  selector: ".drawer",
  plugins: [cssConfig(), attrConfig(), focusTrap(), mediaQuery(), propStore()]
});

drawers.on("opening", (entry) => {
  const tooltipID = entry.trigger.getAttribute("interestfor");
  if (tooltipID) {
    const tooltip = document.getElementById(tooltipID);
    tooltip?.hidePopover();
  }
});

window["drawers"] = await drawers.mount();

export { drawers };
