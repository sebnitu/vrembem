import { getCollection } from 'astro:content';

function packageOrder(a, b) {
  return a.data.state == 'settings' ? -1 : b.data.state == 'settings' ? 1 : (a.data.state == 'layers' ? -1 : b.data.state == 'layers' ? 1 : 0);
}

export async function getPackages() {
  const entries = await getCollection('packages');
  entries.sort(packageOrder);
  return entries;
}
