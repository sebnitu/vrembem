import { teleport } from '@vrembem/core/index';

import { close } from './close';
import { open } from './open';

export function register(target, dialog) {
  // Deregister item if it already exists in the collection
  this.deregister(target.id);

  // Save root this for use inside methods API
  const root = this;

  // Setup methods API
  const methods = {
    open(transition = root.settings.transition) {
      return open.call(root, this, transition);
    },
    close(transition = root.settings.transition) {
      return close.call(root, this, transition);
    },
    deregister() {
      return deregister.call(root, this);
    },
    teleport(ref = root.settings.teleport, method = root.settings.teleportMethod) {
      if (!this.returnRef) {
        this.returnRef = teleport(this.target, ref, method);
        return this.target;
      } else {
        console.error('Element has already been teleported:', this.target);
        return false;
      }
    },
    teleportReturn() {
      if (this.returnRef) {
        this.returnRef = teleport(this.target, this.returnRef);
        return this.target;
      } else {
        console.error('No return reference found:', this.target);
        return false;
      }
    }
  };

  // Build object
  const item = {
    id: target.id,
    state: 'closed',
    target: target,
    dialog: dialog,
    returnRef: null,
    ...methods
  };

  // Setup accessibility attributes
  item.dialog.setAttribute('aria-modal', 'true');

  if (!item.dialog.hasAttribute('role')) {
    item.dialog.setAttribute('role', 'dialog');
  }

  if (this.settings.setTabindex) {
    item.dialog.setAttribute('tabindex', '-1');
  }

  // Teleport if a reference is provided
  if (this.settings.teleport) {
    item.teleport();
  }

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
