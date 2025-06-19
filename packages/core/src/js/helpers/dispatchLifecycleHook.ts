import { maybeRunMethod } from "../utilities";
import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

/**
 * Dispatches a lifecycle hook to the parent, entry, and its plugins.
 *
 * @param {string} name
 *   The name of the lifecycle hook to dispatch.
 * @param {Collection} parent
 *   The parent object that contains a plugins array and an `emit` function.
 * @param {CollectionEntry} entry
 *   (Optional) An entry object to run the lifecycle hook on.
 *
 * @returns A promise that resolves once all hooks and emissions are completed.
 */
export async function dispatchLifecycleHook<
  TParent extends Collection<any>,
  TEntry extends CollectionEntry<any>
>(name: string, parent: TParent, entry?: TEntry): Promise<void> {
  // Run the lifecycle hook on the parent object
  await maybeRunMethod(parent, name, entry);

  // If an entry was provided, run the lifecycle hook
  if (entry) {
    await maybeRunMethod(entry, name);
  }

  // Run the lifecycle hook on any plugins that have them
  for (const plugin of parent.plugins) {
    await maybeRunMethod(plugin, name, { plugin, parent, entry });
  }

  // Emit the lifecycle hook event
  await parent.emit(name, entry);
}
