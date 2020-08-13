import { camelCase } from '../index';

test('properly converts a dash string to camel case', () => {
  const str = camelCase('some-string-goes-here');
  expect(str).toMatch('someStringGoesHere');
});
