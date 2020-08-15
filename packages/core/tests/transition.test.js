import { openTransition, closeTransition } from '../index';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `
  <div class="el"></div>
`;

const el = document.querySelector('.el');
const classes = {
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',
  transition: true
};

test('should go through opening transition classes when openTransition is called', () => {
  openTransition(el, classes);
  expect(el).toHaveClass('is-opening');
  expect(el.classList.length).toBe(2);

  el.dispatchEvent(new Event('transitionend'));
  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(2);
});

test('should go through closing transition classes when closeTransition is called', () => {
  closeTransition(el, classes);
  expect(el).toHaveClass('is-closing');
  expect(el.classList.length).toBe(2);

  el.dispatchEvent(new Event('transitionend'));
  expect(el).toHaveClass('is-closed');
  expect(el.classList.length).toBe(2);
});

test('should open immediatly if openTransition is called with transitions disabled', () => {
  openTransition(el, { ...classes, ...{ transition: false } });
  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(2);
});

test('should close immediatly if closeTransition is called with transitions disabled', () => {
  closeTransition(el, { ...classes, ...{ transition: false } });
  expect(el).toHaveClass('is-closed');
  expect(el.classList.length).toBe(2);
});

test('should return a promise when openTransition is called', () => {
  const item = openTransition(el, classes);
  expect(el).toHaveClass('is-opening');
  expect(el.classList.length).toBe(2);
  el.dispatchEvent(new Event('transitionend'));
  item.then(() => {
    expect(el).toHaveClass('is-opened');
    expect(el.classList.length).toBe(2);
  });
});

test('should return a promise when closeTransition is called', () => {
  const item = closeTransition(el, classes);
  expect(el).toHaveClass('is-closing');
  expect(el.classList.length).toBe(2);
  el.dispatchEvent(new Event('transitionend'));
  item.then(() => {
    expect(el).toHaveClass('is-closed');
    expect(el.classList.length).toBe(2);
  });
});
