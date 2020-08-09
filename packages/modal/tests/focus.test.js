import Modal from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { transition } from './helpers/transition';

let modal;

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

const markupPruneFocusable = `
  <div data-modal="modal-default" class="modal">
    <div data-modal-dialog class="modal__dialog">
      <button class="1" style="display:none;">...</button>
      <button class="2">...</button>
      <button class="3">...</button>
      <button class="4">...</button>
      <button class="5" style="display:none;">...</button>
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
  modal = Modal({ autoInit: true });
  const el = document.querySelector('[data-modal="modal-one"]');
  const dialog = el.querySelector('[data-modal-dialog]');
  const btnOpen = document.querySelector('[data-modal-open="modal-one"]');

  btnOpen.click();
  await transition(el);
  expect(dialog).toHaveFocus();
});

test('should focus inner modal element and refocus trigger when closed', async () => {
  document.body.innerHTML = markup;
  modal = Modal({ autoInit: true });
  const el = document.querySelector('[data-modal="modal-two"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-two"]');
  const btnClose = el.querySelector('[data-modal-close]');

  btnOpen.click();
  await transition(el);
  expect(btnClose).toHaveFocus();

  btnClose.click();
  await transition(el);
  expect(btnOpen).toHaveFocus();
});

test('should remember initial trigger when opening modal through another modal', async () => {
  document.body.innerHTML = markup;
  modal = Modal({ autoInit: true });
  const elOne = document.querySelector('[data-modal="modal-one"]');
  const elTwo = document.querySelector('[data-modal="modal-two"]');
  const btnOpen = document.querySelector('[data-modal-open="modal-one"]');
  const btnTwo = elOne.querySelector('[data-modal-open="modal-two"]');
  const btnClose = elTwo.querySelector('[data-modal-close]');

  btnOpen.click();
  await transition(elOne);

  btnTwo.click();
  await transition(elOne);
  await transition(elTwo);

  btnClose.click();
  await transition(elTwo);

  expect(btnOpen).toHaveFocus();
});

test('should throw error if modal is not found on open call', async () => {
  document.body.innerHTML = markup;
  modal = Modal({ autoInit: true });
  modal.open('asdf').catch((error) => {
    expect(error.message).toBe('Did not find modal with key: "asdf"');
  });
});

test('should retain focus on modal if nothing inner is focusable', async () => {
  document.body.innerHTML = markup;
  modal = Modal({ autoInit: true });
  const elModal = document.querySelector('[data-modal="modal-empty"');
  const dialog = elModal.querySelector('[data-modal-dialog]');
  modal.open('modal-empty');
  await transition(elModal);
  expect(elModal).toHaveClass('is-opened');
  expect(dialog).toHaveFocus();
  userEvent.tab();
  expect(dialog).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(dialog).toHaveFocus();
});

test('should properly setup a focus trap when modal is open', async () => {
  document.body.innerHTML = markup;
  modal = Modal({ autoInit: true });
  const elModal = document.querySelector('[data-modal="modal-one"');
  const dialog = elModal.querySelector('[data-modal-dialog]');
  modal.open('modal-one');
  await transition(elModal);
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

// NOTICE: Requires a headless browser to test properly
test('should remove unfocusable elements from memory', async () => {
  document.body.innerHTML = markupPruneFocusable;
  modal = Modal({ autoInit: true });
  const el = document.querySelector('[data-modal]');

  modal.open('modal-default');
  await transition(el);

  expect(el).toHaveClass('modal is-opened');
  expect(modal.memory.focusable.length).toBe(5); // Should actually be 3
  expect(modal.memory.focusableFirst).toHaveClass('1'); // Should actually be 2
  expect(modal.memory.focusableLast).toHaveClass('5'); // Should actually be 4
});
