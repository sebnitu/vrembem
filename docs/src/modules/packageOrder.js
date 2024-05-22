export function packageOrder(a, b) {
  return a.data.state == 'settings' ? -1 : b.data.state == 'settings' ? 1 : (a.data.state == 'layers' ? -1 : b.data.state == 'layers' ? 1 : 0);
}
