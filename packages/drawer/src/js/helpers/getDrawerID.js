export function getDrawerID(obj) {
  // If it's a string, return the string.
  if (typeof obj === "string") {
    return obj;
  }

  // If it's an HTML element.
  else if (typeof obj.hasAttribute === "function") {
    // If it's a drawer open trigger, return data value.
    if (obj.hasAttribute(`data-${this.settings.dataOpen}`)) {
      return obj.getAttribute(`data-${this.settings.dataOpen}`);
    }

    // If it's a drawer close trigger, return data value or false.
    else if (obj.hasAttribute(`data-${this.settings.dataClose}`)) {
      return obj.getAttribute(`data-${this.settings.dataClose}`) || false;
    }

    // If it's a drawer toggle trigger, return data value.
    else if (obj.hasAttribute(`data-${this.settings.dataToggle}`)) {
      return obj.getAttribute(`data-${this.settings.dataToggle}`);
    }

    // If it's a drawer element, return the id.
    else if (obj.closest(this.settings.selectorDrawer)) {
      obj = obj.closest(this.settings.selectorDrawer);
      return obj.id || false;
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
