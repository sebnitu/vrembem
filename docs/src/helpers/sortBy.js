export function byTitle(a, b) {
  if (a.data.title < b.data.title) return -1;
  if (a.data.title > b.data.title) return 1;
  return 0;
}

export function byOrder(a, b) {
  const aOrder = typeof a.data.order === "number" ? a.data.order : null;
  const bOrder = typeof b.data.order === "number" ? b.data.order : null;
  if (aOrder === null && bOrder === null) return 0;
  if (aOrder === null) return -1;
  if (bOrder === null) return 1;
  return aOrder - bOrder;
}

export function byCategory(order) {
  return (a, b) => {
    const aci = order.indexOf(a.data.category);
    const bci = order.indexOf(b.data.category);

    // If categories are different, sort by category
    if (aci !== bci) {
      // If either category is not found, put it at the end
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
