export function applyPositionStyle(
  el: HTMLElement,
  x: number,
  y: number
): void {
  Object.assign(el.style, {
    left: x != null ? `${x}px` : "",
    top: y != null ? `${y}px` : ""
  });
}
