import "@testing-library/jest-dom/vitest";
import Popover from "../index";
import {
  applyPositionStyle,
  getPopoverConfig,
  getPadding,
  getMiddlewareOptions,
  getPopoverID,
  getPopoverElements
} from "../src/js/helpers";

let popover;

const markup = `
  <button aria-controls="pop-1">...</button>
  <div id="pop-1" class="popover">...</div>

  <button aria-controls="pop-2">...</button>
  <div id="pop-2" class="popover">...</div>

  <span aria-describedby="pop-3">...</span>
  <div id="pop-3" class="popover popover_tooltip" role="tooltip">...</div>

  <button aria-controls="asdf">...</button>
  <div id="fdsa" class="popover">...</div>

  <button id="missing-attribute">...</button>
`;

const simpleMarkup = `
  <div id="asdf"></div>
`;

afterEach(() => {
  if (popover && "unmount" in popover) {
    popover.unmount();
  }
  popover = null;
  document.body.innerHTML = null;
});

describe("applyPositionStyle()", () => {
  it("Should apply both x and y position values.", () => {
    document.body.innerHTML = simpleMarkup;
    const el = document.getElementById("asdf");
    applyPositionStyle(el, 10, 20);
    expect(el.style.left).toBe("10px");
    expect(el.style.top).toBe("20px");
  });

  it("Should apply both the y position values.", () => {
    document.body.innerHTML = simpleMarkup;
    const el = document.getElementById("asdf");
    applyPositionStyle(el, undefined, 15);
    expect(el.style.left).toBe("");
    expect(el.style.top).toBe("15px");
  });

  it("Should apply both the x position values.", () => {
    document.body.innerHTML = simpleMarkup;
    const el = document.getElementById("asdf");
    applyPositionStyle(el, 15, undefined);
    expect(el.style.left).toBe("15px");
    expect(el.style.top).toBe("");
  });
});

describe("getPopoverConfig()", () => {
  it("Should return the config with all default options if no CSS vars are set", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector("#pop-2");
    const config = getPopoverConfig(target, popover.settings);
    expect(config).toEqual({
      "placement": "bottom",
      "event": "click",
      "offset": 0,
      "shift-padding": 0,
      "flip-padding": 0,
      "arrow-element": ".popover__arrow",
      "arrow-padding": 0,
      "toggle-delay": 0
    });
  });

  it("Should return the config with the values of custom CSS variable values", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector("#pop-1");
    target.style.setProperty("--popover-placement", "top");
    target.style.setProperty("--popover-event", "focus");
    target.style.setProperty("--popover-offset", "32");
    target.style.setProperty("--popover-shift-padding", "16");
    target.style.setProperty("--popover-flip-padding", "8");
    target.style.setProperty("--popover-arrow-element", ".asdf");
    target.style.setProperty("--popover-arrow-padding", "4");
    target.style.setProperty("--popover-toggle-delay", "500");
    const config = getPopoverConfig(target, popover.settings);
    expect(config).toEqual({
      "placement": "top",
      "event": "focus",
      "offset": "32",
      "shift-padding": "16",
      "flip-padding": "8",
      "arrow-element": ".asdf",
      "arrow-padding": "4",
      "toggle-delay": "500"
    });
  });
});

describe("getPadding()", () => {
  it("should return an integer if a single number string is passed", () => {
    const value = "64";
    expect(getPadding(value)).toEqual(64);
  });

  it("should return a padding object if a string of two numbers are passed", () => {
    const value = "64 32";
    expect(getPadding(value)).toEqual({ top: 64, right: 32, bottom: 64, left: 32 });
  });

  it("should return a padding object if a string of three numbers are passed", () => {
    const value = "64 32 16";
    expect(getPadding(value)).toEqual({ top: 64, right: 32, bottom: 16, left: 32 });
  });

  it("should return a padding object if a string of four numbers are passed", () => {
    const value = "64 32 16 8";
    expect(getPadding(value)).toEqual({ top: 64, right: 32, bottom: 16, left: 8 });
  });

  it("should return false if more than four numbers exist in the string", () => {
    const value = "64 32 16 8 4";
    expect(getPadding(value)).toEqual(false);
  });
});

