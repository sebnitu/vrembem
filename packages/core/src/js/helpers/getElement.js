export function getElement(query) {
  if (typeof query === "string") {
    return document.getElementById(query);
  } else if (query instanceof HTMLElement) {
    return query;
  }
  return undefined;
}
