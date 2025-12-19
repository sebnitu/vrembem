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
    expect(entry.parent.name).toBe("Collection");
  });

  it("should be able to pass options through the instantiation", () => {
    const entry = new CollectionEntry(obj, "one", {
      test: "asdf"
    });
    expect(entry.config.get("test")).toEqual("asdf");
  });
});

describe("config.apply()", () => {
  it("should be able to modify the config object", async () => {
    const entry = new CollectionEntry(obj, "one");
    entry.config.apply({
      selector: "div",
      test: "asdf"
    });
    expect(entry.config.get("selector")).toBe("div");
    expect(entry.config.get("test")).toBe("asdf");
  });
});

describe("config.get()", () => {
  it("should get a config value from the entry parent", () => {
    const entry = new CollectionEntry(obj, "one");
    expect(entry.config.get("test")).toBe("asdf");
  });

  it("should get a config value from the entry", () => {
    const entry = new CollectionEntry(obj, "one", {
      test: "new"
    });
    expect(entry.config.get("test")).toBe("new");
  });

  it("should throw an error if a setting doesn't exist", () => {
    const entry = new CollectionEntry(obj, "one");
    expect(() => entry.config.get("asdf")).toThrowError(
      "Config does not exist: asdf"
    );
  });
});

describe("init() & destroy()", () => {
  it("should completely setup an entry when mounted", async () => {
    const entry = new CollectionEntry(obj, "four");
    await entry.init({ new: "asdf" });
    expect(entry.id).toBe("four");
    expect(entry.config.get("new")).toBe("asdf");
  });
});
