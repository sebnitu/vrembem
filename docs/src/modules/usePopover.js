import { Popover } from "vrembem";
import { cssConfig, teleport } from "@vrembem/core";

let popover = null;

if (typeof window !== "undefined") {
  popover = new Popover({
    plugins: [cssConfig(), teleport({ where: ".popovers" })]
  });
  window["popover"] = await popover.mount();
}

export { popover };
