import { Breakpoint } from '@vrembem/core/index';

import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { toggle } from './toggle';
import { switchMode } from './switchMode';
import { getBreakpoint } from './helpers';

export async function register(target, dialog) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, target);

  // Save root this for use inside methods API.
  const root = this;

  // Create an instance of the Breakpoint class.
  const breakpoint = new Breakpoint();

  // Setup methods API.
  const methods = {
    open(transition) {
      return open.call(root, this, transition);
    },
    close(transition) {
      return close.call(root, this, transition);
    },
    toggle(transition) {
      return toggle.call(root, this, transition);
    },
    deregister() {
      return deregister.call(root, this);
    },
    mountBreakpoint() {
      breakpoint.value = this.breakpoint;
      breakpoint.handler = this.handleBreakpoint.bind(this);
      breakpoint.mount();
      return this;
    },
    unmountBreakpoint() {
      breakpoint.unmount();
      return this;
    },
    handleBreakpoint(mql) {
      this.mode = (mql.matches) ? 'inline' : 'modal';
      return this;
    }
  };

  // Setup the drawer object.
  const entry = {
    id: target.id,
    state: 'closed',
    target: target,
    dialog: dialog,
    get breakpoint() {
      return getBreakpoint.call(root, target);
    },
    get mode() {
      return mode;
    },
    set mode(param) {
      mode = param;
      switchMode.call(root, this);
    },
    ...methods
  };

  // Create the mode var with the initial mode.
  let mode = (target.classList.contains(this.settings.classModal)) ? 'modal' : 'inline';

  if (entry.mode === 'modal') {
    // Set aria-modal attribute to true and role attribute to "dialog".
    entry.dialog.setAttribute('aria-modal', 'true');
    entry.dialog.setAttribute('role', 'dialog');
  } else {
    // Remove the aria-modal attribute and role attribute.
    entry.dialog.removeAttribute('aria-modal');
    entry.dialog.removeAttribute('role');
  }

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (this.settings.setTabindex) {
    entry.dialog.setAttribute('tabindex', '-1');
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Restore state from local store.
  if (this.store[entry.id] === 'opened') {
    await open.call(this, entry, false, false);
  } else {
    await close.call(this, entry, false, false);
  }

  // Mount media query breakpoint functionality.
  entry.mountBreakpoint();

  // Return the registered entry.
  return entry;
}
