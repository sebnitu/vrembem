import { getPrefix } from "@vrembem/core";

export function getCustomProps(el, module, array) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(el);

  // Initialize the results object for storing custom property key/value pairs.
  const result = {};

  // Loop through the custom properties object.
  for (let i = 0; i < array.length; i++) {
    // Get the custom property value.
    const prefix = getPrefix();
    const value = styles.getPropertyValue(`--${prefix}${module.toLowerCase()}-${array[i]}`).trim();

    // If a value was found, add it to our results object.
    if (value) {
      result[array[i]] = value;
    }
  }

  // Return the config object.
  return result;
}
