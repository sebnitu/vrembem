import { moveElement } from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let main, els;

const markup = `
  <div role="main" class="main">
    <div class="el el-1">...</div>
    <div class="child">...</div>
    <div class="el el-2">...</div>
  </div>
`;

beforeEach(async () => {
  document.body.innerHTML = markup;
  main = document.querySelector('[role="main"]');
  els = document.querySelectorAll('.el');
});

afterEach(() => {
  document.body.innerHTML = null;
  main = null;
  els = null;
});

test('should move elements to after main', () => {
  moveElement(main, 'after', '.el');
  const mainEls = main.children;
  const bodyEls = document.body.children;
  expect(mainEls.length).toBe(1);
  expect(mainEls[0]).toHaveClass('child');
  expect(bodyEls.length).toBe(3);
  expect(bodyEls[0]).toHaveClass('main');
  expect(bodyEls[1]).toHaveClass('el-2');
  expect(bodyEls[2]).toHaveClass('el-1');
});

test('should move elements to before main', () => {
  moveElement(main, 'before', '.el');
  const mainEls = main.children;
  const bodyEls = document.body.children;
  expect(mainEls.length).toBe(1);
  expect(mainEls[0]).toHaveClass('child');
  expect(bodyEls.length).toBe(3);
  expect(bodyEls[0]).toHaveClass('el-1');
  expect(bodyEls[1]).toHaveClass('el-2');
  expect(bodyEls[2]).toHaveClass('main');
});

test('should append elements inside main', () => {
  moveElement('[role="main"]', 'append', els);
  const mainEls = main.children;
  const bodyEls = document.body.children;
  expect(mainEls.length).toBe(3);
  expect(mainEls[0]).toHaveClass('child');
  expect(mainEls[1]).toHaveClass('el-1');
  expect(mainEls[2]).toHaveClass('el-2');
  expect(bodyEls.length).toBe(1);
  expect(bodyEls[0]).toHaveClass('main');
});

test('should prepend elements inside main', () => {
  moveElement('[role="main"]', 'prepend', els);
  const mainEls = main.children;
  const bodyEls = document.body.children;
  expect(mainEls.length).toBe(3);
  expect(mainEls[0]).toHaveClass('el-2');
  expect(mainEls[1]).toHaveClass('el-1');
  expect(mainEls[2]).toHaveClass('child');
  expect(bodyEls.length).toBe(1);
  expect(bodyEls[0]).toHaveClass('main');
});

test('should do nothing if a reference is not provided', () => {
  expect(moveElement).not.toThrow();
});

test('should throw error if provided move type isn\'t valid', () => {
  expect(moveElement.bind(null, '[role="main"]', 'asdf', els)).toThrow();
});

test('should throw error if reference selector doesn\'t exist on page', () => {
  expect(moveElement.bind(null, '.asdf', 'after', els)).toThrow();
});

test('should throw error if target selector doesn\'t exist on page', () => {
  expect(moveElement.bind(null, main, 'before', '.asdf')).toThrow();
});

