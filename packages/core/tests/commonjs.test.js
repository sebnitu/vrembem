import * as u from '../dist/scripts.cjs.js';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `
  <div class="a b c">Hello world</div>
`;

const el = document.querySelector('div');

describe('using cjs import', () => {
  it('should add a single class to an element', () => {
    u.addClass(el, 'd');
    expect(el).toHaveClass('d');
  });

  it('should properly converts a dash string to camel case', () => {
    const str = u.camelCase('some-string-goes-here');
    expect(str).toMatch('someStringGoesHere');
  });

  it('should check that a class exists on an element', () => {
    let result = u.hasClass(el, 'a');
    expect(result).toBe(true);
  });

  it('should properly converts camel case string to a hyphen separated string', () => {
    const str = u.hyphenCase('someStringGoesHere');
    expect(str).toMatch('some-string-goes-here');
  });

  it('should remove a single class from an element', () => {
    u.removeClass(el, 'a');
    expect(el).not.toHaveClass('a');
  });

  it('should toggle multiple classes from an element', () => {
    u.toggleClass(el, 'a', 'b');
    expect(el).not.toHaveClass('a', 'b');
    expect(el).toHaveClass('c');
  });

  it('should breakpoints has all size keys with a px value', () => {
    expect(u.breakpoints).toHaveProperty('xs', expect.stringContaining('px'));
    expect(u.breakpoints).toHaveProperty('sm', expect.stringContaining('px'));
    expect(u.breakpoints).toHaveProperty('md', expect.stringContaining('px'));
    expect(u.breakpoints).toHaveProperty('lg', expect.stringContaining('px'));
    expect(u.breakpoints).toHaveProperty('xl', expect.stringContaining('px'));
  });
});
