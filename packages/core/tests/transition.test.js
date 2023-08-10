import { transition } from '../index';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `
  <div class="el">
    <button>...</button>
  </div>
`;

vi.useFakeTimers();

const el = document.querySelector('div');
const btn = document.querySelector('button');
const open = {
  start: 'is-opening',
  finish: 'is-opened'
};
const close = {
  start: 'is-closing',
  finish: 'is-closed'
};

test('should go through opening transition classes when transition is called', () => {
  transition(el, close, open);
  expect(el).toHaveClass('is-opening');
  expect(el.classList.length).toBe(2);

  vi.runAllTimers();

  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(2);
});

test('should go through closing transition classes when transition is called', () => {
  transition(el, open, close);
  expect(el).toHaveClass('is-closing');
  expect(el.classList.length).toBe(2);

  vi.runAllTimers();

  expect(el).toHaveClass('is-closed');
  expect(el.classList.length).toBe(2);
});
