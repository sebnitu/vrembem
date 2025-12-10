import { getPrefix } from "../helpers";
import type { Plugin } from "../modules/PluginsArray";

export interface MediaQueryConfig {
  dataBreakpoint?: string;
  dataMediaQuery?: string;
  token?: string;
  breakpoint?: string | null;
  mediaQuery?: string;
  breakpoints?: Record<string, string>;
  mediaQueries?: Record<string, string>;
  onChange?: (
    event: MediaQueryListEvent | MediaQueryList,
    entry: MediaQueryEntry
  ) => void;
}

interface MediaQueryEntry {
  id: string;
  el: HTMLElement;
  mql?: MediaQueryList | null;
  [key: string]: any;
}

const defaults: Required<MediaQueryConfig> = {
  // The data attributes to get the breakpoint values from
  dataBreakpoint: "breakpoint",

  // The data attributes to get the media query value from
  dataMediaQuery: "media-query",

  // The string token to replace in the media query string
  token: "{{BP}}",

  // Sets a global breakpoint. Can be overridden by setting a data attribute
  // value. Notice: setting this option will enable a media query breakpoint on
  // all entries.
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

export function mediaQuery(options: MediaQueryConfig = {}): Plugin {
  const props = {
    name: "mediaQuery",
    defaults,
    options
  };

  const methods = {
    // Run when an entry is created
    // Sets up the MediaQueryList and event listener
    onCreateEntry({ entry }: { entry: MediaQueryEntry }) {
      setupMediaQueryList.call(this, entry);
    },

    // Run when an entry is destroyed
    // Removes the MediaQueryList and event listener
    onDestroyEntry({ entry }: { entry: MediaQueryEntry }) {
      removeMediaQueryList(entry);
    }
  };

  // Get the media query string for an entry
  function getMediaQuery(
    this: any,
    entry: MediaQueryEntry
  ): string | undefined {
    const value = entry.el.getAttribute(`data-${this.config.dataMediaQuery}`);
    // Check if a media query exists in mediaQueries object using entry ID
    if (!value && entry.id in this.config.mediaQueries) {
      return this.config.mediaQueries[entry.id];
    }
    return value || undefined;
  }

  // Get the breakpoint value for an entry
  function getBreakpointValue(
    this: any,
    entry: MediaQueryEntry
  ): string | null {
    let value = entry.el.getAttribute(`data-${this.config.dataBreakpoint}`);
    // If no value was returned, is there a breakpoint mapped to the entry id?
    if (!value && entry.id in this.config.breakpoints) {
      value = this.config.breakpoints[entry.id];
    }
    // If a value exists is it a key mapped to a value in breakpoints?
    if (value && value in this.config.breakpoints) {
      value = this.config.breakpoints[value];
    }
    // Is the value a key of a breakpoint custom property?
    if (value) {
      const customProp = getComputedStyle(document.body)
        .getPropertyValue(`--${getPrefix()}breakpoint-${value}`)
        .trim();
      value = customProp || value;
    }
    // Return the value or the default value
    return value || this.config.breakpoint;
  }

  // Sets up the MediaQueryList and event listener for an entry
  function setupMediaQueryList(this: any, entry: MediaQueryEntry): void {
    // Get the media query and breakpoint value
    let mq = getMediaQuery.call(this, entry);
    const bp = getBreakpointValue.call(this, entry);
    // If no breakpoint value or media query was found, return
    if (!bp && !mq) return;
    // Use the default media query if a custom one wasn't found
    if (bp && !mq) {
      mq = this.config.mediaQuery;
    }
    // Create the media query string
    const mqs = mq.replace(new RegExp(`${this.config.token}`, "g"), bp);
    // Setup MediaQueryList object and event listener
    entry.mql = window.matchMedia(mqs);
    entry.mql.onchange = (event: MediaQueryListEvent) => {
      this.config.onChange(event, entry);
    };
    // Run the on change function for the initial match check
    this.config.onChange(entry.mql, entry);
  }

  // Removes the MediaQueryList and event listener for an entry
  function removeMediaQueryList(entry: MediaQueryEntry): void {
    if (!entry.mql) return;
    entry.mql.onchange = null;
    entry.mql = null;
  }

  return { ...props, ...methods };
}
