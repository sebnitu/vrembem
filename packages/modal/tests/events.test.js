import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { transitionEnd } from './helpers/transition';

let modal;

const markup = `
  <button data-modal-open="modal-default">...</button>
  <div data-modal="modal-default" class="modal is-closed">
    <div data-modal-dialog class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
`;

afterEach(() => {
  modal.destroy();
  modal = null;
  document.body.innerHTML = null;
});

test('should emit custom event when modal has opened', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal="modal-default"]');
  const btn = document.querySelector('[data-modal-open]');
  let eventFired = false;

  document.addEventListener('modal:opened', () => {
    eventFired = true;
  });

  btn.click();
  await transitionEnd(el);

  expect(el).toHaveClass('is-opened');
  expect(eventFired).toBe(true);
});

test('should emit custom event when modal has closed', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal="modal-default"]');
  const btn = document.querySelector('[data-modal-open]');
  const btnClose = document.querySelector('[data-modal-close]');
  let eventFired = false;

  document.addEventListener('modal:closed', () => {
    eventFired = true;
  });

  btn.click();
  await transitionEnd(el);

  expect(el).toHaveClass('is-opened');
  expect(eventFired).toBe(false);

  btnClose.click();
  await transitionEnd(el);

  expect(el).toHaveClass('is-closed');
  expect(eventFired).toBe(true);
});

test('should be able to set a custom event prefix', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({
    autoInit: true,
    customEventPrefix: 'vrembem:'
  });
  const el = document.querySelector('[data-modal="modal-default"]');
  const btn = document.querySelector('[data-modal-open]');
  const btnClose = document.querySelector('[data-modal-close]');
  let eventOpened = false;
  let eventClosed = false;

  document.addEventListener('vrembem:opened', () => {
    eventOpened = true;
  });

  document.addEventListener('vrembem:closed', () => {
    eventClosed = true;
  });

  btn.click();
  await transitionEnd(el);

  expect(eventOpened).toBe(true);
  expect(eventClosed).toBe(false);

  eventOpened = false;

  btnClose.click();
  await transitionEnd(el);

  expect(eventOpened).toBe(false);
  expect(eventClosed).toBe(true);
});
