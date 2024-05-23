import "@testing-library/jest-dom/vitest";
import Popover from "../index.js";
import { closeAll, closeCheck } from "../src/js/close";

let popover;

vi.useFakeTimers();

const markup = `
  <button aria-controls="asdf">...</button>
  <div id="asdf" class="popover is-active" tabindex="0">...</div>
  <button aria-controls="fdsa">...</button>
  <div id="fdsa" class="popover is-active">...</div>
  <span aria-describedby="afsd">...</span>
  <div id="afsd" class="popover popover_tooltip is-active" role="tooltip">...</div>
`;

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe("close()", () => {
  it("should close the provided popover", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    const entry = popover.get("asdf");
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-active");
    expect(entry.trigger.getAttribute("aria-expanded")).toBe("true");
    entry.close();
    expect(entry.state).toBe("closed");
    expect(entry.el).not.toHaveClass("is-active");
    expect(entry.trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("should close the provided popover tooltip", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    const entry = popover.get("afsd");
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-active");
    expect(entry.trigger.hasAttribute("aria-expanded")).toBe(false);
    entry.close();
    expect(entry.state).toBe("closed");
    expect(entry.el).not.toHaveClass("is-active");
    expect(entry.trigger.hasAttribute("aria-expanded")).toBe(false);
  });
});

describe("closeAll()", () => {
  it("should close all popovers", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(3);
    expect(popover.collection[0].el).toHaveClass("is-active");
    expect(popover.collection[1].el).toHaveClass("is-active");
    closeAll.call(popover);
    expect(popover.collection[0].el).not.toHaveClass("is-active");
    expect(popover.collection[1].el).not.toHaveClass("is-active");
  });
});

describe("closeCheck()", () => {
  it("should close popover if closeCheck does not detect a hover or focus on trigger or popover elements", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(3);
    closeCheck.call(popover, popover.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popover.collection[0].el).not.toHaveClass("is-active");
  });

  it("should not close popover if closeCheck detects a focus on trigger elements", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.collection[0].trigger.focus();
    closeCheck.call(popover, popover.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popover.collection[0].el).toHaveClass("is-active");
  });

  it("should not close popover if closeCheck detects a focus on popover elements", () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.collection[0].el.focus();
    closeCheck.call(popover, popover.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popover.collection[0].el).toHaveClass("is-active");
  });
});
