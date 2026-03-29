import { Drawer } from "vrembem";
import {
  attrConfig,
  cssConfig,
  focusTrap,
  mediaQuery,
  propStore
} from "@vrembem/core";

let drawers = null;

if (typeof window !== "undefined") {
  drawers = new Drawer({
    selector: ".drawer",
    plugins: [cssConfig(), attrConfig(), focusTrap(), mediaQuery(), propStore()]
  });
  window["drawers"] = await drawers.mount();
}

export { drawers };
