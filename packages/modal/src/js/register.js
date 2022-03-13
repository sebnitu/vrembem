import { teleport } from '@vrembem/core/index';

import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { replace } from './replace';
import { getConfig } from './helpers';

export async function register(target, dialog) {
  // Deregister entry incase it has already been registered.
  deregister.call(this, target);

  // Save root this for use inside methods API.
  const root = this;

  // Setup methods API.
  const methods = {
    open(transition) {
      return open.call(root, this, transition);
    },
    close(transition) {
      return close.call(root, this, transition);
    },
    replace(transition) {
      return replace.call(root, this, transition);
    },
    deregister() {
      return deregister.call(root, this);
    },
    teleport(ref = this.getSetting('teleport'), method = this.getSetting('teleportMethod')) {
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
    },
    getSetting(key) {
      return (this.config.hasOwnProperty(key)) ? this.config[key] : root.settings[key];
    }
  };

  // Setup the modal object.
  const entry = {
    id: target.id,
    state: 'closed',
    trigger: null,
    target: target,
    dialog: dialog,
    config: getConfig.call(this, target),
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
  if (entry.getSetting('setTabindex')) {
    entry.dialog.setAttribute('tabindex', '-1');
  }

  // Add the default state class.
  entry.target.classList.add(this.settings.stateClosed);

  // Teleport modal if a reference has been set.
  if (entry.getSetting('teleport')) {
    entry.teleport();
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Return the registered entry.
  return entry;
}
