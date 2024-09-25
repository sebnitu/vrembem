import "@testing-library/jest-dom/vitest";
import { Collection } from "../src/js/Collection";

console.error = vi.fn();

document.body.innerHTML = `
  <div id="asdf">1234</div>
  <div id="fdsa">5678</div>
  <div id="afsd">8765</div>
  <div id="dsfa">4321</div>
`;

describe("constructor()", () => {
  it("should setup an empty collection array on instantiation", () => {
    const obj = new Collection();
    expect(typeof obj.collection).toBe("object");
    expect(obj.collection.length).toBe(0);
    expect(obj.module).toBe("Collection");
  });
});

describe("register()", () => {
  it("should add an item to the registered collection and return the entry", async () => {
    const obj = new Collection();
    let result, el;

    el = document.getElementById("asdf");
    result = await obj.register(el);
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0].id).toBe("asdf");
    expect(obj.collection[0].el).toBe(result.el);

    el = document.getElementById("fdsa");
    result = await obj.register(el);
    expect(obj.collection.length).toBe(2);
    expect(obj.collection[1].id).toBe("fdsa");
    expect(obj.collection[1].el).toBe(result.el);
  });
});

describe("deregister()", () => {
  it("should remove item from collection if it exists", async () => {
    const obj = new Collection();
    const el = document.getElementById("asdf");
    await obj.register(el.id);
    expect(obj.collection.length).toBe(1);
    expect(obj.collection[0].id).toBe("asdf");

    await obj.deregister(el.id);
    expect(obj.collection.length).toBe(0);
  });
});

