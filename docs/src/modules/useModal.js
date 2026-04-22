import Modal from "@vrembem/modal";
import { attrConfig, cssConfig, focusTrap, teleport } from "@vrembem/core";

/** @type {import("vrembem").Modal | null} */
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
