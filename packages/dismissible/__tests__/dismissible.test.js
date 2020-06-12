import { Dismissible } from '../index.js';
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
`;

afterEach(() => {
  dismissible.destroy();
  document.body.innerHTML = null;
});

test('dismiss using default settings and method', () => {
  document.body.innerHTML = dismissContent;
  dismissible = new Dismissible();
  const el = document.querySelector('[data-dismissible]');
  const button = el.querySelector('[data-dismiss]');

  dismissible.init();
  expect(el).not.toHaveClass('display_none');
  button.click();
  expect(el).toHaveClass('display_none');
});

test('dismiss explicitly using the hide method', () => {
  document.body.innerHTML = dismissContent;
  dismissible = new Dismissible({ autoInit: true });
  const el = document.querySelector('[data-dismissible="hide"]');
  const button = el.querySelector('[data-dismiss]');

  dismissible.init();
  expect(el).not.toHaveClass('display_none');
  button.click();
  expect(el).toHaveClass('display_none');
});

test('dismiss explicitly using the remove method', () => {
  document.body.innerHTML = dismissContent;
  dismissible = new Dismissible({ autoInit: true });
  const el = document.querySelector('[data-dismissible="remove"]');
  const button = el.querySelector('[data-dismiss]');

  expect(el).toBeInTheDocument();
  button.click();
  expect(el).not.toBeInTheDocument();
});

test('dismiss using custom settings and auto init', () => {
  document.body.innerHTML = dismissContent;
  dismissible = new Dismissible({
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
  dismissible = new Dismissible({
    autoInit: true,
    method: 'remove'
  });
  document.body.innerHTML = dismissContent;
  const el = document.querySelector('[data-dismissible]');
  const button = document.querySelector('[data-dismiss]');

  expect(el).toBeInTheDocument();
  button.click();
  expect(el).not.toBeInTheDocument();
});

test('dismissible destroy method removes event listener', () => {
  dismissible = new Dismissible({ autoInit: true });
  document.body.innerHTML = dismissContent;
  const el = document.querySelector('[data-dismissible]');
  const button = document.querySelector('[data-dismiss]');

  expect(el).not.toHaveClass('hide');
  dismissible.destroy();
  button.click();
  expect(el).not.toHaveClass('hide');
});
