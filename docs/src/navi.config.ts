export type ResolvedNaviItem =
  | { label: string; link: string; isCurrent: boolean; isParent: boolean }
  | { label: string; items: ResolvedNaviItem[]; isParent: boolean };

export type NaviConfig =
  | { label: string; link: string }
  | { label: string; items: { collection: string; filter?: string } }
  | { label: string; items: { label: string; link: string }[] };

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
