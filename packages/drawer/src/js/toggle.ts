import { open } from "./open";
import { close } from "./close";
import { getDrawer } from "./helpers/getDrawer";
import type { Drawer } from "./Drawer";
import type { DrawerEntry } from "./DrawerEntry";

export async function toggle(
  this: Drawer,
  query: string | HTMLElement,
  transition: boolean,
  focus: boolean
): Promise<DrawerEntry> {
  // Get the drawer from collection
  const entry: DrawerEntry = getDrawer.call(this, query);

  // Open or close the drawer based on its current state
  if (entry.state === "closed") {
    return open.call(this, entry, transition, focus);
  } else {
    return close.call(this, entry, transition, focus);
  }
}
