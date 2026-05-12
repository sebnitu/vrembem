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
