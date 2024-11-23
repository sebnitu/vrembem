import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { FocusTrap } from "../../src/js/modules";

const user = userEvent.setup();

const markup = `
  <button class="outter-1">...</button>

  <div class="container-1" tabindex="-1">
    <button class="child-1">...</button>
    <button class="child-2">...</button>
    <button class="child-3">...</button>
  </div>

  <button class="outter-2">...</button>

  <div class="container-2" tabindex="-1">
    <button class="child-1" data-focus>...</button>
    <button class="child-2">...</button>
    <button class="child-3">...</button>
  </div>

  <button class="outter-3">...</button>

  <div class="container-3" tabindex="-1">
    ...
  </div>

  <button class="outter-4">...</button>
`;

document.body.innerHTML = markup;

let focusTrap = new FocusTrap();
let el = document.querySelector(".container-1");
let child_1 = el.querySelector(".child-1");
let child_2 = el.querySelector(".child-2");
let child_3 = el.querySelector(".child-3");

test("mount() should mount the focus trap setup", () => {
  focusTrap.mount(el);

  expect(el).toHaveFocus();
  expect(focusTrap.focusable.length).toBe(3);
  expect(focusTrap.focusableFirst).toBe(child_1);
  expect(focusTrap.focusableLast).toBe(child_3);
});

test("should correctly cycle through focusable elements on tab", async () => {
  focusTrap.mount(el);

  expect(el).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(child_1).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(child_2).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(child_3).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(child_1).toHaveFocus();
});

test("should correctly cycle through focusable elements on shift-tab", async () => {
  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(child_3).toHaveFocus();

  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(child_2).toHaveFocus();

  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(child_1).toHaveFocus();

  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(child_3).toHaveFocus();
});

test("unmount() should unmount the focus trap setup", () => {
  focusTrap.unmount();

  expect(focusTrap.focusable.length).toBe(0);
  expect(focusTrap.focusableFirst).toBe(undefined);
  expect(focusTrap.focusableLast).toBe(undefined);
});

test("focus() should set focus to preferred focus element", () => {
  el = document.querySelector(".container-2");
  child_1 = el.querySelector(".child-1");
  child_2 = el.querySelector(".child-2");
  child_3 = el.querySelector(".child-3");

  focusTrap.focus(el);
  expect(child_1).toHaveFocus();

  focusTrap.focus(el, ".child-2");
  expect(child_2).toHaveFocus();

  focusTrap.mount(el, ".child-3");
  expect(child_3).toHaveFocus();
});

test("getFocusable() should return focusable elements array", () => {
  el = document.querySelector(".container-2");
  child_1 = el.querySelector(".child-1");
  child_2 = el.querySelector(".child-2");
  child_3 = el.querySelector(".child-3");

  const result = focusTrap.getFocusable(el);
  expect(result.length).toBe(3);
  expect(result[0]).toBe(child_1);
  expect(result[1]).toBe(child_2);
  expect(result[2]).toBe(child_3);
});

test("should correctly setup focus lock when there are no focusable elements", async () => {
  el = document.querySelector(".container-3");
  focusTrap = new FocusTrap(el);
  focusTrap.mount();

  expect(el).toHaveFocus();
  expect(focusTrap.focusable.length).toBe(0);
  expect(focusTrap.focusableFirst).toBe(undefined);
  expect(focusTrap.focusableLast).toBe(undefined);

  await user.keyboard("{Tab}");
  expect(el).toHaveFocus();

  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(el).toHaveFocus();
});
