export function getPrefix() {
  return getComputedStyle(document.body).getPropertyValue("--vrembem-prefix").trim();
}
