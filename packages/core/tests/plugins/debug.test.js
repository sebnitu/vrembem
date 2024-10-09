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
const colors = ["color: hsl(152deg 60% 40%)", "color: hsl(152deg 60% 50%)"];

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
  expect(console.log).toBeCalledWith("%cDEBUG: %cmountPlugins()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %cbeforeMount()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %conMount()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %cbeforeRegister()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %cafterRegister()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %cafterMount()", ...colors);
});

test("should log all the unmount lifecycle hooks when collection is unmounted", async () => {
  expect(collection.plugins.length).toBe(1);
  await collection.unmount();
  expect(collection.plugins.length).toBe(1);
  expect(console.log).toHaveBeenCalledTimes(24);
  expect(console.log).toBeCalledWith("%cDEBUG: %cbeforeUnmount()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %conUnmount()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %cbeforeDeregister()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %cafterDeregister()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %cafterUnmount()", ...colors);
  expect(console.log).toBeCalledWith("%cDEBUG: %cunmountPlugins()", ...colors);
});
