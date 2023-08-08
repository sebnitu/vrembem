import { Breakpoint, getConfig } from '@vrembem/core';

import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { toggle } from './toggle';
import { switchMode } from './switchMode';
import { applyInitialState } from './helpers';
import { getBreakpoint } from './helpers';

export async function register(el) {
  // Deregister entry incase it has already been registered.
  await deregister.call(this, el, false);

  // Save root this for use inside methods API.
  const root = this;

  // Create an instance of the Breakpoint class.
  const breakpoint = new Breakpoint();

  // Setup private variables.
  let _state, _mode;

  // Setup the drawer object.
  const entry = {
    id: el.id,
    el: el,
    dialog: null,
    trigger: null,
    settings: getConfig(el, this.settings.dataConfig),
    inlineState: 'indeterminate',
    get store() {
      return root.store.get(this.id);
    },
    get breakpoint() {
      return getBreakpoint.call(root, el);
    },
    get state() {
      return _state;
    },
    set state(value) {
      _state = value;
      // If mode is inline and not in a transitioning state...
      if (this.mode === 'inline' && value != 'opening' && value != 'closing') {
        // Save the inline state.
        this.inlineState = value;

        // Save the store state if enabled.
        if (this.getSetting('store')) {
          root.store.set(this.id, value);
        }
      }
    },
    get mode() {
      return _mode;
    },
    set mode(value) {
      _mode = value;
      switchMode.call(root, this);
    },
    open(transition, focus) {
      return open.call(root, this, transition, focus);
    },
    close(transition, focus) {
      return close.call(root, this, transition, focus);
    },
    toggle(transition, focus) {
      return toggle.call(root, this, transition, focus);
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
      const bpMode = (event.matches) ? 'inline' : 'modal';
      if (this.mode != bpMode) {
        this.mode = bpMode;
      }
      return this;
    },
    getSetting(key) {
      return (key in this.settings) ? this.settings[key] : root.settings[key];
    }
  };

  // Add entry to collection.
  this.collection.push(entry);

  // Set the dialog element. If none is found, use the root element.
  const dialog = el.querySelector(entry.getSetting('selectorDialog'));
  entry.dialog = (dialog) ? dialog : el;

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (entry.getSetting('setTabindex')) {
    entry.dialog.setAttribute('tabindex', '-1');
  }

  // Set the initial mode.
  entry.mode = (el.classList.contains(entry.getSetting('classModal'))) ? 'modal' : 'inline';

  // Apply the initial state.
  await applyInitialState(entry);

  // If the entry has a breakpoint...
  if (entry.breakpoint) {
    // Mount media query breakpoint functionality.
    entry.mountBreakpoint();
  }

  // Return the registered entry.
  return entry;
}
