import '@testing-library/jest-dom/extend-expect';
import { delay } from './helpers/delay';
import { transition } from './helpers/transition';
import Modal from '../index';

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div id="modal-default" class="modal">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`;

const markupMulti = `
  <div id="modal-1" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-2" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-3" class="modal">
    <div class="modal__dialog">...</div>
  </div>
`;

describe('init() & destroy()', () => {
  let modal, entry, el, btnOpen;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modal = new Modal();
    el = document.querySelector('#modal-default');
    btnOpen = document.querySelector('[data-modal-open]');
  });

  it('should initialize the modal instance', async () => {
    await modal.init({ transition: false });
    entry = modal.get('modal-default');
    btnOpen.click();
    await delay();
    expect(entry.state).toBe('opened');
    expect(entry.target).toHaveClass('is-opened');
  });

  it('should destroy the modal instance', async () => {
    await modal.destroy();
    expect(modal.collection.length).toBe(0);
    expect(el).toHaveClass('is-closed');
    btnOpen.click();
    await delay();
    expect(el).toHaveClass('is-closed');
  });
});

// describe('initEventListeners() & destroyEventListeners()', () => {});
// describe('register() & deregister()', () => {});

// test('should properly destroy modal instance on api call', async () => {
//   document.body.innerHTML = markup;
//   const modal = new Modal({ autoInit: true });
//   const el = document.querySelector('.modal');
//   const btnOpen = document.querySelector('[data-modal-open]');

//   modal.destroy();
//   btnOpen.click();
//   await transition(el);

//   expect(Object.keys(modal.memory).length).toBe(0);
//   expect(el).toHaveClass('modal is-closed');
//   expect(el.classList.length).toBe(2);
// });

// test('should return registered modal object if a registered target is passed', () => {
//   document.body.innerHTML = markup;
//   const modal = new Modal({ autoInit: true });
//   const el = document.querySelector('#modal-default');
//   const result = modal.get(el.id);
//   expect(el).toBe(result.target);
// });

// test('should return null if modal.get() does not return a modal', () => {
//   document.body.innerHTML = markup;
//   const modal = new Modal({ autoInit: true });
//   const el = modal.get('asdf');
//   expect(el).toBe(null);
// });

describe('open() & close()', () => {
  let modal, el, entry;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modal = new Modal({ autoInit: true });
    el = document.querySelector('.modal');
    entry = modal.get('modal-default');
  });

  it('should open modal', async () => {
    expect(el).toHaveClass('modal is-closed');
    expect(entry.state).toBe('closed');

    modal.open('modal-default');
    await transition(el);

    expect(el).toHaveClass('modal is-opened');
    expect(entry.state).toBe('opened');
  });

  it('should do nothing if modal is already open', async () => {
    expect(el).toHaveClass('modal is-opened');
    expect(entry.state).toBe('opened');

    modal.open('modal-default');
    await transition(el);

    expect(el).toHaveClass('modal is-opened');
    expect(entry.state).toBe('opened');
  });

  it('should close modal', async () => {
    expect(el).toHaveClass('modal is-opened');
    expect(entry.state).toBe('opened');

    modal.close();
    await transition(el);

    expect(el).toHaveClass('modal is-closed');
    expect(entry.state).toBe('closed');
  });

  it('should do nothing if modal is already closed', async () => {
    expect(el).toHaveClass('modal is-closed');
    expect(entry.state).toBe('closed');

    modal.close('modal-default');
    await transition(el);

    expect(el).toHaveClass('modal is-closed');
    expect(entry.state).toBe('closed');
  });

  it('should run function when promise is returned from open api', async () => {
    let callbackCheck = false;

    modal.open('modal-default').then(() => {
      callbackCheck = true;
    });

    await transition(el);
    expect(callbackCheck).toBe(true);
  });

  it('should run function when promise is returned from close api', async () => {
    let callbackCheck = false;

    modal.close().then(() => {
      callbackCheck = true;
    });

    await transition(el);
    expect(callbackCheck).toBe(true);
  });
});

describe('closeAll()', () => {
  it('should close all open modals', async () => {
    document.body.innerHTML = markupMulti;
    const modal = new Modal({ autoInit: true });

    modal.open('modal-1');
    modal.open('modal-2');
    modal.open('modal-3');

    await Promise.all(modal.collection.map(async (entry) => {
      expect(entry.target).toHaveClass('is-opening');
      expect(entry.state).toBe('opening');
      await transition(entry.target);
      expect(entry.target).toHaveClass('is-opened');
      expect(entry.state).toBe('opened');
    }));

    modal.closeAll();

    await Promise.all(modal.collection.map(async (entry) => {
      expect(entry.target).toHaveClass('is-closing');
      expect(entry.state).toBe('closing');
      await transition(entry.target);
      expect(entry.target).toHaveClass('is-closed');
      expect(entry.state).toBe('closed');
    }));
  });
});
