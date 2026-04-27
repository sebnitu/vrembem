import {
  ModalCollection,
  attrConfig,
  cssConfig,
  focusTrap,
  teleport
} from "vrembem";

/** @type {import("vrembem").Modal} */
const modals = new ModalCollection({
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
