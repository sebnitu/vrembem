import Modal from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { transitionStart, transitionEnd } from './helpers/transition';

const ev = new Event('transitionend');

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div id="modal-default" class="modal">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

beforeEach(() => {
  document.body.innerHTML = null;
});

test('should not set event listeners when option is set to false', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ eventListeners: false });
  const el = document.querySelector('.modal');
  const btn = document.querySelector('[data-modal-open]');

  modal.init();
  expect(el).toHaveClass('modal is-closed');

  btn.click();
  await transitionStart(el);
  expect(el).not.toHaveClass('is-opening');

  await transitionEnd(el);
  expect(el).not.toHaveClass('is-opened');
});

test('should add event listeners using api call', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ eventListeners: false });
  const el = document.querySelector('.modal');
  const btn = document.querySelector('[data-modal-open]');

  modal.init();
  expect(el).toHaveClass('modal is-closed');

  btn.click();
  await transitionStart(el);
  expect(el).not.toHaveClass('is-opening');

  await transitionEnd(el);
  expect(el).not.toHaveClass('is-opened');

  modal.initEventListeners();

  btn.click();
  expect(el).toHaveClass('is-opening');

  await transitionEnd(el);
  expect(el).toHaveClass('is-opened');
});

test('should remove event listeners using api call', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  const el = document.querySelector('.modal');
  const btn = document.querySelector('[data-modal-open]');

  modal.init();
  expect(el).toHaveClass('modal is-closed');

  modal.destroyEventListeners();

  btn.click();
  await transitionStart(el);
  expect(el).not.toHaveClass('is-opening');

  el.dispatchEvent(ev);
  await transitionEnd(el);
  expect(el).not.toHaveClass('is-opened');
});
