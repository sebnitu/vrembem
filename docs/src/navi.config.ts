import type { NaviConfig } from "@/modules/navigation";
import { byCategory, byOrder } from "@/modules/sortBy";

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
          byCategory([
            "Core",
            "Layout",
            "Components",
            "Form Controls",
            "Modules"
          ]),
          byOrder
        ]
      }
    ]
  }
];

export const config = { sidebar };
