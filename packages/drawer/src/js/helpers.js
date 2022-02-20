export function getDrawer(drawerKey) {
  if (typeof drawerKey !== 'string') return drawerKey;
  return document.querySelector(
    `[data-${this.settings.dataDrawer}="${drawerKey}"]`
  );
}

export function drawerNotFound(key) {
  return Promise.reject(
    new Error(`Did not find drawer with key: "${key}"`)
  );
}
