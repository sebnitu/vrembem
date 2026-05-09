export type ResolvedNaviItem =
  | { label: string; link: string; isCurrent: boolean; isParent: boolean }
  | { label: string; items: ResolvedNaviItem[]; isParent: boolean };

export type NaviConfigItem =
  | { label: string; link: string }
  | { collection: string; filter?: string };

export type NaviConfig =
  | { label: string; link: string }
  | { label: string; items: NaviConfigItem[] };

const sidebar: NaviConfig[] = [
  {
    label: "Guide",
    items: [{ collection: "pages", filter: "guide" }]
  },
  {
    label: "Packages",
    items: [
      { label: "Overview", link: "/packages" },
      { collection: "packages" }
    ]
  }
];

export const navi = { sidebar };
