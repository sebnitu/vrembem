import { getCollection } from "astro:content";

export async function getPages(group) {
  let entries = await getCollection("pages");
  if (group) {
    const prefix = group + "/";
    entries = entries.filter(
      (entry) => entry.id.startsWith(prefix) || entry.id === group
    );
  }
  entries.sort((a, b) =>
    a.data.title.localeCompare(b.data.title, undefined, { sensitivity: "base" })
  );
  return entries;
}
