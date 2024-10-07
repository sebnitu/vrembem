import { expect } from "vitest";
import { Collection } from "../../src/js/Collection";
import { debug } from "../../src/js/plugins/debug";

const debugPlugin = debug({ asdf: "fdsa" });
const collection = new Collection({
  selector: ".entry"
});

document.body.innerHTML = `
  <div class="entry" id="entry-1">One</div>
  <div class="entry" id="entry-2">Two</div>
  <div class="entry" id="entry-3">Three</div>
`;

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
  expect(console.log).toHaveBeenCalledTimes(12);
  expect(console.log).toBeCalledWith("DEBUG: mountPlugins()");
  expect(console.log).toBeCalledWith("DEBUG: beforeMount()");
  expect(console.log).toBeCalledWith("DEBUG: onMount()");
  expect(console.log).toBeCalledWith("DEBUG: beforeRegister()");
  expect(console.log).toBeCalledWith("DEBUG: afterRegister()");
  expect(console.log).toBeCalledWith("DEBUG: afterMount()");
});

test("should log all the unmount lifecycle hooks when collection is unmounted", async () => {
  expect(collection.plugins.length).toBe(1);
  await collection.unmount();
  expect(collection.plugins.length).toBe(1);
  expect(console.log).toHaveBeenCalledTimes(24);
  expect(console.log).toBeCalledWith("DEBUG: beforeUnmount()");
  expect(console.log).toBeCalledWith("DEBUG: onUnmount()");
  expect(console.log).toBeCalledWith("DEBUG: beforeDeregister()");
  expect(console.log).toBeCalledWith("DEBUG: afterDeregister()");
  expect(console.log).toBeCalledWith("DEBUG: afterUnmount()");
  expect(console.log).toBeCalledWith("DEBUG: unmountPlugins()");
});
