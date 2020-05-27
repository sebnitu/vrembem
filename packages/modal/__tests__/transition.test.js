import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let modal;
const ev = new Event('transitionend');

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div data-modal="modal-default" class="modal">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

const markupCustomAttr = `
  <button data-a-o="modal-default">Modal Custom</button>
  <div data-a="modal-default" class="modal">
    <div class="modal__dialog">
      <button data-a-c data-a-f>Close</button>
    </div>
  </div>
`;

afterEach(() => {
  modal.destroy();
  modal = null;
  document.body.innerHTML = null;
});

test('should apply state classes on \'click\' and \'transition end\' events', () => {
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
  expect(el).toHaveClass('is-open');

  btnClose.click();
  expect(el).toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal');
  expect(el).not.toHaveClass('is-opening');
  expect(el).not.toHaveClass('is-open');
  expect(el).not.toHaveClass('is-closing');
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
  expect(el).toHaveClass('is-open');

  btnClose.click();
  expect(el).toHaveClass('is-closing');

  el.dispatchEvent(ev);
  expect(el).toHaveClass('modal');
  expect(el).not.toHaveClass('is-opening');
  expect(el).not.toHaveClass('is-open');
  expect(el).not.toHaveClass('is-closing');
});

test('should apply custom state classes', () => {
  document.body.innerHTML = markup;
  modal = new Modal({
    autoInit: true,
    stateOpen: 'on',
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
  expect(el).toHaveClass('modal');
  expect(el).not.toHaveClass('enable');
  expect(el).not.toHaveClass('on');
  expect(el).not.toHaveClass('disable');
});
