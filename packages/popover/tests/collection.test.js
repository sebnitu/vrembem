import Collection from "../src/js/collection";

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

describe('register() & deregister()', () => {
  test('should add an item to the registered collection', () => {
    const item = buildData()[0];
    obj.register(item);
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0]).toBe(item);
  });

  test('should do nothing if item does not exist in collection', () => {
    const item = buildData()[1];
    obj.deregister(item);
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0].id).toBe('asdf');
    expect(item.id).toBe('fdsa');
  })

  test('should remove item from collection if it exists', () => {
    const item = obj.collection[0];
    obj.deregister(item);
    expect(obj.collection.length).toBe(0);
    expect(item.id).toBe(undefined);
    expect(item.text).toBe(undefined);
  });
});

describe('registerCollection() & deregisterCollection()', () => {
  test('should add multiple items to the registered collection', () => {
    obj.registerCollection(buildData());
    expect(obj.collection.length).toBe(4);
    expect(obj.collection[0].id).toBe('asdf');
    expect(obj.collection[0].text).toBe('1234');
    expect(obj.collection[3].id).toBe('dsfa');
    expect(obj.collection[3].text).toBe('4321');
  });

  test('should remove all items from collection', () => {
    obj.deregisterCollection();
    expect(obj.collection.length).toBe(0);
  });
});

describe('get()', () => {
  test('should return entry from collection using the passed ID', () => {
    obj.registerCollection(buildData());
    let entry = obj.get('asdf');
    expect(entry.id).toBe('asdf');
    expect(entry.text).toBe('1234');

    entry = obj.get('fdsa');
    expect(entry.id).toBe('fdsa');
    expect(entry.text).toBe('5678');
  });
});
