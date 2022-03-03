import Modal from '../index';
import '@testing-library/jest-dom/extend-expect';
import { transition } from './helpers/transition';

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div id="modal-default" class="modal">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

test('should open modal using api call', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ autoInit: true });
  const el = document.querySelector('.modal');

  modal.open('modal-default');
  await transition(el);

  expect(el).toHaveClass('modal is-opened');
  expect(el.classList.length).toBe(2);
});

test('should do nothing if open api is called on modal that\'s already open', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ autoInit: true });
  const el = document.querySelector('.modal');

  modal.open('modal-default');
  await transition(el);

  expect(el).toHaveClass('modal is-opened');
  expect(el.classList.length).toBe(2);

  modal.open('modal-default');
  expect(el).not.toHaveClass('is-opening');
  expect(el.classList.length).toBe(2);
});

test('should close modal using api call', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  await transition(el);

  expect(el).toHaveClass('modal is-opened');
  expect(el.classList.length).toBe(2);

  modal.close();
  await transition(el);

  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});

test('should run function when promise is returned from open api', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
  let callbackCheck = false;

  modal.open('modal-default').then(() => {
    callbackCheck = true;
  });

  await transition(el);
  expect(callbackCheck).toBe(true);
});

test('should run function when promise is returned from close api', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
  let callbackCheck = false;

  modal.open('modal-default');
  await transition(el);

  modal.close().then(() => {
    callbackCheck = true;
  });

  await transition(el);
  expect(callbackCheck).toBe(true);
});

test('should properly destroy drawer instance on api call', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ autoInit: true });
  const el = document.querySelector('.modal');
  const btnOpen = document.querySelector('[data-modal-open]');

  modal.destroy();
  btnOpen.click();
  await transition(el);

  expect(Object.keys(modal.memory).length).toBe(0);
  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});

test('should return registered modal object if a registered target is passed', () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ autoInit: true });
  const el = document.querySelector('#modal-default');
  const result = modal.get(el.id);
  expect(el).toBe(result.target);
});

test('should return null if modal.get() does not return a modal', () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ autoInit: true });
  const el = modal.get('asdf');
  expect(el).toBe(null);
});
