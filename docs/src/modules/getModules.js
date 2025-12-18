import { getCollection } from "astro:content";

function byTitle(a, b) {
  if (a.data.title === "Custom Plugins") return 1;
  if (b.data.title === "Custom Plugins") return -1;
  if (a.data.title < b.data.title) return -1;
  if (a.data.title > b.data.title) return 1;
  return 0;
}

function byOrder(a, b) {
  const aOrder = typeof a.data.order === "number" ? a.data.order : null;
  const bOrder = typeof b.data.order === "number" ? b.data.order : null;
  if (aOrder !== null && bOrder !== null) return aOrder - bOrder;
  if (aOrder !== null) return -1;
  if (bOrder !== null) return 1;
  return 0;
}

export async function getModules(group) {
  let entries = await getCollection("modules");
  if (group) {
    entries = entries.filter((entry) => entry.data.group === group);
  }
  entries.reverse().sort(byTitle).sort(byOrder);
  return entries;
}
