import './mocks/getComputedStyle.mock';
import { updateStackIndex, getModalID } from '../src/js/helpers';

document.body.innerHTML = `
  <button data-modal-open="modal-1">...</button>
  <button data-modal-close="modal-1">...</button>
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
    <button data-modal-close>...</button>
  </div>
  <div class="random"></div>
`;

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
  const mockObj = {
    settings: {
      dataOpen: 'modal-open',
      dataClose: 'modal-close',
      selectorModal: '.modal'
    }
  };

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
