import { Collection } from "../../src/js/Collection";
import { debug } from "../../src/js/plugins";

console.log = vi.fn();

document.body.innerHTML = `
  <div class="entry" id="entry-1">One</div>
  <div class="entry" id="entry-2">Two</div>
  <div class="entry" id="entry-3">Three</div>
`;

const debugPlugin = debug({ asdf: "fdsa" });
const collection = new Collection({
  selector: ".entry"
});

describe("debug", () => {
  it("should return a plugin object with custom options", () => {
    expect(debugPlugin.name).toBe("debug");
    expect(debugPlugin.options.asdf).toBe("fdsa");
  });

  it("should log all the mount lifecycle hooks when collection is mounted", async () => {
    expect(collection.plugins.length).toBe(0);
    collection.updateConfig({
      plugins: [debug({ asdf: "fdsa" })]
    });
    await collection.mount();
    expect(collection.plugins.length).toBe(1);
    expect(console.log).toHaveBeenCalledTimes(17);
  });

  it("should log all the unmount lifecycle hooks when collection is unmounted", async () => {
    expect(collection.plugins.length).toBe(1);
    await collection.unmount();
    expect(collection.plugins.length).toBe(0);
    expect(console.log).toHaveBeenCalledTimes(34);
  });

  it("should be able to pass a condition function for console logging", async () => {
    collection.plugins.remove("debug");
    expect(collection.plugins.length).toBe(0);
    const conditionSpy = vi.fn();
    collection.updateConfig({
      plugins: [
        debug({
          condition: conditionSpy
        })
      ]
    });
    await collection.mount();
    expect(conditionSpy).toHaveBeenCalledTimes(12);
    await collection.unmount();
    expect(conditionSpy).toHaveBeenCalledTimes(24);
  });
});
