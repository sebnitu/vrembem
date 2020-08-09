import Dismissible from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let dismissible;

const dismissContent = `
  <div data-dismissible>
    <button data-dismiss></button>
  </div>
  <div data-dismissible="hide">
    <button data-dismiss></button>
  </div>
  <div data-dismissible="remove">
    <button data-dismiss></button>
  </div>
  <div data-a>
    <button data-b></button>
  </div>
  <div class="branch-trigger-false">
    <button></button>
  </div>
  <div class="branch-target-false">
    <button data-dismiss></button>
  </div>
`;

afterEach(() => {
  dismissible.destroy();
  document.body.innerHTML = null;
});

test('dismiss using default settings and method', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible();
  const el = document.querySelector('[data-dismissible]');
  const button = el.querySelector('[data-dismiss]');

  dismissible.init();
  expect(el).not.toHaveClass('display-none');
  button.click();
  expect(el).toHaveClass('display-none');
});

test('dismiss explicitly using the hide method', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible({ autoInit: true });
  const el = document.querySelector('[data-dismissible="hide"]');
  const button = el.querySelector('[data-dismiss]');

  dismissible.init();
  expect(el).not.toHaveClass('display-none');
  button.click();
  expect(el).toHaveClass('display-none');
});

test('dismiss explicitly using the remove method', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible({ autoInit: true });
  const el = document.querySelector('[data-dismissible="remove"]');
  const button = el.querySelector('[data-dismiss]');

  expect(el).toBeInTheDocument();
  button.click();
  expect(el).not.toBeInTheDocument();
});

test('dismiss using custom settings and auto init', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible({
    autoInit: true,
    dataTarget: 'a',
    dataTrigger: 'b',
    classHide: 'hide'
  });
  const el = document.querySelector('[data-a]');
  const button = document.querySelector('[data-b]');

  expect(el).not.toHaveClass('hide');
  button.click();
  expect(el).toHaveClass('hide');
});

test('dismiss using the remove method via settings', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible({
    autoInit: true,
    method: 'remove'
  });
  const el = document.querySelector('[data-dismissible]');
  const button = document.querySelector('[data-dismiss]');

  expect(el).toBeInTheDocument();
  button.click();
  expect(el).not.toBeInTheDocument();
});

test('should do nothing if none valid method is set', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible({
    autoInit: true,
    method: 'asdf'
  });
  const el = document.querySelector('[data-dismissible]');
  const button = document.querySelector('[data-dismiss]');

  expect(el).toBeInTheDocument();
  expect(el).not.toHaveClass('hide');
  button.click();
  expect(el).toBeInTheDocument();
  expect(el).not.toHaveClass('hide');
});

test('dismissible destroy method removes event listener', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible({ autoInit: true });
  const el = document.querySelector('[data-dismissible]');
  const button = document.querySelector('[data-dismiss]');

  expect(el).not.toHaveClass('hide');
  dismissible.destroy();
  button.click();
  expect(el).not.toHaveClass('hide');
});

test('should do nothing if random button is clicked', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible({ autoInit: true });
  const el = document.querySelector('.branch-trigger-false');
  const button = el.querySelector('button');

  expect(el).not.toHaveClass('display-none');
  button.click();
  expect(el).not.toHaveClass('display-none');
});

test('should do nothing if no parent dismissible is found', () => {
  document.body.innerHTML = dismissContent;
  dismissible = Dismissible({ autoInit: true });
  const el = document.querySelector('.branch-target-false');
  const button = el.querySelector('button');

  expect(el).not.toHaveClass('display-none');
  button.click();
  expect(el).not.toHaveClass('display-none');
});
