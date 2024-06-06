import { cssVar } from "./cssVar";

/**
 * Get the value of a CSS custom property (variable).
 * @param {Node} el - The element to transition.
 * @param {Object} from - An object with a start and finish classes to 
 *   transition from.
 * @param {Object} to - An object with a start and finish classes to 
 *   transition to.
 * @param {String || Number} [duration="transition-duration"] - Either a CSS 
 *   custom property to get a duration value from or a millisecond value used 
 *   for the transition duration.
 * @return {Promise} Return a promise that resolves when the transition 
 *   has finished.
 */
export function transition(el, from, to, duration = "transition-duration") {
  return new Promise((resolve) => {
    // If duration is a string, query for the css var value.
    if (typeof duration === "string") {
      const cssValue = cssVar(duration, el);
      // Convert value to ms if needed.
      const ms = (cssValue.includes("ms")) ? true : false;
      duration = parseFloat(cssValue) * ((ms) ? 1 : 1000);
    }

    // Toggle classes for start of transition.
    el.classList.remove(from.finish);
    el.classList.add(to.start);

    // Setup the transition timing.
    setTimeout(() => {
      // Toggle classes for end of transition.
      el.classList.add(to.finish);
      el.classList.remove(to.start);

      // Resolve the promise.
      resolve(el);
    }, duration);
  });
}
