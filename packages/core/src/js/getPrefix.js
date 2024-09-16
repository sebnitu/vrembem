export function getPrefix() {
  return getComputedStyle(document.body).getPropertyValue("--vrembem-variable-prefix").trim();
}
