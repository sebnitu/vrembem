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
    .filter(
      (entry) => !dir || entry.id.startsWith(dir + "/") || entry.id === dir
    )
    // Sort by depth to build the tree depth first
    .sort((a, b) => b.id.split("/").length - a.id.split("/").length)
    // Build the tree
    .forEach((entry) => {
      // Split the path parts
      const parts = entry.id.split("/").slice(depth);

      // Reset current node to the root object
      let branch = tree;

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

export async function buildNaviTree(
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
      const group = await buildNaviTree(item.group, pathname);
      resolved.push({
        label: item.label,
        group: group,
        isParent: isParent(group)
      });
    }
    if ("collection" in item) {
      const collection = await getCollection(item.collection, item.filter);
      const tree = treeify(collection, item.dir);
      // TODO: Build the treeToNavi logic
      // const items = treeToNavi(tree, pathname);
      // resolved.push(...items);
    }
  }

  return resolved;
}
