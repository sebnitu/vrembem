import { getModuleMeta } from "@/helpers/getModuleMeta";
import type { CollectionEntry, CollectionKey } from "astro:content";

export function getCollectionPath(
  entry: CollectionEntry<CollectionKey>,
  hash?: string
) {
  // Initialize the result
  let result = "/";

  // Prepend the packages path for both packages and modules
  if (entry.collection === "packages" || entry.collection === "modules") {
    result += "packages/";
  }

  // Use the meta path for modules (excludes the group directory)
  // Otherwise, append the entry id to the result
  if (entry.collection === "modules") {
    result += getModuleMeta(entry).path;
  } else {
    result += entry.id;
  }

  // Add a hash anchor if it was provided
  if (hash) {
    result += `#${hash}`;
  }

  // Return the path
  return result;
}
