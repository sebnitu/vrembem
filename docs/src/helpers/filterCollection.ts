import type { CollectionEntry, CollectionKey } from "astro:content";
import { getModuleMeta } from "@/helpers/getModuleMeta";

export function filterCollection(
  entry: CollectionEntry<CollectionKey> | undefined
) {
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

  // Unique filter logic for modules
  if (entry?.collection === "modules") {
    const moduleMeta = getModuleMeta(entry);
    // Return a modules filter function
    return (entry: CollectionEntry<CollectionKey>) => {
      if (entry.collection !== "modules") return;
      const entryMeta = getModuleMeta(entry);
      // Only return modules that share the same parent and group
      return (
        entryMeta.parent === moduleMeta?.parent &&
        entryMeta.group === moduleMeta?.group
      );
    };
  }

  // Return everything else
  return () => true;
}
