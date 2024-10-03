export function isValidPlugin(plugin) {
  if (typeof plugin != "object") {
    console.error("Plugin is not a valid object!");
    return false;
  };

  if (!("name" in plugin) || typeof plugin.name !== "string") {
    console.error("Plugin requires a name!");
    return false;
  };

  return true;
}
