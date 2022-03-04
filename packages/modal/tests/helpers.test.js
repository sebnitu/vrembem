import './mocks/getComputedStyle.mock';
import { updateStackIndex, getModalID, getModalElements } from '../src/js/helpers';

document.body.innerHTML = `
  <button data-modal-open="modal-1">...</button>
  <button data-modal-close="modal-1">...</button>
  <button data-modal-replace="modal-1">...</button>
  <div id="modal-1" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-2" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div id="modal-3" class="modal">
    <div class="modal__dialog">...</div>
  </div>
  <div class="modal missing-id">
    <div class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
  <div class="random"></div>
  <div id="missing-dialog" class="modal"></div>
`;

const mockObj = {
  settings: {
    dataOpen: 'modal-open',
    dataClose: 'modal-close',
    dataReplace: 'modal-replace',
    selectorModal: '.modal',
    selectorDialog: '.modal__dialog'
  }
};

describe('updateStackIndex()', () => {
  it('should update the z-index of a modal array', () => {
    const array = document.querySelectorAll('.modal');
    const collectionMock = [];
    for (let i = 0; i < array.length; i++) {
      collectionMock.push({ target: array[i] });
    }

    updateStackIndex(collectionMock);

    expect(collectionMock[0].target.style.zIndex).toBe('1001');
    expect(collectionMock[1].target.style.zIndex).toBe('1002');
    expect(collectionMock[2].target.style.zIndex).toBe('1003');
  });
});

describe('getModalID()', () => {
  it('should return the string if a string is passed', () => {
    const result = getModalID('asdf');
    expect(result).toBe('asdf');
  });

  it('should return the id property of an object', () => {
    const result = getModalID({ id: 'asdf' });
    expect(result).toBe('asdf');
  });

  it('should return the resolved id of a passed modal open button', () => {
    const el = document.querySelector('[data-modal-open]');
    const result = getModalID.call(mockObj, el);
    expect(result).toBe('modal-1');
  });

  it('should return the resolved id of a passed modal close button', () => {
    const el = document.querySelector('[data-modal-close]');
    const result = getModalID.call(mockObj, el);
    expect(result).toBe('modal-1');
  });

  it('should return the resolved id of a passed modal replace button', () => {
    const el = document.querySelector('[data-modal-replace]');
    const result = getModalID.call(mockObj, el);
    expect(result).toBe('modal-1');
  });

  it('should return the resolved id of a passed modal', () => {
    const el = document.querySelector('.modal');
    const result = getModalID.call(mockObj, el);
    expect(result).toBe('modal-1');
  });

  it('should return the resolved id of a passed modal dialog', () => {
    const el = document.querySelector('.modal__dialog');
    const result = getModalID.call(mockObj, el);
    expect(result).toBe('modal-1');
  });

  it('should return false if passed HTML element has no ID', () => {
    const el = document.querySelector('.missing-id');
    const result = getModalID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it('should return false if passed HTML element does not match a selector', () => {
    const el = document.querySelector('.random');
    const result = getModalID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it('should return false if passed close button is valueless', () => {
    const el = document.querySelector('.missing-id [data-modal-close]');
    const result = getModalID.call(mockObj, el);
    expect(result).toBe(false);
  });

  it('should return false if pass object has no id property', () => {
    const result = getModalID({});
    expect(result).toBe(false);
  });
});

describe('getModalElements()', () => {
  console.error = jest.fn();

  it('should return the modal and modal dialog elements using the passed id', () => {
    const result = getModalElements.call(mockObj, 'modal-1');
    const modal = document.querySelector('#modal-1');
    const dialog = modal.querySelector('.modal__dialog');
    expect(result.target).toBe(modal);
    expect(result.dialog).toBe(dialog);
  });

  it('should return false and log error if no modal elements are found', () => {
    const result = getModalElements.call(mockObj, 'asdf');
    expect(result).toBe(false);
    expect(console.error).toBeCalledWith('No modal elements found using the provided ID:', 'asdf');
  });

  it('should return false and log error if no modal dialog is found', () => {
    const el = document.querySelector('#missing-dialog');
    const result = getModalElements.call(mockObj, el);
    expect(result).toBe(false);
    expect(console.error).toBeCalledWith('No modal dialog associated with the provided modal:', el);
  });

  it('should return false and log error if modal id could not be resolved', () => {
    const el = document.querySelector('.missing-id');
    const result = getModalElements.call(mockObj, el);
    expect(result).toBe(false);
    expect(console.error).toBeCalledWith('Could not resolve the modal ID:', el);
  });
});
