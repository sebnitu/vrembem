import type { Collection } from "../Collection";
import { CollectionEntry } from "../CollectionEntry";

/**
 * A private store for collection and collection entry instances. Uses a WeakMap
 * when storing data for collections and Map with uid (`name:id`) keys for
 * collection entries. This ensures compatibility with proxied entries.
 *
 * - Setter: `_(instance, { ... })` — stores the object and returns `undefined`.
 * - Getter: `_(instance)` — retrieves the previously stored object.
 *
 * @param {Collection | CollectionEntry} self
 *   A collection or collection entry instance.
 * @param {any} obj
 *   The object to store. When omitted, retrieves the stored object.
 *
 * @returns The stored object when getting, or `undefined` when setting.
 */

const privMap = new Map<string, any>();
const privWeakMap = new WeakMap<Collection, any>();

export function _(self: Collection | CollectionEntry, obj?: any): any {
  const hasArg = arguments.length > 1;
  if (self instanceof CollectionEntry) {
    const uid = `${self.parent.name}:${self.id}`.toLowerCase();
    return hasArg ? void privMap.set(uid, obj) : privMap.get(uid);
  } else {
    return hasArg ? void privWeakMap.set(self, obj) : privWeakMap.get(self);
  }
}
