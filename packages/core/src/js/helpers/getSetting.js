import { toCamel, toKebab } from "../utilities";

function maybeReturnSetting(prop, key, type = "camel") {
  // Convert the key case based on provided type.
  key = (type === "camel") ? toCamel(key) : toKebab(key);
  // Return the setting if it exists, otherwise return undefined.
  return prop.split(".").concat(key).reduce((obj, key) => obj?.[key], this);
}

export function getSetting(key, options = {}) {
  // Get the initial props to query and the fallback if provided.
  const {
    fallback,
    props = ["dataConfig", "customProps", "settings", "parent.settings"],
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
  throw new Error(`${this.parent.module} setting does not exist: ${key}`);
}
