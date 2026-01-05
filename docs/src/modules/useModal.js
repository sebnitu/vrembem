import Modal from "@vrembem/modal";
import { attrConfig, cssConfig, focusTrap, teleport } from "@vrembem/core";

let modal = null;

if (typeof window !== "undefined") {
  modal = new Modal({
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
  window["modal"] = await modal.mount();
}

export { modal };
