export function getConfig(el, dataConfig) {
  const string = el.getAttribute(`data-${dataConfig}`) || "";
  const json = string.replace(/'/g, "\"");
  return (json) ? JSON.parse(json) : {};
}
