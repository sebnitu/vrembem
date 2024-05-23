import { Modal } from "vrembem";
let modal = null;

if (typeof window !== "undefined") {
  modal = new Modal({
    selectorInert: "main",
    teleport: ".modals"
  });
  window["modal"] = await modal.init();
}

export { modal };
