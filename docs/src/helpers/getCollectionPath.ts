import { getModuleMeta } from "@/helpers/getModuleMeta";
import type { CollectionEntry, CollectionKey } from "astro:content";

export function getCollectionPath(
  entry: CollectionEntry<CollectionKey>,
  hash?: string
) {
  // Initialize the result
  let result = "/";

  // Pages are top-level and receive no prefix
  // > "/{id}"
  if (entry.collection === "pages") {
    result += entry.id;
  }

  // Modules are prefixed with the packages collection
  // > "/packages/{parent}/{module}"
  else if (entry.collection === "modules") {
    result += `packages/${getModuleMeta(entry).path}`;
  }
  
  // Everything else is prefixed with their own collection name
  // > "/{collection}/{id}"
  else {
    result += `${entry.collection}/${entry.id}`;
  }

  // Add a hash anchor if it was provided
  if (hash) {
    result += `#${hash}`;
  }

  // Return the path
  return result;
}
