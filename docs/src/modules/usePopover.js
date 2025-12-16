import { Popover } from "vrembem";
import { cssConfig } from "@vrembem/core";

let popover = null;

if (typeof window !== "undefined") {
  popover = new Popover({
    plugins: [cssConfig()]
  });
  window["popover"] = await popover.mount();
}

export { popover };
