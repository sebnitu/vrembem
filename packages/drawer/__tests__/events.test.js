import { Drawer } from '../index.js';
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

window.matchMedia = jest.fn().mockImplementation((query) => {
  let value = query.match(/\d+/)[0];
  let match = (query.includes('min-width')) ?
    window.innerWidth > value:
    window.innerWidth < value;

  return {
    matches: match,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  };
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

  window.innerWidth = 400;
  window.dispatchEvent(new Event('resize'));
  drawer.init();
  expect(el).toHaveClass('drawer_modal');
  expect(eventFired).toBe(true);
  expect(eventState).toBe('modal');
  eventFired = false;

  window.innerWidth = 800;
  window.dispatchEvent(new Event('resize'));
  drawer.init();
  expect(el).not.toHaveClass('drawer_modal');
  expect(eventFired).toBe(true);
  expect(eventState).toBe('drawer');
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

  window.innerWidth = 800;
  window.dispatchEvent(new Event('resize'));
  drawer.init();
  expect(el).not.toHaveClass('drawer_modal');
  expect(eventBreakpoint).toBe(true);

  eventBreakpoint = false;

  window.innerWidth = 400;
  window.dispatchEvent(new Event('resize'));
  drawer.init();
  expect(el).toHaveClass('drawer_modal');
  expect(eventBreakpoint).toBe(true);
});
