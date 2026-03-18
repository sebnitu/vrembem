import type { CollectionEntry } from "../CollectionEntry";

const priv = new Map<string, any>();

export const _ = (self: CollectionEntry, obj?: Record<string, any>) => {
  const uid = `${self.parent.name}:${self.id}`.toLowerCase();
  return obj ? priv.set(uid, obj) : priv.get(uid)!;
};
