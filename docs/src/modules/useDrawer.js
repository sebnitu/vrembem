import { Drawer } from "vrembem";
import {
  attrConfig,
  cssConfig,
  focusTrap,
  mediaQuery,
  propStore
} from "@vrembem/core";

/** @type {import("vrembem").Drawer} */
const drawers = new Drawer({
  selector: ".drawer",
  plugins: [cssConfig(), attrConfig(), focusTrap(), mediaQuery(), propStore()]
});

window["drawers"] = await drawers.mount();

export { drawers };
