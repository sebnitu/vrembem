/**
 * Teleports an element in the DOM based on a reference and teleport method.
 *
 * @param {HTMLElement} what - What element to teleport.
 * @param {HTMLElement|string} where - Where to teleport the element.
 * @param {string} how - How (method) to teleport the element.
 *   Available options: "after", "before", "append" or "prepend".
 *
 * @return {function}
 *   The return function for returning the node back to its reference location.
 */
export function teleportElement(
  what: HTMLElement,
  where: HTMLElement | string,
  how: "after" | "before" | "append" | "prepend"
): Function {
  // If `where` is a string, ensure that it returns an HTML element
  if (typeof where === "string") {
    const whereEl = document.querySelector(where);
    if (!whereEl) {
      throw new Error(`No teleport reference found for selector: ${where}`);
    }
    where = whereEl as HTMLElement;
  } else if (!(where instanceof HTMLElement)) {
    // If `where` is not a string or HTML element, throw an error
    throw new Error(`Not a valid teleport reference: '${where}'`);
  }

  // Ensure that `how` is a valid teleport method
  if (typeof where[how] != "function")
    throw new Error(`Not a valid teleport method: '${how}'`);

  // If the return element isn't already a return reference comment create a
  // return reference comment and add it before the `what` node.
  let returnRef: Comment | null = document.createComment(
    "teleported #" + what.id
  );
  what.before(returnRef);

  // Teleport the target node
  where[how](what);

  // Return cleanup function for returning node to its original location
  return () => {
    if (returnRef) {
      // Teleport the element back to the return reference
      returnRef.after(what);
      // Delete the return reference comment and set value to null
      returnRef.remove();
      returnRef = null;
    }
  };
}
