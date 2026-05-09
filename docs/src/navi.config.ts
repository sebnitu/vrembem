import type { NaviConfig } from "@/modules/buildNaviTree";

// TODO: Find a way to render modules. Maybe move them back to packages?

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
