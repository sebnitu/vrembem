import { Collection, CollectionEntry } from "../index";

document.body.innerHTML = `
  <div id="asdf">...</div>
  <div id="fdsa">...</div>
`;

class ExampleEntry extends CollectionEntry {
  constructor(parent, query, options = {}) {
    super(parent, query, options);
  }
  init = vi.fn();
  onCreateEntry = vi.fn();
  onRegisterEntry = vi.fn();
  onDestroyEntry = vi.fn();
  onDeregisterEntry = vi.fn();
}

describe("constructor()", () => {
  it("should setup the collections object on instantiation", () => {
    const obj = new Collection();
    expect(obj.module).toBe("Collection");
    expect(obj.collection instanceof Array).toBe(true);
    expect(obj.collection.length).toBe(0);
  });

  it("should be able to pass options through the instantiation", () => {
    const obj = new Collection({
      test: "asdf"
    });
    expect(obj.config.test).toEqual("asdf");
  });
});

describe("get()", () => {
  it("should return an element from the collection based on it's ID value", async () => {
    const obj = new Collection({ selector: "div" });
    await obj.mount();
    const entry = obj.get("asdf");
    expect(entry.id).toBe("asdf");
    expect(entry.el).toBe(document.getElementById("asdf"));
  });

  it("should return an element based on a custom provided key", async () => {
    const obj = new Collection();
    await obj.mount({ selector: "div" });
    const el = document.getElementById("fdsa");
    const entry = obj.get(el, "el");
    expect(entry.id).toBe("fdsa");
    expect(entry.el).toBe(document.getElementById("fdsa"));
  });
});

describe("getOrTrow()", () => {
  it("should return an element from the collection based on it's ID value", async () => {
    const obj = new Collection({ selector: "div" });
    await obj.mount();
    const entry = obj.getOrThrow("asdf");
    expect(entry.id).toBe("asdf");
    expect(entry.el).toBe(document.getElementById("asdf"));
  });

  it("should throw an error if the element is not found", async () => {
    const obj = new Collection({ selector: "div" });
    await obj.mount();
    expect(() => {
      obj.getOrThrow("nonexistent-id");
    }).toThrow(
      'Collection entry not found in collection with id of "nonexistent-id"'
    );
  });
});

describe("applyConfig()", () => {
  it("should be able to modify the config object", async () => {
    const obj = new Collection();
    await obj.mount();
    obj.applyConfig({
      selector: "div",
      test: "asdf"
    });
    expect(obj.config.selector).toBe("div");
    expect(obj.config.test).toBe("asdf");
  });
});

describe("createEntry()", () => {
  it("should return an instantiation of the collection entry class", async () => {
    const obj = new Collection();
    const entry = await obj.createEntry("asdf");
    expect(entry.id).toBe("asdf");
    expect(entry.parent.module).toBe("Collection");
    expect(entry.getConfig("dataConfig")).toBe("config");
  });

  it("should be able to pass a config object", async () => {
    const obj = new Collection();
    const entry = await obj.createEntry("fdsa", { dataConfig: "test" });
    expect(entry.id).toBe("fdsa");
    expect(entry.parent.module).toBe("Collection");
    expect(entry.getConfig("dataConfig")).toBe("test");
  });
});

describe("register() & deregister()", () => {
  it("should add an item to the collection and return the entry", async () => {
    const obj = new Collection();
    let entry = await obj.register("asdf");
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0].id).toBe("asdf");
    expect(obj.collection[0].el).toBe(entry.el);

    entry = await obj.register("fdsa");
    expect(obj.collection.length).toBe(2);
    expect(obj.collection[1].id).toBe("fdsa");
    expect(obj.collection[1].el).toBe(entry.el);
  });

  it("should remove item from collection if it exists", async () => {
    const obj = new Collection();
    await obj.register("asdf");
    await obj.register("fdsa");
    await obj.deregister("asdf");
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0].id).toBe("fdsa");
    await obj.deregister("fdsa");
    expect(obj.collection.length).toBe(0);
  });

  it("should return null when running deregister on an entry that doesn't exist", async () => {
    const obj = new Collection();
    const result = await obj.deregister("asdf");
    expect(result).toBe(null);
  });

  it("should call onCreateEntry and onRegisterEntry lifecycle hooks if set", async () => {
    const obj = new Collection();
    obj.entryClass = ExampleEntry;
    const entry = await obj.register("asdf");
    expect(entry.onCreateEntry).toHaveBeenCalled();
    expect(entry.onRegisterEntry).toHaveBeenCalled();
  });

  it("should call onDestroyEntry and onDeregisterEntry lifecycle hooks if set", async () => {
    const obj = new Collection();
    obj.entryClass = ExampleEntry;
    await obj.register("asdf");
    await obj.register("fdsa");
    const entry = obj.get("asdf");
    const onDestroyEntryRef = entry.onDestroyEntry;
    const onDeregisterEntryRef = entry.onDestroyEntry;
    await obj.deregister("asdf");
    expect(onDestroyEntryRef).toHaveBeenCalled();
    expect(onDeregisterEntryRef).toHaveBeenCalled();
  });
});

describe("register() error handling and re-registration", () => {
  it("should throw an error if element is not found", async () => {
    const obj = new Collection();
    await expect(obj.register("nonexistent-id")).rejects.toThrow(
      'Element not found with ID: "nonexistent-id"'
    );
  });

  it("should re-init and update el if registering an already-registered id", async () => {
    const obj = new Collection();
    await obj.register("asdf");
    // Simulate a new element with same id
    const newEl = document.createElement("div");
    newEl.id = "asdf";
    document.body.appendChild(newEl);
    const entry = obj.get("asdf");
    // Spy on init
    entry.init = vi.fn();
    await obj.register(newEl);
    expect(entry.el).toBe(newEl);
    expect(entry.init).toHaveBeenCalled();
  });
});

describe("mount() & unmount()", () => {
  let obj;

  beforeAll(() => {
    obj = new Collection({ selector: "div" });
  });

  it("should register all elements using the provided selector on mount", async () => {
    await obj.mount();
    expect(obj.config.selector).toBe("div");
    expect(obj.collection.length).toBe(2);
  });

  it("should deregister all elements using the provided selector on mount", async () => {
    await obj.unmount();
    expect(obj.config.selector).toBe("div");
    expect(obj.collection.length).toBe(0);
  });

  it("should call before and after mount lifecycle hooks if set", async () => {
    obj.beforeMount = vi.fn();
    obj.afterMount = vi.fn();
    await obj.mount();
    expect(obj.beforeMount).toHaveBeenCalled();
    expect(obj.afterMount).toHaveBeenCalled();
  });

  it("should call before and after unmount lifecycle hooks if set", async () => {
    obj.beforeUnmount = vi.fn();
    obj.afterUnmount = vi.fn();
    await obj.unmount();
    expect(obj.beforeUnmount).toHaveBeenCalled();
    expect(obj.afterUnmount).toHaveBeenCalled();
  });
});
