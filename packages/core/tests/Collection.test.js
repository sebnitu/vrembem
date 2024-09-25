import "@testing-library/jest-dom/vitest";
import { Collection } from "../src/js/Collection";

document.body.innerHTML = `
  <div id="asdf">...</div>
  <div id="fdsa">...</div>
`;

const defaultSettings = {
  dataConfig: "config",
  teleport: null,
  teleportMethod: "append"
};

describe("constructor()", () => {
  it("should setup the collections object on instantiation", () => {
    const obj = new Collection();
    expect(obj.module).toBe("Collection");
    expect(obj.collection instanceof Array).toBe(true);
    expect(obj.collection.length).toBe(0);
    expect(obj.settings).toEqual(defaultSettings);
  });

  it("should be able to pass options through the instantiation", () => {
    const obj = new Collection({
      test: "asdf"
    });
    expect(obj.settings.test).toEqual("asdf");
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

describe("applySettings()", () => {
  it("should be able to modify the settings object", async () => {
    const obj = new Collection();
    await obj.mount();
    expect(obj.settings).toEqual(defaultSettings);
    obj.applySettings({
      selector: "div",
      test: "asdf"
    });
    expect(obj.settings.selector).toBe("div");
    expect(obj.settings.test).toBe("asdf");
  });
});

describe("createEntry()", () => {
  it("should return an instantiation of the collection entry class", async () => {
    const obj = new Collection();
    const entry = await obj.createEntry();
    console.log(entry);
    expect(entry).toBe("asdf");
  });
});

// describe("register() & deregister()", () => {
//   it("should add an item to the registered collection and return the entry", async () => {
//     const obj = new Collection();
//     let result, el;

//     el = document.getElementById("asdf");
//     result = await obj.register(el);
//     expect(obj.collection.length).toBe(1);
//     expect(obj.collection[0].id).toBe("asdf");
//     expect(obj.collection[0].el).toBe(result.el);

//     el = document.getElementById("fdsa");
//     result = await obj.register(el);
//     expect(obj.collection.length).toBe(2);
//     expect(obj.collection[1].id).toBe("fdsa");
//     expect(obj.collection[1].el).toBe(result.el);
//   });

//   it("should remove item from collection if it exists", async () => {
//     const obj = new Collection();
//     const el = document.getElementById("asdf");
//     await obj.register(el.id);
//     expect(obj.collection.length).toBe(1);
//     expect(obj.collection[0].id).toBe("asdf");

//     await obj.deregister(el.id);
//     expect(obj.collection.length).toBe(0);
//   });
// });

// describe("mount() & unmount()", () => {
//   it("...", () => {
//     expect(true).toBe(false);
//   });
// });

