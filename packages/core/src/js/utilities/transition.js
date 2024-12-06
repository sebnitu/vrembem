// import { cssVar } from "./cssVar";
import { toMilliseconds } from "./toMilliseconds";

/**
 * Get the value of a CSS custom property (variable).
 * @param {Node} el - The element to transition.
 * @param {String} init - The initial state class.
 * @param {String} interim - The interim state class.
 * @param {String} final - The final state class.
 * @param {Number || String} [duration=0] - Either a CSS
 *   custom property to get a duration value from or a millisecond value used
 *   for the transition duration.
 * @return {Promise} Return a promise that resolves when the transition
 *   has finished.
 */
export function transition(el, init, interim, final, duration = 0) {
  return new Promise((resolve) => {
    // Toggle classes for start of transition.
    el.classList.remove(init);
    el.classList.add(interim);

    // Setup the transition timing.
    setTimeout(() => {
      // Toggle classes for end of transition.
      el.classList.add(final);
      el.classList.remove(interim);

      // Resolve the promise.
      resolve(el);
    }, toMilliseconds(duration));
  });
}
