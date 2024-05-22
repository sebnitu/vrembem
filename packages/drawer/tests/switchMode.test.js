import "@testing-library/jest-dom/vitest";
import "./mocks/matchMedia.mock";
import { resizeWindow } from "./helpers/resizeWindow";

import Drawer from "../index";

document.body.innerHTML = `
  <div id="drawer-1" class="drawer">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-2" class="drawer" data-drawer-breakpoint="600px">
    <div class="drawer__dialog">...</div>
  </div>
  <div id="drawer-3" class="drawer is-opened" data-drawer-breakpoint="1200px">
    <div class="drawer__dialog">...</div>
  </div>
`;

window.innerWidth = 800;

const drawer = new Drawer({ transition: false });

beforeEach(() => {
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
  expect(entry.breakpoint).toBe("600px");
  expect(entry.mode).toBe("inline");

  resizeWindow(400);
  const mql = window.matchMedia(`(min-width: ${entry.breakpoint})`);
  entry.handleBreakpoint(mql);

  expect(entry.mode).toBe("modal");
});
