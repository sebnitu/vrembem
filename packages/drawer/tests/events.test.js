import { Drawer } from '../index.js';
import { checkMatch } from './helpers/checkMatch';
import { resizeWindow } from './helpers/resizeWindow';
import './helpers/matchMedia.mock.js';
import '@testing-library/jest-dom/extend-expect';

let drawer;
const ev = new Event('transitionend');

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-one" data-drawer-breakpoint="md">
      <div class="drawer__item">
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

afterEach(() => {
  drawer.destroy();
  drawer = null;
  document.body.innerHTML = null;
});

test('should emit custom event when drawer has opened', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const btn = document.querySelector('[data-drawer-toggle]');
  let eventFired = false;

  document.addEventListener('drawer:opened', () => {
    eventFired = true;
  });

  btn.click();
  el.dispatchEvent(ev);

  expect(el).toHaveClass('is-opened');
  expect(eventFired).toBe(true);
});

test('should emit custom event when drawer has closed', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const btn = document.querySelector('[data-drawer-toggle]');
  let eventFired = false;

  document.addEventListener('drawer:closed', () => {
    eventFired = true;
  });

  btn.click();
  el.dispatchEvent(ev);

  expect(el).toHaveClass('is-opened');
  expect(eventFired).toBe(false);

  btn.click();
  el.dispatchEvent(ev);

  expect(el).toHaveClass('is-closed');
  expect(eventFired).toBe(true);
});

test('should emit custom event with custom data when drawer hits a breakpoint', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer="drawer-one"]');
  let eventFired = false;
  let eventState = false;

  document.addEventListener('drawer:breakpoint', (event) => {
    eventFired = true;
    eventState = event.detail.state;
  });

  resizeWindow(400);
  drawer.init();
  expect(el).toHaveClass('drawer_modal');
  expect(eventFired).toBe(true);
  expect(eventState).toBe('modal');
  eventFired = false;

  resizeWindow(800);
  drawer.init();
  expect(el).not.toHaveClass('drawer_modal');
  expect(eventFired).toBe(true);
  expect(eventState).toBe('default');
});

test('should be able to set a custom event prefix', () => {
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

  document.addEventListener('vrembem:opened', () => {
    eventOpened = true;
  });

  document.addEventListener('vrembem:closed', () => {
    eventClosed = true;
  });

  document.addEventListener('vrembem:breakpoint', () => {
    eventBreakpoint = true;
  });

  btn.click();
  el.dispatchEvent(ev);
  expect(el).toHaveClass('is-opened');
  expect(eventOpened).toBe(true);

  btn.click();
  el.dispatchEvent(ev);
  expect(el).toHaveClass('is-closed');
  expect(eventClosed).toBe(true);

  resizeWindow(800);
  drawer.init();
  expect(el).not.toHaveClass('drawer_modal');
  expect(eventBreakpoint).toBe(true);

  eventBreakpoint = false;

  resizeWindow(400);
  drawer.init();
  expect(el).toHaveClass('drawer_modal');
  expect(eventBreakpoint).toBe(true);
});
