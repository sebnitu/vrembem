export type NaviConfigItem =
  | { label: string; link: string }
  | { collection: string; filter?: string }
  | { label: string; items: NaviConfigItem[] };

export type NaviConfig =
  | { label: string; link: string }
  | { label: string; items: NaviConfigItem[] };

// TODO: Move types somewhere else
// TODO: Find a way to render modules. Maybe move them back to packages?

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
