import { getCollection } from "astro:content";

const statusSort = ["settings", "layers", "layout", "check-square", "circle"];

function packageOrder(a, b) {
  let result = 0,
    count = 0;
  while (count < statusSort.length && result == 0) {
    result = checkString(a, b, statusSort[count]);
    count++;
  }
  if (result == 0) {
    result = checkTitle(a, b);
  }
  return result;
}

function checkString(a, b, s) {
  if (a.data.status == s) {
    return -1;
  }
  if (b.data.status == s) {
    return 1;
  }
  return 0;
}

function checkTitle(a, b) {
  if (a.data.title < b.data.title) {
    return -1;
  }
  if (a.data.title > b.data.title) {
    return 1;
  }
  return 0;
}

export async function getPackages() {
  const entries = await getCollection("packages");
  entries.reverse().sort(packageOrder);
  return entries;
}
