import { Drawer } from '../index.js';
import { checkMatch } from './helpers/checkMatch';
import { resizeWindow } from './helpers/resizeWindow';
import { transition } from './helpers/transition';
import './helpers/matchMedia.mock.js';
import '@testing-library/jest-dom/extend-expect';

let drawer;

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-one" data-drawer-breakpoint="md">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-one">Drawer Toggle</button>
    </div>
  </div>
`;

window.addEventListener('resize', () => {
  if (drawer && drawer.mediaQueryLists) {
    drawer.mediaQueryLists.forEach((item) => {
      item.mql.matches = checkMatch(item.mql.media);
    });
  }
});

beforeEach(() => {
  document.body.innerHTML = null;
  window.innerWidth = 1200;
});

afterEach(() => {
  drawer.destroy();
  drawer = null;
});

test('should emit custom event when drawer has opened', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const btn = document.querySelector('[data-drawer-toggle]');
  let eventFired = false;

  document.addEventListener('drawer:opened', () => {
    eventFired = true;
  });

  btn.click();
  await transition(el);

  expect(el).toHaveClass('is-opened');
  expect(eventFired).toBe(true);
});

test('should emit custom event when drawer has closed', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const btn = document.querySelector('[data-drawer-toggle]');
  let eventFired = false;

  document.addEventListener('drawer:closed', () => {
    eventFired = true;
  });

  btn.click();
  await transition(el);

  expect(el).toHaveClass('is-opened');
  expect(eventFired).toBe(false);

  btn.click();
  await transition(el);

  expect(el).toHaveClass('is-closed');
  expect(eventFired).toBe(true);
});

test('should emit custom event when drawer matches a breakpoint', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  let eventFired = false;

  document.addEventListener('drawer:breakpoint', () => {
    eventFired = true;
  });

  resizeWindow(400);
  drawer.breakpoint.check();
  expect(eventFired).toBe(true);
});

test('should emit custom event when drawer switches to modal', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  let eventFired = false;

  document.addEventListener('drawer:toModal', () => {
    eventFired = true;
  });

  resizeWindow(400);
  drawer.breakpoint.check();
  expect(eventFired).toBe(true);
});

test('should emit custom event when drawer switches to default', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 400;
  drawer = new Drawer({ autoInit: true });
  let eventFired = false;

  document.addEventListener('drawer:toDefault', () => {
    eventFired = true;
  });

  resizeWindow(1200);
  drawer.breakpoint.check();
  expect(eventFired).toBe(true);
});

test('should be able to set a custom event prefix', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({
    autoInit: true,
    customEventPrefix: 'vrembem:'
  });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const btn = document.querySelector('[data-drawer-toggle]');
  let eventOpened = false;
  let eventClosed = false;
  let eventBreakpoint = false;
  let eventToModal = false;
  let eventToDefault = false;

  document.addEventListener('vrembem:opened', () => {
    eventOpened = true;
  });

  document.addEventListener('vrembem:closed', () => {
    eventClosed = true;
  });

  document.addEventListener('vrembem:breakpoint', () => {
    eventBreakpoint = true;
  });

  document.addEventListener('vrembem:toModal', () => {
    eventToModal = true;
  });

  document.addEventListener('vrembem:toDefault', () => {
    eventToDefault = true;
  });

  btn.click();
  await transition(el);
  expect(el).toHaveClass('is-opened');
  expect(eventOpened).toBe(true);

  btn.click();
  await transition(el);
  expect(el).toHaveClass('is-closed');
  expect(eventClosed).toBe(true);

  resizeWindow(400);
  drawer.breakpoint.check();
  expect(el).toHaveClass('drawer_modal');
  expect(eventBreakpoint).toBe(true);
  expect(eventToModal).toBe(true);

  eventBreakpoint = false;

  resizeWindow(800);
  drawer.breakpoint.check();
  expect(el).not.toHaveClass('drawer_modal');
  expect(eventBreakpoint).toBe(true);
  expect(eventToDefault).toBe(true);
});
