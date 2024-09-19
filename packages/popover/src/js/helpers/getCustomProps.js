import { getPrefix } from "@vrembem/core";

// TODO: Maybe this can be abstracted into a core module.
export function getCustomProps(el) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(el);

  // Setup the custom properties object with default values.
  const customProps = {};
  const customPropsArray = [
    "placement",
    "event",
    "offset",
    "flip-padding",
    "shift-padding",
    "arrow-padding",
    "toggle-delay",
  ];

  // Loop through the custom properties object.
  for (let i = 0; i < customPropsArray.length; i++) {
    // Get the custom property value.
    const prefix = getPrefix();
    const value = styles.getPropertyValue(`--${prefix}popover-${customPropsArray[i]}`).trim();

    // If a value was found, replace the default value in custom props object.
    if (value) {
      customProps[customPropsArray[i]] = value;
    }
  }

  // Merge and return a new config object using settings and custom props.
  return customProps;
}
