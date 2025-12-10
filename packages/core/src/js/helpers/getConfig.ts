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
function maybeReturnConfig(
  this: Record<string, any>,
  prop: string,
  key: string,
  type: "camel" | "kebab" = "camel"
): any {
  // Convert the key case based on provided type
  key = type === "camel" ? toCamel(key) : toKebab(key);
  // Return the config if it exists, otherwise return undefined
  return prop
    .split(".")
    .concat(key)
    .reduce((obj, key) => obj?.[key], this);
}

/**
 * Retrieves a config from the context (`this`) object, searching through
 * multiple properties (`props`) in the context. Optionally returns a fallback
 * if the config is not found or throws an error if no fallback is provided.
 *
 * @param {string} key - The key of the config to retrieve.
 * @param {object} options - Options for fallback and the props array.
 * @param {any} options.fallback - The fallback value to return if the
 *   config is not found.
 * @param {string} options.props - An array of properties to search for the
 *   config.
 *
 * @returns The value of the config if found, or the fallback if provided.
 * @throws An error if the config is not found and no fallback is provided.
 */
export function getConfig(
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
    props = ["dataConfig", "customProps", "config", "parent.config"]
  } = options;

  // Loop through the props for the config and return if found
  for (const prop of props) {
    const type = prop !== "customProps" ? "camel" : "kebab";
    const result = maybeReturnConfig.call(this, prop, key, type);
    if (result !== undefined) {
      return result;
    }
  }

  // Return fallback if one was provided
  if (fallback !== undefined) {
    return fallback;
  }

  // Otherwise, throw an error
  throw new Error(`${this.parent.module} config does not exist: ${key}`);
}
