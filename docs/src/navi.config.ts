export type NaviItem = {
  label: string;
  link: string;
};

export type NaviItems = {
  label: string;
  items: ResolvedNaviItem[];
};

export type ResolvedNaviItem = NaviItem | NaviItems;

export type NaviConfig =
  | NaviItem
  | { label: string; items: { collection: string; filter?: string } }
  | { label: string; items: NaviItem[] };

const sidebar: NaviConfig[] = [
  {
    label: "Guide",
    items: { collection: "pages", filter: "guide" }
  },
  {
    label: "Packages",
    items: { collection: "packages" } // TODO: Add packages "overview" page
  }
];

export const navi = { sidebar };
