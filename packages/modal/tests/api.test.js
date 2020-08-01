import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { delay } from './helpers/delay';

let modal;
const ev = new Event('transitionend');

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div data-modal="modal-default" class="modal">
    <div data-modal-dialog class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

const markupState = `
  <div data-modal="modal-one" class="modal">
    <div data-modal-dialog class="modal__dialog">
      ...
    </div>
  </div>
  <div data-modal="modal-two" class="modal is-opened is-closed is-opening is-closing">
    <div data-modal-dialog class="modal__dialog">
      ...
    </div>
  </div>
`;

afterEach(() => {
  modal.destroy();
  modal = null;
  document.body.innerHTML = null;
});

test('should open modal using api call', () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');

  modal.open('modal-default');
  el.dispatchEvent(ev);

  expect(el).toHaveClass('modal is-opened');
  expect(el.classList.length).toBe(2);
});

test('should do nothing if open api is called on modal that\'s already open', () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');

  modal.open('modal-default');
  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-opened');
  expect(el.classList.length).toBe(2);

  modal.open('modal-default');
  expect(el).not.toHaveClass('is-opening');
  expect(el.classList.length).toBe(2);
});

test('should close modal using api call', () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');

  btnOpen.click();
  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-opened');
  expect(el.classList.length).toBe(2);

  modal.close();
  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});

test('should fire callback when using open api', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  let callbackCheck = false;

  modal.open('modal-default', () => {
    callbackCheck = true;
  });
  el.dispatchEvent(ev);
  await delay();
  expect(callbackCheck).toBe(true);
});

test('should fire callback when using close api', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  let callbackCheck = false;

  modal.open('modal-default');
  el.dispatchEvent(ev);
  await delay();

  modal.close(true, () => {
    callbackCheck = true;
  });
  el.dispatchEvent(ev);
  await delay();
  expect(callbackCheck).toBe(true);
});

test('should properly destroy drawer instance on api call', () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');

  modal.destroy();
  btnOpen.click();
  el.dispatchEvent(ev);

  expect(Object.keys(modal.memory).length).toBe(0);
  expect(el).toHaveClass('modal is-closed');
  expect(el.classList.length).toBe(2);
});

test('should set tabindex attribute with api call', () => {
  document.body.innerHTML = markup;
  modal = new Modal({
    autoInit: true,
    setTabindex: false
  });
  const dialog = document.querySelector('[data-modal-dialog]');
  expect(dialog).not.toHaveAttribute('tabindex');
  modal.setTabindex();
  expect(dialog).toHaveAttribute('tabindex');
});

test('should set initial state on api call', () => {
  document.body.innerHTML = markupState;
  modal = new Modal();
  const modalOne = document.querySelector('[data-modal="modal-one"]');
  const modalTwo = document.querySelector('[data-modal="modal-two"]');
  expect(modalOne).not.toHaveClass('is-closed');
  expect(modalOne.classList.length).toBe(1);
  expect(modalTwo).toHaveClass('modal is-opened is-closed is-opening is-closing');
  expect(modalTwo.classList.length).toBe(5);

  modal.setInitialState();
  expect(modalOne).toHaveClass('modal is-closed');
  expect(modalOne.classList.length).toBe(2);
  expect(modalTwo).toHaveClass('modal is-closed');
  expect(modalTwo.classList.length).toBe(2);
});

test('should set initial state even when modal is open', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const modalDefault = document.querySelector('[data-modal="modal-default"]');
  modal.open('modal-default');
  modalDefault.dispatchEvent(ev);
  await delay();
  expect(modalDefault).toHaveClass('is-opened');

  modal.setInitialState();
  expect(modalDefault).toHaveClass('is-closed');
  expect(modalDefault.classList.length).toBe(2);
});
