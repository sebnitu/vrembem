import Modal from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let modal;
let main;

const markup = `
  <div role="main" class="main">
    <div data-modal="modal-one" class="modal modal_two">
      <div data-modal-dialog class="modal__dialog">
        ...
      </div>
    </div>
    <div class="child">...</div>
    <div data-modal="modal-two" class="modal modal_one">
    <div data-modal-dialog class="modal__dialog">
      ...
    </div>
  </div>
  </div>
`;

beforeAll(async () => {
  document.body.innerHTML = markup;
  modal = new Modal({
    autoInit: true,
    moveModals: {
      selector: '[role="main"]',
      location: 'after'
    }
  });
  main = document.querySelector('[role="main"]');
});

afterAll(() => {
  modal.destroy();
  modal = null;
  document.body.innerHTML = null;
});

test('should move modals to after main', () => {
  const mainEls = main.children;
  const bodyEls = document.body.children;
  expect(mainEls.length).toBe(1);
  expect(mainEls[0]).toHaveClass('child');
  expect(bodyEls.length).toBe(3);
  expect(bodyEls[0]).toHaveClass('main');
  expect(bodyEls[1]).toHaveClass('modal_one');
  expect(bodyEls[2]).toHaveClass('modal_two');
});

test('should move modals to before main', () => {
  modal.moveModals('[role="main"]', 'before');
  const mainEls = main.children;
  const bodyEls = document.body.children;
  expect(mainEls.length).toBe(1);
  expect(mainEls[0]).toHaveClass('child');
  expect(bodyEls.length).toBe(3);
  expect(bodyEls[0]).toHaveClass('modal_one');
  expect(bodyEls[1]).toHaveClass('modal_two');
  expect(bodyEls[2]).toHaveClass('main');
});

test('should append modals inside main', () => {
  modal.moveModals('[role="main"]', 'append');
  const mainEls = main.children;
  const bodyEls = document.body.children;
  expect(mainEls.length).toBe(3);
  expect(mainEls[0]).toHaveClass('child');
  expect(mainEls[1]).toHaveClass('modal_one');
  expect(mainEls[2]).toHaveClass('modal_two');
  expect(bodyEls.length).toBe(1);
  expect(bodyEls[0]).toHaveClass('main');
});

test('should prepend modals inside main', () => {
  modal.moveModals('[role="main"]', 'prepend');
  const mainEls = main.children;
  const bodyEls = document.body.children;
  expect(mainEls.length).toBe(3);
  expect(mainEls[0]).toHaveClass('modal_two');
  expect(mainEls[1]).toHaveClass('modal_one');
  expect(mainEls[2]).toHaveClass('child');
  expect(bodyEls.length).toBe(1);
  expect(bodyEls[0]).toHaveClass('main');
});

test('should not throw error if provided location isn\'t valid', () => {
  expect(modal.moveModals.bind(modal, '[role="main"]', 'asdf')).not.toThrow();
});

test('should not throw error if selector doesn\'t return an element', () => {
  expect(modal.moveModals.bind(modal, '.asdf', 'after')).not.toThrow();
});

