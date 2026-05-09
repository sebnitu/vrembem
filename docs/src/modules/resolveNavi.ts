import type { NaviConfig, NaviConfigItem } from "@/navi.config";
import type { CollectionKey } from "astro:content";
import { getCollection } from "astro:content";
import { getCollectionPath } from "@/helpers/getCollectionPath";
import { byCategory, byOrder, byTitle } from "@/helpers/sortCollectionBy";

export type ResolvedNaviItem =
  | { label: string; link: string; isCurrent: boolean; isParent: boolean }
  | { label: string; items: ResolvedNaviItem[]; isParent: boolean };

function resolveLink(
  label: string,
  link: string,
  pathname: string
): ResolvedNaviItem {
  return {
    label,
    link,
    isCurrent: pathname === link,
    isParent: pathname.startsWith(link) && pathname !== link
  };
}

async function resolveGroup(
  items: NaviConfigItem[],
  pathname: string
): Promise<ResolvedNaviItem[]> {
  const resolved: ResolvedNaviItem[] = [];

  for (const child of items) {
    if ("link" in child) {
      // Static link
      resolved.push(resolveLink(child.label, child.link, pathname));
    } else if ("items" in child) {
      // Nested group: resolve recursively
      const children = await resolveGroup(child.items, pathname);
      resolved.push({
        label: child.label,
        items: children,
        isParent: children.some((c) =>
          "isCurrent" in c ? c.isCurrent || c.isParent : c.isParent
        )
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

      // Sort the entries
      if (collection === "packages") {
        filtered.sort(
          byCategory(["core", "modules", "layout", "form-control", "component"])
        );
      } else {
        filtered.sort(byTitle).sort(byOrder);
      }

      // Spread collection entries into the list
      for (const entry of filtered) {
        const link = getCollectionPath(entry);
        resolved.push(resolveLink(entry.data.title, link, pathname));
      }
    }
  }

  return resolved;
}

export async function resolveNavi(
  config: NaviConfig[],
  pathname: string
): Promise<ResolvedNaviItem[]> {
  const resolved: ResolvedNaviItem[] = [];

  for (const item of config) {
    if ("link" in item) {
      // Top-level static link
      resolved.push(resolveLink(item.label, item.link, pathname));
    } else if ("items" in item) {
      // Group with mixed items
      const children = await resolveGroup(item.items, pathname);
      resolved.push({
        label: item.label,
        items: children,
        isParent: children.some((child) =>
          "isCurrent" in child
            ? child.isCurrent || child.isParent
            : child.isParent
        )
      });
    }
  }

  return resolved;
}
