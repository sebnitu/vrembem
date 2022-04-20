export function getBreakpoint(drawer) {
  const prefix = getVariablePrefix();
  const bp = drawer.getAttribute(`data-${this.settings.dataBreakpoint}`);
  if (this.settings.breakpoints && this.settings.breakpoints[bp]) {
    return this.settings.breakpoints[bp];
  } else if (getComputedStyle(document.body).getPropertyValue(prefix + bp).trim()) {
    return getComputedStyle(document.body).getPropertyValue(prefix + bp).trim();
  } else {
    return bp;
  }
}

function getVariablePrefix() {
  let prefix = '--';
  prefix += getComputedStyle(document.body).getPropertyValue('--vrembem-variable-prefix').trim();
  prefix += 'breakpoint-';
  return prefix;
}
