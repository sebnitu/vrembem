import { toKebab } from "../utilities";
import { getPrefix } from ".";

export function buildCustomProps(entry) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(entry.el);

  // Initialize the results object for storing custom property key/value pairs.
  const result = {};

  // Get the custom property keys.
  const keys = entry.getSetting("customProps");

  // Loop through the custom properties object.
  for (let i = 0; i < keys.length; i++) {
    // Get the custom property value.
    const prefix = getPrefix();
    const module = entry.parent.module.toLowerCase();
    const key = toKebab(keys[i]);
    const value = styles.getPropertyValue(`--${prefix}${module}-${key}`).trim();
    // If a value was found, add it to our results object.
    if (value) {
      result[key] = value;
    }
  }

  // Return the config object.
  return result;
}
