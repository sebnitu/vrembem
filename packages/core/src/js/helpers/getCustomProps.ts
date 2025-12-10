import { toKebab } from "../utilities";
import { getPrefix } from "./";

type Entry = {
  el: HTMLElement;
  parent: {
    module: string;
  };
  getConfig: (key: string) => string[];
};

/**
 * Extracts CSS custom properties for a given entry based on its config.
 *
 * @param {Entry} entry - An object representing the entry with its associated
 *   config and element.
 *
 * @returns {object} A key/value object of custom property names (in kebab-case)
 *   to their corresponding CSS values.
 */
export function getCustomProps(entry: Entry): Record<string, string> {
  // Get the computed styles of the element
  const styles = getComputedStyle(entry.el);

  // Initialize the results object for storing custom property key/value pairs
  const result: Record<string, string> = {};

  // Get the custom property keys
  const keys = entry.getConfig("customProps");

  // Loop through the custom properties object
  for (let i = 0; i < keys.length; i++) {
    // Get the custom property value
    const prefix = getPrefix();
    const module = entry.parent.module.toLowerCase();
    const key = toKebab(keys[i]);
    const value = styles.getPropertyValue(`--${prefix}${module}-${key}`).trim();
    // If a value was found, add it to our results object
    if (value) {
      result[key] = value;
    }
  }

  // Return the config object
  return result;
}
