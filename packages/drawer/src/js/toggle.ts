import { open } from "./open";
import { close } from "./close";
import type { DrawerEntry } from "./DrawerEntry";

export async function toggle(
  entry: DrawerEntry,
  transition: boolean,
  focus: boolean
): Promise<DrawerEntry> {
  // Open or close the drawer based on its current state
  if (entry.state === "closed") {
    return open(entry, transition, focus);
  } else {
    return close(entry, transition, focus);
  }
}
