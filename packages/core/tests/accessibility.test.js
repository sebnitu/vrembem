import { setInert, setOverflowHidden, setTabindex } from '../index';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `
  <header class="header"></header>
  <div class="main"></div>
  <aside class="aside aside-1"></aside>
  <aside class="aside aside-2"></aside>
`;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const aside1 = document.querySelector('.aside-1');
const aside2 = document.querySelector('.aside-2');

describe('running setInert', () => {
  it('should apply inert and aria hidden to passed selectors', () => {
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);
    expect(main).not.toHaveAttribute('aria-hidden');
    expect(header).not.toHaveAttribute('aria-hidden');

    setInert(true, '.main, .header');
    expect(main.inert).toBe(true);
    expect(header.inert).toBe(true);
    expect(main).toHaveAttribute('aria-hidden', 'true');
    expect(header).toHaveAttribute('aria-hidden', 'true');
  });

  it('should remove inert and aria hidden when set to false', () => {
    setInert(false, '.main, .header');
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);
    expect(main).not.toHaveAttribute('aria-hidden');
    expect(header).not.toHaveAttribute('aria-hidden');
  });

  it('should do nothing if selector is not passed', () => {
    setInert(true);
    expect(main.inert).not.toBe(true);
    expect(header.inert).not.toBe(true);
    expect(main).not.toHaveAttribute('aria-hidden');
    expect(header).not.toHaveAttribute('aria-hidden');
  });
});

describe('running setOverflowHidden', () => {
  it('should apply overflow hidden to passed selectors', () => {
    expect(document.body).not.toHaveStyle('overflow: hidden');
    expect(main).not.toHaveStyle('overflow: hidden');
    setOverflowHidden(true, 'body, .main');
    expect(document.body).toHaveStyle('overflow: hidden');
    expect(main).toHaveStyle('overflow: hidden');
  });

  it('should remove overflow hidden when set to false', () => {
    setOverflowHidden(false, 'body, .main');
    expect(document.body).not.toHaveStyle('overflow: hidden');
    expect(main).not.toHaveStyle('overflow: hidden');
  });

  it('should do nothing if selector is not passed', () => {
    setOverflowHidden(true);
    expect(document.body).not.toHaveStyle('overflow: hidden');
    expect(main).not.toHaveStyle('overflow: hidden');
  });
});

describe('running setTabindex', () => {
  it('should apply overflow hidden to passed selectors', () => {
    expect(aside1).not.toHaveAttribute('tabindex');
    expect(aside2).not.toHaveAttribute('tabindex');
    setTabindex(true, '.aside');
    expect(aside1).toHaveAttribute('tabindex', '-1');
    expect(aside2).toHaveAttribute('tabindex', '-1');
  });

  it('should remove overflow hidden when set to false', () => {
    setTabindex(false, '.aside');
    expect(aside1).not.toHaveAttribute('tabindex');
    expect(aside2).not.toHaveAttribute('tabindex');
  });

  it('should do nothing if selector is not passed', () => {
    setTabindex(true);
    expect(aside1).not.toHaveAttribute('tabindex');
    expect(aside2).not.toHaveAttribute('tabindex');
  });
});
