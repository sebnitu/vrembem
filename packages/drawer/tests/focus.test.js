import { Drawer } from '../index.js';
import { transition } from './helpers/transition';
import '@testing-library/jest-dom/extend-expect';

let drawer;

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-one" tabindex="-1">
      <div data-drawer-dialog class="drawer__dialog">
        <button class="close-one" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer is-closed" data-drawer="drawer-two" tabindex="-1">
      <div data-drawer-dialog class="drawer__dialog">
        <button class="close-two" data-drawer-close data-drawer-focus>
          Close
        </button>
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
    <div class="drawer is-closed" data-drawer="drawer-one" tabindex="-1">
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
