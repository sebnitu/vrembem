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
    expect(entry.config.test).toEqual("asdf");
  });
});

describe("applyConfig()", () => {
  it("should be able to modify the config object", async () => {
    const entry = new CollectionEntry(obj, "one");
    expect(entry.config).toEqual({});
    entry.applyConfig({
      selector: "div",
      test: "asdf"
    });
    expect(entry.config.selector).toBe("div");
    expect(entry.config.test).toBe("asdf");
  });
});

describe("buildDataConfig()", () => {
  it("should be able to use config from data attributes", () => {
    const entry = new CollectionEntry(obj, "two");
    entry.buildDataConfig();
    expect(entry.getConfig("one")).toBe(111);
    expect(entry.getConfig("two")).toBe(222);
  });
});

describe("buildCustomProps()", () => {
  it("should be able to use config from custom properties", () => {
    const entry = new CollectionEntry(obj, "three");
    entry.buildCustomProps();
    expect(entry.getConfig("test")).toBe("fdsa");
  });
});

describe("getConfig()", () => {
  it("should get a config value from the entry parent", () => {
    const entry = new CollectionEntry(obj, "one");
    expect(entry.getConfig("test")).toBe("asdf");
  });

  it("should get a config value from the entry", () => {
    const entry = new CollectionEntry(obj, "one", {
      test: "new"
    });
    expect(entry.getConfig("test")).toBe("new");
  });

  it("should throw an error if a setting doesn't exist", () => {
    const entry = new CollectionEntry(obj, "one");
    expect(() => entry.getConfig("asdf")).toThrowError(
      "Collection config does not exist: asdf"
    );
  });
});

describe("init() & destroy()", () => {
  it("should completely setup an entry when mounted", async () => {
    const entry = new CollectionEntry(obj, "four");
    await entry.init({ new: "asdf" });
    expect(entry.id).toBe("four");
    expect(entry.config.new).toBe("asdf");
    expect(entry.dataConfig.data).toBe(111);
    expect(entry.customProps.test).toBe("fdsa");
  });
});
