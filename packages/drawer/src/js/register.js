import { deregister } from './deregister';

export async function register(target, dialog) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, target);

  // Save root this for use inside methods API.
  const root = this;

  // Setup methods API.
  const methods = {
    deregister() {
      return deregister.call(root, this);
    }
  };

  // Setup the drawer object.
  const entry = {
    id: target.id,
    target: target,
    dialog: dialog,
    ...methods
  };

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (this.settings.setTabindex) {
    entry.dialog.setAttribute('tabindex', '-1');
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Return the registered entry.
  return entry;
}
