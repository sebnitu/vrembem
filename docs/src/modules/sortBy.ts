import type { NaviLink, NaviItem } from "@/modules/navigation";

export type Comparator = (a: NaviItem, b: NaviItem) => number;

function getData(item: NaviItem): Record<string, any> {
  if ("data" in item) return item.data;
  // For groups, use the index entry's data if it exists
  const index = item.group.find((child): child is NaviLink => "data" in child);
  return index?.data ?? {};
}

export function sortBy(
  ...comparators: ((a: NaviItem, b: NaviItem) => number)[]
) {
  return (a: NaviItem, b: NaviItem) => {
    for (const compare of comparators) {
      const result = compare(a, b);
      if (result !== 0) return result;
    }
    return 0;
  };
}

export function byTitle(a: NaviItem, b: NaviItem) {
  return getData(a).title.localeCompare(getData(b).title, undefined, {
    sensitivity: "base"
  });
}

export function byOrder(a: NaviItem, b: NaviItem) {
  const aOrder = typeof getData(a).order === "number" ? getData(a).order : null;
  const bOrder = typeof getData(b).order === "number" ? getData(b).order : null;
  if (aOrder === null && bOrder === null) return 0;
  if (aOrder === null) return bOrder! >= 0 ? 1 : -1;
  if (bOrder === null) return aOrder >= 0 ? -1 : 1;
  return aOrder - bOrder;
}

export function byCategory(order: string[]) {
  return (a: NaviItem, b: NaviItem) => {
    const aci = getData(a).category ? order.indexOf(getData(a).category) : -1;
    const bci = getData(b).category ? order.indexOf(getData(b).category) : -1;
    if (aci === bci) return 0;
    if (aci === -1) return 1;
    if (bci === -1) return -1;
    return aci - bci;
  };
}
