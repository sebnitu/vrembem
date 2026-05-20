/**
 * Get the Vrembem variables prefix from the `--vb-prefix-tokens` custom property.
 *
 * @returns {string} The value of the defined prefix variable.
 */
export function getPrefix(delimiter: string = ""): string {
  const prefix = getComputedStyle(document.body)
    .getPropertyValue("--vb-prefix-tokens")
    .trim();
  return prefix ? `${prefix}${delimiter}` : "";
}
