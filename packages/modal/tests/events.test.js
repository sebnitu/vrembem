import '@testing-library/jest-dom';
import { transitionEnd } from './helpers/transition';
import Modal from '../index';

const markup = `
  <button data-modal-open="modal-default">...</button>
  <div id="modal-default" class="modal is-closed">
    <div class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
`;

test('should emit custom event when modal has opened', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  await modal.init();
  const el = document.querySelector('#modal-default');
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
  const modal = new Modal();
  await modal.init();
  const el = document.querySelector('#modal-default');
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
  const modal = new Modal({
    customEventPrefix: 'vrembem:'
  });
  await modal.init();
  const el = document.querySelector('#modal-default');
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
