import { Drawer } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { transition } from './helpers/transition';

let drawer;

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-one">
      <div data-drawer-dialog class="drawer__dialog">
        <button class="close-one" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer is-closed" data-drawer="drawer-two">
      <div data-drawer-dialog class="drawer__dialog">
        <button class="close-two" data-drawer-close data-drawer-focus>
          Close
        </button>
      </div>
    </div>
    <div class="drawer drawer_modal" data-drawer="drawer-modal">
      <div data-drawer-dialog class="drawer__dialog">
        <button class="first">Close</button>
        <button>...</button>
        <button class="last">Modal Two</button>
      </div>
    </div>
    <div class="drawer drawer_modal" data-drawer="drawer-empty">
      <div data-drawer-dialog class="drawer__dialog">
        ...
      </div>
    </div>
    <div class="drawer__main">
      <button class="toggle-one" data-drawer-toggle="drawer-one">
        Drawer Toggle
      </button>
      <button class="toggle-two" data-drawer-toggle="drawer-two">
        Drawer Toggle
      </button>
      <button class="toggle-three" data-drawer-open="drawer-two">
        Drawer Open
      </button>
    </div>
  </div>
`;

const markupCustomAttr = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-one">
      <div class="drawer__dialog">
        <button class="close-one" data-drawer-close data-focus>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button class="toggle-one" data-drawer-toggle="drawer-one">
        Drawer Toggle
      </button>
    </div>
  </div>
`;

beforeEach(() => {
  document.body.innerHTML = null;
  window.innerWidth = 1200;
});

afterEach(() => {
  drawer.destroy();
  drawer = null;
});

test('should focus drawer element and refocus trigger when closed', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  const dialog = el.querySelector('[data-drawer-dialog]');
  const btn = document.querySelector('.toggle-one');
  const btnClose = document.querySelector('.close-one');

  btn.click();
  await transition(el);
  expect(dialog).toHaveFocus();

  btnClose.click();
  await transition(el);
  expect(btn).toHaveFocus();
});

test('should focus data-drawer-focus element and refocus trigger when closed', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-two"]');
  const btn = document.querySelector('.toggle-two');
  const btnClose = document.querySelector('.close-two');

  btn.click();
  await transition(el);
  expect(btnClose).toHaveFocus();

  btnClose.click();
  await transition(el);
  expect(btn).toHaveFocus();
});

test('should focus custom data element and refocus trigger when closed', async () => {
  document.body.innerHTML = markupCustomAttr;
  drawer = new Drawer({
    autoInit: true,
    dataFocus: 'focus'
  });
  const el = document.querySelector('[data-drawer]');
  const btn = document.querySelector('[data-drawer-toggle]');
  const btnClose = document.querySelector('[data-focus]');

  btn.click();
  await transition(el);
  expect(btnClose).toHaveFocus();

  btnClose.click();
  await transition(el);
  expect(btn).toHaveFocus();
});

test('should re-focus the target if open triggers while drawer is already opened', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-two"]');
  const elFocus = el.querySelector('[data-drawer-focus]');
  const btn = document.querySelector('.toggle-three');

  btn.click();
  await transition(el);
  expect(elFocus).toHaveFocus();

  elFocus.blur();

  btn.click();
  await transition(el);
  expect(elFocus).toHaveFocus();
});

test('should retain focus on drawer if nothing inner is focusable', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-empty"');
  const dialog = el.querySelector('[data-drawer-dialog]');

  drawer.open('drawer-empty');
  await transition(el);

  expect(el).toHaveClass('is-opened');
  expect(dialog).toHaveFocus();

  userEvent.tab();
  expect(dialog).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(dialog).toHaveFocus();
});

test('should properly setup a focus trap when drawer is open', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer="drawer-modal"');
  const dialog = el.querySelector('[data-drawer-dialog]');

  drawer.open('drawer-modal');
  await transition(el);

  expect(el).toHaveClass('is-opened');
  expect(dialog).toHaveFocus();

  userEvent.tab({ shift: true });
  expect(drawer.memory.focusableLast).toHaveFocus();

  userEvent.tab();
  expect(drawer.memory.focusableFirst).toHaveFocus();

  userEvent.tab({ shift: true });
  expect(drawer.memory.focusableLast).toHaveFocus();

  userEvent.tab({ shift: true });
  userEvent.tab({ shift: true });
  userEvent.tab({ shift: true });
  expect(drawer.memory.focusableLast).toHaveFocus();

  userEvent.tab();
  userEvent.tab();
  userEvent.tab();
  expect(drawer.memory.focusableLast).toHaveFocus();

  expect(drawer.memory.focusable.length).toBe(3);
  expect(drawer.memory.focusableFirst).toHaveClass('first');
  expect(drawer.memory.focusableLast).toHaveClass('last');
});
