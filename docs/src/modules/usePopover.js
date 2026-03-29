import { Popover } from "vrembem";
import { cssConfig, teleport } from "@vrembem/core";

let popovers = null;

if (typeof window !== "undefined") {
  popovers = new Popover({
    plugins: [cssConfig(), teleport({ where: ".popovers" })]
  });

  // Return modal popover to prevent stacking issue
  popovers.on("teleport", ({ entry }) => {
    if (entry.id === "popover-tooltip-modal-navi-close") {
      entry.teleportReturn();
    }
  });

  window["popover"] = await popovers.mount();
}

export { popovers };
