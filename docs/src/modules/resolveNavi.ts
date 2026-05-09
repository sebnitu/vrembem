import type { NaviItem } from "@/navi.config";
import type { CollectionKey } from "astro:content";
import { getCollection } from "astro:content";
import { getCollectionPath } from "@/helpers/getCollectionPath";
import { byCategory, byOrder, byTitle } from "@/helpers/sortCollectionBy";

export interface ResolvedNaviLink {
  label: string;
  link: string;
}

export interface ResolvedNaviGroup {
  label: string;
  items: ResolvedNaviItem[];
}

export type ResolvedNaviItem = ResolvedNaviLink | ResolvedNaviGroup;

export async function resolveNavi(
  items: NaviItem[]
): Promise<ResolvedNaviItem[]> {
  const resolved: ResolvedNaviItem[] = [];

  for (const item of items) {
    if ("link" in item) {
      // Static link — pass through as-is
      resolved.push({ label: item.label, link: item.link });
    } else if ("items" in item && "collection" in item.items) {
      // Collection reference — fetch entries and build links
      const collection = item.items.collection as CollectionKey;
      const entries = await getCollection(collection);

      // Filter the entries if a filter prop was provided
      const filtered = item.items.filter
        ? entries.filter(
            (entry) =>
              entry.id.startsWith(item.items.filter + "/") ||
              entry.id === item.items.filter
          )
        : entries;

      // Sort the collections
      if (collection === "packages") {
        entries.sort(
          byCategory(["core", "modules", "layout", "form-control", "component"])
        );
      } else {
        entries.sort(byTitle).sort(byOrder);
      }

      resolved.push({
        label: item.label,
        items: filtered.map((entry) => ({
          label: entry.data.title,
          link: getCollectionPath(entry)
        }))
      });
    } else if ("items" in item && Array.isArray(item.items)) {
      // Nested group — resolve recursively
      resolved.push({
        label: item.label,
        items: await resolveNavi(item.items)
      });
    }
  }

  return resolved;
}
