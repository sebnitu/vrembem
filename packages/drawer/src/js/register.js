import { Breakpoint } from '@vrembem/core/index';
import { deregister } from './deregister';
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
        root.switchToDefault(this.target);
      } else {
        root.switchToModal(this.target);
      }
      return this;
    }
  };

  // Setup the drawer object.
  const entry = {
    id: target.id,
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

  // Mount the breakpoint functionality.
  entry.mountBreakpoint();

  // Add entry to collection.
  this.collection.push(entry);

  // Return the registered entry.
  return entry;
}
