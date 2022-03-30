import { Breakpoint } from '@vrembem/core/index';

import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { toggle } from './toggle';
import { switchMode } from './switchMode';
import { getBreakpoint } from './helpers';

export async function register(el, dialog) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, el, false);

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
      const value = this.breakpoint;
      const handler = this.handleBreakpoint.bind(this);
      breakpoint.mount(value, handler);
      return this;
    },
    unmountBreakpoint() {
      breakpoint.unmount();
      return this;
    },
    handleBreakpoint(event) {
      this.mode = (event.matches) ? 'inline' : 'modal';
      return this;
    }
  };

  // Create the state var with the initial state.
  let __state = (el.classList.contains(this.settings.stateOpened)) ? 'opened' : 'closed';

  // Create the mode var with the initial mode.
  let __mode = (el.classList.contains(this.settings.classModal)) ? 'modal' : 'inline';

  // Setup the drawer object.
  const entry = {
    id: el.id,
    el: el,
    dialog: dialog,
    trigger: null,
    get breakpoint() {
      return getBreakpoint.call(root, el);
    },
    get state() {
      return __state;
    },
    set state(value) {
      __state = value;
      // Save 'opened' and 'closed' states to store if mode is inline.
      if (value === 'opened' || value === 'closed') {
        if (this.mode === 'inline') root.store[this.id] = this.state;
      }
    },
    get mode() {
      return __mode;
    },
    set mode(value) {
      __mode = value;
      switchMode.call(root, this);
    },
    ...methods
  };

  if (entry.mode === 'modal') {
    // Set aria-modal attribute to true.
    entry.dialog.setAttribute('aria-modal', 'true');
  } else {
    // Remove the aria-modal attribute.
    entry.dialog.removeAttribute('aria-modal');
  }

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (this.settings.setTabindex) {
    entry.dialog.setAttribute('tabindex', '-1');
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Setup initial state.
  if (entry.el.classList.contains(this.settings.stateOpened)) {
    // Update drawer state.
    entry.state = 'opened';
  } else {
    // Remove transition state classes.
    entry.el.classList.remove(this.settings.stateOpening);
    entry.el.classList.remove(this.settings.stateClosing);
    // Add closed state class.
    entry.el.classList.add(this.settings.stateClosed);
  }

  if (entry.breakpoint) {
    // Mount media query breakpoint functionality.
    entry.mountBreakpoint();
  } else {
    // Restore state from local store.
    if (this.store[entry.id] === 'opened') {
      await open.call(this, entry, false, false);
    } else {
      await close.call(this, entry, false, false);
    }
  }

  // Return the registered entry.
  return entry;
}
