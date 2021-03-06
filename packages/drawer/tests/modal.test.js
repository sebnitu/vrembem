import Drawer from '../index.js';
import { transition } from './helpers/transition';
import '@testing-library/jest-dom/extend-expect';

let drawer;
const keyEscape = new KeyboardEvent('keydown', {
  key: 'Escape'
});
const keySpace = new KeyboardEvent('keydown', {
  key: 'Space'
});

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal is-closed" data-drawer="drawer-default">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close data-drawer-focus>...</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">...</button>
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

  document.dispatchEvent(keyEscape);
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

  document.dispatchEvent(keySpace);
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

  document.dispatchEvent(keyEscape);
  expect(el).not.toHaveClass('is-closing');

  await transition(el);
  expect(el).toHaveClass('drawer is-opened');
  expect(el.classList.length).toBe(2);
});

test('should not be able to close while modal transition is in process', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  btnOpen.click();
  expect(el).toHaveClass('drawer is-opening');

  document.dispatchEvent(keyEscape);
  expect(el).toHaveClass('drawer is-opening');

  await transition(el);
  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(3);
});
