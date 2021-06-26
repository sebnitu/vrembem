import Popover from '../index.js';
import { handlerClick } from '../src/js/handlers';
import '@testing-library/jest-dom/extend-expect';

let popover;

const keyEsc = new KeyboardEvent('keydown', {
  key: 'Escape'
});

const keySpace = new KeyboardEvent('keydown', {
  key: 'Space'
});

const markup = `
  <div id="app">
    <button data-popover-trigger>...</button>
    <div class="popover" data-popover>
      ...
    </div>
    <button data-popover-trigger>...</button>
    <div class="popover is-active" data-popover>
      ...
    </div>
  </div>
`;

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('handlerClick()', () => {
  test('should show popover if it does not contain the active class', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection.length).toBe(2);

    handlerClick.bind(popover, popover.collection[0])();
    expect(popover.collection[0].target).toHaveClass('is-active');
  });

  test('should hide popover if it contains the active class', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection.length).toBe(2);

    handlerClick.bind(popover, popover.collection[1])();
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  });

  test('should attach document click event listener when popover is shown', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    handlerClick.bind(popover, popover.collection[0])();
    expect(popover.collection[0].target).toHaveClass('is-active');
    expect(popover.collection[1].target).toHaveClass('is-active');

    document.querySelector('#app').click();
    expect(popover.collection[0].target).not.toHaveClass('is-active');
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  });
});

describe('handlerKeydown()', () => {
  test('should close open popover when escape key is pressed', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection[1].target).toHaveClass('is-active');
    document.dispatchEvent(keyEsc);
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  });

  test('should do nothing when a non-escape key is pressed', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection[1].target).toHaveClass('is-active');
    document.dispatchEvent(keySpace);
    expect(popover.collection[1].target).toHaveClass('is-active');
  });
});

describe('documentClick()', () => {
  test('should close other popover instances when a new one is toggled', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection[0].target).not.toHaveClass('is-active');
    expect(popover.collection[1].target).toHaveClass('is-active');

    popover.collection[0].trigger.click();

    expect(popover.collection[0].target).toHaveClass('is-active');
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  });
});
