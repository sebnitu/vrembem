import { maybeRunMethod } from "../utilities";
import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

export async function dispatchProxyEntryHook<
  TParent extends Collection<TEntry>,
  TEntry extends CollectionEntry
>(parent: TParent, entry: TEntry): Promise<TEntry> {
  // Allow a collection to proxy entries
  let handler = await maybeRunMethod(parent, "proxyEntry", { parent, entry });
  if (handler) entry = new Proxy(entry, handler);

  // Allow plugins to proxy entries
  for (const plugin of parent.plugins.get("*")) {
    const context = { plugin, parent, entry };
    handler = await maybeRunMethod(plugin, "proxyEntry", context);
    if (handler) entry = new Proxy(entry, handler);
  }

  return entry;
}
