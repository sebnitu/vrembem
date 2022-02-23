import Popover from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let popover;

const keyEsc = new KeyboardEvent('keydown', {
  key: 'Escape'
});

const markup = `
  <button data-popover-trigger aria-controls="asdf">...</button>
  <div id="asdf" class="popover" data-popover>
    ...
  </div>
  <button data-popover-trigger aria-controls="fdsa">...</button>
  <div id="fdsa" class="popover" data-popover>
    ...
  </div>
`;

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('init() & destroy()', () => {
  test('should initialize the popover module when init is run', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    popover.init();
    expect(popover.collection.length).toBe(2);
  });

  test('should auto initialize the popover module autoInit is set to true', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
  });

  test('running init multiple times should not create duplicates in collection', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.init();
    expect(popover.collection.length).toBe(2);
  });

  test('should not attach keyboard event listener if eventListeners is set to false', () => {
    document.body.innerHTML = markup;
    popover = new Popover({
      autoInit: true,
      eventListeners: false
    });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    trigger.click();
    expect(target).toHaveClass('is-active');
    document.dispatchEvent(keyEsc);
    expect(target).toHaveClass('is-active');
  });

  test('should be able to pass options through init method', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ dataPopover: 'asdf' });
    expect(popover.settings.dataPopover).toBe('asdf');
    popover.init({ dataPopover: 'popover' });
    expect(popover.settings.dataPopover).toBe('popover');
  });

  test('should remove all event listeners and clear collection', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    expect(popover.collection.length).toBe(2);
    popover.destroy();
    expect(popover.collection.length).toBe(0);
    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });
});

describe('initEventListeners() & destroyEventListeners()', () => {
  test('should remove event listeners', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    popover.destroyEventListeners();

    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });

  test('should re-initialize event listeners', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    popover.destroyEventListeners();
    popover.initEventListeners();

    trigger.click();
    expect(target).toHaveClass('is-active');
  });

  test('should remove keyboard event listener', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    trigger.click();
    expect(target).toHaveClass('is-active');

    popover.destroyEventListeners();

    document.dispatchEvent(keyEsc);
    expect(target).toHaveClass('is-active');
  });

  test('should re-initialize keyboard event listener', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    trigger.click();
    expect(target).toHaveClass('is-active');

    popover.destroyEventListeners();
    popover.initEventListeners();

    document.dispatchEvent(keyEsc);
    expect(target).not.toHaveClass('is-active');
  });
});

describe('register() & deregister()', () => {
  test('should be able to manually register a popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover();

    expect(popover.collection.length).toBe(0);

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    popover.register(trigger);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].trigger).toBe(trigger);
    expect(popover.collection[0].target).toBe(target);
  });

  test('should be able to manually deregister a popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection.length).toBe(2);
    popover.deregister(popover.collection[0]);
    expect(popover.collection.length).toBe(1);

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });
});

describe('registerCollection() & deregisterCollection()', () => {
  test('should remove all items from collection and their event listeners', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    expect(popover.collection.length).toBe(2);
    trigger.click();
    expect(target).toHaveClass('is-active');

    popover.deregisterCollection();

    expect(popover.collection.length).toBe(0);
    expect(target).not.toHaveClass('is-active');
    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });

  test('should register all items into collection and add their event listeners', () => {
    document.body.innerHTML = markup;
    popover = new Popover();

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');
    const items = document.querySelectorAll('[data-popover]');

    expect(popover.collection.length).toBe(0);
    trigger.click();
    expect(target).not.toHaveClass('is-active');

    popover.registerCollection(items);

    expect(popover.collection.length).toBe(2);
    trigger.click();
    expect(target).toHaveClass('is-active');
  });
});

describe('open() & close()', () => {
  test('should open the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const target = document.querySelector('[data-popover]');

    expect(target).not.toHaveClass('is-active');
    popover.open(popover.collection[0].id);
    expect(target).toHaveClass('is-active');
  });

  test('should close the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const target = document.querySelector('[data-popover]');

    popover.open(popover.collection[0].id);
    popover.close(popover.collection[0].id);
    expect(target).not.toHaveClass('is-active');
  });

  test('should close all popovers', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    popover.collection.forEach((item) => {
      popover.open(item.id);
    });

    popover.collection.forEach((item) => {
      expect(item.state).toBe('opened');
      expect(item.target).toHaveClass('is-active');
    });

    popover.close();

    popover.collection.forEach((item) => {
      expect(item.state).toBe('closed');
      expect(item.target).not.toHaveClass('is-active');
    });
  });

  test('should return false if open is run with a popover it could not find', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const result = popover.open('missing');
    expect(result).toBe(false);
  });

  test('should return false if close is run with a popover it could not find', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const result = popover.close('missing');
    expect(result).toBe(false);
  });
});
