import '@testing-library/jest-dom/extend-expect';
import { transitionEnd } from './helpers/transition';
import Modal from '../index';

const keyEv = new KeyboardEvent('keydown', {
  key: 'Escape'
});

const markup = `
  <button data-modal-open="modal-default">Modal Required</button>
  <div id="modal-default" class="modal">
    <div class="modal__dialog" role="alertdialog">
      <button data-modal-close data-focus>Close</button>
    </div>
  </div>
`;

test('should prevent escape or screen click closing modal if required', async () => {
  document.body.innerHTML = markup;
  new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
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
