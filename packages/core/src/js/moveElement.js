import { getElement } from './getElement';

/**
 * Moves element(s) in the DOM based on a reference and move type
 * ---
 * @param {String} reference - The reference element the move is relative to
 * @param {String} type - Move type can be 'after', 'before', 'append' or 'prepend'
 * @param {String} target - The element(s) to move
 */

export function moveElement(reference = false, type, target) {
  if (reference) {
    const ref = getElement(reference, 1);
    if (!ref) throw new Error(`Move reference element "${reference}" not found!`);
    const els = getElement(target);
    if (!els.length) throw new Error(`Move target element "${target}" not found!`);
    els.forEach((el) => {
      switch (type) {
        case 'after':
          ref.after(el);
          return { ref, el, type };
        case 'before':
          ref.before(el);
          return { ref, el, type };
        case 'append':
          ref.append(el);
          return { ref, el, type };
        case 'prepend':
          ref.prepend(el);
          return { ref, el, type };
        default:
          throw new Error(`Move type "${type}" does not exist!`);
      }
    });
  }
}
