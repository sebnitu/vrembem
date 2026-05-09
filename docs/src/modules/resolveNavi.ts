import type { NaviConfig, ResolvedNaviItem } from "@/navi.config";
import type { CollectionKey } from "astro:content";
import { getCollection } from "astro:content";
import { getCollectionPath } from "@/helpers/getCollectionPath";
import { byCategory, byOrder, byTitle } from "@/helpers/sortCollectionBy";

export async function resolveNavi(
  config: NaviConfig[],
  pathname: string
): Promise<ResolvedNaviItem[]> {
  const resolved: ResolvedNaviItem[] = [];

  for (const item of config) {
    if ("link" in item) {
      // Static link: push to the resolved array
      resolved.push({
        label: item.label,
        link: item.link,
        isCurrent: pathname === item.link,
        isParent: pathname.startsWith(item.link) && pathname !== item.link
      });
    } else if ("items" in item && "collection" in item.items) {
      // Collection reference: fetch entries and build links
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

      // Sort the entries
      if (collection === "packages") {
        filtered.sort(
          byCategory(["core", "modules", "layout", "form-control", "component"])
        );
      } else {
        filtered.sort(byTitle).sort(byOrder);
      }

      const children = filtered.map((entry) => {
        const link = getCollectionPath(entry);
        return {
          label: entry.data.title,
          link,
          isCurrent: pathname === link,
          isParent: pathname.startsWith(link) && pathname !== link
        };
      });

      resolved.push({
        label: item.label,
        items: children,
        isParent: children.some((child) => child.isCurrent || child.isParent)
      });
    } else if ("items" in item && Array.isArray(item.items)) {
      // Nested group: push to resolved recursively
      const children = await resolveNavi(item.items, pathname);
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
