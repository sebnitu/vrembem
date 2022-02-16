import Drawer from '../index.js';
import { checkMatch } from './helpers/checkMatch';
import { resizeWindow } from './helpers/resizeWindow';
import { setBreakpointVars } from './helpers/setBreakpointVars';
import './helpers/matchMedia.mock.js';
import '@testing-library/jest-dom/extend-expect';

let drawer;

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal is-closed" data-drawer="drawer-one" data-drawer-breakpoint="md">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer is-opened" data-drawer="drawer-two" data-drawer-breakpoint="400px">
      <div data-drawer-dialog class="drawer__dialog">
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
  <div class="drawer is-closed" data-drawer="drawer-one" data-bp="md">
    <div data-drawer-dialog class="drawer__dialog">
      <button data-drawer-close>Close</button>
    </div>
  </div>
  <div class="drawer is-closed" data-drawer="drawer-two" data-bp="400px">
    <div data-drawer-dialog class="drawer__dialog">
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
  <div class="drawer is-closed" data-drawer="drawer-one" data-drawer-breakpoint="xxs">
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
  if (drawer) {
    drawer.breakpoint.mediaQueryLists.forEach((item) => {
      item.mql.matches = checkMatch(item.mql.media);
    });
  }
});

setBreakpointVars();

beforeEach(() => {
  document.body.innerHTML = null;
  window.innerWidth = 1200;
});

afterEach(() => {
  drawer.destroy();
  drawer = null;
});

test('should switch modal drawer modifier when above and below media breakpoint', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const bp = el.dataset.drawerBreakpoint;
  const value = drawer.breakpoint.getBreakpoint(bp);

  expect(bp).toBe('md');
  expect(value).toBe('760px');

  resizeWindow(300);
  drawer.breakpoint.check();
  expect(el).toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);

  resizeWindow(800);
  drawer.breakpoint.check();
  expect(el).not.toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeLessThan(window.innerWidth);
});

test('should switch to modal when below custom pixel value', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-two"]');
  const value = el.dataset.drawerBreakpoint;

  expect(el).not.toHaveClass('drawer_modal');
  resizeWindow(300);
  drawer.breakpoint.check();
  expect(el).toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
});

test('should switch to modal when using a custom data breakpoint attribute', () => {
  document.body.innerHTML = markupCustomAttr;
  drawer = new Drawer({
    autoInit: true,
    dataBreakpoint: 'bp'
  });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const value = drawer.breakpoint.getBreakpoint(el.dataset.bp);

  expect(el).not.toHaveClass('drawer_modal');
  resizeWindow(300);
  drawer.breakpoint.check();
  expect(el).toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
});

test('should use custom modal class on breakpoint switch', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({
    autoInit: true,
    classModal: 'be-cool'
  });
  const el = document.querySelector('[data-drawer="drawer-two"]');
  const value = el.dataset.drawerBreakpoint;

  expect(el).not.toHaveClass('be-cool');
  resizeWindow(300);
  drawer.breakpoint.check();
  expect(el).toHaveClass('be-cool');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
});

test('should allow using a custom breakpoints object', () => {
  document.body.innerHTML = markupCustomBreakpoints;

  drawer = new Drawer({
    autoInit: true,
    breakpoints: {
      xxl: '1600px',
      xxs: '300px'
    }
  });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const value = drawer.settings.breakpoints[el.dataset.drawerBreakpoint];

  expect(el).not.toHaveClass('drawer_modal');
  resizeWindow(275);
  drawer.breakpoint.check();
  expect(el).toHaveClass('drawer_modal');
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth);
  expect(drawer.settings.breakpoints).toHaveProperty('xxl');
});

test('should remove opened and add closed state class when switching to modal', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-two"]');

  expect(el).toHaveClass('is-opened');
  expect(el).not.toHaveClass('drawer_modal is-closed');
  resizeWindow(300);
  drawer.breakpoint.check();
  expect(el).not.toHaveClass('is-opened');
  expect(el).toHaveClass('drawer_modal is-closed');
});

test('should apply saved state when switching to drawer', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 300;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-two"]');
  const state = JSON.parse(localStorage.getItem('DrawerState'));

  expect(state['drawer-two']).toMatch('is-opened');
  expect(el).not.toHaveClass('is-opened');
  expect(el).toHaveClass('drawer_modal is-closed');

  resizeWindow(900);
  drawer.breakpoint.check();
  expect(el).toHaveClass('is-opened');
  expect(el).not.toHaveClass('drawer_modal is-closed');
});

test('should not throw error when checking breakpoint if no mediaQueryLists exists or is empty', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 300;
  drawer = new Drawer({ autoInit: true });
  drawer.breakpoint.mediaQueryLists = null;
  expect(drawer.breakpoint.check.bind(drawer)).not.toThrow();
  drawer.breakpoint.mediaQueryLists = [];
  expect(drawer.breakpoint.check.bind(drawer)).not.toThrow();
});

test('should filter matching breakpoints when event is passed to breakpoint check', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 800;
  drawer = new Drawer({ autoInit: true });
  const el1 = document.querySelector('[data-drawer="drawer-one"]'); // bp = 760px
  const el2 = document.querySelector('[data-drawer="drawer-two"]'); // bp = 400px

  expect(el1).not.toHaveClass('drawer_modal');
  expect(el2).not.toHaveClass('drawer_modal');

  let mockEvent = { media: '(min-width:400px)' };
  resizeWindow(400);
  drawer.breakpoint.check(mockEvent);
  expect(el1).not.toHaveClass('drawer_modal');
  expect(el2).toHaveClass('drawer_modal');

  mockEvent = { media: '(min-width:760px)' };
  resizeWindow(760);
  drawer.breakpoint.check(mockEvent);
  expect(el1).toHaveClass('drawer_modal');
  expect(el2).toHaveClass('drawer_modal');

  resizeWindow(761);
  drawer.breakpoint.check();
  expect(el1).not.toHaveClass('drawer_modal');
  expect(el2).not.toHaveClass('drawer_modal');
});

test('should not throw error when a drawer in mediaQueryLists doesn\'t exist in the document', () => {
  document.body.innerHTML = markup;
  window.innerWidth = 300;
  drawer = new Drawer({ autoInit: true });
  drawer.breakpoint.mediaQueryLists[0].drawer = 'asdf-drawer';
  drawer.breakpoint.check();
  // console.log(drawer.breakpoint.mediaQueryLists);
  expect(drawer.breakpoint.check.bind(drawer)).not.toThrow();
});

// test('should not throw error if breakpoint check doesn\'t find a specific drawer', () => {

// });
