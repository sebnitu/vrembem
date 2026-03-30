import Modal from "@vrembem/modal";
import { attrConfig, cssConfig, focusTrap, teleport } from "@vrembem/core";

let modals = null;

if (typeof window !== "undefined") {
  modals = new Modal({
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
}

export { modals };
