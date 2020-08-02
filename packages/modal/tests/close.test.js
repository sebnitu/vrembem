import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { transitionStart, transitionEnd } from './helpers/transition';

let modal;
const keyEsc = new KeyboardEvent('keyup', {
  keyCode: 27
});
const keySpace = new KeyboardEvent('keyup', {
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

test('should close when root modal (screen) is clicked', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const dialog = document.querySelector('.modal__dialog');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  await transitionEnd(el);

  dialog.click();
  await transitionEnd(el);
  expect(el).not.toHaveClass('is-closing');

  el.click();
  expect(el).toHaveClass('is-closing');

  await transitionEnd(el);
  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});

test('should close when the escape key is pressed', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  await transitionStart(el);
  expect(el).toHaveClass('modal is-opening');

  await transitionEnd(el);
  expect(el).toHaveClass('modal is-opened');

  document.dispatchEvent(keyEsc);
  expect(el).toHaveClass('modal is-closing');

  await transitionEnd(el);
  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});

test('should do nothing if none escape key is pressed', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  await transitionStart(el);
  expect(el).toHaveClass('modal is-opening');

  await transitionEnd(el);
  expect(el).toHaveClass('modal is-opened');

  document.dispatchEvent(keySpace);
  expect(el).not.toHaveClass('is-closing');

  await transitionEnd(el);
  expect(el).not.toHaveClass('is-closed');
  expect(el.classList.length).toBe(2);
});

test('should not be able to close while modal transition is in process', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  await transitionStart(el);
  expect(el).toHaveClass('modal is-opening');

  document.dispatchEvent(keyEsc);
  expect(el).toHaveClass('modal is-opening');

  await transitionEnd(el);
  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(2);
});
