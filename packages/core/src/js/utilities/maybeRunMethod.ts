/**
 * Conditionally calls a method on an object if it exists and is a function.
 *
 * @param {object} obj - The object to check the method against and maybe call.
 * @param {string} name - The name of the method to potentially call.
 * @param {any} args - Arguments to pass to the method if it is called.
 *
 * @return {promise}
 *   A promise that resolves when the method (if called) completes, or
 *   immediately if no method is called.
 */
export async function maybeRunMethod(
  obj: Record<string, any>,
  name: string,
  ...args: unknown[]
): Promise<void> {
  if (name in obj && typeof obj[name] === "function") {
    await obj[name](...args);
  }
}
