import './mocks/getComputedStyle.mock';
import { updateStackIndex } from '../src/js/helpers';

document.body.innerHTML = `
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
