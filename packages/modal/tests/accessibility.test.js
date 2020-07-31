import { Modal } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { delay } from './helpers/delay';

let modal;
const ev = new Event('transitionend');

const markup = `
  <div role="main">
    <button data-modal-open="modal-default">...</button>
  </div>
  <div data-modal="modal-default" class="modal">
    <div data-modal-dialog class="modal__dialog">
      <button data-modal-close>...</button>
    </div>
  </div>
`;

describe('when selectorMain is set...', () => {
  let main, el, btn, cls;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modal = new Modal({
      autoInit: true,
      selectorMain: '[role="main"]'
    });
    main = document.querySelector('[role="main"]');
    el = document.querySelector('[data-modal]');
    btn = document.querySelector('[data-modal-open]');
    cls = document.querySelector('[data-modal-close]');
  });

  afterAll(() => {
    modal.destroy();
    modal = null;
    document.body.innerHTML = null;
  });

  it('should properly hide content when modal is open', async () => {
    btn.click();
    el.dispatchEvent(ev);
    await delay();

    expect(main.inert).toBe(true);
    expect(main.getAttribute('aria-hidden')).toBe('true');
  });

  it('should properly show content when modal is closed', async () => {
    cls.click();
    el.dispatchEvent(ev);
    await delay();

    expect(main.inert).toBe(null);
    expect(main.hasAttribute('aria-hidden')).toBe(false);
  });
});
