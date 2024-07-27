export function getPrefix() {
  const result = getComputedStyle(document.body).getPropertyValue("--vb-prefix").trim();
  return result || "vb-";
}
