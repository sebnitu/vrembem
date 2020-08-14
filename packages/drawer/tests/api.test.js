import Drawer from '../index.js';
import { checkMatch } from './helpers/checkMatch';
import { resizeWindow } from './helpers/resizeWindow';
import { transition } from './helpers/transition';
import './helpers/matchMedia.mock.js';
import '@testing-library/jest-dom/extend-expect';

let drawer;
const ev = new Event('transitionend');

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-default">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">Drawer Toggle</button>
    </div>
  </div>
`;

const markupBreakpoint = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-default" data-drawer-breakpoint="400px">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">Drawer Toggle</button>
    </div>
  </div>
`;

const markupModal = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal is-closed" data-drawer="drawer-default">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">Drawer Toggle</button>
    </div>
  </div>
`;

window.addEventListener('resize', () => {
  if (drawer) {
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

test('should toggle drawer using api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer]');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  drawer.toggle('drawer-default');
  expect(el).toHaveClass('is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('is-opened');

  drawer.toggle('drawer-default');
  expect(el).toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer is-closed');
  expect(el).not.toHaveClass('is-opening is-opened is-closing');
});

test('should throw error if toggle has a selector not found in page', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  drawer.toggle('drawer-asdf').catch((error) => {
    expect(error.message).toBe('Did not find drawer with key: "drawer-asdf"');
  });
});

test('should open drawer using api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer]');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  drawer.open('drawer-default');
  expect(el).toHaveClass('is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer is-opened');
  expect(el).not.toHaveClass('is-opening is-closing is-closed');
});

test('should throw error if open has a selector not found in page', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  drawer.open('drawer-asdf').catch((error) => {
    expect(error.message).toBe('Did not find drawer with key: "drawer-asdf"');
  });
});

test('should do nothing if drawer is already opened and open api is called', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  drawer.open('drawer-default');
  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer is-opened');
  drawer.open('drawer-default');
  expect(el).not.toHaveClass('is-opening');
});

test('should close drawer using api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  btnOpen.click();
  expect(el).toHaveClass('is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer is-opened');
  expect(el).not.toHaveClass('is-opening');
  expect(el).not.toHaveClass('is-closing');

  drawer.close('drawer-default');
  expect(el).toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer is-closed');
  expect(el).not.toHaveClass('is-opening is-opened is-closing');
});

test('should throw error if close has a selector not found in page', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  drawer.close('drawer-asdf').catch((error) => {
    expect(error.message).toBe('Did not find drawer with key: "drawer-asdf"');
  });
});

test('should do nothing if drawer is already closed and close api is called', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  drawer.close('drawer-default');
  expect(el).not.toHaveClass('is-closing');
});

test('should run function when promise is returned from toggle api', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  let callbackCheck = false;

  drawer.toggle('drawer-default').then(() => {
    callbackCheck = true;
  });

  await transition(el);
  expect(callbackCheck).toEqual(true);
});

test('should fire callback when using open api', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  let callbackCheck = false;

  drawer.open('drawer-default').then(() => {
    callbackCheck = true;
  });

  await transition(el);
  expect(callbackCheck).toEqual(true);
});

test('should fire callback when using close api', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  let callbackCheck = false;

  drawer.open('drawer-default');
  await transition(el);

  drawer.close('drawer-default').then(() => {
    callbackCheck = true;
  });

  await transition(el);
  expect(callbackCheck).toEqual(true);
});

test('should initialize breakpoint feature on api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  expect(drawer.mediaQueryLists.length).toEqual(0);
  el.setAttribute('data-drawer-breakpoint', 'md');
  drawer.breakpointInit();
  expect(drawer.mediaQueryLists.length).toEqual(1);
});

test('should run breakpoint check on api call', () => {
  document.body.innerHTML = markupBreakpoint;
  drawer = new Drawer({ autoInit: true });
  let eventFired = false;

  document.addEventListener('drawer:breakpoint', () => {
    eventFired = true;
  });

  resizeWindow(200);
  drawer.breakpointCheck();

  expect(eventFired).toEqual(true);
});

test('should switch drawer to modal on api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  expect(el).not.toHaveClass('drawer_modal');
  drawer.switchToModal('drawer-default');
  expect(el).toHaveClass('drawer_modal');
});

test('should switch drawer to default on api call', () => {
  document.body.innerHTML = markupModal;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  expect(el).toHaveClass('drawer_modal');
  drawer.switchToDefault('drawer-default');
  expect(el).not.toHaveClass('drawer_modal');
});

test('should throw error if passed drawer selector returns null', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  drawer.switchToModal('drawer-asdf').catch((error) => {
    expect(error.message).toBe('Did not find drawer with key: "drawer-asdf"');
  });
  drawer.switchToDefault('drawer-asdf').catch((error) => {
    expect(error.message).toBe('Did not find drawer with key: "drawer-asdf"');
  });
});

test('should destroy breakpoint feature on api call', () => {
  document.body.innerHTML = markup;
  const el = document.querySelector('[data-drawer]');
  el.setAttribute('data-drawer-breakpoint', 'md');
  drawer = new Drawer({ autoInit: true });
  expect(drawer.mediaQueryLists.length).toEqual(1);
  drawer.breakpointDestroy();
  expect(drawer.mediaQueryLists).toEqual(null);
});

test('should properly destroy drawer instance on api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  drawer.destroy();
  btnOpen.click();
  el.dispatchEvent(ev);
  expect(el).not.toHaveClass('is-opened');
  expect(Object.getOwnPropertyNames(localStorage).length).toEqual(0);
  expect(Object.getOwnPropertyNames(drawer.state).length).toEqual(0);
});

test('should set tabindex attribute with api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({
    autoInit: true,
    setTabindex: false
  });
  const dialog = document.querySelector('[data-drawer-dialog]');
  expect(dialog).not.toHaveAttribute('tabindex');
  drawer.setTabindex();
  expect(dialog).toHaveAttribute('tabindex');
});
