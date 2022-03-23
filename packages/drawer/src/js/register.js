import { Breakpoint } from '@vrembem/core/index';
import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { toggle } from './toggle';
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
      if (mql.matches) {
        root.switchToDefault(this);
      } else {
        root.switchToModal(this);
      }
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
    ...methods
  };

  // Set tabindex="-1" so dialog is focusable via JS or click.
  if (this.settings.setTabindex) {
    entry.dialog.setAttribute('tabindex', '-1');
  }

  // Add entry to collection.
  this.collection.push(entry);

  // Mount media query breakpoint functionality.
  entry.mountBreakpoint();

  // Return the registered entry.
  return entry;
}
