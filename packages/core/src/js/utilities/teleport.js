/**
 * Teleports an element in the DOM based on a reference and teleport method.
 * @param {Node} what - What element to teleport.
 * @param {String || Node} where - Where to teleport the element.
 * @param {String} how - How (method) to teleport the element, e.g: 'after',
 *   'before', 'append' or 'prepend'.
 * @return {Function} The return function for returning the node back to its
 *   reference location.
 */
export function teleport(what, where, how) {
  // Check if ref is an element node.
  const isElement = (where.nodeType === Node.ELEMENT_NODE);

  // Get the reference element.
  where = (isElement) ? where : document.querySelector(where);

  // Must be a valid reference element and method.
  if (!where) throw new Error(`Not a valid teleport reference: '${where}'`);
  if (typeof where[how] != "function") throw new Error(`Not a valid teleport method: '${how}'`);

  // If the return element isn't already a return reference comment create a
  // return reference comment and add it before the `what` node.
  let returnRef = document.createComment("teleported #" + what.id);
  what.before(returnRef);

  // Teleport the target node.
  where[how](what);

  // Return cleanup function for returning node to its original location.
  return () => {
    if (returnRef) {
      // Teleport the element back to the return reference.
      returnRef.after(what);
      // Delete the return reference comment and set value to null.
      returnRef.remove();
      returnRef = null;
    }
  };
}
