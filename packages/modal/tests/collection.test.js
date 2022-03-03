import '@testing-library/jest-dom/extend-expect';
import Modal from '../index';

const markup = `
  <div id="modal-1" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-2" class="modal">
    <div class="modal__dialog">...</div>
  </div>
`;

describe('register() & entry.deregister()', () => {
  let modal, entry1, entry2, el1, el2;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modal = new Modal({ transition: false });
    el1 = document.querySelector('#modal-1');
    el2 = document.querySelector('#modal-2');
  });

  it('should create collection entry when register is called with modal ID', () => {
    expect(modal.collection.length).toBe(0);
    modal.register('modal-1');
    entry1 = modal.get('modal-1');
    expect(modal.collection.length).toBe(1);
    expect(entry1.target).toBe(el1);
  });

  it('should add missing accessibility attributes', () => {
    expect(entry1.dialog.getAttribute('role')).toBe('dialog');
    expect(entry1.dialog.getAttribute('aria-modal')).toBe('true');
    expect(entry1.dialog.getAttribute('tabindex')).toBe('-1');
  });

  it('should register modal without tabindex if setTabindex is disabled', () => {
    modal.settings.setTabindex = false;
    modal.register('modal-2');
    entry2 = modal.get('modal-2');
    expect(entry1.dialog.getAttribute('tabindex')).toBe('-1');
    expect(entry2.target).toBe(el2);
  });

  it('should not be able to register the same modal multiple times', () => {
    expect(modal.collection.length).toBe(2);
    expect(modal.collection[0].id).toBe('modal-1');
    expect(modal.collection[1].id).toBe('modal-2');
    modal.register('modal-1');
    expect(modal.collection.length).toBe(2);
    expect(modal.collection[0].id).toBe('modal-2');
    expect(modal.collection[1].id).toBe('modal-1');
  });

  it('should remove entry from collection when entry method deregister is run', () => {
    entry1 = modal.get('modal-1');
    entry2 = modal.get('modal-2');
    entry1.deregister();
    entry2.deregister();
    expect(modal.collection.length).toBe(0);
  });
});

describe('entry.open() & entry.close()', () => {
  let modal;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modal = new Modal({
      autoInit: true,
      transition: false
    });
  });

  it('should open modal with transitions disabled', async () => {
    const entry = modal.get('modal-1');
    expect(entry.state).toBe('closed');
    expect(entry.target).toHaveClass('is-closed');
    await entry.open();
    expect(entry.state).toBe('opened');
    expect(entry.target).toHaveClass('is-opened');
  });

  it('should close modal with transitions disabled', async () => {
    const entry = modal.get('modal-1');
    expect(entry.state).toBe('opened');
    expect(entry.target).toHaveClass('is-opened');
    await entry.close();
    expect(entry.state).toBe('closed');
    expect(entry.target).toHaveClass('is-closed');
  });
});
