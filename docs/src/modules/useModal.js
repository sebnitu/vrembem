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

modals.on("opening", (entry) => {
  const tooltipID = entry.parent.trigger.getAttribute("interestfor");
  if (tooltipID) {
    const tooltip = document.getElementById(tooltipID);
    tooltip?.hidePopover();
  }
});

window["modals"] = await modals.mount();

export { modals };
