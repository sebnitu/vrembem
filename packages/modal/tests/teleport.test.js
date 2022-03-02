import Modal from '../index.js';
import '@testing-library/jest-dom/extend-expect';

const markup = `
  <main>
    <div id="modal-one" class="modal">
      <div class="modal__dialog">...</div>
    </div>
    <div id="modal-two" class="modal">
      <div class="modal__dialog">...</div>
    </div>
  </main>
  <div class="modals"></div>
`;

test('should move modals the provided reference', () => {
  document.body.innerHTML = markup;
  const modal = new Modal({ teleport: '.modals' });
  const div = document.querySelector('.modals');
  expect(div.children.length).toBe(0);
  modal.init();
  expect(div.children.length).toBe(2);
});
