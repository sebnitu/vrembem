import Popover from '../index.js';
import { getPadding, getEventType, getPlacement, getModifiers, getPopover } from '../src/js/helpers';
import '@testing-library/jest-dom/extend-expect';

let popover;

const markup = `
  <div id="app">
    <button data-popover-trigger>...</button>
    <div
      id="pop-1"
      class="popover"
      data-popover
      data-popover-event="hover"
      data-popover-placement="top"
    >
      ...
    </div>
    <button data-popover-trigger>...</button>
    <div id="pop-2" class="popover" data-popover>
      ...
    </div>
    <button data-popover-trigger="unique-id">...</button>
  </div>
  <div class="popover" data-popover="unique-id">
    ...
  </div>
`;

const markupMissing = '<button data-popover-trigger>...</button>';

afterEach(() => {
  if (popover && 'destroy' in popover) {
    popover.destroy();
  }
  popover = null;
  document.body.innerHTML = null;
});

describe('getPadding()', () => {
  test('should return an integer if a single number string is passed', () => {
    const value = '64';
    expect(getPadding(value)).toEqual(64);
  });

  test('should return a padding object if a string of two numbers are passed', () => {
    const value = '64 32';
    expect(getPadding(value)).toEqual({ top: 64, right: 32, bottom: 64, left: 32 });
  });

  test('should return a padding object if a string of three numbers are passed', () => {
    const value = '64 32 16';
    expect(getPadding(value)).toEqual({ top: 64, right: 32, bottom: 16, left: 32 });
  });

  test('should return a padding object if a string of four numbers are passed', () => {
    const value = '64 32 16 8';
    expect(getPadding(value)).toEqual({ top: 64, right: 32, bottom: 16, left: 8 });
  });

  test('should return false if more than four numbers exist in the string', () => {
    const value = '64 32 16 8 4';
    expect(getPadding(value)).toEqual(false);
  });
});

describe('getEventType()', () => {
  test('should return the event type from the data attribute value', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('[data-popover]');
    const result = getEventType(
      target,
      popover.settings,
    );
    expect(result).toBe('hover');
  });

  test('should return the event type from the CSS variable value', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('#pop-2');
    target.style.setProperty('--popover-event', 'focus');
    const result = getEventType(
      target,
      popover.settings,
    );
    expect(result).toBe('focus');
  });

  test('should return the event type from the default settings', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('#pop-2');
    const result = getEventType(
      target,
      popover.settings,
    );
    expect(result).toBe('click');
  });
});

describe('getPlacement()', () => {
  test('should return the event type from the data attribute value', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('[data-popover]');
    const result = getPlacement(
      target,
      popover.settings,
    );
    expect(result).toBe('top');
  });

  test('should return the event type from the CSS variable value', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('#pop-2');
    target.style.setProperty('--popover-placement', 'right');
    const result = getPlacement(
      target,
      popover.settings,
    );
    expect(result).toBe('right');
  });

  test('should return the event type from the CSS variable value', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('#pop-2');
    const result = getPlacement(
      target,
      popover.settings,
    );
    expect(result).toBe('bottom-start');
  });
});

describe('getPopover()', () => {
  test('should return a popover using a trigger', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');
    const result = getPopover(trigger, popover.settings);
    expect(result).toHaveClass('popover');
    expect(result).toBe(target);
  });

  test('should return a popover using a shared unique ID', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('[data-popover-trigger="unique-id"]');
    const target = document.querySelector('[data-popover="unique-id"]');
    const result = getPopover(trigger, popover.settings);
    expect(result).toHaveClass('popover');
    expect(result).toBe(target);
  });

  test('should return false if a popover can not be found', () => {
    document.body.innerHTML = markupMissing;
    popover = new Popover();
    const trigger = document.querySelector('[data-popover-trigger]');
    const result = getPopover(trigger, popover.settings);
    expect(result).toBe(false);
  });
});

describe('getModifiers()', () => {
  test('should return modifiers using defaults', () => {
    document.body.innerHTML = markup;
    const target = document.querySelector('[data-popover]');
    const result = getModifiers(target);
    const offset = result.find(item => item.name === 'offset');
    const overflow = result.find(item => item.name === 'preventOverflow');
    expect(offset.options.offset).toEqual([0, 0]);
    expect(overflow.options.padding).toEqual(0);
  });

  test('should return modifiers with custom CSS variables set', () => {
    document.body.innerHTML = markup;
    const target = document.querySelector('[data-popover]');
    target.style.setProperty('--popover-offset', '10');
    target.style.setProperty('--popover-overflow-padding', '20');
    const result = getModifiers(target);
    const offset = result.find(item => item.name === 'offset');
    const overflow = result.find(item => item.name === 'preventOverflow');
    expect(offset.options.offset).toEqual([0, 10]);
    expect(overflow.options.padding).toEqual(20);
  });

  test('should return modifiers with custom CSS variables set to root document', () => {
    document.body.innerHTML = markup;
    document.documentElement.style.setProperty('--popover-offset', '5');
    document.documentElement.style.setProperty('--popover-overflow-padding', '10');
    const result = getModifiers(document.documentElement);
    const offset = result.find(item => item.name === 'offset');
    const overflow = result.find(item => item.name === 'preventOverflow');
    expect(offset.options.offset).toEqual([0, 5]);
    expect(overflow.options.padding).toEqual(10);
  });
});
