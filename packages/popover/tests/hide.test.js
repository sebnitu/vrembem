import Popover from '../index.js';
import { hide, hideAll, hideCheck } from '../src/js/hide';
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

describe('hide()', () => {
  test('should hide the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection[0].state).toBe('show');
    expect(popover.collection[0].target).toHaveClass('is-active');
    hide(popover.collection[0], popover);
    expect(popover.collection[0].state).toBe('hide');
    expect(popover.collection[0].target).not.toHaveClass('is-active');
  });
});

describe('hideAll()', () => {
  test('should hide all popovers', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
    expect(popover.collection[0].target).toHaveClass('is-active');
    expect(popover.collection[1].target).toHaveClass('is-active');
    hideAll(popover);
    expect(popover.collection[0].target).not.toHaveClass('is-active');
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  });
});

describe('hideCheck()', () => {
  test('should hide popover if hideCheck does not detect a hover or focus on trigger or target elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
    hideCheck(popover.collection[0], popover);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).not.toHaveClass('is-active');
  });

  test('should not hide popover if hideCheck detects a focus on trigger elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.collection[0].trigger.focus();
    hideCheck(popover.collection[0], popover);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).toHaveClass('is-active');
  });

  test('should not hide popover if hideCheck detects a focus on target elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.collection[0].target.focus();
    hideCheck(popover.collection[0], popover);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).toHaveClass('is-active');
  });
});
