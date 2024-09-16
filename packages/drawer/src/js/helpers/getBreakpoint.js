import { getPrefix } from "@vrembem/core";

export function getBreakpoint(drawer) {
  const prefix = getPrefix();
  const bp = drawer.getAttribute(`data-${this.settings.dataBreakpoint}`);
  if (this.settings.breakpoints && this.settings.breakpoints[bp]) {
    return this.settings.breakpoints[bp];
  } else if (getComputedStyle(document.body).getPropertyValue(`--${prefix}breakpoint-${bp}`).trim()) {
    return getComputedStyle(document.body).getPropertyValue(`--${prefix}breakpoint-${bp}`).trim();
  } else {
    return bp;
  }
}
