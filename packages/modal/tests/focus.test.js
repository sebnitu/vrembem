import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { delay } from './helpers/delay';

let modal;
const ev = new Event('transitionend');

const markup = `
  <button data-modal-open="modal-one">Modal One</button>
  <button data-modal-open="modal-two">Modal Two</button>
  <div data-modal="modal-one" class="modal is-closed" tabindex="-1">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
      <button data-modal-open="modal-two">Modal Two</button>
    </div>
  </div>
  <div data-modal="modal-two" class="modal is-closed">
    <div class="modal__dialog">
      <button data-modal-close data-modal-focus>Close</button>
      <button data-modal-open="modal-one">Modal One</button>
    </div>
  </div>
`;

afterEach(() => {
  modal.destroy();
  modal = null;
  document.body.innerHTML = null;
});

test('should focus modal when opened and refocus trigger when closed', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal="modal-one"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-one"]');

  btnOpen.click();
  el.dispatchEvent(ev);
  await delay();
  expect(el).toHaveFocus();
});

test('should focus inner modal element and refocus trigger when closed', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal="modal-two"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-two"]');
  const btnClose = el.querySelector('[data-modal-close]');

  btnOpen.click();
  el.dispatchEvent(ev);
  await delay();
  expect(btnClose).toHaveFocus();

  btnClose.click();
  el.dispatchEvent(ev);
  await delay();
  expect(btnOpen).toHaveFocus();
});

test('should remember initial trigger when opening modal through another modal', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const elOne = document.querySelector('[data-modal="modal-one"]');
  const elTwo = document.querySelector('[data-modal="modal-two"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-one"]');
  const btnTwo = elOne.querySelector('[data-modal-open="modal-two"]');
  const btnClose = elTwo.querySelector('[data-modal-close]');

  btnOpen.click();
  elOne.dispatchEvent(ev);

  btnTwo.click();
  elOne.dispatchEvent(ev);
  elTwo.dispatchEvent(ev);

  btnClose.click();
  elTwo.dispatchEvent(ev);
  await delay();

  expect(btnOpen).toHaveFocus();
});

test('should disable focus handling when setting focus false', () => {
  document.body.innerHTML = markup;
  modal = new Modal({
    autoInit: true,
    focus: false
  });
  const el = document.querySelector('[data-modal="modal-two"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-two"]');
  const btnClose = el.querySelector('[data-modal-close]');

  btnOpen.click();
  el.dispatchEvent(ev);
  expect(el).toHaveClass('is-opened');
  expect(btnClose).not.toHaveFocus();

  btnClose.click();
  el.dispatchEvent(ev);
  expect(el).not.toHaveClass('is-opened');
  expect(btnOpen).not.toHaveFocus();
});
