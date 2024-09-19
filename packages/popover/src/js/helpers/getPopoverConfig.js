import { getConfig, getPrefix } from "@vrembem/core";

export function getPopoverConfig(el, settings) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(el);

  // Merge the data attribute config with the provided settings.
  settings = { ...settings, ...getConfig(el, settings.dataConfig) };

  // Setup the custom properties object with default values.
  const customProps = {
    "placement": settings.placement,
    "event": settings.eventType,
    "offset": 0,
    "flip-padding": 0,
    "shift-padding": 0,
    "arrow-element": settings.selectorArrow,
    "arrow-padding": 0,
    "toggle-delay": settings.toggleDelay,
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

  // Merge and return a new config object using settings and custom props.
  return { ...settings, ...customProps };
}
