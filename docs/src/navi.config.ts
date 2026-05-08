export type NaviItem =
  | { label: string; link: string }
  | { label: string; items: { collection: string } }
  | { label: string; items: NaviItem[] };

const sidebar: NaviItem[] = [
  {
    label: "Guide",
    items: { collection: "pages" }
  },
  {
    label: "Packages",
    items: { collection: "packages" }
  }
];

export const navi = { sidebar };
