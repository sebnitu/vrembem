import "@testing-library/jest-dom/vitest";
import Drawer from "../index";
import { mediaQuery } from "@vrembem/core";

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
  value: vi.fn().mockImplementation(query => ({
    get matches() {
      return matches(query, window.innerWidth);
    },
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

function matches(query, value) {
  let queryValue = query.match(/\d+/)[0];
  if (query.includes("min")) return value > queryValue;
  if (query.includes("max")) return value < queryValue;
  return undefined;
}

function hasChanged(query, prev, next) {
  return (matches(query, prev) !== matches(query, next));
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

const drawer = new Drawer({ 
  transition: false,
  plugins: [
    mediaQuery({
      onChange: (event, entry) => {
        entry.mode = (event.matches) ? "inline" : "modal";
      }
    })
  ]
});

beforeEach(() => {
  window.innerWidth = 800;
  vi.useFakeTimers();
});

test("should switch drawer to modal when entry.mode property is set to modal", async () => {
  const entry = await drawer.register("drawer-1");
  expect(entry.el).not.toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe(null);

  entry.mode = "modal";

  expect(entry.el).toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe("true");
});

test("should switch drawer to inline when entry.mode property is set to inline", async () => {
  const entry = await drawer.register("drawer-1");
  expect(entry.el).toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe("true");

  entry.mode = "inline";

  expect(entry.el).not.toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe(null);
});

test("should return local store state when switching modes", async () => {
  const entry = await drawer.register("drawer-1");
  await entry.open();

  expect(drawer.store.get("drawer-1")).toBe("opened");
  expect(entry.mode).toBe("inline");
  expect(entry.state).toBe("opened");

  entry.mode = "modal";
  await vi.runAllTimers();

  expect(drawer.store.get("drawer-1")).toBe("opened");
  expect(entry.mode).toBe("modal");
  expect(entry.state).toBe("closed");

  await entry.open();

  expect(drawer.store.get("drawer-1")).toBe("opened");
  expect(entry.mode).toBe("modal");
  expect(entry.state).toBe("opened");

  entry.mode = "inline";
  await vi.runAllTimers();

  expect(drawer.store.get("drawer-1")).toBe("opened");
  expect(entry.mode).toBe("inline");
  expect(entry.state).toBe("opened");

  await entry.close();

  expect(drawer.store.get("drawer-1")).toBe("closed");
  expect(entry.mode).toBe("inline");
  expect(entry.state).toBe("closed");
});

test("should apply indeterminate state when going to inline mode", async () => {
  await drawer.deregister("drawer-1");
  drawer.store.set("drawer-1", "indeterminate");
  const entry = await drawer.register("drawer-1");

  expect(entry.mode).toBe("inline");
  expect(entry.state).toBe("indeterminate");

  drawer.store.set("drawer-1");

  entry.mode = "modal";
  await vi.runAllTimers();

  expect(entry.mode).toBe("modal");
  expect(entry.state).toBe("closed");
  expect(entry.inlineState).toBe("indeterminate");

  entry.mode = "inline";
  await vi.runAllTimers();

  expect(entry.mode).toBe("inline");
  expect(entry.state).toBe("indeterminate");

  entry.mode = "modal";
  await vi.runAllTimers();

  // Restore inline state using store value.
  drawer.store.set("drawer-1", "indeterminate");
  entry.inlineState = "opened";
  entry.mode = "inline";
  await vi.runAllTimers();

  expect(entry.mode).toBe("inline");
  expect(entry.state).toBe("indeterminate");
});

test("should store inline state when switching to modal", async () => {
  const entry = await drawer.register("drawer-3");
  expect(entry.mode).toBe("modal");
  expect(entry.state).toBe("closed");
  expect(drawer.get(entry.id).inlineState).toBe("opened");
});

test("should throw an error when setting mode to an invalid value", async () => {
  const entry = await drawer.register("drawer-1");
  let result;
  try {
    entry.mode = "asdf";
  } catch (error) {
    result = error.message;
  }
  expect(result).toBe("\"asdf\" is not a valid drawer mode.");
});

test("should setup match media breakpoint for drawer on register", async () => {
  const entry = await drawer.register("drawer-2");
  expect(entry.mql.media).toBe("(min-width: 600px)");
  expect(entry.mode).toBe("inline");
  resizeWindow(400, drawer.collection);
  expect(entry.mode).toBe("modal");
});
