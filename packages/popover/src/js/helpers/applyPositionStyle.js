export function applyPositionStyle(el, x, y) {
  Object.assign(el.style, {
    left: x != null ? `${x}px` : "",
    top: y != null ? `${y}px` : ""
  });
}
