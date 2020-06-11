import { Drawer } from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let drawer;

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal" data-drawer="drawer-one" data-drawer-breakpoint="md">
      <div class="drawer__item">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer is-opened" data-drawer="drawer-two" data-drawer-breakpoint="400px">
      <div class="drawer__item">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-one">Drawer Toggle</button>
      <button data-drawer-toggle="drawer-two">Drawer Toggle</button>
    </div>
  </div>
`;

const markupCustomAttr = `
<div class="drawer__wrapper">
  <div class="drawer" data-drawer="drawer-one" data-bp="md">
    <div class="drawer__item">
      <button data-drawer-close>Close</button>
    </div>
  </div>
  <div class="drawer" data-drawer="drawer-two" data-bp="400px">
    <div class="drawer__item">
      <button data-drawer-close>Close</button>
    </div>
  </div>
  <div class="drawer__main">
    <button data-drawer-toggle="drawer-one">Drawer Toggle</button>
    <button data-drawer-toggle="drawer-two">Drawer Toggle</button>
  </div>
</div>
`;

const markupCustomBreakpoints = `
<div class="drawer__wrapper">
  <div class="drawer" data-drawer="drawer-one" data-drawer-breakpoint="xxs">
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

test('should remove default modal modifier when above breakpoint', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 1200;
  window.dispatchEvent(new Event('resize'));
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer=\'drawer-one\']');
  const value = drawer.settings.breakpoints[el.dataset.drawerBreakpoint];

  expect(el).toHaveClass('drawer_modal');
  drawer.init();
  expect(el).not.toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeLessThan(window.innerWidth);
});

test('should switch to modal when below media breakpoint', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 600;
  window.dispatchEvent(new Event('resize'));
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer=\'drawer-one\']');
  const value = drawer.settings.breakpoints[el.dataset.drawerBreakpoint];

  drawer.init();
  expect(el).toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
});

test('should switch to modal when below custom pixel value', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 300;
  window.dispatchEvent(new Event('resize'));
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer=\'drawer-two\']');
  const value = el.dataset.drawerBreakpoint;

  expect(el).not.toHaveClass('drawer_modal');
  drawer.init();
  expect(el).toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
});

test('should switch to modal when using a custom data breakpoint attribute', () => {
  document.body.innerHTML = markupCustomAttr;
  window.innerWidth = 600;
  window.dispatchEvent(new Event('resize'));
  drawer = new Drawer({
    dataBreakpoint: 'bp'
  });
  const el = document.querySelector('[data-drawer=\'drawer-one\']');
  const value = drawer.settings.breakpoints[el.dataset.bp];

  expect(el).not.toHaveClass('drawer_modal');
  drawer.init();
  expect(el).toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
});

test('should use custom modal class on breakpoint switch', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 300;
  window.dispatchEvent(new Event('resize'));
  drawer = new Drawer({
    classModal: 'be-cool'
  });
  const el = document.querySelector('[data-drawer=\'drawer-two\']');
  const value = el.dataset.drawerBreakpoint;

  expect(el).not.toHaveClass('be-cool');
  drawer.init();
  expect(el).toHaveClass('be-cool');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
});

test('should allow using a custom breakpoints object', () => {
  document.body.innerHTML = markupCustomBreakpoints;
  window.innerWidth = 275;
  window.dispatchEvent(new Event('resize'));
  drawer = new Drawer({
    breakpoints: {
      xxl: '1600px',
      xxs: '300px'
    }
  });
  const el = document.querySelector('[data-drawer=\'drawer-one\']');
  const value = drawer.settings.breakpoints[el.dataset.drawerBreakpoint];

  expect(el).not.toHaveClass('drawer_modal');
  drawer.init();
  expect(el).toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
  expect(drawer.settings.breakpoints).toHaveProperty('xxl');
});

test('should remove open state class when switching to modal', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 300;
  window.dispatchEvent(new Event('resize'));
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer=\'drawer-two\']');

  expect(el).toHaveClass('is-opened');
  expect(el).not.toHaveClass('drawer_modal');
  drawer.init();
  expect(el).not.toHaveClass('is-opened');
  expect(el).toHaveClass('drawer_modal');
});

test('should apply saved state when switching to drawer', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 300;
  window.dispatchEvent(new Event('resize'));
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer=\'drawer-two\']');
  const state = JSON.parse(localStorage.getItem('DrawerState'));

  expect(state['drawer-two']).toMatch('is-opened');
  expect(el).not.toHaveClass('is-opened');
  expect(el).toHaveClass('drawer_modal');

  window.innerWidth = 600;
  window.dispatchEvent(new Event('resize'));
  drawer.init();
  expect(el).toHaveClass('is-opened');
  expect(el).not.toHaveClass('drawer_modal');
});
