import Drawer from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import { transition } from './helpers/transition';

let modal;

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal" data-drawer="drawer-default">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div class="drawer__main" role="main">
      <button data-drawer-toggle="drawer-default">...</button>
    </div>
  </div>
`;

describe('when selectorInert and selectorOverflow are set...', () => {
  let main, el, btn, cls;

  beforeAll(() => {
    document.body.innerHTML = markup;
    modal = Drawer({
      autoInit: true,
      selectorInert: '[role="main"]',
      selectorOverflow: 'body, [role="main"]'
    });
    main = document.querySelector('[role="main"]');
    el = document.querySelector('[data-drawer]');
    btn = document.querySelector('[data-drawer-toggle]');
    cls = document.querySelector('[data-drawer-close]');
  });

  afterAll(() => {
    modal.destroy();
    modal = null;
    document.body.innerHTML = null;
  });

  it('should properly hide content when modal drawer is opened', async () => {
    btn.click();
    await transition(el);
    expect(main.inert).toBe(true);
    expect(main.getAttribute('aria-hidden')).toBe('true');
    expect(main).toHaveStyle({ overflow: 'hidden' });
  });

  it('should properly show content when modal drawer is closed', async () => {
    cls.click();
    await transition(el);
    expect(main.inert).toBe(null);
    expect(main.hasAttribute('aria-hidden')).toBe(false);
    expect(main).not.toHaveStyle({ overflow: 'hidden' });
  });
});
