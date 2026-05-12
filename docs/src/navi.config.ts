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
      {
        collection: "packages",
        filter: (entry) => "package" in entry.data,
        sort: byCategory([
          "all",
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

export const config = { sidebar };
