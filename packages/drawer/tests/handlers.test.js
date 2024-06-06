import "@testing-library/jest-dom/vitest";
import Drawer from "../index";

const keyEsc = new KeyboardEvent("keydown", {
  key: "Escape"
});

const keySpace = new KeyboardEvent("keydown", {
  key: "Space"
});

document.body.innerHTML = `
  <div class="drawer-frame">
    <div id="drawer" class="drawer">
      <div class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div class="drawer-main">
      <button data-drawer-open="drawer">...</button>
      <button data-drawer-close="drawer">...</button>
      <button class="empty" data-drawer-close>...</button>
      <button data-drawer-toggle="drawer">...</button>
    </div>
  </div>
`;

let entry;
const drawer = new Drawer();

const drawerEl = document.querySelector("#drawer");
const btnToggle = document.querySelector("[data-drawer-toggle]");
const btnOpen = document.querySelector("[data-drawer-open]");
const btnClose = document.querySelector("[data-drawer-close=\"drawer\"]");
const btnCloseInner = document.querySelector(".drawer [data-drawer-close]");
const btnCloseEmpty = document.querySelector(".empty");

document.body.style.setProperty("--vrembem-prefix", "vb-");
drawerEl.style.setProperty("--vb-drawer-transition-duration", "0.3s");

beforeAll(async () => {
  await drawer.init();
  entry = drawer.get("drawer");
});

beforeEach(() => {
  vi.useFakeTimers();
});

test("should open drawer when clicking data-drawer-open button", async () => {
  expect(entry.state).toBe("indeterminate");

  btnOpen.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");
});

test("should close drawer when clicking data-drawer-close button", async () => {
  expect(entry.state).toBe("opened");

  btnClose.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("closed");
});

test("should open and close drawer when clicking data-drawer-toggle button", async () => {
  expect(entry.state).toBe("closed");

  btnToggle.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");

  btnToggle.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("closed");
});

test("should close drawer when clicking inner data-drawer-close button", async () => {
  expect(entry.state).toBe("closed");

  btnOpen.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");

  btnCloseInner.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("closed");
});

test("should do nothing if valuless data-drawer-close button is not in a drawer", async () => {
  expect(entry.state).toBe("closed");

  btnOpen.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");

  btnCloseEmpty.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");
});

test("should do nothing on inline drawer when pressing the escape key", async () => {
  expect(entry.state).toBe("opened");

  document.dispatchEvent(keyEsc);
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");
});

test("should close modal drawer when pressing the escape key", async () => {
  expect(entry.state).toBe("opened");

  entry.mode = "modal";
  await vi.runAllTimers();

  expect(entry.mode).toBe("modal");
  expect(entry.el).toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe("true");

  expect(entry.state).toBe("closed");

  entry.open();
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");

  document.dispatchEvent(keySpace);
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");

  document.dispatchEvent(keyEsc);
  await vi.runAllTimers();

  expect(entry.state).toBe("closed");
});

test("should close modal drawer when background screen is clicked", async () => {
  expect(entry.state).toBe("closed");

  entry.open();
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");

  document.querySelector(".drawer-frame").click();
  await vi.runAllTimers();

  document.querySelector(".drawer-main").click();
  await vi.runAllTimers();

  expect(entry.state).toBe("opened");

  entry.el.click();
  await vi.runAllTimers();

  expect(entry.state).toBe("closed");
});
