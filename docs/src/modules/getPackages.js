import { getCollection } from "astro:content";

function packageOrder(a, b) {
  return a.data.status == "settings" ? -1 : b.data.status == "settings" ? 1 : (a.data.status == "layers" ? -1 : b.data.status == "layers" ? 1 : 0);
}

export async function getPackages() {
  const entries = await getCollection("packages");
  entries.sort(packageOrder);
  return entries;
}
