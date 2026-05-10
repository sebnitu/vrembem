export type NaviConfig =
  | { label: string; link: string }
  | { label: string; group: NaviConfig[] }
  | { collection: string };

export type NaviLink = {
  label: string;
  link: string;
  isActive: boolean;
  isParent: boolean;
};

export type NaviGroup = {
  label: string;
  group: NaviItem[];
  isParent: boolean;
};

export type NaviItem = NaviLink | NaviGroup;

function isParent(group: NaviItem[]) {
  return group.some((entry) =>
    "isActive" in entry ? entry.isActive || entry.isParent : entry.isParent
  );
}

export async function buildNaviTree(
  config: NaviConfig[],
  pathname: string
): Promise<NaviItem[]> {
  const resolved: NaviItem[] = [];

  for (const item of config) {
    if ("link" in item) {
      resolved.push({
        label: item.label,
        link: item.link,
        isActive: pathname === item.link,
        isParent: pathname.startsWith(item.link) && pathname !== item.link
      });
    }
    if ("group" in item) {
      const children = await buildNaviTree(item.group, pathname);
      resolved.push({
        label: item.label,
        group: children,
        isParent: isParent(children)
      });
    }
  }

  return resolved;
}
