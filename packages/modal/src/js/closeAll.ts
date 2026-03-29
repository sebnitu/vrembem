import { close } from "./close";
import type { Modal } from "./Modal";
import type { ModalEntry } from "./ModalEntry";

export async function closeAll(
  parent: Modal,
  exclude: string = "",
  transition?: boolean
): Promise<ModalEntry[]> {
  const result: ModalEntry[] = [];
  await Promise.all(
    parent.stack.copy.map(async (entry) => {
      if (exclude && exclude === entry.id) return;
      result.push((await close(entry, transition, false)) as ModalEntry);
    })
  );
  return result;
}
