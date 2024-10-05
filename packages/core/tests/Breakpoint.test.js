import "./mocks/matchMedia.mock";
import { Breakpoint } from "../index";

function resizeWindow(value) {
  window.innerWidth = value;
  window.dispatchEvent(new Event("resize"));
}

const bp = new Breakpoint();
const handler = vi.fn();
const handlerAlt = vi.fn();

beforeAll(() => {
  window.innerWidth = 800;
});

test("should mount media query breakpoint", () => {
  bp.mount("600px", handler);

  expect(bp.value).toBe("600px");
  expect(typeof bp.handler).toBe("function");

  expect(handler).toHaveBeenCalled();
  expect(bp.mql.matches).toBe(true);
  expect(bp.mql.addEventListener).toHaveBeenCalledWith("change", handler);

  resizeWindow(400);
  expect(bp.mql.matches).toBe(false);

  resizeWindow(800);
  expect(bp.mql.matches).toBe(true);
});

test("should mount a new media query breakpoint", () => {
  bp.value = "900px";
  bp.handler = handlerAlt;
  bp.mount();
  expect(bp.mql.matches).toBe(false);
  expect(bp.mql.addEventListener).toHaveBeenCalledWith("change", handlerAlt);
});

test("should unmount media query breakpoint", () => {
  bp.unmount();
  expect(bp.value).toBe(null);
  expect(bp.handler).toBe(null);
  expect(bp.mql).toBe(null);
});

test("should mount not throw errors if breakpoint value is not set", () => {
  expect(bp.mount.bind(bp)).not.toThrow();
  expect(bp.unmount.bind(bp)).not.toThrow();
});

test("should mount new media query breakpoint after it has been unmounted", () => {
  bp.value = "600px";
  bp.handler = handler;
  bp.mount();

  expect(bp.value).toBe("600px");
  expect(typeof bp.handler).toBe("function");

  expect(handler).toHaveBeenCalled();
  expect(bp.mql.matches).toBe(true);
  expect(bp.mql.addEventListener).toHaveBeenCalledWith("change", handler);

  resizeWindow(400);
  expect(bp.mql.matches).toBe(false);

  resizeWindow(800);
  expect(bp.mql.matches).toBe(true);
});
