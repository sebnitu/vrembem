import { getCollection } from "astro:content";

const categorySort = ["core", "modules", "layout", "form-control", "component"];

function packageOrder(a, b) {
  const aci = categorySort.indexOf(a.data.category);
  const bci = categorySort.indexOf(b.data.category);

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
}

export async function getPackages() {
  const entries = await getCollection("packages");
  entries.sort(packageOrder);
  return entries;
}
