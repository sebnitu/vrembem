import { getPrefix } from "@vrembem/core";

export function getCustomProps(entry) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(entry.el);

  // Initialize the results object for storing custom property key/value pairs.
  const result = {};

  // Get the custom property keys.
  const keys = Object.keys(entry.context.settings);

  // Loop through the custom properties object.
  for (let i = 0; i < keys.length; i++) {
    // Get the custom property value.
    const prefix = getPrefix();
    const value = styles.getPropertyValue(`--${prefix}${entry.context.module.toLowerCase()}-${keys[i]}`).trim();

    // If a value was found, add it to our results object.
    if (value) {
      result[keys[i]] = value;
    }
  }

  // Return the config object.
  return result;
}
