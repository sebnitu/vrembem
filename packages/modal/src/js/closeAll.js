import { close } from "./close";

export async function closeAll(exclude, transition) {
  const result = [];
  await Promise.all(this.stack.copy.map(async (entry) => {
    if (exclude && exclude === entry.id) return;
    result.push(await close.call(this, entry, transition, false));
    entry.trigger = null;
  }));
  return result;
}
