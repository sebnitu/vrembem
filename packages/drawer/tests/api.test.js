import "@testing-library/jest-dom/vitest";

import Drawer from "../index.js";

const markup = `
  <div class="drawer-frame">
    <div id="drawer-1" class="drawer is-closed">
      <div class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div id="drawer-2" class="drawer">
      <div class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div class="drawer-main">
      <button data-drawer-toggle="drawer-1">...</button>
      <button data-drawer-toggle="drawer-2">...</button>
    </div>
  </div>
`;

const markupInitState = `
  <div id="drawer-1" class="drawer">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-2" class="drawer is-opened">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-3" class="drawer drawer_modal is-opened">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-4" class="drawer">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-5" class="drawer"></div>
`;

const markupConfig = `
  <div id="drawer-1" class="drawer" data-drawer-config="{ 'transition': false }">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-2" class="drawer" data-drawer-config="{ 'selectorOverflow': 'main' }">
    <div class="drawer__dialog">...</div>
  </div>
`;

document.body.innerHTML = markup;

const drawer = new Drawer({ transitionDuration: 300 });

describe("mount() & unmount()", () => {
  it("should correctly register all drawers on mount()", async () => {
    await drawer.mount();
    expect(drawer.collection.length).toBe(2);
  });

  it("should correctly deregister all drawers on unmount()", async () => {
    await drawer.unmount();
    expect(drawer.collection.length).toBe(0);
  });

  it("should mount with custom settings passed on mount", async () => {
    await drawer.mount({ eventListeners: false });
    expect(drawer.collection.length).toBe(2);
    expect(drawer.defaults.eventListeners).toBe(true);
    expect(drawer.settings.eventListeners).toBe(false);
    await drawer.unmount();
    expect(drawer.collection.length).toBe(0);
  });
});

describe("registerCollection() & deregisterCollection()", () => {
  it("should manually register collection using registerCollection()", async () => {
    const els = document.querySelectorAll(".drawer");
    await drawer.registerCollection(els);
    expect(drawer.collection.length).toBe(2);
  });

  it("should manually deregister collection using deregisterCollection()", async () => {
    await drawer.deregisterCollection();
    expect(drawer.collection.length).toBe(0);
  });
});

describe("open(), close() & toggle()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should open and close using open() and close() methods", async () => {
    await drawer.mount();
    const entry = drawer.get("drawer-1");
    expect(entry.state).toBe("closed");
    expect(entry.mode).toBe("inline");

    drawer.open("drawer-1");
    expect(entry.el).toHaveClass("is-opening");
    expect(entry.state).toBe("opening");

    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-opened");
    expect(entry.state).toBe("opened");
    expect(entry.dialog).toBe(document.activeElement);

    drawer.close("drawer-1");
    expect(entry.el).toHaveClass("is-closing");
    expect(entry.state).toBe("closing");

    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-closed");
    expect(entry.state).toBe("closed");
    expect(entry.dialog).not.toBe(document.activeElement);
  });

  it("should open and close using toggle() method", async () => {
    const entry = drawer.get("drawer-2");
    expect(entry.state).toBe("indeterminate");
    expect(entry.mode).toBe("inline");

    drawer.toggle("drawer-2");
    expect(entry.el).toHaveClass("is-closing");
    expect(entry.state).toBe("closing");

    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-closed");
    expect(entry.state).toBe("closed");

    drawer.toggle("drawer-2");
    expect(entry.el).toHaveClass("is-opening");
    expect(entry.state).toBe("opening");

    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-opened");
    expect(entry.state).toBe("opened");
    expect(entry.dialog).toBe(document.activeElement);
  });

  it("should throw if trying to open unregistered drawer", async () => {
    const result = await drawer.open("asdf").catch((error) => { return error.message; });
    expect(result).toBe("Drawer not found in collection with id of \"asdf\".");
  });
});

describe("activeModal", () => {
  it("should return entry if drawer modal is active", async () => {
    vi.useFakeTimers();
    const entry = await drawer.register("drawer-1");

    expect(entry.state).toBe("closed");
    expect(entry.mode).toBe("inline");
    expect(drawer.activeModal).toBe(undefined);

    entry.mode = "modal";
    entry.open();

    await vi.runAllTimers();

    expect(entry.state).toBe("opened");
    expect(entry.mode).toBe("modal");
    expect(drawer.activeModal).toBe(entry);
  });
});

