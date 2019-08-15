import config from "./config.vrembem.js"

/**
 * Get and output a breakpoint using it"s key found in core.json
 * ---
 * @param {String} key - The key to search for in the breakpoints object
 * @returns {String} - The pixel value of the breakpoint as a string
 */

export const getBreakpoint = (key) => {
  return config.breakpoints[key]
}
