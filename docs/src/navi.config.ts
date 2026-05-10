import type { NaviConfig } from "@/modules/navigation";

const sidebar: NaviConfig[] = [
  {
    label: "Guide",
    group: [{ collection: "pages", dir: "guide" }]
  },
  {
    label: "Packages",
    group: [
      { label: "Overview", link: "/packages" },
      {
        collection: "packages",
        filter: (entry) => "package" in entry.data
      }
    ]
  }
];

export const navi = { sidebar };
