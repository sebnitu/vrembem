import '@testing-library/jest-dom';
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

const markupInitState = `
  <div id="drawer-1" class="drawer">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-2" class="drawer is-opened">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-3" class="drawer drawer_modal is-opened">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-4" class="drawer">
    <div class="drawer__dialog">...</div>
  </div>
`;

const markupConfig = `
  <div id="drawer-1" class="drawer" data-drawer-config="{ 'transition': false }">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-2" class="drawer" data-drawer-config="{ 'selectorOverflow': 'main' }">
    <div class="drawer__dialog">...</div>
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

  it('should throw if trying to open unregistered drawer', async () => {
    const result = await drawer.open('asdf').catch((error) => { return error.message; });
    expect(result).toBe('Drawer not found in collection with id of "asdf".');
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

describe('register() & deregister()', () => {
  beforeAll(async () => {
    document.body.innerHTML = markupInitState;
    await drawer.destroy();
  });

  it('should disable setting tabindex on drawer dialog', async () => {
    drawer.settings.setTabindex = false;
    let entry = await drawer.register('drawer-1');
    expect(entry.dialog.getAttribute('tabindex')).toBe(null);

    drawer.settings.setTabindex = true;
    entry = await drawer.register('drawer-1');
    expect(entry.dialog.getAttribute('tabindex')).toBe('-1');
  });

  it('should register drawer in its default state', async () => {
    const entry = await drawer.register('drawer-1');
    expect(entry.mode).toBe('inline');
    expect(entry.state).toBe('closed');
  });

  it('should register drawer in its open state', async () => {
    const entry = await drawer.register('drawer-2');
    expect(entry.mode).toBe('inline');
    expect(entry.state).toBe('opened');
  });

  it('should register drawer in its modal state', async () => {
    const entry = await drawer.register('drawer-3');
    expect(entry.mode).toBe('modal');
    expect(entry.state).toBe('opened');
  });

  it('should return drawer to state saved in local store', async () => {
    drawer.store.set('drawer-4', 'opened');
    const entry = await drawer.register('drawer-4');
    expect(entry.mode).toBe('inline');
    expect(entry.state).toBe('opened');
  });

  it('should deregister drawer using entry api', async () => {
    expect(drawer.collection.length).toBe(4);

    const entry = await drawer.register('drawer-4');
    await entry.deregister();

    expect(entry.mode).toBe(undefined);
    expect(entry.state).toBe(undefined);
    expect(drawer.collection.length).toBe(3);
  });

  it('should prioritize local store state over initial state class', async () => {
    const el = document.querySelector('#drawer-4');
    el.classList.add(drawer.settings.stateOpened);

    drawer.store.set('drawer-4', 'closed');
    const entry = await drawer.register('drawer-4');

    expect(entry.mode).toBe('inline');
    expect(entry.state).toBe('closed');
  });

  it('should throw an error when trying to register a drawer that can not be found', async () => {
    const result = await drawer.register('asdf').catch((error) => { return error.message; });
    expect(result).toBe('No drawer elements found using the ID: "asdf".');
  });

  it('should do nothing when trying to deregister a drawer that can not be found', async () => {
    expect(drawer.collection.length).toBe(4);
    const result = await drawer.deregister('asdf');
    expect(drawer.collection.length).toBe(4);
    expect(result).toBe(drawer.collection);
  });
});

describe('data-drawer-config', () => {
  beforeAll(async () => {
    document.body.innerHTML = markupInitState;
    await drawer.destroy();
  });

  it('should override global drawer configs using drawer specific data configuration', async () => {
    document.body.innerHTML = markupConfig;
    const entry1 = await drawer.register('drawer-1');
    const entry2 = await drawer.register('drawer-2');

    expect(entry1.getSetting('transition')).toBe(false);
    expect(entry1.getSetting('selectorOverflow')).toBe('body');
    expect(entry2.getSetting('transition')).toBe(true);
    expect(entry2.getSetting('selectorOverflow')).toBe('main');
  });
});
