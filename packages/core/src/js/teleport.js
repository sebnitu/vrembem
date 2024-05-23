/**
 * Teleports an element in the DOM based on a reference and teleport method.
 * Provide the comment node as the reference to teleport the element back to its
 * previous location.
 * @param {Node} what - What element to teleport.
 * @param {String || Node} where - Where to teleport the element.
 * @param {String} how - How (method) to teleport the element, e.g: 'after',
 *   'before', 'append' or 'prepend'.
 * @return {Node} Return the return reference if it was teleported else return
 *   null if it was returned to a comment reference.
 */
export function teleport(what, where, how) {
  // Check if ref is either a comment or element node.
  const isComment = (where.nodeType === Node.COMMENT_NODE);
  const isElement = (where.nodeType === Node.ELEMENT_NODE);

  // Get the reference element.
  where = (isComment || isElement) ? where : document.querySelector(where);

  // If ref is a comment, set teleport type to 'after'.
  if (isComment) how = "after";

  // Must be a valid reference element and method.
  if (!where) throw new Error(`Not a valid teleport reference: '${where}'`);
  if (typeof where[how] != "function") throw new Error(`Not a valid teleport method: '${how}'`);

  // Initial return ref is null.
  let returnRef = null;

  // If ref is not a comment, set a return reference comment.
  if (!isComment) {
    returnRef = document.createComment("teleported #" + what.id);
    what.before(returnRef);
  }

  // Teleport the target node.
  where[how](what);

  // Delete the comment node if element was returned to a comment reference.
  if (isComment) {
    where.remove();
  }

  // Return the return reference if it was teleported else return null if it was
  // returned to a comment reference.
  return returnRef;
}
