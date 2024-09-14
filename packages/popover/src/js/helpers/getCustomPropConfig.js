import { getConfig, getPrefix } from "@vrembem/core";

export function getCustomPropConfig(el, settings) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(el);

  // Setup the custom properties object with default values.
  const customProps = {
    "placement": settings.placement,
    "event": settings.eventType,
    "offset": 0,
    "overflow-padding": 0,
    "flip-padding": 0,
    "arrow-element": settings.selectorArrow,
    "arrow-padding": 0,
    "toggle-delay": settings.hoverToggleDelay,
  };

  // Loop through the custom properties object.
  for (const prop in customProps) {
    // Get the custom property value.
    const prefix = getPrefix();
    const value = styles.getPropertyValue(`--${prefix}popover-${prop}`).trim();

    // If a value was found, replace the default value in custom props object.
    if (value) {
      customProps[prop] = value;
    }
  }

  // Build the config object by merging the custom props object with the config
  // object that's returned by the config data attribute.
  const config = { ...customProps, ...getConfig(el, settings.dataConfig) };

  // Return the config obj.
  return config;
}
