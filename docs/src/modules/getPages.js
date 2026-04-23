import { getCollection } from "astro:content";

function byTitle(a, b) {
  if (a.data.title < b.data.title) return -1;
  if (a.data.title > b.data.title) return 1;
  return 0;
}

function byOrder(a, b) {
  const aOrder = typeof a.data.order === "number" ? a.data.order : null;
  const bOrder = typeof b.data.order === "number" ? b.data.order : null;
  if (aOrder === null && bOrder === null) return 0;
  if (aOrder === null) return -1;
  if (bOrder === null) return 1;
  return aOrder - bOrder;
}

export async function getPages(dir) {
  let entries = await getCollection("pages");
  // Filter the pages based on the provided directory name
  if (dir) {
    const prefix = dir + "/";
    entries = entries.filter(
      (entry) => entry.id.startsWith(prefix) || entry.id === dir
    );
  }
  entries.reverse().sort(byTitle).sort(byOrder);
  return entries;
}
