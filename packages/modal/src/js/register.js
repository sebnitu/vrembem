import { teleport } from '@vrembem/core/index';

import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';

export function register(target, dialog) {
  // Deregister entry if it already exists in the collection.
  this.deregister(target.id);

  // Save root this for use inside methods API.
  const root = this;

  // Setup methods API.
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

  // Setup the modal object.
  const entry = {
    id: target.id,
    state: 'closed',
    trigger: null,
    target: target,
    dialog: dialog,
    returnRef: null,
    ...methods
  };

  // Set aria-modal attribute to true.
  entry.dialog.setAttribute('aria-modal', 'true');

  // If a role attribute is not set, set it to "dialog" as the default.
  if (!entry.dialog.hasAttribute('role')) {
    entry.dialog.setAttribute('role', 'dialog');
  }

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (this.settings.setTabindex) {
    entry.dialog.setAttribute('tabindex', '-1');
  }

  // Add the default state class.
  entry.target.classList.add(this.settings.stateClosed);

  // Teleport modal if a reference has been set.
  if (this.settings.teleport) {
    entry.teleport();
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Return the registered entry.
  return entry;
}
