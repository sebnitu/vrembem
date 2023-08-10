import { cssVar } from '../index';

document.body.style.setProperty('--background-color', 'pink');
document.body.style.setProperty('--vb-background-color', 'green');

beforeEach(() => {
  document.body.style.removeProperty('--vrembem-prefix');
});

test('should return a CSS custom property', () => {
  const data = cssVar('--background-color');
  expect(data).toBe('pink');
});

test('should return a CSS custom property using vrembem prefix', () => {
  document.body.style.setProperty('--vrembem-prefix', 'vb-');
  const data = cssVar('--background-color');
  expect(data).toBe('green');
});

test('should return a CSS custom property with an already appended prefix', () => {
  document.body.style.setProperty('--vrembem-prefix', 'vb-');
  const data = cssVar('--vb-background-color');
  expect(data).toBe('green');
});

test('should throw an error if a CSS custom property is not found', () => {
  const func = cssVar.bind(null, '--asdf');
  expect(func).toThrow('CSS variable "--asdf" was not found!');
});
