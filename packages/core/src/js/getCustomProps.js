import { getPrefix } from "@vrembem/core";

export function getCustomProps(el, module, array) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(el);

  // Setup the custom properties object with default values.
  const result = {};

  // Loop through the custom properties object.
  for (let i = 0; i < array.length; i++) {
    // Get the custom property value.
    const prefix = getPrefix();
    const value = styles.getPropertyValue(`--${prefix}${module}-${array[i]}`).trim();

    // If a value was found, replace the default value in custom props object.
    if (value) {
      result[array[i]] = value;
    }
  }

  // Merge and return a new config object using settings and custom props.
  return result;
}
