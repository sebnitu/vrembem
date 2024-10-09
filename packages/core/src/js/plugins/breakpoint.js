import { getPrefix } from "../helpers/getPrefix";

const defaults = {
  dataAttr: "breakpoint",
  onChange: () => {}
};

export function breakpoint(options = {}) {
  const props = {
    name: "breakpoint",
    settings: { ...defaults, ...options},
  };

  const methods = {
    unmount(context) {
      context.collection.forEach((entry) => {
        removeMediaQueryList(entry);
      });
    },

    onMount(entry) {
      setupMediaQueryList(entry);
    },

    onUnmount(entry) {
      removeMediaQueryList(entry);
    }
  };

  function getBreakpointValue(entry) {
    // Get the data attribute if it exists.
    const value = entry.el.getAttribute(`data-${props.settings.dataAttr}`);

    // Did getAttribute return a value?
    if (value) {
      // Check if the value is a key to the breakpoints object.
      const breakpoints = entry.getSetting("breakpoints", { fallback: null });
      if (breakpoints && breakpoints[value]) return breakpoints[value];

      // Check if the value is a key to a custom property.
      const customProp = getComputedStyle(document.body).getPropertyValue(`--${getPrefix()}breakpoint-${value}`).trim();
      if (customProp) return customProp;
    } else {
      // Check if a breakpoint setting exists.
      const bp = entry.getSetting("breakpoint", { fallback: null });
      if (bp) return bp;
    }
    
    // This will return the value of getAttribute().
    return value;
  }

  function setupMediaQueryList(entry) {
    const value = getBreakpointValue(entry);
    if (!value) return;
    entry.mql = window.matchMedia(`(min-width: ${value})`);
    entry.mql.onchange = (event) => {
      props.settings.onChange(event, entry);
    };
    props.settings.onChange(entry.mql, entry);
  }

  function removeMediaQueryList(entry) {
    if (!entry.mql) return;
    entry.mql.onchange = null;
    entry.mql = null;
  }

  return {...props, ...methods};
};
