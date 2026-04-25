import { Modal } from "vrembem";
import { attrConfig, cssConfig, focusTrap, teleport } from "@vrembem/core";

/** @type {import("vrembem").Modal} */
const modals = new Modal({
  selectorInert: "main",
  plugins: [
    cssConfig(),
    attrConfig(),
    focusTrap(),
    teleport({
      where: ".modals",
      how: "append"
    })
  ]
});

window["modals"] = await modals.mount();

export { modals };
