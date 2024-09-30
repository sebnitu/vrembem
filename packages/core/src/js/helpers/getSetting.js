import { toCamel, toKebab } from "@vrembem/core";

function maybeReturnSetting(prop, key, type = "camel") {
  let context = this;
  const parts = prop.split(".");

  // Check if multiple props were passed (supports max 2).
  if (parts.length > 1) {
    context = this[parts[0]];
    prop = parts[1];
  }

  // Convert the key case based on provided type.
  key = (type === "camel") ? toCamel(key) : toKebab(key);

  // Return the setting if it exists, otherwise return undefined.
  return context?.[prop]?.[key];
}

export function getSetting(key, options = {}) {
  const {
    fallback,
    props = ["dataConfig", "customProps", "settings", "context.settings"],
  } = options;

  // Loop through the props for the setting and return if found.
  for (const prop of props) {
    const type = (prop !== "customProps") ? "camel" : "kebab";
    const result = maybeReturnSetting.call(this, prop, key, type);
    if (result !== undefined) {
      return result;
    }
  }

  // Return fallback if one was provided.
  if (fallback !== undefined) {
    return fallback;
  }

  // Otherwise, throw an error.
  throw new Error(`${this.context.module} setting does not exist: ${key}`);
}
