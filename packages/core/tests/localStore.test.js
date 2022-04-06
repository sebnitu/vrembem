import { localStore } from '../index';

let result;

test('should setup a poxy that updates local storage on set', () => {
  const store = localStore('asdf');

  result = localStorage.getItem('asdf');
  expect(result).toBe(null);

  store['asdf'] = 'fdsa';

  result = localStorage.getItem('asdf');
  expect(JSON.parse(result)['asdf']).toBe('fdsa');
});

test('should restore the state of an existing local storage object', () => {
  const store = localStore('asdf');
  expect(store['asdf']).toBe('fdsa');
});

test('should disable saving local storage if enable param is set to false', () => {
  const store = localStore('asdf', false);

  result = localStorage.getItem('asdf');
  expect(JSON.parse(result)['asdf']).toEqual('fdsa');

  store['fdsa'] = 'asdf';

  result = localStorage.getItem('asdf');
  expect(JSON.parse(result)['fdsa']).toBe(undefined);

  delete store['asdf'];

  result = localStorage.getItem('asdf');
  expect(JSON.parse(result)['asdf']).toEqual('fdsa');
});

test('should update local storage on delete', () => {
  const store = localStore('asdf');
  delete store['asdf'];

  result = localStorage.getItem('asdf');
  expect(JSON.parse(result)['asdf']).toBe(undefined);
});
