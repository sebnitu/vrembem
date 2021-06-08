import Modal from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { transitionEnd } from './helpers/transition';

let modal;
const keyEv = new KeyboardEvent('keydown', {
  keyCode: 27
});

const markup = `
  <button data-modal-open="modal-default">Modal Required</button>
  <div data-modal="modal-default" data-modal-required class="modal is-closed" tabindex="-1">
    <div class="modal__dialog">
      <button data-modal-close data-modal-focus>Close</button>
    </div>
  </div>
`;

afterEach(() => {
  modal.destroy();
  modal = null;
  document.body.innerHTML = null;
});

test('should prevent escape or screen click closing modal if required', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');
  const btnClose = el.querySelector('[data-modal-close]');

  btnOpen.click();
  await transitionEnd(el);
  expect(el).toHaveClass('modal is-opened');

  document.dispatchEvent(keyEv);
  await transitionEnd(el);
  expect(el).toHaveClass('modal is-opened');

  el.click();
  await transitionEnd(el);
  expect(el).toHaveClass('modal is-opened');

  btnClose.click();
  await transitionEnd(el);
  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});
