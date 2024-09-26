export function getPrefix() {
  return getComputedStyle(document.body).getPropertyValue("--vb-prefix").trim();
}
