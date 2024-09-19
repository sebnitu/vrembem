import "@testing-library/jest-dom/vitest";
import Popover from "../index";
import { registerEventListeners } from "../src/js/register";

vi.useFakeTimers();

const markup = `
  <div id="app">
    <button id="asdf-trigger" aria-controls="asdf">...</button>
    <div id="asdf" class="popover">
      ...
    </div>
    <button id="tooltip-trigger" aria-describedby="tooltip">...</button>
    <div id="tooltip" class="popover popover_tooltip">
      ...
    </div>
    <button id="fdsa-trigger" aria-controls="fdsa">...</button>
    <div id="fdsa" class="popover" style="--vb-popover-event: hover;">
      ...
    </div>
    <button id="third" aria-controls="missing">...</button>
  </div>
`;

beforeAll(() => {
  document.body.style.setProperty("--vb-prefix", "vb-");
});

describe("register() & entry.deregister()", () => {
  it("should register a popover using the provided trigger", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    const trigger = document.querySelector("#asdf-trigger");
    await popover.register(trigger);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0]._eventListeners.length).toBe(1);
  });

  it("should register a popover using the provided ID", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    const trigger = document.querySelector("#asdf-trigger");
    const target = document.querySelector("#asdf");
    await popover.register("asdf");
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].trigger).toBe(trigger);
    expect(popover.collection[0].el).toBe(target);
    expect(popover.collection[0]._eventListeners.length).toBe(1);
    trigger.click();
    vi.advanceTimersByTime(500);
    expect(popover.collection[0].el).toHaveClass("is-active");
  });

  it("should return an error if the provided trigger has no associated popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    const trigger = document.querySelector("#third");
    let catchError = false;
    await popover.register(trigger).catch((error) => {
      expect(error.message).toBe("No popover associated with the provided popover trigger: \"missing\".");
      catchError = true;
    });
    expect(catchError).toBe(true);
  });

  it("should attach hover event listeners when registered", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    const trigger = document.querySelector("#fdsa-trigger");
    await popover.register(trigger);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0]._eventListeners.length).toBe(3);
  });

  it("should attach open and close methods to registered popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.register("asdf");
    const entry = popover.get("asdf");

    await entry.open();
    expect(entry.state).toBe("opened");
    expect(entry.el).toHaveClass("is-active");

    await entry.close();
    expect(entry.state).toBe("closed");
    expect(entry.el).not.toHaveClass("is-active");
  });

  it("should attach deregister method to registered popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.register("asdf");
    const entry = popover.get("asdf");
    expect(entry.id).toBe("asdf");
    await entry.deregister();
    expect(entry.id).toBe(undefined);
  });

  it("should not register more event listeners if registerEventListeners is run on existing popover", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    await popover.register("asdf");
    const entry = popover.get("asdf");
    registerEventListeners.call(popover, entry);
    entry.trigger.click();
    vi.advanceTimersByTime(500);
    expect(entry.el).toHaveClass("is-active");
    expect(entry.state).toBe("opened");
  });
});

describe("entry.isTooltip", () => {
  it("should return whether or not a popover is a tooltip", async () => {
    document.body.innerHTML = markup;
    const popover = new Popover();
    const entry1 = await popover.register("asdf");
    const entry2 = await popover.register("tooltip");
    expect(entry1.isTooltip).toBe(false);
    expect(entry2.isTooltip).toBe(true);
  });
});
