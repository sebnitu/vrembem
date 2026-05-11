import { getCollection, getEntry } from "astro:content";
import type { CollectionKey, CollectionEntry } from "astro:content";
import { getCollectionPath } from "@/helpers/getCollectionPath";
import { sortBy, byTitle, byOrder, type Comparator } from "@/helpers/sortBy";

export type NaviConfig =
  | { label: string; link: string }
  | { label: string; group: NaviConfig[] }
  | {
      collection: CollectionKey;
      dir?: string;
      filter?: (entry: CollectionEntry<CollectionKey>) => boolean;
      sort?: Comparator | Comparator[];
    };

export type NaviLink = {
  label: string;
  link: string;
  isActive: boolean;
  isParent: boolean;
  data: Record<string, any>;
};

export type NaviGroup = {
  label: string;
  group: NaviItem[];
  isParent: boolean;
};

export type NaviItem = NaviLink | NaviGroup;

function isParent(group: NaviItem[]) {
  return group.some((entry) =>
    "isActive" in entry ? entry.isActive || entry.isParent : entry.isParent
  );
}

function getComparator(sort: Comparator | Comparator[] | undefined) {
  // If sort is an array, return as a spread on its own
  if (Array.isArray(sort)) return sortBy(...sort);
  // If sort is a single comparator, add it along with the defaults
  if (sort) return sortBy(sort, byOrder, byTitle);
  // If no sort is provided, just pass the defaults
  return sortBy(byOrder, byTitle);
}

// TODO: Differentiate between index files and named index, e.g.:
// - core.mdx        path: "core"  group: index [group]
// - core/index.mdx  path: "core"  group: [index group]
function treeify(collection: CollectionEntry<CollectionKey>[], dir?: string) {
  const tree: Record<string, any> = {};
  const depth = dir ? dir.split("/").length : 0;
  collection
    // Filter by directory path if provided
    .filter((entry) => {
      return !dir || entry.id.startsWith(dir + "/") || entry.id === dir;
    })
    // Sort by depth to build the tree depth first
    .sort((a, b) => b.id.split("/").length - a.id.split("/").length)
    // Build the tree
    .forEach((entry) => {
      // Split the path parts
      const parts = entry.id.split("/").slice(depth);

      // Reset current node to the root object
      let branch = tree;

      // Handle root index (empty parts after slicing dir prefix)
      if (parts.length === 0) {
        branch["index"] = entry;
        return;
      }

      // Loop through the paths e.g.: core/plugins/custom
      parts.forEach((part: string, index: number) => {
        const isLeaf = index === parts.length - 1;

        // Handle directory index pages by renaming them to index
        if (isLeaf && Object.hasOwn(branch, part)) {
          branch = branch[part];
          part = "index";
        }

        // Recurse down the tree if this isn’t the last node
        if (!isLeaf) {
          branch[part] ||= {};
          branch = branch[part];
        } else {
          branch[part] = entry;
        }
      });
    });

  return tree;
}

// TODO: Convert directory name to a better label
// - Give the text title case (or just capitalize the first word)
// - replace dashes ("-") with spaces (" ")
function treeToNavi(
  tree: Record<string, any>,
  pathname: string,
  comparator: Comparator
): NaviItem[] {
  const index: NaviItem[] = [];
  const items: NaviItem[] = [];

  // Process index entry first if it exists
  if (tree.index && "id" in tree.index) {
    const link = getCollectionPath(tree.index);
    index.push({
      label: tree.index.data.title,
      link,
      isActive: pathname === link,
      isParent: false,
      data: tree.index.data
    });
  }

  // Process the rest
  for (const key of Object.keys(tree)) {
    if (key === "index") continue;
    const value = tree[key];

    if ("id" in value && "data" in value) {
      const link = getCollectionPath(value);
      items.push({
        label: value.data.title,
        link,
        isActive: pathname === link,
        isParent: pathname.startsWith(link) && pathname !== link,
        data: value.data
      });
    } else {
      const group = treeToNavi(value, pathname, comparator);
      items.push({
        label: key,
        group,
        isParent: isParent(group)
      });
    }
  }

  // TODO: Improve sorting of nested groups
  // Apply sorting
  // Since this is run recursively, it's applied on every level
  items.sort(comparator);

  return [...index, ...items];
}

// TODO: Create a function for creating the NaviLink object
// TODO: Create a function for creating the NaviGroup object
export async function buildNaviFromConfig(
  config: NaviConfig[],
  pathname: string
): Promise<NaviItem[]> {
  const resolved: NaviItem[] = [];

  for (const item of config) {
    if ("link" in item) {
      const entry = await getEntry("pages", item.link.replace(/^\//, ""));
      resolved.push({
        label: item.label,
        link: item.link,
        isActive: pathname === item.link,
        isParent: pathname.startsWith(item.link) && pathname !== item.link,
        data: entry?.data || {}
      });
    }
    if ("group" in item) {
      const group = await buildNaviFromConfig(item.group, pathname);
      resolved.push({
        label: item.label,
        group: group,
        isParent: isParent(group)
      });
    }
    if ("collection" in item) {
      const collection = await getCollection(item.collection, item.filter);
      const tree = treeify(collection, item.dir);
      const items = treeToNavi(tree, pathname, getComparator(item.sort));
      resolved.push(...items);
    }
  }

  return resolved;
}
