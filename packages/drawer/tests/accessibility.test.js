import '@testing-library/jest-dom';
import { transition } from './helpers/transition';

import Drawer from '../index.js';

document.body.innerHTML = `
  <div class="drawer__wrapper">
    <div id="drawer-default" class="drawer drawer_modal">
      <div class="drawer__dialog">...</div>
    </div>
    <main class="drawer__main">
      <button data-drawer-toggle="drawer-default">...</button>
    </main>
  </div>
`;

const drawer = new Drawer({
  selectorInert: 'main',
  selectorOverflow: 'body, main'
});

const el = document.querySelector('.drawer');
const dialog = document.querySelector('.drawer__dialog');
const main = document.querySelector('.drawer__main');
const btn = document.querySelector('[data-drawer-toggle]');

test('should set accessibility attributes to modal drawer dialog', async () => {
  expect(dialog.getAttribute('aria-modal')).toBe(null);
  expect(dialog.getAttribute('tabindex')).toBe(null);

  await drawer.init();

  expect(dialog.getAttribute('aria-modal')).toBe('true');
  expect(dialog.getAttribute('tabindex')).toBe('-1');
});

test('should properly hide content when modal drawer is opened', async () => {
  btn.click();
  await transition(el);

  expect(main.inert).toBe(true);
  expect(main.getAttribute('aria-hidden')).toBe('true');
  expect(main).toHaveStyle({ overflow: 'hidden' });
});

test('should properly show content when modal drawer is closed', async () => {
  btn.click();
  await transition(el);

  expect(main.inert).toBe(null);
  expect(main.hasAttribute('aria-hidden')).toBe(false);
  expect(main).not.toHaveStyle({ overflow: 'hidden' });
});
