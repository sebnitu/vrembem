import { maybeRunMethod } from "../utilities";

export async function dispatchLifecycleHook(name, parent, entry) {
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
