// TODO: Maybe move this into plugins array.
export function setupPluginObject(plugin, module) {
  // Get the defaults, presets and provided configuration of the plugin.
  const defaults = plugin?.defaults || {};
  const preset = plugin?.presets?.[module] || {};
  const config = plugin?.config || {};

  // Create the settings property by merging the plugin defaults, presets and
  // any passed configurations.
  plugin.settings = {...defaults, ...preset, ...config};

  // Apply custom plugin name if one is provided.
  if (plugin.settings.name) {
    plugin.name = plugin.settings.name;
    delete plugin.settings.name;
  }

  // Setup array with all valid lifecycle hooks.
  const hooks = [
    // Setup
    "beforeMount",
    "onCreateEntry",
    "onRegisterEntry",
    "afterMount",
    
    // Teardown
    "beforeUnmount",
    "onDestroyEntry",
    "onDeregisterEntry",
    "afterUnmount",
  ];

  // Iterate over the hooks array.
  for (const hook of hooks) {
    if (typeof plugin.settings[hook] === "function") {
      // Check we're allowed to override hooks or that the hook doesn't already 
      // exist in methods. This is to prevent overriding core functionality
      // unless explicitly allowed.
      if (plugin.settings.override || typeof plugin[hook] !== "function") {
        // Copy the method to the methods object.
        plugin[hook] = plugin.settings[hook];
      } else {
        console.error(`${plugin.name} plugin already has "${hook}" lifecycle hook defined!`);
      }
      // Delete the method from the settings object.
      delete plugin.settings[hook];
    }
  };

  // Return the plugin object.
  return plugin;
}
