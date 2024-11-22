export function createPluginObject(plugin, module) {
  // Setup array with all lifecycle hooks.
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

  // Get the preset for this module if it exists. Otherwise set an empty object.
  const defaults = plugin?.defaults || {};
  const preset = plugin?.presets?.[module] || {};
  const config = plugin?.config || {};

  // Merge plugin config with the defaults and preset if it exists.
  plugin.settings = {...defaults, ...preset, ...config};

  // Apply new plugin name if one is provided.
  if (plugin.settings.name) {
    plugin.name = plugin.settings.name;
    delete plugin.settings.name;
  }

  // Are we allowed to override existing hooks?
  const override = plugin.settings.override;

  // Iterate over the hooks array.
  for (const hook of hooks) {
    if (typeof plugin.settings[hook] === "function") {
      // Check we're allowed to override hooks or that the hook doesn't already 
      // exist in methods. This is to prevent overriding core functionality
      // unless explicitly allowed.
      if (override || typeof plugin[hook] !== "function") {
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