describe("getPopoverConfig() & getMiddlewareOptions()", () => {
  it("should return modifiers using defaults", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector(".popover");
    const config = getPopoverConfig(target, popover.settings);
    const result = getMiddlewareOptions(config);
    expect(result.offset).toEqual(0);
    expect(result.shift.padding).toEqual(0);
  });

  it("should return modifiers with custom CSS variables set", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const target = document.querySelector(".popover");
    target.style.setProperty("--popover-offset", "10");
    target.style.setProperty("--popover-shift-padding", "20");
    const config = getPopoverConfig(target, popover.settings);
    const result = getMiddlewareOptions(config);
    expect(result.offset).toEqual(10);
    expect(result.shift.padding).toEqual(20);
  });

  it("should return modifiers with custom CSS variables set to root document", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    document.documentElement.style.setProperty("--popover-offset", "5");
    document.documentElement.style.setProperty("--popover-shift-padding", "10");
    const config = getPopoverConfig(document.documentElement, popover.settings);
    const result = getMiddlewareOptions(config);
    expect(result.offset).toEqual(5);
    expect(result.shift.padding).toEqual(10);
  });
});

describe("getPopoverID()", () => {
  it("should return the popover id using a popover", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const el = document.querySelector(".popover");
    const result = getPopoverID.call(popover, el);
    expect(result).toBe("pop-1");
  });

  it("should return the popover id using a popover trigger", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const el = document.querySelector("[aria-controls=\"pop-2\"]");
    const result = getPopoverID.call(popover, el);
    expect(result).toBe("pop-2");
  });

  it("should return the popover id using a popover tooltip trigger", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const el = document.querySelector("[aria-describedby=\"pop-3\"]");
    const result = getPopoverID.call(popover, el);
    expect(result).toBe("pop-3");
  });

  it("should return false if html element does not have the correct attributes", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector("#missing-attribute");
    const result = getPopoverID.call(popover, trigger);
    expect(result).toBe(false);
  });

  it("should return false if passed object does not resolve an ID", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const result = getPopoverID.call(popover, true);
    expect(result).toBe(false);
  });
});

describe("getPopoverElements()", () => {
  it("should return popover element and trigger elements when found using ID", () => {
    document.body.innerHTML = markup;
    const trigger = document.querySelector("[aria-controls=\"pop-1\"]");
    const target = document.querySelector("#pop-1");
    popover = new Popover();
    const result = getPopoverElements.call(popover, "pop-1");
    expect(result.popover).toBe(target);
    expect(result.trigger).toBe(trigger);
  });

  it("should throw error if no popover elements are found using an ID", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const func = getPopoverElements.call(popover, "pop-4");
    expect(func.error.message).toBe("No popover elements found using the ID: \"pop-4\".");
  });

  it("should throw error if no popover is found using a trigger element", () => {
    document.body.innerHTML = markup;
    const trigger = document.querySelector("[aria-controls=\"asdf\"]");
    popover = new Popover();
    const func = getPopoverElements.call(popover, trigger);
    expect(func.error.message).toBe("No popover associated with the provided popover trigger: \"asdf\".");
  });

  it("should throw error if no popover trigger is found using a popover", () => {
    document.body.innerHTML = markup;
    const target = document.querySelector("#fdsa");
    popover = new Popover();
    const func = getPopoverElements.call(popover, target);
    expect(func.error.message).toBe("No popover trigger associated with the provided popover: \"fdsa\".");
  });

  it("should throw error if unable to resolve a popover ID with provided query", () => {
    document.body.innerHTML = markup;
    const trigger = document.querySelector("#missing-attribute");
    popover = new Popover();
    const func = getPopoverElements.call(popover, trigger);
    expect(func.error.message).toBe("Could not resolve the popover ID.");
  });
});
