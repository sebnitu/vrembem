/**
 * Gets and parses a JSON object from a `data-*` attribute of an HTML element.
 *
 * @param el
 *   Element to get the data from.
 * @param attr
 *   The name of the data attribute to get. Defaults to "config".
 *
 * @returns
 *   A parsed object from the `data-*` attribute, or an empty object
 *   if the attribute is not found or invalid.
 */
export function getDataConfig(
  el: HTMLElement,
  attr: string = "config"
): Record<string, any> {
  const string = el.getAttribute(`data-${attr}`) || "";
  const json = string.replace(/'/g, '"');
  return json ? JSON.parse(json) : {};
}
