import { removeClass } from '../index';
import * as u from '../dist/scripts.cjs.js';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `<!DOCTYPE html>
  <h1 class="a b c d e f">Hello world</h1>
  <p class="a b c d e f">...</p>
  <p class="a b c d e f">...</p>
`;

const h1 = document.querySelector('h1');
const p = document.querySelectorAll('p');

test('remove a single class from an element', () => {
  removeClass(h1, 'a');
  u.removeClass(h1, 'd');
  expect(h1).not.toHaveClass('a');
  expect(h1).not.toHaveClass('d');
});

test('remove multiple classes from an element', () => {
  removeClass(h1, 'b', 'c');
  u.removeClass(h1, 'e', 'f');
  expect(h1).not.toHaveClass('b');
  expect(h1).not.toHaveClass('c');
  expect(h1).not.toHaveClass('e');
  expect(h1).not.toHaveClass('f');
});

test('remove a single class from a NodeList', () => {
  removeClass(p, 'a');
  u.removeClass(p, 'd');
  p.forEach((el) => {
    expect(el).not.toHaveClass('a');
    expect(el).not.toHaveClass('d');
  });
});

test('remove multiple classes from a NodeList', () => {
  removeClass(p, 'b', 'c');
  u.removeClass(p, 'e', 'f');
  p.forEach((el) => {
    expect(el).not.toHaveClass('b');
    expect(el).not.toHaveClass('c');
    expect(el).not.toHaveClass('e');
    expect(el).not.toHaveClass('f');
  });
});
