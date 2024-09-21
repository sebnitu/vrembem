import "@testing-library/jest-dom/vitest";
import { Collection } from "../src/js/Collection";

console.error = vi.fn();

document.body.innerHTML = `
  <div id="asdf">1234</div>
  <div id="fdsa">5678</div>
  <div id="afsd">8765</div>
  <div id="dsfa">4321</div>
`;

function buildData() {
  const data = [];
  const nodes = document.querySelectorAll("div");
  nodes.forEach((node) => {
    data.push({
      id: node.id,
      text: node.innerHTML,
      node: node
    });
  });
  return data;
}

describe("constructor()", () => {
  it("should setup an empty collection array on instantiation", () => {
    const obj = new Collection();
    expect(typeof obj.collection).toBe("object");
    expect(obj.collection.length).toBe(0);
  });
});

describe("register()", () => {
  it("should add an item to the registered collection and return collection", async () => {
    const obj = new Collection();
    const data = buildData();
    let result;

    result = await obj.register(data[0]);
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0]).toBe(data[0]);
    expect(obj.collection).toBe(result);

    result = await obj.register(data[1]);
    expect(obj.collection.length).toBe(2);
    expect(obj.collection[1]).toBe(data[1]);
    expect(obj.collection).toBe(result);
  });
});

describe("deregister()", () => {
  let obj;

  beforeAll(() => {
    obj = new Collection();
  });

  it("should do nothing if item does not exist in collection", async () => {
    const data = buildData();
    await obj.register(data[0]);
    await obj.deregister(data[1]);
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0].id).toBe("asdf");
    expect(data[1].id).toBe("fdsa");
  });

  it("should remove item from collection if it exists", async () => {
    const item = obj.collection[0];
    await obj.deregister(item);
    expect(obj.collection.length).toBe(0);
    expect(item.id).toBe(undefined);
    expect(item.text).toBe(undefined);
  });
});

describe("registerCollection() & deregisterCollection()", () => {
  let obj;

  beforeAll(() => {
    obj = new Collection();
  });

  it("should register an array of entries to the collection", async () => {
    const data = buildData();
    await obj.registerCollection(data);
    expect(obj.collection.length).toBe(4);
    expect(obj.collection[0]).toBe(data[0]);
    expect(obj.collection[1]).toBe(data[1]);
    expect(obj.collection[2]).toBe(data[2]);
    expect(obj.collection[3]).toBe(data[3]);
  });

  it("should deregister all entries from collection", async () => {
    await obj.deregisterCollection();
    expect(obj.collection.length).toBe(0);
  });
});

describe("get()", () => {
  let obj;

  beforeAll(() => {
    obj = new Collection();
  });

  it("should return entry from collection using the passed ID", async () => {
    let entry;
    const data = buildData();
    await obj.registerCollection(data);

    entry = obj.get("asdf");
    expect(entry.id).toBe("asdf");
    expect(entry.text).toBe("1234");

    entry = obj.get("fdsa");
    expect(entry.id).toBe("fdsa");
    expect(entry.text).toBe("5678");
  });

  it("should return null if no items is found in collection", () => {
    let entry = obj.get("aaaa");
    expect(entry).toBe(undefined);
  });
});

describe("entry.getSetting()", () => {
  it("should return a setting value from entry and root settings", async () => {
    document.body.innerHTML = "<div id='asdf'>1234</div>";
    const collection = new Collection();
    const entry = collection.createEntry("asdf");
    entry.settings.asdf = "asdf";
    expect(entry.getSetting("asdf")).toBe("asdf");
    entry.settings.asdf = "fdsa";
    expect(entry.getSetting("asdf")).toBe("fdsa");
  });

  it("should return a setting value from the data attribute object", async () => {
    document.body.innerHTML = `
      <div id="asdf" data-config="{'test': 1234}">1234</div>
    `;
    const collection = new Collection();
    const entry = collection.createEntry("asdf");
    entry.getDataConfig();
    expect(entry.getSetting("test")).toBe(1234);
  });

  it("should return a setting value from custom properties", async () => {
    document.body.innerHTML = `
      <div id="asdf" style="--collection-background: pink;">1234</div>
    `;
    const collection = new Collection();
    const entry = collection.createEntry("asdf");
    entry.customPropKeys.push("background");
    entry.getCustomProps();
    expect(entry.getSetting("background")).toBe("pink");
  });

  it("should throw an error if searching for a setting that doesn't exist", async () => {
    document.body.innerHTML = "";
    const collection = new Collection();
    const entry = collection.createEntry("asdf");
    console.log(entry);
    expect(() => entry.getSetting("asdf")).toThrow("Collection setting does not exist: asdf");
  });
});

describe("entry.teleport() & entry.teleportReturn()", () => {
  let collection, entry, div;

  beforeAll(async () => {
    document.body.innerHTML = `
      <main>
        <div id="entry"></div>
      </main>
      <div class="container"></div>
    `;
    collection = new Collection();
    entry = collection.createEntry("entry", { settings: {
      teleportMethod: "append"
    }});
    div = document.querySelector(".container");
  });

  it("should teleport a registered entry", () => {
    expect(div.children.length).toBe(0);
    entry.teleport(".container");
    expect(div.children.length).toBe(1);
    expect(entry.returnRef.textContent).toBe("teleported #entry");
  });

  it("should log error if teleport is run on an entry that has already been teleported", () => {
    expect(div.children.length).toBe(1);
    entry.teleport(".container");
    expect(console.error).toHaveBeenCalledWith("Element has already been teleported:", entry.el);
    expect(div.children.length).toBe(1);
  });

  it("should return the teleported entry", () => {
    expect(div.children.length).toBe(1);
    entry.teleportReturn();
    expect(div.children.length).toBe(0);
    expect(entry.returnRef).toBe(null);
  });

  it("should log error if teleportReturn is run with no return reference", () => {
    expect(entry.returnRef).toBe(null);
    expect(div.children.length).toBe(0);
    entry.teleportReturn();
    expect(console.error).toHaveBeenCalledWith("No return reference found:", entry.el);
    expect(div.children.length).toBe(0);
  });
});
