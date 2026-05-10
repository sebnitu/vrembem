import type { NaviConfig } from "@/modules/navigation";
import { byCategory } from "@/helpers/sortBy";

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
        filter: (entry) => "package" in entry.data,
        sort: byCategory([
          "core",
          "modules",
          "layout",
          "form-control",
          "component"
        ])
      }
    ]
  }
];

export const navi = { sidebar };
