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
  expect(typeof plugin.settings.condition).toBe("function");
  plugin.settings.onChange();
  expect(plugin.settings.condition()).toBe(false);
});

test("should remove the propStore plugin when the remove method is called", async () => {
  expect(collection.plugins.length).toBe(1);
  await collection.plugins.remove("propStore");
  expect(collection.plugins.length).toBe(0);
});

test("should be able to set a condition and onChange callback", async () => {
  const spyFunction = vi.fn();
  await collection.mount({
    plugins: [
      propStore({
        prop: "example",
        value: "asdf",
        condition() {
          return true;
        },
        onChange: spyFunction
      })
    ]
  });
  const entry = collection.get("entry-1");
  expect(entry.example).toBe("asdf");
  expect(spyFunction).toBeCalledTimes(0);
  entry.example = "fdsa";
  expect(entry.example).toBe("fdsa");
  expect(spyFunction).toBeCalledTimes(1);
});

test("should be able to set a prop path with nested properties", async () => {
  await collection.mount({
    plugins: [
      propStore({
        name: "deepPropStore",
        prop: "one.two.three",
        value: "asdf",
        ref: "easy",
        condition() { return true; }
      })
    ]
  });
  const entry = collection.get("entry-2");
  const plugin = collection.plugins.get("deepPropStore");

  console.log(plugin.store.get());
  expect(entry.one.two.three).toBe("asdf");
  expect(entry.easy).toBe(undefined);

  entry.one.two.three = "1111";
  expect(entry.one.two.three).toBe("1111");
  expect(entry.easy).toBe("1111");

  entry.easy = "2222";
  expect(entry.one.two.three).toBe("1111");
  expect(entry.easy).toBe("2222");

  plugin.store.set("entry-2", "3333");
  expect(entry.one.two.three).toBe("1111");
  expect(entry.easy).toBe("3333");

  entry.one.two.three = "1111";
  expect(entry.one.two.three).toBe("1111");
  expect(entry.easy).toBe("3333");
});

test("should not fire onChange callback if setting a value that isn't different", async () => {
  const entry = collection.get("entry-2");
  entry.one.two.three = "1111";
  expect(entry.one.two.three).toBe("1111");
  expect(entry.easy).toBe("3333");
});
