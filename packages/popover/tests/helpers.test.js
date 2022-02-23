import Popover from '../index.js';
import {
  getConfig,
  getData,
  getPadding,
  getModifiers,
  getPopoverID,
  getPopoverElements
} from '../src/js/helpers';
import '@testing-library/jest-dom/extend-expect';

let popover;

const markup = `
  <button aria-controls="pop-1">...</button>
  <div
    id="pop-1"
    class="popover"
    data-popover
    data-popover-event="hover"
    data-popover-placement="top"
  >
    ...
  </div>
  <button aria-controls="pop-2">...</button>
  <div id="pop-2" class="popover" data-popover>
    ...
  </div>
  <button aria-controls="pop-3">...</button>
  <div id="pop-3" class="popover" data-popover>
    ...
  </div>
  <button aria-controls="asdf">...</button>
  <div id="fdsa" class="popover" data-popover>
    ...
  </div>
  <button id="missing-attribute">...</button>
`;

afterEach(() => {
  if (popover && 'destroy' in popover) {
    popover.destroy();
  }
  popover = null;
  document.body.innerHTML = null;
});

describe('getConfig()', () => {
  test('Should return the config with all default options if no CSS vars are set', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('#pop-1');
    const config = getConfig(target, popover.settings);
    expect(config).toEqual({
      'placement': 'bottom-start',
      'event': 'click',
      'offset': 0,
      'overflow-padding': 0,
      'flip-padding': 0,
      'arrow-element': '[data-popover-arrow]',
      'arrow-padding': 0
    });
  });

  test('Should return the config with the values of custom CSS variable values', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('#pop-1');
    target.style.setProperty('--popover-placement', 'top');
    target.style.setProperty('--popover-event', 'focus');
    target.style.setProperty('--popover-offset', '32');
    target.style.setProperty('--popover-overflow-padding', '16');
    target.style.setProperty('--popover-flip-padding', '8');
    target.style.setProperty('--popover-arrow-element', '[data-popover-asdf]');
    target.style.setProperty('--popover-arrow-padding', '4');
    const config = getConfig(target, popover.settings);
    expect(config).toEqual({
      'placement': 'top',
      'event': 'focus',
      'offset': '32',
      'overflow-padding': '16',
      'flip-padding': '8',
      'arrow-element': '[data-popover-asdf]',
      'arrow-padding': '4'
    });
  });
});

describe('getData()', () => {
  test('Should return the data attribute value of an element', () => {
    document.body.innerHTML = markup;
    const target = document.querySelector('#pop-1');
    const result = getData(target, 'popover-event');
    expect(result).toBe('hover');
  });

  test('Should return false if an element does not have the attribute', () => {
    document.body.innerHTML = markup;
    const target = document.querySelector('#pop-1');
    const result = getData(target, 'missing');
    expect(result).toBe(false);
  });

  test('Should return the fallback if an element does not have the attribute', () => {
    document.body.innerHTML = markup;
    const target = document.querySelector('#pop-1');
    const result = getData(target, 'missing', 'asdf');
    expect(result).toBe('asdf');
  });

  test('Should return an empty string for boolean data attributes', () => {
    document.body.innerHTML = markup;
    const target = document.querySelector('#pop-1');
    const result = getData(target, 'popover');
    expect(result).toBe('');
  });
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

describe('getConfig() & getModifiers()', () => {
  test('should return modifiers using defaults', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('[data-popover]');
    const config = getConfig(target, popover.settings);
    const result = getModifiers(config);
    const offset = result.find(item => item.name === 'offset');
    const overflow = result.find(item => item.name === 'preventOverflow');
    expect(offset.options.offset).toEqual([0, 0]);
    expect(overflow.options.padding).toEqual(0);
  });

  test('should return modifiers with custom CSS variables set', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector('[data-popover]');
    target.style.setProperty('--popover-offset', '10');
    target.style.setProperty('--popover-overflow-padding', '20');
    const config = getConfig(target, popover.settings);
    const result = getModifiers(config);
    const offset = result.find(item => item.name === 'offset');
    const overflow = result.find(item => item.name === 'preventOverflow');
    expect(offset.options.offset).toEqual([0, 10]);
    expect(overflow.options.padding).toEqual(20);
  });

  test('should return modifiers with custom CSS variables set to root document', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    document.documentElement.style.setProperty('--popover-offset', '5');
    document.documentElement.style.setProperty('--popover-overflow-padding', '10');
    const config = getConfig(document.documentElement, popover.settings);
    const result = getModifiers(config);
    const offset = result.find(item => item.name === 'offset');
    const overflow = result.find(item => item.name === 'preventOverflow');
    expect(offset.options.offset).toEqual([0, 5]);
    expect(overflow.options.padding).toEqual(10);
  });
});

describe('getPopoverID()', () => {
  test('should return false if html element does not have the correct attributes', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#missing-attribute');
    const result = getPopoverID.call(popover, trigger);
    expect(result).toBe(false);
  });

  test('should return false if passed object does not resolve an ID', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const result = getPopoverID.call(popover, true);
    expect(result).toBe(false);
  });
});

describe('getPopoverElements()', () => {
  test('should throw error if no popover elements are found using an ID', () => {
    document.body.innerHTML = markup;
    console.error = jest.fn();
    popover = new Popover();
    const result = getPopoverElements.call(popover, 'pop-4');
    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith('No popover elements found using the provided ID:', 'pop-4');
  });

  test('should throw error if no popover is found using a trigger element', () => {
    document.body.innerHTML = markup;
    console.error = jest.fn();
    const trigger = document.querySelector('[aria-controls="asdf"]');
    popover = new Popover();
    const result = getPopoverElements.call(popover, trigger);
    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith('No popover associated with the provided popover trigger:', trigger);
  });

  test('should throw error if no popover trigger is found using a popover', () => {
    document.body.innerHTML = markup;
    console.error = jest.fn();
    const target = document.querySelector('#fdsa');
    popover = new Popover();
    const result = getPopoverElements.call(popover, target);
    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith('No popover trigger associated with the provided popover:', target);
  });

  test('should return popover target and trigger elements when found using ID', () => {
    document.body.innerHTML = markup;
    const trigger = document.querySelector('[aria-controls="pop-1"]');
    const target = document.querySelector('#pop-1');
    popover = new Popover();
    const result = getPopoverElements.call(popover, 'pop-1');
    expect(result.target).toBe(target);
    expect(result.trigger).toBe(trigger);
  });

  test('should throw error if unable to resolve a popover ID with provided query', () => {
    document.body.innerHTML = markup;
    console.error = jest.fn();
    const trigger = document.querySelector('#missing-attribute');
    popover = new Popover();
    const result = getPopoverElements.call(popover, trigger);
    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Could not resolve the popover ID:', trigger);
  });
});
