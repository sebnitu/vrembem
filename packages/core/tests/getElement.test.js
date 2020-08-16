import { getElement } from '../index';
import '@testing-library/jest-dom/extend-expect';

document.body.innerHTML = `
  <div class="el el-1"></div>
  <div class="el el-2"></div>
  <div class="el el-3"></div>
`;

const el2 = document.querySelector('.el-2');

test('should return all elements that matches selector', () => {
  const result = getElement('.el');
  expect(result.length).toBe(3);
});

test('should return a single elements that matches selector', () => {
  const result = getElement('.el', 1);
  expect(result).toHaveClass('el-1');
});

test('should return the object if passed a non-string', () => {
  const result = getElement(el2);
  expect(result).toHaveClass('el-2');
});
