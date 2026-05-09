export type NaviItem = {
  label: string;
  link: string;
};

export type NaviItems = {
  label: string;
  items: ResolvedNaviItem[];
};

export type ResolvedNaviItem =
  | { label: string; link: string; isCurrent: boolean; isParent: boolean }
  | { label: string; items: ResolvedNaviItem[]; isParent: boolean };

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
