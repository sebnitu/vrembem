import { getDrawerID } from "./getDrawerID";

export function getDrawerElements(query) {
  const id = getDrawerID.call(this, query);
  if (id) {
    const drawer = document.querySelector(`#${id}`);
    const dialog = drawer ? drawer.querySelector(this.settings.selectorDialog) : null;

    if (!drawer && !dialog) {
      return { error: new Error(`No drawer elements found using the ID: "${id}".`) };
    } else if (!dialog) {
      return { error: new Error("Drawer is missing dialog element.") };
    } else {
      return { drawer, dialog };
    }
  } else {
    return { error: new Error("Could not resolve the drawer ID.") };
  }
}
