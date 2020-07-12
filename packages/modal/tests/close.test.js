import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let modal;
const ev = new Event('transitionend');
const keyEv = new KeyboardEvent('keyup', {
  keyCode: 27
});
const evSpace = new KeyboardEvent('keyup', {
  keyCode: 32
});

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div data-modal="modal-default" class="modal is-closed">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

afterEach(() => {
  modal.destroy();
  modal = null;
  document.body.innerHTML = null;
});

test('should close when root modal (screen) is clicked', () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const dialog = document.querySelector('.modal__dialog');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  el.dispatchEvent(ev);

  dialog.click();
  expect(el).not.toHaveClass('is-closing');

  el.click();
  expect(el).toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});

test('should close when the escape key is pressed', () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  expect(el).toHaveClass('modal is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-opened');

  document.dispatchEvent(keyEv);
  expect(el).toHaveClass('modal is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});

test('should do nothing if none escape key is pressed', () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  expect(el).toHaveClass('modal is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-opened');

  document.dispatchEvent(evSpace);
  expect(el).not.toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).not.toHaveClass('is-closed');
  expect(el.classList.length).toBe(2);
});
