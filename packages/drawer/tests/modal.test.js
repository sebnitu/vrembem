import { Drawer } from '../index.js';
import { transition } from './helpers/transition';
import '@testing-library/jest-dom/extend-expect';

let drawer;
const evEscape = new KeyboardEvent('keyup', {
  keyCode: 27
});
const evSpace = new KeyboardEvent('keyup', {
  keyCode: 32
});

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal is-closed" data-drawer="drawer-default">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close data-drawer-focus>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">Drawer Toggle</button>
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

test('should close when root modal (screen) is clicked', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const item = document.querySelector('.drawer__dialog');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  btnOpen.click();
  await transition(el);

  item.click();
  expect(el).toHaveClass('is-opened');

  el.click();
  expect(el).toHaveClass('is-closing');

  await transition(el);
  expect(el).toHaveClass('drawer drawer_modal is-closed');
  expect(el.classList.length).toBe(3);
});

test('should close when the escape key is pressed', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  btnOpen.click();
  expect(el).toHaveClass('drawer is-opening');

  await transition(el);
  expect(el).toHaveClass('drawer is-opened');

  document.dispatchEvent(evEscape);
  expect(el).toHaveClass('drawer is-closing');

  await transition(el);
  expect(el).toHaveClass('drawer drawer_modal is-closed');
  expect(el.classList.length).toBe(3);
});

test('should do nothing if none escape key is pressed', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  btnOpen.click();
  expect(el).toHaveClass('drawer is-opening');

  await transition(el);
  expect(el).toHaveClass('drawer is-opened');

  document.dispatchEvent(evSpace);
  expect(el).not.toHaveClass('is-closing');

  await transition(el);
  expect(el).not.toHaveClass('is-closed');
  expect(el.classList.length).toBe(3);
});

test('should not close when missing modal modifier and escape key is pressed', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  el.classList.remove('drawer_modal');

  btnOpen.click();
  expect(el).toHaveClass('drawer is-opening');

  await transition(el);
  expect(el).toHaveClass('drawer is-opened');

  document.dispatchEvent(evEscape);
  expect(el).not.toHaveClass('is-closing');

  await transition(el);
  expect(el).toHaveClass('drawer is-opened');
  expect(el.classList.length).toBe(2);
});
