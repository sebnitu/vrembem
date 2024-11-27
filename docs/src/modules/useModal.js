import Modal from "@vrembem/modal";
import { focusTrap, teleport } from "@vrembem/core";

let modal = null;

if (typeof window !== "undefined") {
  modal = new Modal({
    selectorInert: "main",
    plugins: [
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
