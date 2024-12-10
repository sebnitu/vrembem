/**
 * Get the Vrembem variables prefix from the `--vb-prefix` custom property.
 *
 * @returns {string} The value of the defined prefix variable.
 */
export function getPrefix(): string {
  return getComputedStyle(document.body).getPropertyValue("--vb-prefix").trim();
}
