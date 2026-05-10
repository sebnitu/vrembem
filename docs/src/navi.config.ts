import type { NaviConfig } from "@/modules/navigation";

const sidebar: NaviConfig[] = [
  {
    label: "Guide",
    group: [{ collection: "pages", dir: "guide" }]
  },
  {
    label: "Packages",
    group: [
      {
        collection: "packages"
        // filter: (entry) => {
        //   return (
        //     "category" in entry.data && entry.data.category === "component"
        //   );
        // }
      }
    ]
  }
];

export const navi = { sidebar };
