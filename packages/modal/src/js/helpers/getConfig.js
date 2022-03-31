export function getConfig(el) {
  const string = el.getAttribute(`data-${this.settings.dataConfig}`) || '';
  const json = string.replace(/'/g, '"');
  return (json) ? JSON.parse(json) : {};
}
