import { getPrefix } from "@vrembem/core";

export function getConfig(el, settings) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(el);

  // Setup the config obj with default values.
  const config = {
    "placement": settings.placement,
    "event": settings.eventType,
    "offset": 0,
    "overflow-padding": 0,
    "flip-padding": 0,
    "arrow-element": settings.selectorArrow,
    "arrow-padding": 0,
    "toggle-delay": settings.hoverToggleDelay,
  };

  // Loop through config obj.
  for (const prop in config) {
    // Get the CSS variable property values.
    const prefix = getPrefix();
    const value = styles.getPropertyValue(`--${prefix}popover-${prop}`).trim();

    // If a value was found, replace the default in config obj.
    if (value) {
      config[prop] = value;
    }
  }

  // Return the config obj.
  return config;
}
