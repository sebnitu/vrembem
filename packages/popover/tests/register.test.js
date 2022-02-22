import Popover from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let popover;

const markup = `
  <div id="app">
    <button id="first" data-popover-trigger aria-controls="asdf">...</button>
    <div id="asdf" class="popover" data-popover>
      ...
    </div>
    <button id="second" data-popover-trigger aria-controls="fdsa">...</button>
    <div id="fdsa" class="popover" data-popover data-popover-event="hover">
      ...
    </div>
    <button id="third" data-popover-trigger aria-controls="missing">...</button>
  </div>
`;

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
    popover.register(trigger, false);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].__eventListeners.length).toBe(1);
  });

  test('should register a popover using the provided ID', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#first');
    const target = document.querySelector('#asdf');
    popover.register('asdf');
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].trigger).toBe(trigger);
    expect(popover.collection[0].target).toBe(target);
    expect(popover.collection[0].__eventListeners.length).toBe(1);
    trigger.click();
    expect(popover.collection[0].target).toHaveClass('is-active');
  });

  test('should log an error if the provided trigger has no associated target', () => {
    document.body.innerHTML = markup;
    console.error = jest.fn();
    popover = new Popover();
    const trigger = document.querySelector('#third');
    popover.register(trigger);
    expect(popover.collection.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith('No popover associated with the provided popover trigger:', trigger);
  });

  test('should attach hover event listeners when registered', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#second');
    popover.register(trigger, false);
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
    popover.deregister(item);
    expect(popover.collection.length).toBe(1);
    popover.deregister(item);
    expect(popover.collection.length).toBe(1);
  });
});
