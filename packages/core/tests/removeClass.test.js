import { removeClass } from '../index';
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
  expect(h1).not.toHaveClass('a');
});

test('remove multiple classes from an element', () => {
  removeClass(h1, 'b', 'c');
  expect(h1).not.toHaveClass('b');
  expect(h1).not.toHaveClass('c');
});

test('remove a single class from a NodeList', () => {
  removeClass(p, 'a');
  p.forEach((el) => {
    expect(el).not.toHaveClass('a');
  });
});

test('remove multiple classes from a NodeList', () => {
  removeClass(p, 'b', 'c');
  p.forEach((el) => {
    expect(el).not.toHaveClass('b');
    expect(el).not.toHaveClass('c');
  });
});
