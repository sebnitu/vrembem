import Popover from '../index.js';
import { deregister, registerEventListeners } from '../src/js/register';
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

  test('should attach open and close methods to registered popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    popover.register('asdf');
    const entry = popover.get('asdf');
    
    entry.open();
    expect(entry.state).toBe('opened');
    expect(entry.target).toHaveClass('is-active');

    entry.close();
    expect(entry.state).toBe('closed');
    expect(entry.target).not.toHaveClass('is-active');
  });

  test('should attach deregister method to registered popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    popover.register('asdf');
    const entry = popover.get('asdf');
    const target = document.querySelector('#asdf');

    entry.trigger.click();
    expect(target).toHaveClass('is-active');
    expect(entry.state).toBe('opened');

    entry.deregister();
    expect(target).not.toHaveClass('is-active');
    expect(entry.id).toBe(undefined);
  });

  test('should not register more event listeners if registerEventListeners is run on existing popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    popover.register('asdf');
    const entry = popover.get('asdf');
    registerEventListeners.call(popover, entry);
    entry.trigger.click();
    expect(entry.target).toHaveClass('is-active');
    expect(entry.state).toBe('opened');
  });
});

describe('deregister()', () => {
  test('should deregister a popover and do nothing for popovers not in collection', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
    const item = popover.collection[0];
    deregister.call(popover, item);
    expect(popover.collection.length).toBe(1);
    deregister.call(popover, item);
    expect(popover.collection.length).toBe(1);
  });
});
