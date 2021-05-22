import Drawer from '../index.js';
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

beforeEach(() => {
  document.body.innerHTML = null;
});

afterEach(() => {
  drawer.destroy();
  drawer.destroyEventListeners();
  drawer = null;
});

test('should not set event listeners when option is set to false', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ eventListeners: false });
  const el = document.querySelector('[data-drawer]');
  const btn = document.querySelector('[data-drawer-toggle]');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  btn.click();
  expect(el).not.toHaveClass('is-opening');

  el.dispatchEvent(ev);
  expect(el).not.toHaveClass('is-opened');
});

test('should add event listeners using api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ eventListeners: false });
  const el = document.querySelector('[data-drawer]');
  const btn = document.querySelector('[data-drawer-toggle]');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  btn.click();
  expect(el).not.toHaveClass('is-opening');

  drawer.initEventListeners();

  btn.click();
  expect(el).toHaveClass('is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('is-opened');
});

test('should remove event listeners using api call', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer]');
  const btn = document.querySelector('[data-drawer-toggle]');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  drawer.destroyEventListeners();

  btn.click();
  expect(el).not.toHaveClass('is-opening');

  el.dispatchEvent(ev);
  expect(el).not.toHaveClass('is-opened');
});
