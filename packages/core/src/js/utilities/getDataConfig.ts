/**
 * Get and parses a JSON object from a `data-*` attribute of an HTML element.
 *
 * @param {HTMLElement} el
 *   Element to get the query the data from.
 * @param {string} [dataConfig="config"]
 *   The name of the data attribute to get.
 *
 * @returns {JSON}
 *   A parsed JSON object from the `data-*` attribute, or an empty object
 *   if the attribute is not found or invalid.
 */
export function getDataConfig(
  el: HTMLElement,
  dataConfig: string = "config"
): JSON {
  const string = el.getAttribute(`data-${dataConfig}`) || "";
  const json = string.replace(/'/g, '"');
  return json ? JSON.parse(json) : {};
}
