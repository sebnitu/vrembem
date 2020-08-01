import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { delay } from './helpers/delay';

let modal;
const ev = new Event('transitionend');

const markup = `
  <button data-modal-open="modal-one">Modal One</button>
  <button data-modal-open="modal-two">Modal Two</button>
  <div data-modal="modal-one" class="modal">
    <div data-modal-dialog class="modal__dialog">
      <button data-modal-close class="first">Close</button>
      <button>...</button>
      <button data-modal-open="modal-two" class="last">Modal Two</button>
    </div>
  </div>
  <div data-modal="modal-two" class="modal">
    <div data-modal-dialog class="modal__dialog">
      <button data-modal-close data-modal-focus>Close</button>
      <button data-modal-open="modal-one">Modal One</button>
    </div>
  </div>
  <div data-modal="modal-empty" class="modal">
    <div data-modal-dialog class="modal__dialog">
      <p>This modal has nothing to focus...</p>
    </div>
  </div>
`;

afterEach(() => {
  modal.destroy();
  modal = null;
  document.body.innerHTML = null;
});

test('should focus modal dialog when opened and refocus trigger when closed', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal="modal-one"]');
  const dialog = el.querySelector('[data-modal-dialog]');
  const btnOpen = document.querySelector('[data-modal-open="modal-one"]');

  btnOpen.click();
  el.dispatchEvent(ev);
  await delay();
  expect(dialog).toHaveFocus();
});

test('should focus inner modal element and refocus trigger when closed', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const el = document.querySelector('[data-modal="modal-two"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-two"]');
  const btnClose = el.querySelector('[data-modal-close]');

  btnOpen.click();
  el.dispatchEvent(ev);
  await delay();
  expect(btnClose).toHaveFocus();

  btnClose.click();
  el.dispatchEvent(ev);
  await delay();
  expect(btnOpen).toHaveFocus();
});

test('should remember initial trigger when opening modal through another modal', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const elOne = document.querySelector('[data-modal="modal-one"]');
  const elTwo = document.querySelector('[data-modal="modal-two"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-one"]');
  const btnTwo = elOne.querySelector('[data-modal-open="modal-two"]');
  const btnClose = elTwo.querySelector('[data-modal-close]');

  btnOpen.click();
  elOne.dispatchEvent(ev);

  btnTwo.click();
  elOne.dispatchEvent(ev);
  elTwo.dispatchEvent(ev);

  btnClose.click();
  elTwo.dispatchEvent(ev);
  await delay();

  expect(btnOpen).toHaveFocus();
});

test('should not throw error if modal trigger from within modal doesn\'t return an element', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const elOne = document.querySelector('[data-modal="modal-one"]');
  const elTwo = document.querySelector('[data-modal="modal-two"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-one"]');
  const btnTwo = elOne.querySelector('[data-modal-open="modal-two"]');
  btnTwo.setAttribute('data-modal-open', 'asdf');

  btnOpen.click();
  elOne.dispatchEvent(ev);
  await delay();

  btnTwo.click();
  elOne.dispatchEvent(ev);
  elTwo.dispatchEvent(ev);
  await delay();

  expect(elOne).toHaveClass('is-closed');
  expect(elTwo).toHaveClass('is-closed');
});

test('should retain focus on modal if nothing inner is focusable', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const elModal = document.querySelector('[data-modal="modal-empty"');
  const dialog = elModal.querySelector('[data-modal-dialog]');
  modal.open('modal-empty');
  elModal.dispatchEvent(ev);
  await delay();
  expect(elModal).toHaveClass('is-opened');
  expect(dialog).toHaveFocus();
  userEvent.tab();
  expect(dialog).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(dialog).toHaveFocus();
});

test('should properly setup a focus trap when modal is open', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const elModal = document.querySelector('[data-modal="modal-one"');
  const dialog = elModal.querySelector('[data-modal-dialog]');
  modal.open('modal-one');
  elModal.dispatchEvent(ev);
  await delay();
  expect(elModal).toHaveClass('is-opened');
  expect(dialog).toHaveFocus();

  userEvent.tab({ shift: true });
  expect(modal.memory.focusableLast).toHaveFocus();

  userEvent.tab();
  expect(modal.memory.focusableFirst).toHaveFocus();

  userEvent.tab({ shift: true });
  expect(modal.memory.focusableLast).toHaveFocus();

  userEvent.tab({ shift: true });
  userEvent.tab({ shift: true });
  userEvent.tab({ shift: true });
  expect(modal.memory.focusableLast).toHaveFocus();

  userEvent.tab();
  userEvent.tab();
  userEvent.tab();
  expect(modal.memory.focusableLast).toHaveFocus();

  expect(modal.memory.focusable.length).toBe(3);
  expect(modal.memory.focusableFirst).toHaveClass('first');
  expect(modal.memory.focusableLast).toHaveClass('last');
});

test('should not throw error if memory.target is null when modal closes', async () => {
  document.body.innerHTML = markup;
  modal = new Modal({ autoInit: true });
  const modalOne = document.querySelector('[data-modal="modal-one"');
  modal.open('modal-one');
  modalOne.dispatchEvent(ev);
  await delay();

  modal.memory.target = null;
  modal.close();
  modalOne.dispatchEvent(ev);
  await delay();

  expect(modalOne).toHaveClass('is-closed');
});
