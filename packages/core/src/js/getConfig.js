export function getConfig(el, dataConfig = "config") {
  const string = el.getAttribute(`data-${dataConfig}`) || "";
  const json = string.replace(/'/g, "\"");
  return (json) ? JSON.parse(json) : {};
}