describe("register() & deregister()", () => {
  beforeAll(async () => {
    document.body.innerHTML = markupInitState;
    await drawer.unmount();
  });

  it("should disable setting tabindex on drawer dialog", async () => {
    drawer.settings.setTabindex = false;
    let entry = await drawer.register("drawer-1");
    expect(entry.dialog.getAttribute("tabindex")).toBe(null);

    drawer.settings.setTabindex = true;
    entry = await drawer.register("drawer-1");
    expect(entry.dialog.getAttribute("tabindex")).toBe("-1");
  });

  it("should register drawer in its default state", async () => {
    const entry = await drawer.register("drawer-1");
    expect(entry.mode).toBe("inline");
    expect(entry.state).toBe("indeterminate");
  });

  it("should register drawer in its open state", async () => {
    const entry = await drawer.register("drawer-2");
    expect(entry.mode).toBe("inline");
    expect(entry.state).toBe("opened");
  });

  it("should register drawer in its modal state", async () => {
    const entry = await drawer.register("drawer-3");
    expect(entry.mode).toBe("modal");
    expect(entry.state).toBe("closed");
  });

  it("should return drawer to state saved in local store", async () => {
    drawer.store.set("drawer-4", "opened");
    const entry = await drawer.register("drawer-4");
    expect(entry.mode).toBe("inline");
    expect(entry.state).toBe("opened");
  });

  it("should deregister drawer using entry api", async () => {
    expect(drawer.collection.length).toBe(4);

    const entry = await drawer.register("drawer-4");
    await entry.deregister();

    expect(entry.mode).toBe(undefined);
    expect(entry.state).toBe(undefined);
    expect(drawer.collection.length).toBe(3);
  });

  it("should prioritize local store state over initial state class", async () => {
    const el = document.querySelector("#drawer-4");
    el.classList.add(drawer.settings.stateOpened);

    drawer.store.set("drawer-4", "closed");
    const entry = await drawer.register("drawer-4");

    expect(entry.mode).toBe("inline");
    expect(entry.state).toBe("closed");
  });

  it("should reject promise with error if register is called on non-existent drawer", async () => {
    const result = await drawer.register("asdf").catch((error) => { return error.message; });
    expect(result).toBe("Failed to register; drawer not found with ID of: \"asdf\".");
  });

  it("should reject promise with error if deregister is called on non-existent entry", async () => {
    expect(drawer.collection.length).toBe(4);
    const result = await drawer.deregister("asdf").catch((error) => { return error.message; });
    expect(result).toBe("Failed to deregister; drawer does not exist in collection with ID of: \"asdf\".");
    expect(drawer.collection.length).toBe(4);
  });

  it("should use the root drawer element as dialog if selector returned null", async () => {
    const entry = drawer.register("drawer-5");
    expect(entry.el).toBe(entry.dialog);
  });
});

describe("data-drawer-config", () => {
  beforeAll(async () => {
    document.body.innerHTML = markupInitState;
    await drawer.unmount();
  });

  it("should override global drawer configs using drawer specific data configuration", async () => {
    document.body.innerHTML = markupConfig;
    const entry1 = await drawer.register("drawer-1");
    const entry2 = await drawer.register("drawer-2");

    expect(entry1.getSetting("transition")).toBe(false);
    expect(entry1.getSetting("selectorOverflow")).toBe("body");
    expect(entry2.getSetting("transition")).toBe(true);
    expect(entry2.getSetting("selectorOverflow")).toBe("main");
  });
});

describe("getSetting()", () => {
  it("should return a setting value from wherever it was set", async () => {
    document.body.innerHTML = markup;
    const drawer = new Drawer();
    await drawer.mount();
    const entry = drawer.get("drawer-1");
    expect(entry.id).toBe("drawer-1");
    expect(entry.getSetting("dataConfig")).toBe("drawer-config");
    entry.settings["dataConfig"] = "asdf";
    expect(entry.getSetting("dataConfig")).toBe("asdf");
  });

  it("should throw an error if searching for a setting that doesn't exist", async () => {
    document.body.innerHTML = markup;
    const drawer = new Drawer();
    await drawer.mount();
    const entry = drawer.get("drawer-1");
    expect(() => entry.getSetting("asdf")).toThrow("Drawer setting does not exist: asdf");
  });
});
