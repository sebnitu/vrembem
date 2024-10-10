import { getPrefix } from "../helpers/getPrefix";

const defaults = {
  // The data attributes to query media query and breakpoint values from.
  dataBreakpoint: "breakpoint",
  dataMediaQuery: "media-query",
  // The string to replace in mediaQueries.
  token: "{{BP}}",
  // Sets a global breakpoint. Should be overrode by presence of dataBreakpoint.
  breakpoint: null,
  mediaQuery: "(min-width: {{BP}})",
  // Map entry ID or breakpoint key to breakpoint values.
  breakpoints: {},
  // Map entry ID's to a media query strings. Media query may contain a token.
  mediaQueries: {},
  onChange: () => {}
};

export function mediaQuery(options = {}) {
  const props = {
    name: "mediaQuery",
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

  function getMediaQuery(entry) {
    // Get the media query from the data attribute.
    const value = entry.el.getAttribute(`data-${props.settings.dataMediaQuery}`);

    // Check if a media query exists in mediaQueries object using entry ID.
    if (!value && entry.id in props.settings.mediaQueries) {
      return props.settings.mediaQueries[entry.id];
    }

    return value;
  }

  // Get the breakpoint value.
  function getBreakpointValue(entry) {
    // Get the breakpoint from the data attribute.
    let value = entry.el.getAttribute(`data-${props.settings.dataBreakpoint}`);

    // If no value was returned, is there a breakpoint mapped to the entry id?
    if (!value && entry.id in props.settings.breakpoints) {
      value = props.settings.breakpoints[entry.id];
    }

    // Check if a value exists is it a key mapped to a value in breakpoints?
    if (value && value in props.settings.breakpoints) {
      value = props.settings.breakpoints[value];
    }

    // Is the value a key of a breakpoint custom property?
    if (value) {
      const customProp = getComputedStyle(document.body).getPropertyValue(`--${getPrefix()}breakpoint-${value}`).trim();
      value = customProp || value;
    }

    // Return the value or the default value.
    return value || props.settings.breakpoint;
  }

  function setupMediaQueryList(entry) {
    // Get the media query and breakpoint value.
    let mq = getMediaQuery(entry);
    const bp = getBreakpointValue(entry);

    // If no breakpoint value or media query was found, return.
    if (!bp && !mq) return;

    // Use the default media query if a custom one wasn't found.
    if (bp && !mq) {
      mq = props.settings.mediaQuery;
    }
    
    // Create the media query string.
    const mqs = mq.replace(new RegExp(`${props.settings.token}`, "g"), bp);

    // Setup MediaQueryList object and event listener.
    entry.mql = window.matchMedia(mqs);
    entry.mql.onchange = (event) => {
      props.settings.onChange(event, entry);
    };
    // Run the on change function for the initial match check.
    props.settings.onChange(entry.mql, entry);
  }

  function removeMediaQueryList(entry) {
    if (!entry.mql) return;
    entry.mql.onchange = null;
    entry.mql = null;
  }

  return {...props, ...methods};
};
