import { teleport } from '@vrembem/core/index';

import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { replace } from './replace';
import { getConfig } from './helpers';

export async function register(el, dialog) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, el, false);

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
        this.returnRef = teleport(this.el, ref, method);
        return this.el;
      } else {
        console.error('Element has already been teleported:', this.el);
        return false;
      }
    },
    teleportReturn() {
      if (this.returnRef) {
        this.returnRef = teleport(this.el, this.returnRef);
        return this.el;
      } else {
        console.error('No return reference found:', this.el);
        return false;
      }
    },
    getSetting(key) {
      return (key in this.settings) ? this.settings[key] : root.settings[key];
    }
  };

  // Setup the modal object.
  const entry = {
    id: el.id,
    state: 'closed',
    el: el,
    dialog: dialog,
    returnRef: null,
    settings: getConfig.call(this, el),
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

  // Teleport modal if a reference has been set.
  if (entry.getSetting('teleport')) {
    entry.teleport();
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Setup initial state.
  if (entry.el.classList.contains(this.settings.stateOpened)) {
    // Open entry with transitions disabled.
    await entry.open(false);
  } else {
    // Remove transition state classes.
    entry.el.classList.remove(this.settings.stateOpening);
    entry.el.classList.remove(this.settings.stateClosing);
    // Add closed state class.
    entry.el.classList.add(this.settings.stateClosed);
  }

  // Return the registered entry.
  return entry;
}
