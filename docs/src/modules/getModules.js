import { getCollection } from "astro:content";

function moduleOrder(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

export async function getModules() {
  const entries = await getCollection("modules");
  entries.reverse().sort(moduleOrder);
  return entries;
}
