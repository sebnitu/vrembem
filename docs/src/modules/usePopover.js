import { teleportElement } from "vrembem";

const popovers = document.querySelectorAll(".popover");
popovers.forEach((popover) => {
  teleportElement(popover, ".popovers", "append");
});
