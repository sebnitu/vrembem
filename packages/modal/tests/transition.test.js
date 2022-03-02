import Modal from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { transitionEnd } from './helpers/transition';

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div id="modal-default" class="modal is-closed">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

const markupCustomState = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div id="modal-default" class="modal off">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

test('should apply state classes on `click` and `transitionend` events', async () => {
  document.body.innerHTML = markup;
  const modal = new Modal();
  const el = document.querySelector('.modal');
  const btnOpen = document.querySelector('[data-modal-open]');
  const btnClose = el.querySelector('[data-modal-close]');

  modal.init();
  expect(el).toHaveClass('modal');

  btnOpen.click();
  expect(el).toHaveClass('is-opening');

  await transitionEnd(el);
  expect(el).toHaveClass('is-opened');

  btnClose.click();
  expect(el).toHaveClass('is-closing');

  await transitionEnd(el);
  expect(el).toHaveClass('modal is-closed');
  expect(el).not.toHaveClass('is-opening is-opened is-closing');
});

test('should be able to pass options on init method', () => {
  const modal = new Modal({ customEventPrefix: 'OnNew' });
  modal.init({ customEventPrefix: 'OnInit' });
  expect(modal.settings.customEventPrefix).toBe('OnInit');
});

test('should apply custom state classes', async () => {
  document.body.innerHTML = markupCustomState;
  new Modal({
    autoInit: true,
    stateOpened: 'on',
    stateOpening: 'enable',
    stateClosing: 'disable',
    stateClosed: 'off'
  });
  const el = document.querySelector('.modal');
  const btnOpen = document.querySelector('[data-modal-open]');
  const btnClose = el.querySelector('[data-modal-close]');

  btnOpen.click();
  expect(el).toHaveClass('enable');

  await transitionEnd(el);
  expect(el).toHaveClass('on');

  btnClose.click();
  expect(el).toHaveClass('disable');

  await transitionEnd(el);
  expect(el).toHaveClass('modal off');
  expect(el).not.toHaveClass('enable on disable');
});

test('should not apply transition classes when transitions are disabled', async () => {
  document.body.innerHTML = markup;
  const el = document.querySelector('.modal');
  const modal = new Modal({
    autoInit: true,
    transition: false
  });
  await modal.open('modal-default');
  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(2);

  await modal.close('modal-default');
  expect(el).toHaveClass('is-closed');
  expect(el.classList.length).toBe(2);
});
