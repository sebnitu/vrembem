import '@testing-library/jest-dom/vitest';
import Popover from '../index.js';
import { registerEventListeners } from '../src/js/register';

let popover;

const markup = `
  <div id="app">
    <button id="asdf-trigger" aria-controls="asdf">...</button>
    <div id="asdf" class="popover">
      ...
    </div>
    <button id="fdsa-trigger" aria-controls="fdsa">...</button>
    <div id="fdsa" class="popover" style="--vb-popover-event: hover;">
      ...
    </div>
    <button id="third" aria-controls="missing">...</button>
  </div>
`;

beforeAll(() => {
  document.body.style.setProperty('--vrembem-prefix', 'vb-');
});

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('register() & entry.deregister()', () => {
  it('should register a popover using the provided trigger', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#asdf-trigger');
    popover.register(trigger, false);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].__eventListeners.length).toBe(1);
  });

  it('should register a popover using the provided ID', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#asdf-trigger');
    const target = document.querySelector('#asdf');
    popover.register('asdf');
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].trigger).toBe(trigger);
    expect(popover.collection[0].el).toBe(target);
    expect(popover.collection[0].__eventListeners.length).toBe(1);
    trigger.click();
    expect(popover.collection[0].el).toHaveClass('is-active');
  });

  it('should return an error if the provided trigger has no associated popover', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#third');
    let catchError = false;
    await popover.register(trigger).catch((error) => {
      expect(error.message).toBe('No popover associated with the provided popover trigger.');
      catchError = true;
    });
    expect(catchError).toBe(true);
  });

  it('should attach hover event listeners when registered', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector('#fdsa-trigger');
    popover.register(trigger, false);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].__eventListeners.length).toBe(2);
  });

  it('should attach open and close methods to registered popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    popover.register('asdf');
    const entry = popover.get('asdf');

    entry.open();
    expect(entry.state).toBe('opened');
    expect(entry.el).toHaveClass('is-active');

    entry.close();
    expect(entry.state).toBe('closed');
    expect(entry.el).not.toHaveClass('is-active');
  });

  it('should attach deregister method to registered popover', () => {
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

  it('should not register more event listeners if registerEventListeners is run on existing popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    popover.register('asdf');
    const entry = popover.get('asdf');
    registerEventListeners.call(popover, entry);
    entry.trigger.click();
    expect(entry.el).toHaveClass('is-active');
    expect(entry.state).toBe('opened');
  });
});
