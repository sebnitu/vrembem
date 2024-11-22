import { getPrefix } from "../helpers";

const defaults = {
  // The data attributes to get the breakpoint values from.
  dataBreakpoint: "breakpoint",
  // The data attributes to get the media query value from.
  dataMediaQuery: "media-query",
  // The string token to replace in the media query string.
  token: "{{BP}}",
  // Sets a global breakpoint. Can be overridden by setting a data attribute
  // value. Notice: setting this option will enable a media query breakpoint on all entries.
  breakpoint: null,
  // The default media query string to use. Can be overridden by setting a data
  // attribute value.
  mediaQuery: "(min-width: {{BP}})",
  // Maps entry ID or breakpoint key to breakpoint values. This is referenced
  // when getting an entries breakpoint value.
  breakpoints: {},
  // Maps entry ID's to a media query strings. Media query may contain a token.
  // This is referenced when getting an entries media query string.
  mediaQueries: {},
  // The function to run when the MediaQueryList triggers a "change" event.
  // This is run once on initial mount.
  onChange: () => {}
};

const presets = {
  drawer: {
    onChange(event, entry) {
      entry.mode = (event.matches) ? "inline" : "modal";
    }
  }
};

export function mediaQuery(config = {}) {
  const props = {
    name: "mediaQuery",
    defaults,
    presets,
    config
  };

  const methods = {
    teardown({ parent }) {
      parent.collection.forEach((entry) => {
        removeMediaQueryList(entry);
      });
    },

    onCreateEntry({ entry }) {
      setupMediaQueryList.call(this, entry);
    },

    onDestroyEntry({ entry }) {
      removeMediaQueryList(entry);
    }
  };

  function getMediaQuery(entry) {
    // Get the media query from the data attribute.
    const value = entry.el.getAttribute(`data-${this.settings.dataMediaQuery}`);

    // Check if a media query exists in mediaQueries object using entry ID.
    if (!value && entry.id in this.settings.mediaQueries) {
      return this.settings.mediaQueries[entry.id];
    }

    return value;
  }

  // Get the breakpoint value.
  function getBreakpointValue(entry) {
    // Get the breakpoint from the data attribute.
    let value = entry.el.getAttribute(`data-${this.settings.dataBreakpoint}`);

    // If no value was returned, is there a breakpoint mapped to the entry id?
    if (!value && entry.id in this.settings.breakpoints) {
      value = this.settings.breakpoints[entry.id];
    }

    // Check if a value exists is it a key mapped to a value in breakpoints?
    if (value && value in this.settings.breakpoints) {
      value = this.settings.breakpoints[value];
    }

    // Is the value a key of a breakpoint custom property?
    if (value) {
      const customProp = getComputedStyle(document.body).getPropertyValue(`--${getPrefix()}breakpoint-${value}`).trim();
      value = customProp || value;
    }

    // Return the value or the default value.
    return value || this.settings.breakpoint;
  }

  function setupMediaQueryList(entry) {
    // Get the media query and breakpoint value.
    let mq = getMediaQuery.call(this, entry);
    const bp = getBreakpointValue.call(this, entry);

    // If no breakpoint value or media query was found, return.
    if (!bp && !mq) return;

    // Use the default media query if a custom one wasn't found.
    if (bp && !mq) {
      mq = this.settings.mediaQuery;
    }
    
    // Create the media query string.
    const mqs = mq.replace(new RegExp(`${this.settings.token}`, "g"), bp);

    // Setup MediaQueryList object and event listener.
    entry.mql = window.matchMedia(mqs);
    entry.mql.onchange = (event) => {
      this.settings.onChange(event, entry);
    };
    // Run the on change function for the initial match check.
    this.settings.onChange(entry.mql, entry);
  }

  function removeMediaQueryList(entry) {
    if (!entry.mql) return;
    entry.mql.onchange = null;
    entry.mql = null;
  }

  return {...props, ...methods};
};
