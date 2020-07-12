import * as u from '../dist/scripts.cjs.js';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `
  <div class="a">Hello world</div>
`;

const el = document.querySelector('div');

describe('cjs import', () => {
  it('should do nothing when second param is not passed to addClass', () => {
    u.addClass(el);
    expect(el.classList.length).toBe(1);
  });
});

describe('cjs import', () => {
  it('should do nothing when second param is not passed to hasClass', () => {
    u.hasClass(el);
    expect(el.classList.length).toBe(1);
  });
});

describe('cjs import', () => {
  it('should do nothing when second param is not passed to removeClass', () => {
    u.removeClass(el);
    expect(el.classList.length).toBe(1);
  });
});

describe('cjs import', () => {
  it('should do nothing when second param is not passed to toggleClass', () => {
    u.toggleClass(el);
    expect(el.classList.length).toBe(1);
  });
});
