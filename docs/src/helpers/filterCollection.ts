import type { CollectionEntry, CollectionKey } from "astro:content";

export function filterCollection(entry?: CollectionEntry<CollectionKey>) {
  // Unique filter logic for pages
  if (entry?.collection === "pages") {
    const currentRoot = entry.id.split("/")[0];
    // Return a pages filter function
    return (entry: CollectionEntry<CollectionKey>) => {
      if (entry.collection !== "pages") return;
      const entryRoot = entry.id.split("/")[0];
      return entryRoot === currentRoot;
    };
  }

  // Return everything else
  return () => true;
}
