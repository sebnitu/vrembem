import { PopoverCollection, cssConfig, teleport } from "vrembem";

/** @type {import("vrembem").Popover} */
const popovers = new PopoverCollection({
  plugins: [cssConfig(), teleport({ where: ".popovers" })]
});

// Return modal popover to prevent stacking issue
popovers.on("teleport", ({ entry }) => {
  if (entry.id === "popover-tooltip-modal-navi-close") {
    entry.teleportReturn();
  }
});

window["popovers"] = await popovers.mount();

export { popovers };
