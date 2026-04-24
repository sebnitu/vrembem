interface CollectionType {
  data: {
    title: string;
    order?: number;
    category?: string;
  };
}

export function byTitle(a: CollectionType, b: CollectionType) {
  if (a.data.title < b.data.title) return -1;
  if (a.data.title > b.data.title) return 1;
  return 0;
}

export function byOrder(a: CollectionType, b: CollectionType) {
  const aOrder = typeof a.data.order === "number" ? a.data.order : null;
  const bOrder = typeof b.data.order === "number" ? b.data.order : null;
  if (aOrder === null && bOrder === null) return 0;
  if (aOrder === null) return -1;
  if (bOrder === null) return 1;
  return aOrder - bOrder;
}

export function byCategory(order: string[]) {
  return (a: CollectionType, b: CollectionType) => {
    const aci = a.data.category ? order.indexOf(a.data.category) : -1;
    const bci = b.data.category ? order.indexOf(b.data.category) : -1;

    // If categories are different, sort by category
    if (aci !== bci) {
      if (aci === -1) return 1;
      if (bci === -1) return -1;
      return aci - bci;
    }

    // If categories are the same, sort by title
    return a.data.title.localeCompare(b.data.title, undefined, {
      sensitivity: "base"
    });
  };
}
