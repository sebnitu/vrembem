import { Collection } from "../../src/js/Collection";
import { debug } from "../../src/js/plugins";

document.body.innerHTML = `
  <div class="entry" id="entry-1">One</div>
  <div class="entry" id="entry-2">Two</div>
  <div class="entry" id="entry-3">Three</div>
`;

const debugPlugin = debug({ asdf: "fdsa" });
const collection = new Collection({
  selector: ".entry"
});

console.log = vi.fn();

test("should return a plugin object with custom settings", () => {
  expect(debugPlugin.name).toBe("debug");
  expect(debugPlugin.settings.asdf).toBe("fdsa");
});

test("should log all the mount lifecycle hooks when collection is mounted", async () => {
  expect(collection.plugins.length).toBe(0);
  await collection.mount({
    plugins: [
      debug({ asdf: "fdsa" })
    ]
  });
  expect(collection.plugins.length).toBe(1);
  expect(console.log).toHaveBeenCalledTimes(17);
});

test("should log all the unmount lifecycle hooks when collection is unmounted", async () => {
  expect(collection.plugins.length).toBe(1);
  await collection.unmount();
  expect(collection.plugins.length).toBe(1);
  expect(console.log).toHaveBeenCalledTimes(34);
});

test("should be able to pass a condition function for console logging", async () => {
  await collection.plugins.remove("debug");
  expect(collection.plugins.length).toBe(0);
  const conditionSpy = vi.fn();
  await collection.mount({
    plugins: [
      debug({ 
        condition: conditionSpy 
      })
    ]
  });
  expect(conditionSpy).toHaveBeenCalledTimes(12);
  await collection.unmount();
  expect(conditionSpy).toHaveBeenCalledTimes(24);
});
