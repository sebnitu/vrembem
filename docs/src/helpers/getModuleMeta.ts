import type { CollectionEntry } from "astro:content";

export function getModuleMeta(entry: CollectionEntry<"modules">) {
  const parts = entry.id.split("/");
  return {
    path: `${parts[0]}/${parts[parts.length - 1]}`,
    parent: parts[0],
    group: entry.data.anchor ?? (parts.length > 2 ? parts[1] : undefined)
  };
}
