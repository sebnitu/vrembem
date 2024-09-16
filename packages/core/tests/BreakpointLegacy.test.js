import "./mocks/matchMediaLegacy.mock";
import { resizeWindow } from "./helpers/resizeWindow";

import { Breakpoint } from "../index";

const bp = new Breakpoint();
const handler = jest.fn();
const handlerAlt = jest.fn();

beforeAll(() => {
  window.innerWidth = 800;
});

test("should mount media query breakpoint", () => {
  bp.mount("600px", handler);

  expect(bp.value).toBe("600px");
  expect(typeof bp.handler).toBe("function");

  expect(handler).toHaveBeenCalled();
  expect(bp.mql.matches).toBe(true);
  expect(bp.mql.addListener).toHaveBeenCalledWith(handler);

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
  expect(bp.mql.addListener).toHaveBeenCalledWith(handlerAlt);
});

test("should unmount media query breakpoint", () => {
  bp.unmount();
  expect(bp.value).toBe(null);
  expect(bp.handler).toBe(null);
  expect(bp.mql).toBe(null);
});
