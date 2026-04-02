import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

/**
 * A private store for Collection and CollectionEntry instances. Uses a WeakMap
 * keyed by object identity. For entries that are wrapped in a proxy, a `root`
 * Symbol property is used to resolve back to the original (unwrapped) entry,
 * ensuring consistent WeakMap lookups regardless of proxy wrapping.
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
const priv = new WeakMap<Collection | CollectionEntry, any>();
export const root = Symbol("root");
export function _(self: Collection | CollectionEntry, obj?: any): any {
  const key = self[root] || self;
  return arguments.length > 1 ? void priv.set(key, obj) : priv.get(key);
}
