import { Drawer } from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let drawer;
const ev = new Event('transitionend');
const evEscape = new KeyboardEvent('keyup', {
  keyCode: 27
});

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal is-closed" data-drawer="drawer-default">
      <div class="drawer__item">
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

test('should close when root modal (screen) is clicked', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const item = document.querySelector('.drawer__item');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  btnOpen.click();
  el.dispatchEvent(ev);

  item.click();
  expect(el).toHaveClass('is-opened');

  el.click();
  expect(el).toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer drawer_modal is-closed');
  expect(el.classList.length).toBe(3);
});

test('should close when the escape key is pressed', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  btnOpen.click();
  expect(el).toHaveClass('drawer is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer is-opened');

  document.dispatchEvent(evEscape);
  expect(el).toHaveClass('drawer is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer drawer_modal is-closed');
  expect(el.classList.length).toBe(3);
});

test('should not close when missing modal modifier and escape key is pressed', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');

  el.classList.remove('drawer_modal');

  btnOpen.click();
  expect(el).toHaveClass('drawer is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer is-opened');

  document.dispatchEvent(evEscape);
  expect(el).not.toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('drawer is-opened');
  expect(el.classList.length).toBe(2);
});
