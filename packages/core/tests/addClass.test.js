import { addClass } from '../index';
import * as u from '../dist/scripts.cjs.js';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `
  <h1>Hello world</h1>
  <p>...</p>
  <p>...</p>
`;

const h1 = document.querySelector('h1');
const p = document.querySelectorAll('p');

test('add a single class to an element', () => {
  addClass(h1, 'a');
  u.addClass(h1, 'd');
  expect(h1).toHaveClass('a d');
});

test('add multiple classes to an element', () => {
  addClass(h1, 'b', 'c');
  u.addClass(h1, 'e', 'f');
  expect(h1).toHaveClass('b c e f');
});

test('add a single class to a NodeList', () => {
  addClass(p, 'a');
  u.addClass(p, 'd');
  p.forEach((el) => {
    expect(el).toHaveClass('a d');
  });
});

test('add multiple classes to a NodeList', () => {
  addClass(p, 'b', 'c');
  u.addClass(p, 'e', 'f');
  p.forEach((el) => {
    expect(el).toHaveClass('b c e f');
  });
});
