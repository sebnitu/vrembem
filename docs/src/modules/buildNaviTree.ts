import type { CollectionKey } from "astro:content";
import { getCollection } from "astro:content";
import { getCollectionPath } from "@/helpers/getCollectionPath";
import { byCategory, byTitle, byId } from "@/helpers/sortCollectionBy";

export type NaviConfigItem =
  | { label: string; link: string }
  | { collection: string; filter?: string }
  | { label: string; group: NaviConfigItem[] };

export type NaviConfig =
  | { label: string; link: string }
  | { label: string; group: NaviConfigItem[] };

export type NaviLink = {
  label: string;
  link: string;
  isCurrent: boolean;
  isParent: boolean;
};

export type NaviGroup = {
  label: string;
  group: NaviItem[];
  isParent: boolean;
};

export type NaviItem = NaviLink | NaviGroup;

function isParent(children: NaviItem[]) {
  return children.some((child) =>
    "isCurrent" in child ? child.isCurrent || child.isParent : child.isParent
  );
}

function resolveLink(label: string, link: string, pathname: string): NaviItem {
  return {
    label,
    link,
    isCurrent: pathname === link,
    isParent: pathname.startsWith(link) && pathname !== link
  };
}

async function resolveGroup(
  group: NaviConfigItem[],
  pathname: string
): Promise<NaviItem[]> {
  const resolved: NaviItem[] = [];

  for (const child of group) {
    if ("link" in child) {
      // Static link
      resolved.push(resolveLink(child.label, child.link, pathname));
    } else if ("group" in child) {
      // Nested group: resolve recursively
      const children = await resolveGroup(child.group, pathname);
      resolved.push({
        label: child.label,
        group: children,
        isParent: isParent(children)
      });
    } else if ("collection" in child) {
      // Collection reference: fetch entries and build links
      const collection = child.collection as CollectionKey;
      const entries = await getCollection(collection);

      // Filter the entries if a filter was provided
      const filtered = child.filter
        ? entries.filter(
            (entry) =>
              entry.id.startsWith(child.filter + "/") ||
              entry.id === child.filter
          )
        : entries;

      let modules;

      // Sort the entries
      if (collection === "packages") {
        filtered.sort(
          byCategory(["core", "modules", "layout", "form-control", "component"])
        );
        modules = await getCollection("modules");
        modules.sort(byId);
      } else {
        filtered.sort(byTitle);
      }

      // Resolve collection links and groups
      for (const entry of filtered) {
        const link = getCollectionPath(entry);
        const children =
          modules
            ?.filter((item) => {
              return item.id.includes(entry.id);
            })
            .map((child) => {
              const childLink = getCollectionPath(child);
              return resolveLink(child.data.title, childLink, pathname);
            }) || [];
        if (children.length) {
          const entryLink = resolveLink("Overview", link, pathname);
          const group = [entryLink, ...children];
          resolved.push({
            label: entry.data.title,
            group,
            isParent: isParent(children)
          });
        } else {
          resolved.push(resolveLink(entry.data.title, link, pathname));
        }
      }
    }
  }

  return resolved;
}

export async function buildNaviTree(
  config: NaviConfig[],
  pathname: string
): Promise<NaviItem[]> {
  const resolved: NaviItem[] = [];

  for (const item of config) {
    if ("link" in item) {
      resolved.push(resolveLink(item.label, item.link, pathname));
    } else if ("group" in item) {
      const children = await resolveGroup(item.group, pathname);
      resolved.push({
        label: item.label,
        group: children,
        isParent: isParent(children)
      });
    }
  }

  return resolved;
}
