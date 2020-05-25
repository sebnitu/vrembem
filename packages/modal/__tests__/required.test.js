import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let modal;
const ev = new Event('transitionend');
const keyEv = new KeyboardEvent('keyup', {
  keyCode: 27
});

const markup = `
  <button data-modal-open="modal-default">Modal Required</button>
  <div data-modal="modal-default" data-modal-required class="modal" tabindex="-1">
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

test('should prevent escape or screen click closing modal if required', () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');
  const btnClose = el.querySelector('[data-modal-close]');

  btnOpen.click();
  el.dispatchEvent(ev);

  document.dispatchEvent(keyEv);
  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-open');

  el.click();
  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-open');

  btnClose.click();
  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal');
  expect(el.classList.length).toBe(1);
});
