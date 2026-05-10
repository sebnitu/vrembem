import { getCollection } from "astro:content";
import type { CollectionKey, CollectionEntry } from "astro:content";
import { getCollectionPath } from "@/helpers/getCollectionPath";

export type NaviConfig =
  | { label: string; link: string }
  | { label: string; group: NaviConfig[] }
  | {
      collection: CollectionKey;
      dir?: string;
      filter?: (entry: CollectionEntry<CollectionKey>) => boolean;
    };

export type NaviLink = {
  label: string;
  link: string;
  isActive: boolean;
  isParent: boolean;
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

function treeToNavi(tree: Record<string, any>, pathname: string): NaviItem[] {
  const items: NaviItem[] = [];

  // Process index entry first if it exists
  if (tree.index && "id" in tree.index) {
    const link = getCollectionPath(tree.index);
    items.push({
      label: tree.index.data.title,
      link,
      isActive: pathname === link,
      isParent: false
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
        isParent: pathname.startsWith(link) && pathname !== link
      });
    } else {
      const group = treeToNavi(value, pathname);
      items.push({
        label: key,
        group,
        isParent: isParent(group)
      });
    }
  }

  return items;
}

export async function buildNaviFromConfig(
  config: NaviConfig[],
  pathname: string
): Promise<NaviItem[]> {
  const resolved: NaviItem[] = [];

  for (const item of config) {
    if ("link" in item) {
      resolved.push({
        label: item.label,
        link: item.link,
        isActive: pathname === item.link,
        isParent: pathname.startsWith(item.link) && pathname !== item.link
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
      const items = treeToNavi(tree, pathname);
      resolved.push(...items);
    }
  }

  return resolved;
}
