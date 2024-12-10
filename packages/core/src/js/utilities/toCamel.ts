/**
 * Converts a kebab-case string into a camelCase string.
 *
 * @param {string} value - The string to convert from kebab-case to camelCase.
 *
 * @returns {string} A string in camelCase format.
 */
export function toCamel(value: string): string {
  return value
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
}
