export function createPluginObject(props, methods) {
  // Setup array with all lifecycle hooks.
  const hooks = [
    // Setup
    "beforeMount",
    "onMount",
    "onRegister",
    "afterMount",
    
    // Teardown
    "beforeUnmount",
    "onUnmount",
    "onDeregister",
    "afterUnmount",
  ];

  // Are we allowed to override existing hooks?
  const override = props.settings.override;

  // Iterate over the hooks array.
  for (const hook of hooks) {
    if (typeof props.settings[hook] === "function") {
      // Check we're allowed to override hooks or that the hook doesn't already 
      // exist in methods. This is to prevent overriding core functionality
      // unless explicitly allowed.
      if (override || typeof methods[hook] !== "function") {
        // Copy the method to the methods object.
        methods[hook] = props.settings[hook];
      } else {
        console.error(`${props.name} plugin already has "${hook}" lifecycle hook defined!`);
      }
      // Delete the method from the settings object.
      delete props.settings[hook];
    }
  };

  // Apply new plugin name if one is provided.
  if (props.settings.name) {
    props.name = props.settings.name;
    delete props.settings.name;
  }

  // Return the plugin object.
  return {...props, ...methods};
}
