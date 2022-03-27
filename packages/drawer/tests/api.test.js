import '@testing-library/jest-dom/extend-expect';
import './mocks/matchMedia.mock.js';
import { transition } from './helpers/transition';

import Drawer from '../index.js';

const markup = `
  <div class="drawer__wrapper">
    <div id="drawer-1" class="drawer">
      <div class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div id="drawer-2" class="drawer">
      <div class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-1">...</button>
      <button data-drawer-toggle="drawer-2">...</button>
    </div>
  </div>
`;

document.body.innerHTML = markup;

const drawer = new Drawer();
const drawerAuto = new Drawer({ autoInit: true });

describe('init() & destroy()', () => {
  it('should correctly register all drawers on init()', async () => {
    await drawer.init();
    expect(drawer.collection.length).toBe(2);
  });

  it('should correctly deregister all drawers on destroy()', async () => {
    await drawer.destroy();
    expect(drawer.collection.length).toBe(0);
  });

  it('should initialize with custom settings passed on init', async () => {
    await drawer.init({ eventListeners: false });
    expect(drawer.collection.length).toBe(2);
    expect(drawer.defaults.eventListeners).toBe(true);
    expect(drawer.settings.eventListeners).toBe(false);
    await drawer.destroy();
    expect(drawer.collection.length).toBe(0);
  });

  it('should automatically initialize when autoInit option set to true', () => {
    expect(drawerAuto.collection.length).toBe(2);
  });
});

describe('registerCollection() & deregisterCollection()', () => {
  it('should manually register collection using registerCollection()', async () => {
    const els = document.querySelectorAll('.drawer');
    await drawer.registerCollection(els);
    expect(drawer.collection.length).toBe(2);
  });

  it('should manually deregister collection using deregisterCollection()', async () => {
    await drawer.deregisterCollection();
    expect(drawer.collection.length).toBe(0);
  });
});

describe('open(), close() & toggle()', () => {
  it('should open and close using open()and close() methods', async () => {
    await drawer.init();
    const entry = drawer.get('drawer-1');
    expect(entry.state).toBe('closed');
    expect(entry.mode).toBe('inline');

    drawer.open('drawer-1');
    expect(entry.el).toHaveClass('is-opening');
    expect(entry.state).toBe('opening');

    await transition(entry.el);
    expect(entry.el).toHaveClass('is-opened');
    expect(entry.state).toBe('opened');
    expect(entry.dialog).toBe(document.activeElement);

    drawer.close('drawer-1');
    expect(entry.el).toHaveClass('is-closing');
    expect(entry.state).toBe('closing');

    await transition(entry.el);
    expect(entry.el).toHaveClass('is-closed');
    expect(entry.state).toBe('closed');
    expect(entry.dialog).not.toBe(document.activeElement);
  });

  it('should open and close using toggle() method', async () => {
    const entry = drawer.get('drawer-2');
    expect(entry.state).toBe('closed');
    expect(entry.mode).toBe('inline');

    drawer.toggle('drawer-2');
    expect(entry.el).toHaveClass('is-opening');
    expect(entry.state).toBe('opening');

    await transition(entry.el);
    expect(entry.el).toHaveClass('is-opened');
    expect(entry.state).toBe('opened');
    expect(entry.dialog).toBe(document.activeElement);

    drawer.toggle('drawer-2');
    expect(entry.el).toHaveClass('is-closing');
    expect(entry.state).toBe('closing');

    await transition(entry.el);
    expect(entry.el).toHaveClass('is-closed');
    expect(entry.state).toBe('closed');
    expect(entry.dialog).not.toBe(document.activeElement);
  });
});

describe('activeModal', () => {
  it('should return entry if drawer modal is active', async () => {
    const entry = await drawer.register('drawer-1');

    expect(entry.state).toBe('closed');
    expect(entry.mode).toBe('inline');
    expect(drawer.activeModal).toBe(undefined);

    entry.mode = 'modal';
    entry.open();
    await transition(entry.el);

    expect(entry.state).toBe('opened');
    expect(entry.mode).toBe('modal');
    expect(drawer.activeModal).toBe(entry);
  });
});

describe('switchMode()', () => {
  it('should switch drawer to modal when entry.mode property is set to modal', async () => {
    const entry = await drawer.register('drawer-2');
    expect(entry.el).not.toHaveClass('drawer_modal');
    expect(entry.dialog.getAttribute('aria-modal')).toBe(null);
    expect(entry.dialog.getAttribute('role')).toBe(null);

    entry.mode = 'modal';

    expect(entry.el).toHaveClass('drawer_modal');
    expect(entry.dialog.getAttribute('aria-modal')).toBe('true');
    expect(entry.dialog.getAttribute('role')).toBe('dialog');
  });

  it('switchMode() should switch drawer to inline when entry.mode property is set to inline', async () => {
    const entry = await drawer.register('drawer-2');
    expect(entry.el).toHaveClass('drawer_modal');
    expect(entry.dialog.getAttribute('aria-modal')).toBe('true');
    expect(entry.dialog.getAttribute('role')).toBe('dialog');

    entry.mode = 'inline';

    expect(entry.el).not.toHaveClass('drawer_modal');
    expect(entry.dialog.getAttribute('aria-modal')).toBe(null);
    expect(entry.dialog.getAttribute('role')).toBe(null);
  });
});

describe('register() & deregister()', () => {
  beforeAll(async () => {
    document.body.innerHTML = markup;
    await drawer.destroy();
  });

  it('should register drawers individually', async () => {
    await drawer.register('drawer-1');

    const entry1 = drawer.get('drawer-1');
    expect(entry1.state).toBe('closed');
    expect(entry1.mode).toBe('inline');
    expect(drawer.collection.length).toBe(1);

    await drawer.register('drawer-2');

    const entry2 = drawer.get('drawer-2');
    expect(entry2.state).toBe('closed');
    expect(entry2.mode).toBe('inline');
    expect(drawer.collection.length).toBe(2);
  });

  it('should deregister drawers individually', async () => {
    await drawer.deregister('drawer-1');

    const entry1 = drawer.get('drawer-1');
    expect(entry1).toBe(undefined);
    expect(drawer.collection.length).toBe(1);

    await drawer.deregister('drawer-2');

    const entry2 = drawer.get('drawer-2');
    expect(entry2).toBe(undefined);
    expect(drawer.collection.length).toBe(0);
  });

  it('should throw an error when trying to register a drawer that can not be found', async () => {
    const result = await drawer.register('asdf').catch((error) => { return error.message; });
    expect(result).toBe('No drawer elements found using the ID: "asdf".');
  });
});
