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

window["drawers"] = await drawers.mount();

export { drawers };
