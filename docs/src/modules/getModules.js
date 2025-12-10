import { getCollection } from "astro:content";

function moduleOrder(a, b) {
  if (a.id === "core/plugins") return 1;
  if (b.id === "core/plugins") return -1;
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

export async function getModules(group) {
  let entries = await getCollection("modules");
  if (group) {
    entries = entries.filter((entry) => entry.data.group === group);
  }
  entries.reverse().sort(moduleOrder);
  return entries;
}
