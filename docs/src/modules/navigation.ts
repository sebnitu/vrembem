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

function dirToLabel(dir: string) {
  return dir.replace("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function getComparator(sort: Comparator | Comparator[] | undefined) {
  // If sort is an array, return as a spread on its own
  if (Array.isArray(sort)) return sortBy(...sort);
  // If sort is a single comparator, add it along with the defaults
  if (sort) return sortBy(sort, byOrder, byTitle);
  // If no sort is provided, just pass the defaults
  return sortBy(byOrder, byTitle);
}

function flattenNavi(items: NaviItem[]): NaviLink[] {
  const links: NaviLink[] = [];
  for (const item of items) {
    if ("link" in item) {
      links.push(item);
    } else if ("group" in item) {
      links.push(...flattenNavi(item.group));
    }
  }
  return links;
}

function getPageNavi(tree: NaviItem[], pathname: string) {
  const links = flattenNavi(tree);
  const index = links.findIndex((link) => link.link === pathname);
  return {
    prev: index > 0 ? links[index - 1] : null,
    next: index >= 0 && index < links.length - 1 ? links[index + 1] : null
  };
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

function buildNaviLink(
  label: string,
  link: string,
  pathname: string,
  data: Record<string, any> = {}
): NaviLink {
  return {
    label,
    link,
    isActive: pathname === link,
    isParent: pathname.startsWith(link) && pathname !== link,
    data: data
  };
}

function buildNaviGroup(label: string, group: NaviItem[]): NaviGroup {
  return {
    label: label,
    group: group,
    isParent: isParent(group)
  };
}

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
    const data = tree.index.data;
    index.push(buildNaviLink(data.title, link, pathname, data));
  }

  // Process the rest
  for (const key of Object.keys(tree)) {
    if (key === "index") continue;
    const value = tree[key];

    if ("id" in value && "data" in value) {
      const link = getCollectionPath(value);
      items.push(buildNaviLink(value.data.title, link, pathname, value.data));
    } else {
      const group = treeToNavi(value, pathname, comparator);
      items.push(buildNaviGroup(dirToLabel(key), group));
    }
  }

  // Apply sorting
  // Since this is run recursively, it's applied on every level
  items.sort(comparator);

  return [...index, ...items];
}

async function configToNavi(config: NaviConfig[], pathname: string) {
  const navi: NaviItem[] = [];

  for (const item of config) {
    if ("link" in item) {
      const entry = await getEntry("pages", item.link.replace(/^\//, ""));
      navi.push(buildNaviLink(item.label, item.link, pathname, entry?.data));
    }
    if ("group" in item) {
      const group = await configToNavi(item.group, pathname);
      navi.push(buildNaviGroup(item.label, group));
    }
    if ("collection" in item) {
      const collection = await getCollection(item.collection, item.filter);
      const tree = treeify(collection, item.dir);
      const items = treeToNavi(tree, pathname, getComparator(item.sort));
      navi.push(...items);
    }
  }

  return navi;
}

export async function buildNaviFromConfig(
  config: NaviConfig[],
  pathname: string
) {
  const navi = await configToNavi(config, pathname);

  return {
    navi,
    ...getPageNavi(navi, pathname)
  };
}
