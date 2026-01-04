import { Collection, CollectionEntry } from "../index";

document.body.innerHTML = `
  <div id="one">...</div>
  <div id="two" data-config="{ 'one': 111, 'two': 222 }">...</div>
  <div id="three" style="--collection-test: fdsa;">...</div>
  <div id="four" data-config="{ 'data': 111 }" style="--collection-test: fdsa;">...</div>
`;

const obj = new Collection({
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

describe("config.set()", () => {
  it("should be able to modify the config object", async () => {
    const entry = new CollectionEntry(obj, "one");
    entry.config.set({
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
    const entry = new CollectionEntry(obj, "one");
    entry.config.set({ test: "new" });
    expect(entry.config.get("test")).toBe("new");
  });

  it("should throw an error if a setting doesn't exist", () => {
    const entry = new CollectionEntry(obj, "one");
    expect(() => entry.config.get("asdf")).toThrowError(
      "Config does not exist: asdf"
    );
  });
});
