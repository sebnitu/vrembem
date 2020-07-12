import { toggleClass } from '../index';
import * as u from '../dist/scripts.cjs.js';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `<!DOCTYPE html>
  <h1 class="b c e f">Hello world</h1>
  <p class="b c e f">...</p>
  <p class="b c e f">...</p>
`;

const h1 = document.querySelector('h1');
const p = document.querySelectorAll('p');

test('toggle a single class from an element', () => {
  toggleClass(h1, 'a');
  u.toggleClass(h1, 'd');
  expect(h1).toHaveClass('a d');
});

test('toggle multiple classes from an element', () => {
  toggleClass(h1, 'b', 'c');
  u.toggleClass(h1, 'e', 'f');
  expect(h1).not.toHaveClass('c');
  expect(h1).not.toHaveClass('b');
  expect(h1).not.toHaveClass('e');
  expect(h1).not.toHaveClass('f');
});

test('toggle a single class from a NodeList', () => {
  toggleClass(p, 'a');
  u.toggleClass(p, 'd');
  p.forEach((el) => {
    expect(el).toHaveClass('a d');
  });
});

test('toggle multiple classes from a NodeList', () => {
  toggleClass(p, 'b', 'c');
  u.toggleClass(p, 'e', 'f');
  p.forEach((el) => {
    expect(el).not.toHaveClass('b');
    expect(el).not.toHaveClass('c');
    expect(el).not.toHaveClass('e');
    expect(el).not.toHaveClass('f');
  });
});
