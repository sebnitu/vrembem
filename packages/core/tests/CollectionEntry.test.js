import { Collection, CollectionEntry } from "../index";

document.body.innerHTML = `
  <div id="one">...</div>
  <div id="two" data-config="{ 'one': 111, 'two': 222 }">...</div>
  <div id="three" style="--collection-test: fdsa;">...</div>
  <div id="four" data-config="{ 'data': 111 }" style="--collection-test: fdsa;">...</div>
`;

const obj = new Collection({
  customProps: ["test"],
  test: "asdf" 
});

describe("constructor()", () => {
  it("should setup the collections entry object on instantiation", () => {
    const entry = new CollectionEntry(obj, "one");
    expect(entry.id).toBe("one");
    expect(entry.el).toBe(document.getElementById("one"));
    expect(entry.parent.module).toBe("Collection");
  });

  it("should be able to pass options through the instantiation", () => {
    const entry = new CollectionEntry(obj, "one", {
      test: "asdf"
    });
    expect(entry.settings.test).toEqual("asdf");
  });
});

describe("applySettings()", () => {
  it("should be able to modify the settings object", async () => {
    const entry = new CollectionEntry(obj, "one");
    expect(entry.settings).toEqual({});
    entry.applySettings({
      selector: "div",
      test: "asdf"
    });
    expect(entry.settings.selector).toBe("div");
    expect(entry.settings.test).toBe("asdf");
  });
});

describe("getDataConfig()", () => {
  it("should be able to use settings from data attributes", () => {
    const entry = new CollectionEntry(obj, "two");
    entry.getDataConfig();
    expect(entry.getSetting("one")).toBe(111);
    expect(entry.getSetting("two")).toBe(222);
  });
});

describe("getCustomProps()", () => {
  it("should be able to use settings from custom properties", () => {
    const entry = new CollectionEntry(obj, "three");
    entry.getCustomProps();
    expect(entry.getSetting("test")).toBe("fdsa");
  });
});

describe("getSetting()", () => {
  it("should get a settings value from the entry parent", () => {
    const entry = new CollectionEntry(obj, "one");
    expect(entry.getSetting("test")).toBe("asdf");
  });

  it("should get a settings value from the entry", () => {
    const entry = new CollectionEntry(obj, "one", {
      test: "new"
    });
    expect(entry.getSetting("test")).toBe("new");
  });

  it("should throw an error if a setting doesn't exist", () => {
    const entry = new CollectionEntry(obj, "one");
    expect(() => entry.getSetting("asdf")).toThrowError("Collection setting does not exist: asdf");
  });
});

describe("mount() & unmount()", () => {
  it("should completely setup an entry when mounted", async () => {
    const entry = new CollectionEntry(obj, "four");
    await entry.mount({ new: "asdf" });
    expect(entry.id).toBe("four");
    expect(entry.settings.new).toBe("asdf");
    expect(entry.dataConfig.data).toBe(111);
    expect(entry.customProps.test).toBe("fdsa");
  });

  it("should call before and after mount lifecycle hooks if set", async () => {
    const entry = new CollectionEntry(obj, "four");
    entry.beforeMount = vi.fn();
    entry.afterMount = vi.fn();
    await entry.mount();
    expect(entry.beforeMount).toHaveBeenCalled();
    expect(entry.afterMount).toHaveBeenCalled();
  });

  it("should call before and after unmount lifecycle hooks if set", async () => {
    const entry = new CollectionEntry(obj, "four");
    entry.beforeUnmount = vi.fn();
    entry.afterUnmount = vi.fn();
    await entry.unmount();
    expect(entry.beforeUnmount).toHaveBeenCalled();
    expect(entry.afterUnmount).toHaveBeenCalled();
  });

  it("should run teleport methods if teleport setting has been set", async () => {
    const entry = new CollectionEntry(obj, "one", { teleport: ".container" });
    expect(entry.getSetting("teleport")).toBe(".container");
    entry.teleport = vi.fn();
    entry.teleportReturn = vi.fn();
    await entry.mount();
    expect(entry.teleport).toHaveBeenCalled();
    await entry.unmount();
    expect(entry.teleportReturn).toHaveBeenCalled();
  });

  it("should throw an error if an entry is mounted with no element", async () => {
    const entry = new CollectionEntry(obj, "asdf");
    await expect(entry.mount()).rejects.toThrow("Collection element was not found with ID: \"asdf\"");
  });
});

describe("entry.teleport() & entry.teleportReturn()", () => {
  let entry, div;

  beforeAll(async () => {
    document.body.innerHTML = `
      <main>
        <div id="entry"></div>
      </main>
      <div class="container"></div>
    `;
    console.error = vi.fn();
    entry = new CollectionEntry(obj, "entry", { teleport: ".container" });
    div = document.querySelector(".container");
  });

  it("should teleport a registered entry", () => {
    expect(typeof entry.teleportReturn).toBe("undefined");
    expect(div.children.length).toBe(0);
    entry.teleport();
    expect(div.children.length).toBe(1);
    expect(typeof entry.teleportReturn).toBe("function");
  });

  it("should return the teleported entry", () => {
    expect(div.children.length).toBe(1);
    entry.teleportReturn();
    expect(div.children.length).toBe(0);
  });
});
