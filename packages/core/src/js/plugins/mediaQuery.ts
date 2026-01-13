import { getPrefix } from "../helpers";
import type { Plugin } from "../modules/PluginArray";
import type { CollectionEntry } from "../CollectionEntry";

export type MediaQueryEntry = CollectionEntry & {
  mql?: MediaQueryList | null;
};

export interface MediaQueryConfig<TEntry = MediaQueryEntry> {
  name?: string;
  attrBreakpoint?: string;
  attrMediaQuery?: string;
  token?: string;
  breakpoint?: string | null;
  mediaQuery?: string;
  breakpoints?: Record<string, string>;
  mediaQueries?: Record<string, string>;
  onChange?: (
    event: MediaQueryListEvent | MediaQueryList,
    entry: TEntry
  ) => void;
}

const defaults: Partial<MediaQueryConfig> = {
  // The data attributes to get the breakpoint values from
  attrBreakpoint: "breakpoint",

  // The data attributes to get the media query value from
  attrMediaQuery: "media-query",

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

  // Maps entry ID to a media query strings. Media query may contain a token.
  // This is referenced when getting an entries media query string.
  mediaQueries: {},

  // The function to run when the MediaQueryList triggers a "change" event.
  // This is run once on initial mount.
  onChange: () => {}
};

export function mediaQuery(options: MediaQueryConfig = {}): Plugin {
  const props: Plugin = {
    name: "mediaQuery",
    config: defaults,
    options
  };

  const methods: Partial<Plugin> = {
    // Run when an entry is created
    // Sets up the MediaQueryList and event listener
    onCreateEntry({ entry }) {
      setupMediaQueryList.call(this, entry as MediaQueryEntry);
    },

    // Run when an entry is destroyed
    // Removes the MediaQueryList and event listener
    onDestroyEntry({ entry }) {
      removeMediaQueryList(entry as MediaQueryEntry);
    }
  };

  // Get the media query string for an entry
  function getMediaQuery(
    plugin: Plugin,
    entry: MediaQueryEntry
  ): string | null {
    let value = entry.el.getAttribute(`data-${plugin.config.attrMediaQuery}`);
    // Check if a media query exists in mediaQueries object using entry ID
    if (!value && entry.id in plugin.config.mediaQueries) {
      value = plugin.config.mediaQueries[entry.id];
    }
    return value || plugin.config.mediaQuery;
  }

  // Get the breakpoint value for an entry
  function getBreakpointValue(
    plugin: Plugin,
    entry: MediaQueryEntry
  ): string | null {
    let value = entry.el.getAttribute(`data-${plugin.config.attrBreakpoint}`);
    // If no value was returned, is there a breakpoint mapped to the entry id?
    if (!value && entry.id in plugin.config.breakpoints) {
      value = plugin.config.breakpoints[entry.id];
    }
    // If a value exists is it a key mapped to a value in breakpoints?
    if (value && value in plugin.config.breakpoints) {
      value = plugin.config.breakpoints[value];
    }
    // If a value exists is it a key of a breakpoint custom property?
    if (value) {
      const customProp = getComputedStyle(document.body)
        .getPropertyValue(`--${getPrefix("-")}breakpoint-${value}`)
        .trim();
      value = customProp || value;
    }
    // Return the value or the default value
    return value || plugin.config.breakpoint;
  }

  // Sets up the MediaQueryList and event listener for an entry
  function setupMediaQueryList(this: Plugin, entry: MediaQueryEntry) {
    // Get the breakpoint value else return
    const bp = getBreakpointValue(this, entry);
    if (!bp) return;

    // Get the media query value else return
    let mq = getMediaQuery(this, entry);
    if (!mq) return;

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
  function removeMediaQueryList(entry: MediaQueryEntry) {
    if (!entry.mql) return;
    entry.mql.onchange = null;
    entry.mql = null;
  }

  return { ...props, ...methods };
}
