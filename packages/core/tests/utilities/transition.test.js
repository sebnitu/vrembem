import "@testing-library/jest-dom/vitest";
import { transition } from "../../index";

document.body.innerHTML = "<div class='asdf'></div>";
const el = document.querySelector("div");

vi.useFakeTimers();
vi.spyOn(global, "setTimeout");

test("should go through opening transition classes when transition is called", () => {
  transition(el, "is-closed", "is-opening", "is-opened", 300);
  expect(el).toHaveClass("is-opening");
  expect(el.classList.length).toBe(2);

  vi.runAllTimers();

  expect(el).toHaveClass("is-opened");
  expect(el.classList.length).toBe(2);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);
});

test("should go through closing transition classes when transition is called", () => {
  transition(el, "is-opened", "is-closing", "is-closed", 500);
  expect(el).toHaveClass("is-closing");
  expect(el.classList.length).toBe(2);

  vi.runAllTimers();

  expect(el).toHaveClass("is-closed");
  expect(el.classList.length).toBe(2);

  expect(setTimeout).toHaveBeenCalledTimes(2);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
});
