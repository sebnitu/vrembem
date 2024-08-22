import { getPopoverID } from "./getPopoverID";

export function getPopoverElements(query) {
  const id = getPopoverID.call(this, query);
  if (id) {
    const popover = document.querySelector(`#${id}`);
    const trigger =
      document.querySelector(`[aria-controls="${id}"]`) ||
      document.querySelector(`[aria-describedby="${id}"]`);

    if (!trigger && !popover) {
      return { error: new Error(`No popover elements found using the ID: "${id}".`) };
    } else if (!trigger) {
      return { error: new Error(`No popover trigger associated with the provided popover: "${id}".`) };
    } else if (!popover) {
      return { error: new Error(`No popover associated with the provided popover trigger: "${id}".`) };
    } else {
      return { popover, trigger };
    }
  } else {
    return { error: new Error("Could not resolve the popover ID.") };
  }
}
