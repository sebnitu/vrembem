import { transition } from "../index";
import "@testing-library/jest-dom/vitest";

document.body.innerHTML = "<div class=\"el\"></div>";

const el = document.querySelector("div");
const open = {
  start: "is-opening",
  finish: "is-opened"
};
const close = {
  start: "is-closing",
  finish: "is-closed"
};

el.style.setProperty("--transition-duration", "0.5s");

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(global, "setTimeout");
});

test("should go through opening transition classes when transition is called", () => {
  transition(el, close, open);
  expect(el).toHaveClass("is-opening");
  expect(el.classList.length).toBe(2);

  vi.runAllTimers();

  expect(el).toHaveClass("is-opened");
  expect(el.classList.length).toBe(2);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
});

test("should go through closing transition classes when transition is called", () => {
  transition(el, open, close);
  expect(el).toHaveClass("is-closing");
  expect(el.classList.length).toBe(2);

  vi.runAllTimers();

  expect(el).toHaveClass("is-closed");
  expect(el.classList.length).toBe(2);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
});

test("should go through opening transition using CSS custom property", () => {
  el.style.setProperty("--duration", "1000ms");
  transition(el, close, open, "--duration");
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test("should go through closing transition using a custom millisecond value", () => {
  transition(el, open, close, 250);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 250);
});
