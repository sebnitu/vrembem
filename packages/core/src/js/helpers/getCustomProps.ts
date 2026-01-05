import { toKebab, toCamel } from "../utilities";
import { getPrefix } from "./";
import type { CollectionEntry } from "../CollectionEntry";

/**
 * Extracts CSS custom properties from a given entry based on its config.
 *
 * @param {Entry} entry - An object representing the entry of a collection.
 *
 * @returns {object} A key/value object of custom properties.
 */
export function getCustomProps(entry: CollectionEntry): Record<string, string> {
  // Get the computed styles of the element
  const styles = getComputedStyle(entry.el);

  // Initialize the results object for storing custom property key/value pairs
  const result: Record<string, string> = {};

  // Get the custom property keys
  const keys = Object.keys(entry.parent.config);

  // Loop through the custom properties object
  for (let i = 0; i < keys.length; i++) {
    // Get the custom property value
    const module = entry.parent.name.toLowerCase();
    const key = toKebab(keys[i]);
    const value = styles
      .getPropertyValue(`--${getPrefix("-")}${module}-${key}`)
      .trim();
    // If a value was found, add it to our results object
    if (value) {
      result[toCamel(key)] = value;
    }
  }

  // Return the config object
  return result;
}
