import "@testing-library/jest-dom/vitest";
import { DrawerCollection } from "../index";

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

document.body.innerHTML = markup;

const drawers = new DrawerCollection({ transitionDuration: 300 });

describe("mount() & unmount()", () => {
  it("should correctly register all drawers on mount()", async () => {
    await drawers.mount();
    expect(drawers.collection.length).toBe(2);
  });

  it("should correctly deregister all drawers on unmount()", async () => {
    await drawers.unmount();
    expect(drawers.collection.length).toBe(0);
  });

  it("should mount with custom config passed on mount", async () => {
    drawers.updateConfig({ eventListeners: false });
    await drawers.mount();
    expect(drawers.collection.length).toBe(2);
    expect(drawers.config.eventListeners).toBe(false);
    await drawers.unmount();
    expect(drawers.collection.length).toBe(0);
  });
});

describe("open(), close() & toggle()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should open and close using open() and close() methods", async () => {
    await drawers.mount();
    const entry = drawers.get("drawer-1");
    expect(entry.state).toBe("closed");
    expect(entry.mode).toBe("inline");

    drawers.open("drawer-1");
    expect(entry.el).toHaveClass("is-opening");
    expect(entry.state).toBe("opening");

    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-opened");
    expect(entry.state).toBe("opened");
    expect(entry.dialog).toBe(document.activeElement);

    drawers.close("drawer-1");
    expect(entry.el).toHaveClass("is-closing");
    expect(entry.state).toBe("closing");

    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-closed");
    expect(entry.state).toBe("closed");
    expect(entry.dialog).not.toBe(document.activeElement);
  });

  it("should open and close using toggle() method", async () => {
    const entry = drawers.get("drawer-2");
    expect(entry.state).toBe("indeterminate");
    expect(entry.mode).toBe("inline");

    drawers.toggle("drawer-2");
    expect(entry.el).toHaveClass("is-closing");
    expect(entry.state).toBe("closing");

    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-closed");
    expect(entry.state).toBe("closed");

    drawers.toggle("drawer-2");
    expect(entry.el).toHaveClass("is-opening");
    expect(entry.state).toBe("opening");

    await vi.runAllTimers();
    expect(entry.el).toHaveClass("is-opened");
    expect(entry.state).toBe("opened");
    expect(entry.dialog).toBe(document.activeElement);
  });

  it("should throw if trying to open unregistered drawer", async () => {
    const result = await drawers.open("asdf").catch((error) => {
      return error.message;
    });
    expect(result).toBe(
      'Drawer entry not found in collection with id of "asdf"'
    );
  });
});

describe("activeModal", () => {
  it("should return entry if drawer modal is active", async () => {
    vi.useFakeTimers();
    const entry = await drawers.register(await drawers.createEntry("drawer-1"));

    expect(entry.state).toBe("closed");
    expect(entry.mode).toBe("inline");
    expect(drawers.activeModal).toBe(undefined);

    entry.mode = "modal";
    entry.open();

    await vi.runAllTimers();

    expect(entry.state).toBe("opened");
    expect(entry.mode).toBe("modal");
    expect(drawers.activeModal).toBe(entry);
  });
});

describe("register() & deregister()", () => {
  beforeAll(async () => {
    document.body.innerHTML = markupInitState;
    await drawers.unmount();
  });

  it("should disable setting tabindex on drawer dialog", async () => {
    // Disable tabindex before register
    drawers.config.setTabindex = false;
    let entry = await drawers.register(await drawers.createEntry("drawer-1"));
    expect(entry.dialog.getAttribute("tabindex")).toBe(null);

    // Deregister the entry before updating the setting and re-registering
    await drawers.deregister(entry);

    // Enable tabindex before register
    drawers.config.setTabindex = true;
    entry = await drawers.register(await drawers.createEntry("drawer-1"));
    expect(entry.dialog.getAttribute("tabindex")).toBe("-1");
  });

  it("should register drawer in its default state", async () => {
    const entry = await drawers.register(await drawers.createEntry("drawer-1"));
    expect(entry.mode).toBe("inline");
    expect(entry.state).toBe("indeterminate");
  });

  it("should register drawer in its open state", async () => {
    const entry = await drawers.register(await drawers.createEntry("drawer-2"));
    expect(entry.mode).toBe("inline");
    expect(entry.state).toBe("opened");
  });

  it("should register drawer in its modal state", async () => {
    const entry = await drawers.register(await drawers.createEntry("drawer-3"));
    expect(entry.mode).toBe("modal");
    expect(entry.state).toBe("closed");
  });

  it("should deregister drawer using entry api", async () => {
    expect(drawers.collection.length).toBe(3);
    const entry = await drawers.register(await drawers.createEntry("drawer-3"));
    await entry.deregister();
    expect(drawers.collection.length).toBe(2);
  });

  it("should use the root drawer element as dialog if selector returned null", async () => {
    const entry = drawers.register(await drawers.createEntry("drawer-5"));
    expect(entry.el).toBe(entry.dialog);
  });
});
