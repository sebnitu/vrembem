import { close } from "./close";

export async function closeAll(exclude, transition) {
  const result = [];
  await Promise.all(this.stack.value.map(async (modal) => {
    if (exclude && exclude === modal.id) {
      Promise.resolve();
    } else {
      result.push(await close.call(this, modal, transition, false));
    }
    modal.trigger = null;
  }));
  return result;
}
