export function updateStackIndex(stack) {
  stack.forEach((entry, index) => {
    entry.el.style.zIndex = null;
    const value = getComputedStyle(entry.el)['z-index'];
    entry.el.style.zIndex = parseInt(value) + index + 1;
  });
}
