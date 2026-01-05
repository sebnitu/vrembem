import { Collection } from "../../src/js/Collection";
import { focusTrap } from "../../src/js/plugins";
import { FocusTrap } from "../../src/js/modules";
import { expect } from "vitest";

document.body.innerHTML = `
  <div class="entry" id="entry-1">
    <button id="btn">Button 1</button>
    <a id="link" href="#">Link 1</a>
    <input id="input" type="text" />
    <div id="nonFocusable">Non-focusable</div>
  </div>
  <div class="entry" id="entry-2">Two</div>
`;

let collection;

describe("focusTrap", () => {
  beforeEach(() => {
    collection = new Collection({
      selector: ".entry"
    });
  });

  afterEach(async () => {
    await collection.unmount();
  });

  it("should run plugin setup method when collection mounts", async () => {
    expect(collection.plugins.length).toBe(0);
    collection.updateConfig({ plugins: [focusTrap()] });
    await collection.mount();
    expect(collection.plugins.length).toBe(1);
    expect(typeof collection.plugins.get("focusTrap")).toBe("object");
    expect(collection.events.opened.length).toBe(1);
    expect(collection.events.closed.length).toBe(1);
  });

  it("should run plugin teardown method when collection unmounts", async () => {
    expect(collection.plugins.length).toBe(0);
    collection.updateConfig({ plugins: [focusTrap()] });
    await collection.mount();
    expect(collection.plugins.length).toBe(1);
    await collection.unmount();
    expect(collection.plugins.get("focusTrap")).toBe(null);
    expect(collection.events.opened.length).toBe(0);
    expect(collection.events.closed.length).toBe(0);
  });

  it("should create focusTrap property on create entry lifecycle hook", async () => {
    collection.updateConfig({ plugins: [focusTrap()] });
    await collection.mount();
    collection.collection.forEach((entry) => {
      expect(entry.focusTrap).toBeInstanceOf(FocusTrap);
    });

    // Get the HTML elements for checks later
    const entry = collection.get("entry-1");

    // Mock the missing entry properties
    entry.dialog = entry.el;

    // Should toggle focus trap when opened event is fired
    collection.emit("opened", entry);
    expect(entry.focusTrap.focusable.length).toBe(3);
    expect(entry.focusTrap.focusable.first).toBe(entry.focusTrap.focusable[0]);
    expect(entry.focusTrap.focusable.last).toBe(
      entry.focusTrap.focusable[entry.focusTrap.focusable.length - 1]
    );

    // Fire the closed event and check the results
    collection.emit("closed", entry);
    expect(entry.focusTrap.focusable.length).toBe(0);
    expect(entry.focusTrap.focusable.first).toBe(undefined);
    expect(entry.focusTrap.focusable.last).toBe(undefined);
  });

  it("should toggle the focus trap based on the provided condition", async () => {
    collection.updateConfig({
      plugins: [
        focusTrap({
          condition: ({ entry }) => {
            return entry.mode === "modal";
          }
        })
      ]
    });
    await collection.mount();

    // Get the HTML elements for checks later
    const entry = collection.get("entry-1");

    // Mock the missing entry properties
    entry.dialog = entry.el;
    entry.mode = "modal";

    // Fire the opened event and check the results
    collection.emit("opened", entry);
    expect(entry.focusTrap.focusable.length).toBe(3);
    expect(entry.focusTrap.focusable.first).toBe(entry.focusTrap.focusable[0]);
    expect(entry.focusTrap.focusable.last).toBe(
      entry.focusTrap.focusable[entry.focusTrap.focusable.length - 1]
    );

    // Fire the closed event and check the results
    collection.emit("closed", entry);
    expect(entry.focusTrap.focusable.length).toBe(0);
    expect(entry.focusTrap.focusable.first).toBe(undefined);
    expect(entry.focusTrap.focusable.last).toBe(undefined);
  });
});
