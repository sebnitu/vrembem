import { toCamel, toKebab } from "../utilities";

/**
 * Attempts to retrieve a deeply nested property from the context (`this`)
 * object using a key and a case transformation (camelCase or kebab-case).
 *
 * @param {string} prop - The initial property path to start the query.
 * @param {string} key - The key to look for within the property.
 * @param {string} type - The case format for the key (`"camel"` or `"kebab"`).
 *   Defaults to `"camel"`.
 *
 * @returns The value of the property if found, or `undefined` if not found.
 */
function maybeReturnSetting(
  this: Record<string, any>,
  prop: string,
  key: string,
  type: "camel" | "kebab" = "camel"
): any {
  // Convert the key case based on provided type
  key = type === "camel" ? toCamel(key) : toKebab(key);
  // Return the setting if it exists, otherwise return undefined
  return prop
    .split(".")
    .concat(key)
    .reduce((obj, key) => obj?.[key], this);
}

/**
 * Retrieves a setting from the context (`this`) object, searching through
 * multiple properties (`props`) in the context. Optionally returns a fallback
 * if the setting is not found or throws an error if no fallback is provided.
 *
 * @param {string} key - The key of the setting to retrieve.
 * @param {object} options - Options for fallback and the props array.
 * @param {any} options.fallback - The fallback value to return if the
 *   setting is not found.
 * @param {string} options.props - An array of properties to search for the
 *   setting.
 *
 * @returns The value of the setting if found, or the fallback if provided.
 * @throws An error if the setting is not found and no fallback is provided.
 */
export function getSetting(
  this: Record<string, any>,
  key: string,
  options: {
    fallback?: any;
    props?: string[];
  } = {}
): any {
  // Get the initial props to query and the fallback if provided
  const {
    fallback,
    props = ["dataConfig", "customProps", "settings", "parent.settings"]
  } = options;

  // Loop through the props for the setting and return if found
  for (const prop of props) {
    const type = prop !== "customProps" ? "camel" : "kebab";
    const result = maybeReturnSetting.call(this, prop, key, type);
    if (result !== undefined) {
      return result;
    }
  }

  // Return fallback if one was provided
  if (fallback !== undefined) {
    return fallback;
  }

  // Otherwise, throw an error
  throw new Error(`${this.parent.module} setting does not exist: ${key}`);
}
