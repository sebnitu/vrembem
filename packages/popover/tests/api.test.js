import Popover from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let popover;

const keyEsc = new KeyboardEvent('keydown', {
  key: 'Escape'
});

const markup = `
  <button data-popover-trigger>...</button>
  <div class="popover" data-popover>
    ...
  </div>
  <button data-popover-trigger>...</button>
  <div class="popover" data-popover>
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

describe('register() & unregister()', () => {
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

  test('should be able to manually unregister a popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection.length).toBe(2);
    popover.unregister(popover.collection[0]);
    expect(popover.collection.length).toBe(1);

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });
});

describe('registerEventListeners() & unregisterEventListeners()', () => {
  test('should remove the event listeners of a popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    popover.unregisterEventListeners(popover.collection[0]);

    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });

  test('should add the event listeners of a popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    popover.unregisterEventListeners(popover.collection[0]);
    popover.registerEventListeners(popover.collection[0]);

    trigger.click();
    expect(target).toHaveClass('is-active');
  });
});

describe('registerCollection() & unregisterCollection()', () => {
  test('should remove all items from collection and their event listeners', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('[data-popover-trigger]');
    const target = document.querySelector('[data-popover]');

    expect(popover.collection.length).toBe(2);
    trigger.click();
    expect(target).toHaveClass('is-active');

    popover.unregisterCollection();

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

    expect(popover.collection.length).toBe(0);
    trigger.click();
    expect(target).not.toHaveClass('is-active');

    popover.registerCollection();

    expect(popover.collection.length).toBe(2);
    trigger.click();
    expect(target).toHaveClass('is-active');
  });
});

describe('show() & hide() & hideAll()', () => {
  test('should show the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const target = document.querySelector('[data-popover]');

    expect(target).not.toHaveClass('is-active');
    popover.show(popover.collection[0]);
    expect(target).toHaveClass('is-active');
  });

  test('should hide the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const target = document.querySelector('[data-popover]');

    popover.show(popover.collection[0]);
    popover.hide(popover.collection[0]);
    expect(target).not.toHaveClass('is-active');
  });

  test('should hide all popovers', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    popover.collection.forEach((item) => {
      popover.show(item);
    });

    popover.collection.forEach((item) => {
      expect(item.state).toBe('show');
      expect(item.target).toHaveClass('is-active');
    });

    popover.hideAll();

    popover.collection.forEach((item) => {
      expect(item.state).toBe('hide');
      expect(item.target).not.toHaveClass('is-active');
    });
  });
});
