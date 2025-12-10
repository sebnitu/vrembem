import { Collection } from "../../src/js/Collection";
import { propStore } from "../../src/js/plugins";

document.body.innerHTML = `
  <div class="entry" id="entry-1">One</div>
  <div class="entry" id="entry-2">Two</div>
  <div class="entry" id="entry-3">Three</div>
`;

let collection;

describe("propStore", () => {
  beforeEach(() => {
    collection = new Collection({
      selector: ".entry"
    });
  });

  afterEach(async () => {
    await collection.unmount();
  });

  it("should register and setup the propStore plugin on collection mount", async () => {
    expect(collection.plugins.length).toBe(0);
    await collection.mount({ plugins: [propStore()] });
    expect(collection.plugins.length).toBe(1);
    const entry = collection.get("entry-1");
    const plugin = collection.plugins.get("propStore");
    expect(entry.id).toBe("entry-1");
    expect(typeof plugin.store.get).toBe("function");
    expect(typeof plugin.store.set).toBe("function");
    expect(typeof plugin.config.onChange).toBe("function");
    expect(typeof plugin.config.condition).toBe("boolean");
    await plugin.config.onChange();
    expect(plugin.config.condition).toBe(false);
  });

  it("should remove the propStore plugin when the remove method is called", async () => {
    expect(collection.plugins.length).toBe(0);
    await collection.mount({ plugins: [propStore()] });
    expect(collection.plugins.length).toBe(1);
    await collection.plugins.remove("propStore");
    expect(collection.plugins.length).toBe(0);
  });

  it("should remove propStore from an entry if it is deregistered", async () => {
    // Initial setup for propStore
    await collection.mount({
      plugins: [
        propStore({
          prop: "example",
          value: "asdf",
          condition: true
        })
      ]
    });

    // Get a reference to the plugin's local store object
    const store = collection.plugins.get("propStore").store;

    const entry = collection.get("entry-1");
    // Check that the property and initial value has been added to entry
    expect(entry.example).toBe("asdf");
    // Check that the value of entry has been stored in local storage
    expect(store.get("entry-1")).toBe("asdf");

    // Deregister the entry from the collection
    await collection.deregister("entry-1");

    // Check that the property has been removed
    expect(entry.example).toBe(undefined);
    // Check that the value of entry has been removed from local storage
    expect(store.get("entry-1")).toBe(undefined);

    // Ensure that the other entries still have their values stored in local storage
    expect(store.get("entry-2")).toBe("asdf");
    expect(store.get("entry-3")).toBe("asdf");
  });

  it("should be able to set a condition and onChange callback", async () => {
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

  it("should not fire onChange callback if setting a value that isn't different", async () => {
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

    // Ensure onChange has not been called
    expect(spyFunction).toBeCalledTimes(0);

    // Set the value of the prop and ensure onChange is called once
    entry.example = "asdf";
    expect(spyFunction).toBeCalledTimes(1);

    // Set the value again but ensure onChange is NOT called again since the value has not changed
    entry.example = "asdf";
    expect(spyFunction).toBeCalledTimes(1);

    // Ensure that setting the prop to a different value does fire onChange
    entry.example = "fdsa";
    expect(spyFunction).toBeCalledTimes(2);
  });

  it("should setup a store property for accessing the local storage value", async () => {
    await collection.mount({
      plugins: [
        propStore({
          prop: "example",
          condition: true
        })
      ]
    });
    const entry = collection.get("entry-3");

    // Setting the property directly should update store
    entry.example = "test";
    expect(entry.store).toBe("test");
    expect(entry.example).toBe("test");

    // Setting the store value directly should update the property
    entry.store = "new";
    expect(entry.store).toBe("new");
    expect(entry.example).toBe("new");
  });

  it("should be able to set an initial value for the property", async () => {
    const spyFunction = vi.fn();
    await collection.mount({
      plugins: [
        propStore({
          prop: "hello",
          value: "world",
          condition: () => true,
          onChange: spyFunction
        })
      ]
    });
    const entry = collection.get("entry-1");
    expect(entry.hello).toBe("world");
    expect(spyFunction).toBeCalledTimes(3);
    entry.hello = "buddy";
    expect(spyFunction).toBeCalledTimes(4);
  });

  it("should be able to set an initial value using a function definition", async () => {
    await collection.mount({
      plugins: [
        propStore({
          prop: "hello",
          value: () => "my" + " " + "friend",
          condition: () => true
        })
      ]
    });
    const entry = collection.get("entry-1");
    expect(entry.hello).toBe("my friend");
  });

  it("should set an anonymous empty function by default", async () => {
    await collection.mount({ plugins: [propStore()] });
    // Get the plugin from the plugins array
    const plugin = collection.plugins.get("propStore");
    // Ensure that onChange is a function
    expect(typeof plugin.config.onChange).toBe("function");
    // Ensure that onChange does not throw when called
    expect(() => plugin.config.onChange()).not.toThrow();
  });
});
