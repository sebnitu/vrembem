/**
 * Converts a camelCase or PascalCase string into a kebab-case string.
 *
 * @param {string} value - The string to convert into kebab-case.
 *
 * @returns {string} A string in kebab-case format.
 */
export function toKebab(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
