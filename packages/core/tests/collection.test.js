import { Collection } from '../src/js/collection';

let obj;

document.body.innerHTML = `
  <div id="asdf">1234</div>
  <div id="fdsa">5678</div>
  <div id="afsd">8765</div>
  <div id="dsfa">4321</div>
`;

function buildData() {
  const data = [];
  const nodes = document.querySelectorAll('div');
  nodes.forEach((node) => {
    data.push({
      id: node.id,
      text: node.innerHTML,
      node: node
    });
  });
  return data;
}

describe('constructor()', () => {
  test('should setup an empty collection array on instantiation', () => {
    obj = new Collection();
    expect(typeof obj.collection).toBe('object');
    expect(obj.collection.length).toBe(0);
  });
});

describe('register()', () => {
  afterAll(() => {
    obj.deregisterCollection();
  });

  test('should add an item to the registered collection and return collection', () => {
    const data = buildData();
    let result;

    result = obj.register(data[0]);
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0]).toBe(data[0]);
    expect(obj.collection).toBe(result);

    result = obj.register(data[1]);
    expect(obj.collection.length).toBe(2);
    expect(obj.collection[1]).toBe(data[1]);
    expect(obj.collection).toBe(result);
  });
});

describe('deregister()', () => {
  afterAll(() => {
    obj.deregisterCollection();
  });

  test('should do nothing if item does not exist in collection', () => {
    const data = buildData();
    obj.register(data[0]);
    obj.deregister(data[1]);
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0].id).toBe('asdf');
    expect(data[1].id).toBe('fdsa');
  });

  test('should remove item from collection if it exists', () => {
    const item = obj.collection[0];
    obj.deregister(item);
    expect(obj.collection.length).toBe(0);
    expect(item.id).toBe(undefined);
    expect(item.text).toBe(undefined);
  });
});

describe('registerCollection() & deregisterCollection()', () => {
  test('should add multiple items to the registered collection', async () => {
    const data = buildData();
    await obj.registerCollection(data);
    expect(obj.collection.length).toBe(4);
    expect(obj.collection[0]).toBe(data[0]);
    expect(obj.collection[1]).toBe(data[1]);
    expect(obj.collection[2]).toBe(data[2]);
    expect(obj.collection[3]).toBe(data[3]);
  });

  test('should remove all items from collection', async () => {
    await obj.deregisterCollection();
    expect(obj.collection.length).toBe(0);
  });
});

describe('get()', () => {
  test('should return entry from collection using the passed ID', () => {
    let entry;
    const data = buildData();
    obj.registerCollection(data);

    entry = obj.get('asdf');
    expect(entry.id).toBe('asdf');
    expect(entry.text).toBe('1234');

    entry = obj.get('fdsa');
    expect(entry.id).toBe('fdsa');
    expect(entry.text).toBe('5678');
  });

  test('should return null if no items is found in collection', () => {
    let entry = obj.get('aaaa');
    expect(entry).toBe(null);
  });
});
