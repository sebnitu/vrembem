import { getCollection } from "astro:content";

const categorySort = ["core", "modules", "layout", "form-control", "component"];

function packageOrder(a, b) {
  let result = 0,
    count = 0;
  while (count < categorySort.length && result == 0) {
    result = checkCategory(a, b, categorySort[count]);
    count++;
  }
  if (result == 0) {
    result = checkTitle(a, b);
  }
  return result;
}

function checkCategory(a, b, s) {
  if (a.data.category == s) return -1;
  if (b.data.category == s) return 1;
  return 0;
}

function checkTitle(a, b) {
  if (a.data.title < b.data.title) return -1;
  if (a.data.title > b.data.title) return 1;
  return 0;
}

export async function getPackages() {
  const entries = await getCollection("packages");
  entries.reverse().sort(packageOrder);
  return entries;
}
