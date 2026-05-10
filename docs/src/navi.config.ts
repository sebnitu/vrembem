import type { NaviConfig } from "@/helpers/buildNaviTree";

const sidebar: NaviConfig[] = [
  {
    label: "Guide",
    group: [{ collection: "pages", dir: "guide" }]
  },
  {
    label: "Packages",
    group: [
      {
        collection: "packages",
        filter: (entry) =>
          "category" in entry.data && entry.data.category === "component"
      }
    ]
  }
];

export const navi = { sidebar };
