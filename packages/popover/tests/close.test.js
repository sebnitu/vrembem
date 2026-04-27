import "@testing-library/jest-dom/vitest";
import { PopoverCollection } from "../index";
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
    const popovers = new PopoverCollection();
    await popovers.mount();
    const entry = popovers.get("asdf");
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
    const popovers = new PopoverCollection();
    await popovers.mount();
    const entry = popovers.get("afsd");
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
    const popovers = new PopoverCollection();
    await popovers.mount();
    expect(popovers.collection.length).toBe(3);
    expect(popovers.collection[0].el).toHaveClass("is-active");
    expect(popovers.collection[1].el).toHaveClass("is-active");
    await closeAll(popovers);
    expect(popovers.collection[0].el).not.toHaveClass("is-active");
    expect(popovers.collection[1].el).not.toHaveClass("is-active");
  });
});

describe("closeCheck()", () => {
  it("should close popover if closeCheck does not detect a hover or focus on trigger or popover elements", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();
    expect(popovers.collection.length).toBe(3);
    closeCheck(popovers.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popovers.collection[0].el).not.toHaveClass("is-active");
  });

  it("should keep popover open if closeCheck detects trigger element is focused", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();
    popovers.collection[0].trigger.focus();
    closeCheck(popovers.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popovers.collection[0].el).toHaveClass("is-active");
  });

  it("should keep popover open if closeCheck detects popover element or its children are focused", async () => {
    document.body.innerHTML = markup;
    const popovers = new PopoverCollection();
    await popovers.mount();
    popovers.collection[0].el.focus();
    closeCheck(popovers.collection[0]);
    vi.advanceTimersByTime(100);
    expect(popovers.collection[0].el).toHaveClass("is-active");
  });
});
