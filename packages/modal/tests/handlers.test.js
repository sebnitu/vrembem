import '@testing-library/jest-dom/extend-expect';
import { transitionEnd } from './helpers/transition';
import Modal from '../index';

const keyEsc = new KeyboardEvent('keydown', {
  key: 'Escape'
});
const keySpace = new KeyboardEvent('keydown', {
  key: 'Space'
});

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div id="modal-default" class="modal is-closed">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

test('should close when root modal (screen) is clicked', async () => {
  document.body.innerHTML = markup;
  new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
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
  new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
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
  new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
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
  new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  expect(el).toHaveClass('modal is-opening');

  document.dispatchEvent(keyEsc);
  expect(el).toHaveClass('modal is-opening');

  await transitionEnd(el);
  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(2);
});
