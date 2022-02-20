import Popover from '../index.js';
import { closeCheck } from '../src/js/close';
import '@testing-library/jest-dom/extend-expect';

let popover;

jest.useFakeTimers();

const markup = `
  <div id="app">
    <button data-popover-trigger>...</button>
    <div class="popover is-active" data-popover tabindex="0">
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

describe('close()', () => {
  test('should close the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection[0].state).toBe('opened');
    expect(popover.collection[0].target).toHaveClass('is-active');
    popover.close(popover.collection[0]);
    expect(popover.collection[0].state).toBe('closed');
    expect(popover.collection[0].target).not.toHaveClass('is-active');
  });
});

describe('closeAll()', () => {
  test('should close all popovers', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
    expect(popover.collection[0].target).toHaveClass('is-active');
    expect(popover.collection[1].target).toHaveClass('is-active');
    popover.closeAll();
    expect(popover.collection[0].target).not.toHaveClass('is-active');
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  });
});

describe('closeCheck()', () => {
  test('should close popover if closeCheck does not detect a hover or focus on trigger or target elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
    closeCheck.call(popover, popover.collection[0]);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).not.toHaveClass('is-active');
  });

  test('should not close popover if closeCheck detects a focus on trigger elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.collection[0].trigger.focus();
    closeCheck.call(popover, popover.collection[0]);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).toHaveClass('is-active');
  });

  test('should not close popover if closeCheck detects a focus on target elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.collection[0].target.focus();
    closeCheck.call(popover, popover.collection[0]);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).toHaveClass('is-active');
  });
});
