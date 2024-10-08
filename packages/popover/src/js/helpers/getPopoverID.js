export function getPopoverID(obj) {
  // If it's a string, return the string.
  if (typeof obj === "string") {
    return obj;
  }

  // If it's an HTML element.
  else if (typeof obj.hasAttribute === "function") {
    // If it's a popover element, return the id.
    if (obj.closest(this.settings.selectorPopover)) {
      obj = obj.closest(this.settings.selectorPopover);
      return obj.id;
    }

    // If it's a popover trigger, return value of aria-controls.
    else if (obj.hasAttribute("aria-controls")) {
      return obj.getAttribute("aria-controls");
    }

    // If it's a popover tooltip trigger, return the value of aria-describedby.
    else if (obj.hasAttribute("aria-describedby")) {
      return obj.getAttribute("aria-describedby");
    }

    // Return false if no id was found.
    else return false;
  }

  // If it has an id property, return its value.
  else if (obj.id) {
    return obj.id;
  }

  // Return false if no id was found.
  else return false;
}
