import { close } from './close';
import { open } from './open';

export function register(target, dialog) {
  // Deregister item if it already exists in the collection
  this.deregister(target.id);

  // Save root this for use inside methods API
  const root = this;

  // Setup methods API
  const methods = {
    open() {
      open.call(root, this);
    },
    close() {
      close.call(root, this);
    },
    deregister() {
      deregister.call(root, this);
    }
  };

  // Build object
  const item = {
    id: target.id,
    state: 'closed',
    target: target,
    dialog: dialog,
    ...methods
  };

  // Setup accessibility attributes
  item.dialog.setAttribute('role', 'dialog');
  item.dialog.setAttribute('aria-modal', 'true');
  item.dialog.setAttribute('tabindex', '-1');

  // Add item to collection
  this.collection.push(item);

  // Return the registered object
  return item;
}

export function deregister(el) {
  // Check if this item has been registered in the collection
  const index = this.collection.findIndex((entry) => {
    return (entry.id === el.id);
  });

  // If the entry exists in the collection
  if (index >= 0) {
    // Get the collection entry
    const entry = this.collection[index];

    // Close the collection entry if it's open
    if (entry.state === 'opened') {
      entry.close();
    }

    // Delete properties from collection entry
    Object.getOwnPropertyNames(entry).forEach((prop) => {
      delete entry[prop];
    });

    // Remove entry from collection
    this.collection.splice(index, 1);
  }

  // Return the new collection
  return this.collection;
}
