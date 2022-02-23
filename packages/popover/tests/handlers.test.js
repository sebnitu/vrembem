import Popover from '../index.js';
import { handlerClick } from '../src/js/handlers';
import '@testing-library/jest-dom/extend-expect';

let popover;

jest.useFakeTimers();

const keyEsc = new KeyboardEvent('keydown', {
  key: 'Escape'
});

const keySpace = new KeyboardEvent('keydown', {
  key: 'Space'
});

const keyTab = new KeyboardEvent('keydown', {
  key: 'Tab'
});

const markup = `
  <div id="app">
    <button data-popover-trigger aria-controls="asdf">...</button>
    <div id="asdf" class="popover" data-popover>
      <button class="focus-test">...</button>
    </div>
    <button data-popover-trigger aria-controls="fdsa">...</button>
    <div id="fdsa" class="popover is-active" data-popover>
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
  test('should open popover if it does not contain the active class', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection.length).toBe(2);

    handlerClick.bind(popover, popover.collection[0])();
    expect(popover.collection[0].target).toHaveClass('is-active');
  });

  test('should close popover if it contains the active class', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection.length).toBe(2);

    handlerClick.bind(popover, popover.collection[1])();
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  });

  test('should attach document click event listener when popover is opened', () => {
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

  test('should return focus to the trigger element when escape key is pressed', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    const button = document.querySelector('.focus-test');

    expect(popover.memory.trigger).toBe(null);
    popover.collection[0].trigger.click();
    expect(popover.memory.trigger).toBe(popover.collection[0].trigger);

    button.focus();
    expect(document.activeElement).toBe(button);

    document.dispatchEvent(keyEsc);
    expect(document.activeElement).toBe(popover.collection[0].trigger);
    expect(popover.memory.trigger).toBe(null);
  });

  test('should run close check when the tab key is pressed', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection[1].target).toHaveClass('is-active');
    document.dispatchEvent(keyTab);
    jest.advanceTimersByTime(100);
    expect(popover.collection[1].target).not.toHaveClass('is-active');
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

  test('should remove document event listener when popover is closed', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection[0].target).not.toHaveClass('is-active');
    expect(popover.collection[1].target).toHaveClass('is-active');

    popover.collection[1].trigger.click();

    expect(popover.collection[0].target).not.toHaveClass('is-active');
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  })
});
