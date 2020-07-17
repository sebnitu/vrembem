import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';

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

const markupCustomAttr = `
  <button data-a-o="modal-default">Modal Custom</button>
  <div data-a="modal-default" class="modal is-closed">
    <div class="modal__dialog">
      <button data-a-c data-a-f>Close</button>
    </div>
  </div>
`;

const markupCustomState = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div data-modal="modal-default" class="modal off">
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

test('should apply state classes on `click` and `transitionend` events', () => {
  document.body.innerHTML = markup;
  modal = new Modal();
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');
  const btnClose = el.querySelector('[data-modal-close]');

  modal.init();
  expect(el).toHaveClass('modal');

  btnOpen.click();
  expect(el).toHaveClass('is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('is-opened');

  btnClose.click();
  expect(el).toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-closed');
  expect(el).not.toHaveClass('is-opening is-opened is-closing');
});

test('should apply state classes with custom data attributes', () => {
  document.body.innerHTML = markupCustomAttr;
  modal = new Modal({
    autoInit: true,
    dataModal: 'a',
    dataOpen: 'a-o',
    dataClose: 'a-c',
    dataFocus: 'a-f',
    dataRequired: 'a-r'
  });
  const el = document.querySelector('[data-a]');
  const btnOpen = document.querySelector('[data-a-o]');
  const btnClose = el.querySelector('[data-a-c]');

  expect(el).toHaveClass('modal');

  btnOpen.click();
  expect(el).toHaveClass('is-opening');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('is-opened');

  btnClose.click();
  expect(el).toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal is-closed');
  expect(el).not.toHaveClass('is-opening is-opened is-closing');
});

test('should apply custom state classes', () => {
  document.body.innerHTML = markupCustomState;
  modal = new Modal({
    autoInit: true,
    stateOpened: 'on',
    stateOpening: 'enable',
    stateClosing: 'disable',
    stateClosed: 'off'
  });
  const el = document.querySelector('[data-modal]');
  const btnOpen = document.querySelector('[data-modal-open]');
  const btnClose = el.querySelector('[data-modal-close]');

  btnOpen.click();
  expect(el).toHaveClass('enable');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('on');

  btnClose.click();
  expect(el).toHaveClass('disable');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal off');
  expect(el).not.toHaveClass('enable on disable');
});

test('should toggle overflow hidden when modal opened and closed', () => {
  document.body.innerHTML = markup;
  const el = document.querySelector('[data-modal]');
  modal = new Modal({
    autoInit: true
  });
  modal.open('modal-default');
  el.dispatchEvent(ev);
  expect(document.body.style.overflow).toBe('hidden');
  modal.close('modal-default');
  el.dispatchEvent(ev);
  expect(document.body.style.overflow).toBe('');
});

test('should toggle overflow hidden on multiple elements', () => {
  document.body.innerHTML = markup;
  const el = document.querySelector('[data-modal]');
  const di = el.querySelector('.modal__dialog');
  modal = new Modal({
    autoInit: true,
    toggleOverflow: 'body, .modal, .modal__dialog'
  });
  modal.open('modal-default');
  el.dispatchEvent(ev);
  expect(document.body.style.overflow).toBe('hidden');
  expect(el.style.overflow).toBe('hidden');
  expect(di.style.overflow).toBe('hidden');
  modal.close('modal-default');
  el.dispatchEvent(ev);
  expect(document.body.style.overflow).toBe('');
  expect(el.style.overflow).toBe('');
  expect(di.style.overflow).toBe('');
});

test('should disable toggle overflow if set to falsely', () => {
  document.body.innerHTML = markup;
  const el = document.querySelector('[data-modal]');
  modal = new Modal({
    autoInit: true,
    toggleOverflow: false
  });
  modal.open('modal-default');
  el.dispatchEvent(ev);
  expect(document.body.style.overflow).toBe('');
  modal.close('modal-default');
  el.dispatchEvent(ev);
  expect(document.body.style.overflow).toBe('');
});

test('should not apply transition classes when transitions are disabled', () => {
  document.body.innerHTML = markup;
  const el = document.querySelector('[data-modal]');
  modal = new Modal({
    autoInit: true,
    transition: false
  });
  modal.open('modal-default');
  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(2);

  modal.close('modal-default');
  expect(el).toHaveClass('is-closed');
  expect(el.classList.length).toBe(2);
});
