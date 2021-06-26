import Popover from '../index.js';
import { register, deregister } from '../src/js/register';
import '@testing-library/jest-dom/extend-expect';

let popover;

const markup = `
  <div id="app">
    <button id="first" data-popover-trigger>...</button>
    <div class="popover" data-popover>
      ...
    </div>
    <button id="second" data-popover-trigger>...</button>
    <div class="popover" data-popover data-popover-event="hover">
      ...
    </div>
    <div id="orphan" class="popover" data-popover>
      ...
    </div>
  </div>
`;

const markupMissing = '<button data-popover-trigger>...</button>';

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('register()', () => {
  test('should register a popover using the provided trigger', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#first');
    register(trigger, false, popover);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].__eventListeners.length).toBe(1);
  });

  test('should register a popover using the provided trigger and target', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#first');
    const target = document.querySelector('#orphan');
    register(trigger, target, popover);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].trigger).toBe(trigger);
    expect(popover.collection[0].target).toBe(target);
    expect(popover.collection[0].__eventListeners.length).toBe(1);
    trigger.click();
    expect(popover.collection[0].target).toHaveClass('is-active');
  });

  test('should log an error if the provided trigger has no associated target', () => {
    document.body.innerHTML = markupMissing;
    console.error = jest.fn();
    popover = new Popover();
    const trigger = document.querySelector('[data-popover-trigger]');
    register(trigger, false, popover);
    expect(popover.collection.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith('No popover associated with the provided trigger:', trigger);
  });

  test('should attach hover event listeners when registered', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#second');
    register(trigger, false, popover);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].__eventListeners.length).toBe(2);
  });
});

describe('deregister()', () => {
  test('should deregister a popover and do nothing for popovers not in collection', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
    const item = popover.collection[0];
    deregister(item, popover);
    expect(popover.collection.length).toBe(1);
    deregister(item, popover);
    expect(popover.collection.length).toBe(1);
  });
});
