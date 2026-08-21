import type { NaviConfig } from "@/modules/navigation";
import { byCategory, forceLast } from "@/modules/sortBy";

const sidebar: NaviConfig[] = [
  {
    label: "Guide",
    group: [{ collection: "pages", dir: "guide" }]
  },
  {
    label: "Packages",
    group: [
      {
        collection: "pages",
        dir: "packages",
        filter: (entry) => "package" in entry.data,
        sort: [
          forceLast("package", "@vrembem/utility"),
          byCategory(["core", "modules", "layout", "form-control", "component"])
        ]
      }
    ]
  }
];

export const config = { sidebar };
