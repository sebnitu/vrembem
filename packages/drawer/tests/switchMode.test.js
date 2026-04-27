import "@testing-library/jest-dom/vitest";
import { DrawerCollection } from "../index";
import { focusTrap, mediaQuery, propStore } from "@vrembem/core";
import { expect } from "vitest";

document.body.innerHTML = `
  <div id="drawer-1" class="drawer">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-2" class="drawer" data-breakpoint="600px">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-3" class="drawer is-opened" data-breakpoint="1200px">
    <div class="drawer__dialog">...</div>
  </div>
`;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    get matches() {
      return matches(query, window.innerWidth);
    },
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

function matches(query, value) {
  let queryValue = query.match(/\d+/)[0];
  if (query.includes("min")) return value > queryValue;
  if (query.includes("max")) return value < queryValue;
  return undefined;
}

function hasChanged(query, prev, next) {
  return matches(query, prev) !== matches(query, next);
}

function resizeWindow(value, collection) {
  const prevValue = window.innerWidth;
  window.innerWidth = value;
  for (const entry of collection) {
    if (entry.mql && hasChanged(entry.mql.media, prevValue, value)) {
      entry.mql.onchange(entry.mql, entry);
    }
  }
  window.dispatchEvent(new Event("resize"));
}

const drawers = new DrawerCollection({
  transition: false,
  plugins: [focusTrap(), mediaQuery(), propStore()]
});

beforeAll(async () => {
  await drawers.mount();
});

beforeEach(() => {
  window.innerWidth = 800;
  vi.useFakeTimers();
});

test("should switch drawer to modal when entry.mode property is set to modal", async () => {
  const entry = drawers.get("drawer-1");
  expect(entry.el).not.toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe(null);

  entry.mode = "modal";

  expect(entry.el).toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe("true");
});

test("should switch drawer to inline when entry.mode property is set to inline", async () => {
  const entry = drawers.get("drawer-1");
  expect(entry.el).toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe("true");

  entry.mode = "inline";

  expect(entry.el).not.toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe(null);
});

test("should return local store state when switching modes", async () => {
  const entry = await drawers.register(await drawers.createEntry("drawer-1"));
  const plugin = drawers.plugins.get("propStore");
  await entry.open();

  expect(entry.mode).toBe("inline");
  expect(plugin.store.get("drawer-1")).toBe("opened");
  expect(entry.state).toBe("opened");
  expect(entry.inlineState).toBe("opened");

  entry.mode = "modal";
  await vi.runAllTimers();
  expect(plugin.store.get("drawer-1")).toBe("opened");
  expect(entry.state).toBe("closed");
  expect(entry.inlineState).toBe("opened");

  await entry.open();
  expect(plugin.store.get("drawer-1")).toBe("opened");
  expect(entry.state).toBe("opened");
  expect(entry.inlineState).toBe("opened");

  entry.mode = "inline";
  await vi.runAllTimers();
  expect(plugin.store.get("drawer-1")).toBe("opened");
  expect(entry.state).toBe("opened");
  expect(entry.inlineState).toBe("opened");

  await entry.close();
  expect(plugin.store.get("drawer-1")).toBe("closed");
  expect(entry.state).toBe("closed");
  expect(entry.inlineState).toBe("closed");
});

test("should apply indeterminate state when going to inline mode", async () => {
  const entry = drawers.get("drawer-1");
  await entry.open();
  entry.state = "indeterminate";
  expect(entry.mode).toBe("inline");
  expect(entry.store).toBe("indeterminate");
  expect(entry.state).toBe("indeterminate");
  expect(entry.inlineState).toBe("indeterminate");

  entry.mode = "modal";
  await vi.runAllTimers();
  expect(entry.store).toBe("indeterminate");
  expect(entry.state).toBe("closed");
  expect(entry.inlineState).toBe("indeterminate");

  entry.mode = "inline";
  await vi.runAllTimers();
  expect(entry.store).toBe("indeterminate");
  expect(entry.state).toBe("indeterminate");
  expect(entry.inlineState).toBe("indeterminate");

  entry.mode = "modal";
  await vi.runAllTimers();
  entry.state = "closed";
  expect(entry.store).toBe("indeterminate");
  expect(entry.state).toBe("closed");
  expect(entry.inlineState).toBe("indeterminate");

  entry.mode = "inline";
  await vi.runAllTimers();
  expect(entry.store).toBe("indeterminate");
  expect(entry.state).toBe("indeterminate");
  expect(entry.inlineState).toBe("indeterminate");
});

test("should store inline state when switching to modal", async () => {
  const entry = drawers.get("drawer-3");
  expect(entry.mode).toBe("modal");
  expect(entry.state).toBe("closed");
  expect(drawers.get(entry.id).inlineState).toBe("opened");
});

test("should throw an error when setting mode to an invalid value", async () => {
  const entry = await drawers.register(await drawers.createEntry("drawer-1"));
  let result;
  try {
    entry.mode = "asdf";
  } catch (error) {
    result = error.message;
  }
  expect(result).toBe('Not a valid drawer mode: "asdf"');
});

test("should setup match media breakpoint for drawer on register", async () => {
  const entry = drawers.get("drawer-2");
  expect(entry.mql.media).toBe("(min-width: 600px)");
  expect(entry.mode).toBe("inline");
  resizeWindow(400, drawers.collection);
  expect(entry.mode).toBe("modal");
});

test("should run teardown methods of all plugins when unmounted", async () => {
  await drawers.unmount();
  expect(drawers.plugins.length).toBe(0);
});
