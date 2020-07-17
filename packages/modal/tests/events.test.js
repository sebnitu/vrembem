import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { delay } from './helpers/delay';

let modal;
const ev = new Event('transitionend');

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
  el.dispatchEvent(ev);
  await delay();
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
  el.dispatchEvent(ev);
  await delay();

  expect(el).toHaveClass('is-opened');
  expect(eventFired).toBe(false);

  btnClose.click();
  el.dispatchEvent(ev);
  await delay();

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
  el.dispatchEvent(ev);
  await delay();

  expect(eventOpened).toBe(true);
  expect(eventClosed).toBe(false);

  eventOpened = false;

  btnClose.click();
  el.dispatchEvent(ev);
  await delay();

  expect(eventOpened).toBe(false);
  expect(eventClosed).toBe(true);
});
