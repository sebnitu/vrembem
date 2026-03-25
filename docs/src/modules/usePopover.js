import { Popover } from "vrembem";
import { cssConfig, teleport } from "@vrembem/core";

let popover = null;

if (typeof window !== "undefined") {
  popover = new Popover({
    plugins: [cssConfig(), teleport({ where: ".popovers" })]
  });

  // Return modal popover to prevent stacking issue
  popover.on("teleport", ({ entry }) => {
    if (entry.id === "popover-tooltip-modal-navi-close") {
      console.log(entry);
      entry.teleportReturn();
    }
  });

  window["popover"] = await popover.mount();
}

export { popover };
