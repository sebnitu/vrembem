import "@testing-library/jest-dom";
import { transition } from "./helpers/transition";
import Drawer from "../index";

const keyEsc = new KeyboardEvent("keydown", {
  key: "Escape"
});

const keySpace = new KeyboardEvent("keydown", {
  key: "Space"
});

document.body.innerHTML = `
  <div class="drawer__wrapper">
    <div id="drawer" class="drawer">
      <div class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-open="drawer">...</button>
      <button data-drawer-close="drawer">...</button>
      <button class="empty" data-drawer-close>...</button>
      <button data-drawer-toggle="drawer">...</button>
    </div>
  </div>
`;

let entry;
const drawer = new Drawer();

const btnToggle = document.querySelector("[data-drawer-toggle]");
const btnOpen = document.querySelector("[data-drawer-open]");
const btnClose = document.querySelector("[data-drawer-close=\"drawer\"]");
const btnCloseInner = document.querySelector(".drawer [data-drawer-close]");
const btnCloseEmpty = document.querySelector(".empty");

beforeAll(async () => {
  await drawer.init();
  entry = drawer.get("drawer");
});

test("should open drawer when clicking data-drawer-open button", async () => {
  expect(entry.state).toBe("closed");

  btnOpen.click();
  await transition(entry.el);

  expect(entry.state).toBe("opened");
});

test("should close drawer when clicking data-drawer-close button", async () => {
  expect(entry.state).toBe("opened");

  btnClose.click();
  await transition(entry.el);

  expect(entry.state).toBe("closed");
});

test("should open and close drawer when clicking data-drawer-toggle button", async () => {
  expect(entry.state).toBe("closed");

  btnToggle.click();
  await transition(entry.el);

  expect(entry.state).toBe("opened");

  btnToggle.click();
  await transition(entry.el);

  expect(entry.state).toBe("closed");
});

test("should close drawer when clicking inner data-drawer-close button", async () => {
  expect(entry.state).toBe("closed");

  btnOpen.click();
  await transition(entry.el);

  expect(entry.state).toBe("opened");

  btnCloseInner.click();
  await transition(entry.el);

  expect(entry.state).toBe("closed");
});

test("should do nothing if valuless data-drawer-close button is not in a drawer", async () => {
  expect(entry.state).toBe("closed");

  btnOpen.click();
  await transition(entry.el);

  expect(entry.state).toBe("opened");

  btnCloseEmpty.click();
  await transition(entry.el);

  expect(entry.state).toBe("opened");
});

test("should do nothing on inline drawer when pressing the escape key", async () => {
  expect(entry.state).toBe("opened");

  document.dispatchEvent(keyEsc);
  await transition(entry.el);

  expect(entry.state).toBe("opened");
});

test("should close modal drawer when pressing the escape key", async () => {
  expect(entry.state).toBe("opened");

  entry.mode = "modal";
  await transition(entry.el);

  expect(entry.mode).toBe("modal");
  expect(entry.el).toHaveClass("drawer_modal");
  expect(entry.dialog.getAttribute("aria-modal")).toBe("true");

  expect(entry.state).toBe("closed");


  entry.open();
  await transition(entry.el);

  expect(entry.state).toBe("opened");

  document.dispatchEvent(keySpace);
  await transition(entry.el);

  expect(entry.state).toBe("opened");

  document.dispatchEvent(keyEsc);
  await transition(entry.el);

  expect(entry.state).toBe("closed");
});

test("should close modal drawer when background screen is clicked", async () => {
  expect(entry.state).toBe("closed");

  entry.open();
  await transition(entry.el);

  expect(entry.state).toBe("opened");

  document.querySelector(".drawer__wrapper").click();
  await transition(entry.el);

  document.querySelector(".drawer__main").click();
  await transition(entry.el);

  expect(entry.state).toBe("opened");

  entry.el.click();
  await transition(entry.el);

  expect(entry.state).toBe("closed");
});
