import { Popover } from "vrembem";
let popover = null;

if (typeof window !== "undefined") {
  popover = new Popover();
  window["popover"] = await popover.init();
}

export { popover };
