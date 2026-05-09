import type { NaviConfig } from "@/modules/buildNaviTree";

const sidebar: NaviConfig[] = [
  {
    label: "Guide",
    group: [{ collection: "pages", filter: "guide" }]
  },
  {
    label: "Packages",
    group: [
      { label: "Overview", link: "/packages" },
      { collection: "packages" }
    ]
  }
];

export const navi = { sidebar };
