import { Drawer } from "vrembem";
import {
  attrConfig,
  cssConfig,
  focusTrap,
  mediaQuery,
  propStore
} from "@vrembem/core";

let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer({
    selector: ".drawer",
    plugins: [cssConfig(), attrConfig(), focusTrap(), mediaQuery(), propStore()]
  });
  window["drawer"] = await drawer.mount();
}

export { drawer };
