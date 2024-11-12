import { expect } from "vitest";
import { Collection } from "../../src/js/Collection";
import { propStore } from "../../src/js/plugins";

document.body.innerHTML = `
  <div class="entry" id="entry-1">One</div>
  <div class="entry" id="entry-2">Two</div>
  <div class="entry" id="entry-3">Three</div>
`;

const collection = new Collection({
  selector: ".entry"
});

test("should register and setup the propStore plugin on collection mount", async () => {
  expect(collection.plugins.length).toBe(0);
  await collection.mount({
    plugins: [
      propStore()
    ]
  });
  expect(collection.plugins.length).toBe(1);
  const entry = collection.get("entry-1");
  const plugin = collection.plugins.get("propStore");
  expect(entry.id).toBe("entry-1");
  expect(typeof plugin.store.get).toBe("function");
  expect(typeof plugin.store.set).toBe("function");
  expect(typeof plugin.settings.onChange).toBe("function");
  expect(typeof plugin.settings.condition).toBe("boolean");
  plugin.settings.onChange();
  expect(plugin.settings.condition).toBe(false);
});

test("should remove the propStore plugin when the remove method is called", async () => {
  expect(collection.plugins.length).toBe(1);
  await collection.plugins.remove("propStore");
  expect(collection.plugins.length).toBe(0);
});

test("should remove propStore from an entry if it is deregistered", async () => {
  await collection.mount({
    plugins: [
      propStore({
        name: "quickPropStore"
      })
    ]
  });
  const entry = collection.get("entry-1");
  await collection.deregister("entry-1");
  expect(entry).toEqual({ "id": "entry-1" });
  await collection.register("entry-1");
  const el = document.getElementById("entry-1");
  expect(collection.get("entry-1").el).toBe(el);
});

test("should be able to set a condition and onChange callback", async () => {
  const spyFunction = vi.fn();
  await collection.mount({
    plugins: [
      propStore({
        prop: "example",
        condition() {
          return true;
        },
        onChange: spyFunction
      })
    ]
  });
  const entry = collection.get("entry-1");
  expect(spyFunction).toBeCalledTimes(0);
  entry.example = "fdsa";
  expect(entry.example).toBe("fdsa");
  expect(spyFunction).toBeCalledTimes(1);
});

test("should not fire onChange callback if setting a value that isn't different", async () => {
  const entry = collection.get("entry-2");
  entry.example = "asdf";
  expect(entry.example).toBe("asdf");
  entry.example = "asdf";
});

test("should setup a store property for accessing the local storage value", async () => {
  const entry = collection.get("entry-3");
  entry.example = "test";
  expect(entry.store).toBe("test");
  entry.store = "new";
  entry.example = "new";
  expect(entry.store).toBe("new");
});

test("should be able to set an initial value for the property", async() => {
  const spyFunction = vi.fn();
  expect(collection.plugins.length).toBe(2);
  await collection.mount({
    plugins: [
      propStore({
        name: "newPropStore",
        prop: "hello",
        value: "world",
        condition: () => true,
        onChange: spyFunction
      })
    ]
  });
  expect(collection.plugins.length).toBe(3);
  const entry = collection.get("entry-1");
  expect(entry.hello).toBe("world");
  expect(spyFunction).toBeCalledTimes(3);
  entry.hello = "buddy";
  expect(spyFunction).toBeCalledTimes(4);
});

test("should be able to set an initial value using a function definition", async() => {
  expect(collection.plugins.length).toBe(3);
  await collection.mount({
    plugins: [
      propStore({
        name: "anotherNewPropStore",
        prop: "hello",
        value: () => "my" + " " + "friend",
        condition: () => true
      })
    ]
  });
  expect(collection.plugins.length).toBe(4);
  const entry = collection.get("entry-1");
  expect(entry.hello).toBe("my friend");
});

test("should default to the original property value if value function returns falsy", async() => {
  expect(collection.plugins.length).toBe(4);
  await collection.mount({
    plugins: [
      propStore({
        name: "oneMorePropStore",
        prop: "hello",
        value: () => undefined,
        condition: () => false
      })
    ]
  });
  expect(collection.plugins.length).toBe(5);
  const entry = collection.get("entry-1");
  expect(entry.hello).toBe("my friend");
});
