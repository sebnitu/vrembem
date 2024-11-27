import "@testing-library/jest-dom/vitest";
import Popover from "../index";
import { closeAll, closeCheck } from "../src/js/close";

vi.useFakeTimers();

const markup = `
  <button aria-controls="asdf">...</button>
  <div id="asdf" class="popover is-active" tabindex="0">...</div>
  <button aria-controls="fdsa">...</button>
  <div id="fdsa" class="popover is-active">...</div>
  <span aria-describedby="afsd">...</span>
  <div id="afsd" class="popover popover_tooltip is-active" role="tooltip">...</div>
`;

describe("close()", () => {
  it("should close the provided popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    const entry = popover.get("asdf");
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-active");
    expect(entry.trigger.getAttribute("aria-expanded")).toBe("true");
    await entry.close();
    expect(entry.state).toBe("closed");
    expect(entry.el).not.toHaveClass("is-active");
    expect(entry.trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("should close the provided popover tooltip", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    const entry = popover.get("afsd");
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-active");
    expect(entry.trigger.hasAttribute("aria-expanded")).toBe(false);
    await entry.close();
    expect(entry.state).toBe("closed");
    expect(entry.el).not.toHaveClass("is-active");
    expect(entry.trigger.hasAttribute("aria-expanded")).toBe(false);
  });
});

describe("closeAll()", () => {
  it("should close all popovers", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    expect(popover.collection.length).toBe(3);
    expect(popover.collection[0].el).toHaveClass("is-active");
    expect(popover.collection[1].el).toHaveClass("is-active");
    await closeAll.call(popover);
    expect(popover.collection[0].el).not.toHaveClass("is-active");
    expect(popover.collection[1].el).not.toHaveClass("is-active");
  });
});

describe("closeCheck()", () => {
  it("should close popover if closeCheck does not detect a hover or focus on trigger or popover elements", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    expect(popover.collection.length).toBe(3);
    closeCheck.call(popover, popover.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popover.collection[0].el).not.toHaveClass("is-active");
  });

  it("should keep popover open if closeCheck detects trigger element is focused", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    popover.collection[0].trigger.focus();
    closeCheck.call(popover, popover.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popover.collection[0].el).toHaveClass("is-active");
  });

  it("should keep popover open if closeCheck detects popover element or its children are focused", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.mount();
    popover.collection[0].el.focus();
    closeCheck.call(popover, popover.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popover.collection[0].el).toHaveClass("is-active");
  });
});
