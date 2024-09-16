import { getModalID } from "./getModalID";

export function getModalElements(query) {
  const id = getModalID.call(this, query);
  if (id) {
    const modal = document.querySelector(`#${id}`);
    const dialog = modal ? modal.querySelector(this.settings.selectorDialog) : null;

    if (!modal && !dialog) {
      return { error: new Error(`No modal elements found using the ID: "${id}".`) };
    } else if (!dialog) {
      return { error: new Error("Modal is missing dialog element.") };
    } else {
      return { modal, dialog };
    }
  } else {
    return { error: new Error("Could not resolve the modal ID.") };
  }
}
