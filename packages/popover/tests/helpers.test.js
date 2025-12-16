import "@testing-library/jest-dom/vitest";
import Popover from "../index";
import { cssConfig } from "@vrembem/core";
import {
  applyPositionStyle,
  getDelay,
  getPadding,
  getPopoverID,
  getPopoverElements
} from "../src/js/helpers";
import { expect } from "vitest";

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

const customPropertyMarkup = `
  <button aria-controls="asdf">...</button>
  <div id="asdf" class="popover" style="--vb-popover-toggle-delay: 200, 400;">
    ...
  </div>
  <button aria-controls="fdsa">...</button>
  <div id="fdsa" class="popover" style="--vb-popover-toggle-delay: 400 800;">
    ...
  </div>
`;

beforeAll(() => {
  document.body.style.setProperty("--vb-prefix", "vb-");
});

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

describe("getPadding()", () => {
  it("should return an integer if a single number string is passed", () => {
    const value = "64";
    expect(getPadding(value)).toEqual(64);
  });

  it("should return a padding object if a string of two numbers are passed", () => {
    const value = "64 32";
    expect(getPadding(value)).toEqual({
      top: 64,
      right: 32,
      bottom: 64,
      left: 32
    });
  });

  it("should return a padding object if a string of three numbers are passed", () => {
    const value = "64 32 16";
    expect(getPadding(value)).toEqual({
      top: 64,
      right: 32,
      bottom: 16,
      left: 32
    });
  });

  it("should return a padding object if a string of four numbers are passed", () => {
    const value = "64 32 16 8";
    expect(getPadding(value)).toEqual({
      top: 64,
      right: 32,
      bottom: 16,
      left: 8
    });
  });

  it("should return undefined if more than four numbers exist in the string", () => {
    const value = "64 32 16 8 4";
    expect(getPadding(value)).toEqual(undefined);
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
    const el = document.querySelector('[aria-controls="pop-2"]');
    const result = getPopoverID.call(popover, el);
    expect(result).toBe("pop-2");
  });

  it("should return the popover id using a popover tooltip trigger", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const el = document.querySelector('[aria-describedby="pop-3"]');
    const result = getPopoverID.call(popover, el);
    expect(result).toBe("pop-3");
  });

  it("should return null if html element does not have the correct attributes", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const trigger = document.querySelector("#missing-attribute");
    const result = getPopoverID.call(popover, trigger);
    expect(result).toBe(null);
  });

  it("should return null if passed object does not resolve an ID", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    const result = getPopoverID.call(popover, true);
    expect(result).toBe(null);
  });
});

describe("getPopoverElements()", () => {
  it("should return popover element and trigger elements when found using ID", () => {
    document.body.innerHTML = markup;
    const trigger = document.querySelector('[aria-controls="pop-1"]');
    const target = document.querySelector("#pop-1");
    popover = new Popover();
    const result = getPopoverElements.call(popover, "pop-1");
    expect(result.popover).toBe(target);
    expect(result.trigger).toBe(trigger);
  });

  it("should throw error if no popover elements are found using an ID", () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    expect(() => getPopoverElements.call(popover, "pop-4")).toThrow(
      'No popover elements found using the ID: "pop-4".'
    );
  });

  it("should throw error if no popover is found using a trigger element", () => {
    document.body.innerHTML = markup;
    const trigger = document.querySelector('[aria-controls="asdf"]');
    popover = new Popover();
    expect(() => getPopoverElements.call(popover, trigger)).toThrow(
      'No popover associated with the provided popover trigger: "asdf".'
    );
  });

  it("should throw error if no popover trigger is found using a popover", () => {
    document.body.innerHTML = markup;
    const target = document.querySelector("#fdsa");
    popover = new Popover();
    expect(() => getPopoverElements.call(popover, target)).toThrow(
      'No popover trigger associated with the provided popover: "fdsa".'
    );
  });

  it("should throw error if unable to resolve a popover ID with provided query", () => {
    document.body.innerHTML = markup;
    const trigger = document.querySelector("#missing-attribute");
    popover = new Popover();
    expect(() => getPopoverElements.call(popover, trigger)).toThrow(
      "Could not resolve the popover ID."
    );
  });
});

describe("getDelay()", () => {
  it("should return the appropriate delay based on the provided index", async () => {
    document.body.innerHTML = markup;
    popover = new Popover({
      toggleDelay: 200
    });
    const entry1 = await popover.register("pop-1");
    expect(getDelay(entry1, 0)).toBe(200);

    const entry2 = await popover.register("pop-1", {
      toggleDelay: [300, 600]
    });
    expect(getDelay(entry2, 0)).toBe(300);
    expect(getDelay(entry2, 1)).toBe(600);
  });

  it("should create an array if the provided delay is a string", async () => {
    document.body.innerHTML = customPropertyMarkup;
    popover = new Popover();
    await popover.mount({
      plugins: [cssConfig()]
    });
    expect(getDelay(popover.get("asdf"), 0)).toBe(200);
    expect(getDelay(popover.get("asdf"), 1)).toBe(400);
    expect(getDelay(popover.get("fdsa"), 0)).toBe(400);
    expect(getDelay(popover.get("fdsa"), 1)).toBe(800);
  });

  it("should throw an error if the provided delay is not a number", async () => {
    document.body.innerHTML = markup;
    popover = new Popover({
      toggleDelay: "asdf"
    });
    const entry1 = await popover.register("pop-1");
    expect(() => getDelay(entry1, 0)).toThrow(
      'Provided delay value is not a number: "asdf"'
    );
  });
});
