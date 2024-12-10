/**
 * Converts a string number value to milliseconds.
 *
 * @param {string|number} value
 *   The string value to convert. If the value is already a number, it's
 *   returned directly.
 *
 * @returns {number}
 *   A number representing the equivalent value in milliseconds.
 *
 * @throws {Error} If the value cannot be converted to a valid number.
 */
export function toMilliseconds(value: string | number): number {
  // Return the value directly if it's a number
  if (typeof value === "number") {
    return value;
  }

  const parsed = parseFloat(value);

  // Check if parsed value is a valid number
  if (!Number.isNaN(parsed)) {
    const isMilliseconds = value.includes("ms");
    return parsed * (isMilliseconds ? 1 : 1000);
  }

  // Throw an error if the value could not be converted
  throw new Error(`Could not convert value to milliseconds: ${value}`);
}
